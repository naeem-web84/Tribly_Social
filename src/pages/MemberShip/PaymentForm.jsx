import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure/useAxiosSecure';
import Loading from '../../components/loading/Loading';

const PaymentForm = () => {
    const axiosSecure = useAxiosSecure();

    const stripe = useStripe();
    const elements = useElements();
    // user id of mongodb _id
    const { id } = useParams();

    console.log("id from params", id);


    const [error, setError] = useState('');


    const { isLoading, data: paymentUserInfo = {} } = useQuery({
        queryKey: ['userId', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/id/${id}`);
            return data;
        }
    })


    console.log("data of user for payment", paymentUserInfo);
    if (isLoading) {
        return <Loading></Loading>
    }

    const membershipAmount = 80;
    // ✅ Convert amount to cents
    const amountInCents = Math.round(membershipAmount * 100);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            setError(error?.message);
        }
        else {
            setError('');
            console.log("payment method", paymentMethod);
        }

        // create payment Intent
        const res = await axiosSecure.post('/api/create-payment-intent', {
            amount: amountInCents,
            id
        });

        // client secret 
        const clientSecret = res.data.clientSecret;



        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: "Naeem"
                }
            }
        });

        if (result.error) {
            console.log(result.error.message);
        }
        else {
            if (result.paymentIntent.status === 'succeeded') {
                console.log("payment succeeded");
                console.log("payment reslt", result);
            }
        }

        console.log("res from intent", res);




    }





    return (
        <div className='mt-14'>
            <form onSubmit={handleSubmit} className='space-y-4 bg-secondary text-secondary-content p-6 rpunded-xl shadow-md w-full max-w-md mx-auto'>
                <CardElement className='p-2 border rounded'></CardElement>
                <button
                    type='submit'
                    disabled={!stripe}
                    className='btn btn-primary w-full'>
                    Pay Taka{membershipAmount} For Membership
                </button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }
            </form>

        </div>
    );
};

export default PaymentForm;