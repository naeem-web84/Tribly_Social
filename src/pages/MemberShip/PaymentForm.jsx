import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import Lottie from "lottie-react";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import Loading from "../../components/loading/Loading";
import paymentLottie from "../../assets/lotties/payment-lottie.json";

const PaymentForm = () => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const { isLoading, data: paymentUserInfo = {} } = useQuery({
    queryKey: ["userId", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/id/${id}`);
      return data;
    },
  });

  const membershipAmount = 80;
  const amountInCents = Math.round(membershipAmount * 100);
  const isMember = paymentUserInfo?.badge?.toLowerCase() === "member";

  if (isLoading) return <Loading />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError("");
    setSuccess(false);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: methodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (methodError) {
      setError(methodError.message);
      setProcessing(false);
      return;
    }

    const res = await axiosSecure.post("/api/create-payment-intent", {
      amount: amountInCents,
      id,
    });

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: paymentUserInfo?.userName || "Anonymous",
          email: paymentUserInfo?.email,
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
      return;
    }

    if (result.paymentIntent.status === "succeeded") {
      setSuccess(true);

      await axiosSecure.post("/api/save-payment", {
        userId: paymentUserInfo._id,
        userName: paymentUserInfo.userName,
        email: paymentUserInfo.email,
        amount: membershipAmount,
        transactionId: result.paymentIntent.id,
        paymentIntentId: result.paymentIntent.id,
        date: new Date().toISOString(),
      });

      await queryClient.invalidateQueries(["userId", id]);
    }

    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col md:flex-row items-center justify-center px-4 py-14 gap-12 font-urbanist">
      {/* Lottie Animation */}
      <div className="w-full max-w-sm md:w-1/2">
        <Lottie animationData={paymentLottie} loop={true} />
      </div>

      {/* Payment Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 text-base-content p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">
          Membership Payment
        </h2>

        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#1f2937",
                "::placeholder": {
                  color: "#9ca3af",
                },
                fontFamily: "Urbanist, sans-serif",
                padding: "12px 14px",
              },
              invalid: {
                color: "#dc2626",
              },
            },
          }}
          className="p-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-primary transition mb-6"
        />

        <button
          type="submit"
          disabled={!stripe || isMember || processing}
          className={`btn btn-primary w-full text-lg font-semibold ${
            isMember ? "cursor-not-allowed opacity-70" : ""
          }`}
        >
          {isMember
            ? "You are already a Member"
            : processing
            ? "Processing..."
            : `Pay Taka ${membershipAmount} For Membership`}
        </button>

        {error && (
          <p className="text-red-600 text-center mt-4 text-sm font-medium">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 text-center mt-4 text-sm font-semibold">
            ✅ Payment successful! You are now a Member.
          </p>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
