import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { forgotpassReset, clearAllUserErrors } from "@/store/userSlice";
import { Loader2 } from "lucide-react";

export default function VerifyResetPass() {
  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { error, message, isAuthenticated, loading, isVerified } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
        className: "bg-red-600 text-white border border-red-700",
      });
    }

    if (message) {
      toast({
        variant: "success",
        title: "Success",
        description: message,
        className: "bg-green-600 text-white border border-green-700",
      });
    }

    if (isAuthenticated && isVerified) {
      navigate("/jobs");
    }

    return () => {
      dispatch(clearAllUserErrors());
    };
  }, [error, message, dispatch, isAuthenticated, isVerified]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotpassReset(formData));
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        Verify Your Password
      </h1>
      <h1 className="text-xl font-bold mb-8 text-gray-800 dark:text-white">
        Enter OTP and Set New Password
      </h1>

      <div className="space-y-2">
        <Label className="text-lg">
          OTP <span className="text-red-500">*</span>
        </Label>
        <Input
          id="otp"
          name="otp"
          type="text"
          placeholder="Enter OTP"
          value={formData.otp}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="text-lg">
          New Password <span className="text-red-500">*</span>
        </Label>
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          placeholder="Enter your new password"
          value={formData.newPassword}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="text-lg">
          Confirm Password <span className="text-red-500">*</span>
        </Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your new password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
      </div>

      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" /> 
        </div>
      ) : (
        <Button type="submit" className="w-full">
          Verify and Reset Password
        </Button>
      )}
    </motion.form>
  );
}
