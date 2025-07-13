import React from "react";
import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-6 text-center font-urbanist">
      <h1 className="text-4xl font-bold text-error mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-base-content mb-6">
        {error?.statusText || error?.message || "Something went wrong."}
      </p>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
