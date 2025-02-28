"use client";
// client component here, cause it is expecting the user to click on it

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const ButtonPortal = () => {
  const [isLoading, setIsLoading] = useState(false); // loading showing

  const handleBilling = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await axios.post("/api/billing/create-portal", {
        returnUrl: window.location.href
      });

      const portalUrl = response.data?.url;

      if (portalUrl) {
        window.location.href = portalUrl;
      } else {
        toast.error("No portal URL received");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Something went wrong";

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleBilling} disabled={isLoading}>
      {isLoading && <span className="loading loading-spinner loading-xs"></span>}
      Billing
    </button>
  );
};

export default ButtonPortal;