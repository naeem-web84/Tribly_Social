import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

// stripe promise
const stripePromise = loadStripe(import.meta.env.VITE_MEMBERSHIP_KEY);


const MemberShip = () => {
    return (
        <div className='min-h-screen'>
            <Elements stripe={stripePromise}>
                <PaymentForm></PaymentForm>
            </Elements>
        </div>

    );
};

export default MemberShip;