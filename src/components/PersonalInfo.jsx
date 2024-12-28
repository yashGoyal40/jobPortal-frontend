import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { clearAllUserErrors, updateUser } from "@/store/userSlice";
import { useToast } from "@/hooks/use-toast";

function PersonalInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const { user, loading, error, message } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
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

    return () => {
      dispatch(clearAllUserErrors());
    };
  }, [error, message, dispatch, toast]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !(
        formData.phone === user.phone &&
        formData.address === user.address &&
        formData.email === user.email &&
        formData.name === user.name
      )
    ) {
      dispatch(updateUser(formData));
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "The data is already same",
        className: "bg-red-600 text-white border border-red-700",
      });
    }
    setIsEditing(false);
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Manage your personal details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name {isEditing && <span className="text-red-500">*</span>}
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                Email {isEditing && <span className="text-red-500">*</span>}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone {isEditing && <span className="text-red-500">*</span>}
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">
                City {isEditing && <span className="text-red-500">*</span>}
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {isEditing ? (
            <>
              <Button type="submit" onClick={handleSubmit} disabled={loading}>
                Save Changes
                {loading && (
                  <Loader2 className="h-5 w-5 animate-spin text-white ml-2" />
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={loading}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} disabled={loading}>
              Edit Profile
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default PersonalInfo;
