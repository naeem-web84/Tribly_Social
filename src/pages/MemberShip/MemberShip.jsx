import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

// stripe promise
const stripePromise = loadStripe(import.meta.env.VITE_MEMBERSHIP_KEY);


const MemberShip = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm></PaymentForm>
        </Elements>
    );
};

export default MemberShip;