import React from "react";
import { Link, useRouteError } from "react-router";
import Lottie from "lottie-react";
import errorLottie from "../../assets/lotties/Error_lottie_tribly.json"; 

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4 py-10 font-urbanist text-center">
      {/* Lottie Animation */}
      <div className="w-[300px] sm:w-[400px] mb-6">
        <Lottie animationData={errorLottie} loop={true} />
      </div>

      {/* Error Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-error mb-2">Oops! Page Not Found</h1>

      {/* Error Description */}
      <p className="text-base sm:text-lg text-base-content mb-6">
        {error?.statusText || error?.message || "Something went wrong."}
      </p>

      {/* Go Home Button */}
      <Link to="/" className="btn btn-primary transition-all duration-300 hover:scale-105">
        Go to Homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
