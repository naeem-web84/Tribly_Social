import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import Loading from '../../components/loading/Loading';

const PaymentForm = () => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const { isLoading, data: paymentUserInfo = {} } = useQuery({
    queryKey: ['userId', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/id/${id}`);
      return data;
    }
  });

  const membershipAmount = 80;
  const amountInCents = Math.round(membershipAmount * 100);
  const isMember = paymentUserInfo?.badge?.toLowerCase() === 'member';

  if (isLoading) return <Loading />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError('');
    setSuccess(false);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    // 1. Create PaymentMethod
    const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (methodError) {
      setError(methodError.message);
      setProcessing(false);
      return;
    }

    // 2. Create PaymentIntent from server
    const res = await axiosSecure.post('/api/create-payment-intent', {
      amount: amountInCents,
      id,
    });

    const clientSecret = res.data.clientSecret;

    // 3. Confirm payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: paymentUserInfo?.userName || 'Anonymous',
          email: paymentUserInfo?.email,
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
      return;
    }

    // 4. Payment success
    if (result.paymentIntent.status === 'succeeded') {
      setSuccess(true);

      // 5. Save payment info to backend with userName & email
      await axiosSecure.post('/api/save-payment', {
        userId: paymentUserInfo._id,
        userName: paymentUserInfo.userName,
        email: paymentUserInfo.email,
        amount: membershipAmount,
        transactionId: result.paymentIntent.id,
        paymentIntentId: result.paymentIntent.id,
        date: new Date().toISOString(),
      });

      // Refetch user info to update badge
      await queryClient.invalidateQueries(['userId', id]);
    }

    setProcessing(false);
  };

  return (
    <div className="mt-14">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-secondary text-secondary-content p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded" />
        <button
          type="submit"
          disabled={!stripe || isMember || processing}
          className="btn btn-primary w-full"
        >
          {isMember
            ? 'You are already a Member'
            : processing
            ? 'Processing...'
            : `Pay Taka ${membershipAmount} For Membership`}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm font-medium">
            ✅ Payment successful! You are now a Member.
          </p>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
