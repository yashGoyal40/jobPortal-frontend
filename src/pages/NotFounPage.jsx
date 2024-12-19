import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-6xl font-bold text-black dark:text-white mb-4">
        404
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
      >
        <Button variant="outline">
        Go Back Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
