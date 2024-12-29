import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";
import {
  clearAllUserErrors,
  deleteUser,
  updatePassword,
} from "@/store/userSlice";

function AccountSettings() {
  const handleDeleteAccount = () => {
    dispatch(deleteUser());
    navigate("/");
  };

  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message, isAuthenticated, isVerified } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handlePassChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const onPasswordChange = (e) => {
    e.preventDefault();
    dispatch(updatePassword(formData));
    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

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

    return () => {
      dispatch(clearAllUserErrors());
    };
  }, [error, message, dispatch, toast]);

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your account preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Change Password</h3>
            <form className="space-y-4" onSubmit={onPasswordChange}>
              {["oldPassword", "newPassword", "confirmPassword"].map(
                (field) => (
                  <div key={field} className="space-y-2 relative">
                    <Label htmlFor={field}>
                      {field === "oldPassword"
                        ? "Current Password"
                        : field === "newPassword"
                        ? "New Password"
                        : "Confirm New Password"}
                    </Label>
                    <div className="relative">
                      <Input
                        id={field}
                        type={showPasswords[field] ? "text" : "password"}
                        value={formData[field]}
                        onChange={handlePassChange}
                      />
                      <motion.button
                        type="button"
                        className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                        onClick={() => togglePasswordVisibility(field)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {showPasswords[field] ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </motion.button>
                    </div>
                  </div>
                )
              )}
              <Button
                type="submit"
                onClick={onPasswordChange}
                disabled={loading}
              >
                Change Password
                {loading && (
                  <Loader2 className="h-5 w-5 animate-spin text-white ml-2" />
                )}
              </Button>
            </form>
            {isAuthenticated && !isVerified && <div>verify your account</div>}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Delete Account</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={loading} className="bg-red-600">
                  Delete Account
                  {loading && (
                    <Loader2 className="h-5 w-5 animate-spin text-white ml-2" />
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    disabled={loading}
                  >
                    Delete Account
                    {loading && (
                      <Loader2 className="h-5 w-5 animate-spin text-white ml-2" />
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default AccountSettings;
