import React from "react";
import Lottie from "lottie-react";
import loadingHand from "../../assets/lotties/loadingHandLotti.json";
import { FaSpinner } from "react-icons/fa";

const Loading = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center gap-6 bg-base-100">
            <Lottie
                animationData={loadingHand}
                loop={true}
                className="w-72 md:w-96"
            />
            <div className="flex items-center gap-2 text-orange-500 text-lg font-medium">
                <FaSpinner className="animate-spin text-xl" />
                Please wait, loading content...
            </div>
        </div>
    );
};

export default Loading;
