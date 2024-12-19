import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { clearAllUserErrors, forgotpassReq } from "@/store/userSlice";
import { Loader2 } from "lucide-react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { message, error, otpSent, loading } = useSelector((state) => state.user);
  const { toast } = useToast();
  const dispatch = useDispatch();

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

    if (otpSent) {
      navigate(`/auth/verify/reset`);
    }

    return () => {
      dispatch(clearAllUserErrors());
    };
  }, [error, message, dispatch, toast]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(forgotpassReq({ email }));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
        className: "bg-red-600 text-white border border-red-700",
      });
    }
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
        Forgot Password
      </h1>
      <br />
      <br />
      <h1 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
        Verify your Email
      </h1>
      <div className="space-y-2 ">
        <Label className="text-lg">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" /> {/* Loading spinner */}
        </div>
      ) : (
        <Button type="submit" className="w-full">
          Reset Password
        </Button>
      )}

      <Button
        type="button"
        variant="link"
        className="w-full"
        onClick={() => navigate("/auth")}
      >
        Back to Login
      </Button>
    </motion.form>
  );
}
