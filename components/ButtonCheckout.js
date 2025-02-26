"use client";
// client component here, cause it is expecting the user to click on it

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const ButtonCheckout = () => {
  const [isLoading, setIsLoading] = useState(false); // loading showing

  const handleSubscribe = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await axios.post("/api/billing/create-checkout", {
        successUrl: `${window.location.origin}/success`,
        cancelUrl: window.location.origin,
      });

      const checkoutUrl = response.data?.url;

      if (!checkoutUrl) {
        throw new Error("Checkout URL not received.");
      }

      console.log(checkoutUrl);

      window.location.href = checkoutUrl;
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Something went wrong";

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleSubscribe} disabled={isLoading}>
      {isLoading && <span className="loading loading-spinner loading-xs"></span>}
      Subscribe
    </button>
  );
};

export default ButtonCheckout;
