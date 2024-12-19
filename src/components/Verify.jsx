import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { verify } from "@/store/userSlice";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

function Verify() {
  const { email } = useParams();
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");

  const dispatch = useDispatch();
  const { loading, isAuthenticated, isVerified, error, message } = useSelector(
    (state) => state.user
  );

  const [otp, setOtp] = useState("");
  const data = {};

  if (action === "verify") {
    data.email = email;
    data.otp = otp;
  }

  const navigate = useNavigate();
  const { toast } = useToast();

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
  }, [message, error, isVerified, isAuthenticated, navigate, toast]);

  const handleVerify = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      dispatch(verify(data));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white dark:bg-black">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleVerify} className="space-y-4">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
            Verify OTP
          </h1>

          <div className="space-y-2">
            <Label className="text-lg">
              OTP <span className="text-red-500">*</span>
            </Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter your OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full flex justify-center items-center" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </Button>
          <Button
            type="button"
            variant="link"
            className="w-full"
            onClick={() => navigate("/auth")}
          >
            Back to Login
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default Verify;
