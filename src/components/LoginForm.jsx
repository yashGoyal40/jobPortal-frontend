import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Mail, KeyRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { clearAllUserErrors, login } from "@/store/userSlice";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    role: "Employer",
    email: "",
    password: "",
  });

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

    if (isAuthenticated) {
      navigate("/jobs");
    }

    return () => {
      dispatch(clearAllUserErrors());
    };
  }, [dispatch, error, isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(login(formData));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
        className: "bg-red-600 text-white border border-red-700",
      });
    }
  };
  const handleSelectChange = (value) => {
    setFormData({ ...formData, role: value });
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-gray-500 dark:text-gray-300 mt-4">Logging in...</p>
        </div>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
            Login
          </h1>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role" className="text-lg">
                Role <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={handleSelectChange} value={formData.role}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Employer">Employer</SelectItem>
                  <SelectItem value="Job seeker">Job Seeker</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg">
                Email <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-lg">
                Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button
            type="button"
            variant="link"
            className="w-full"
            onClick={() => navigate("/auth/forgot")}
          >
            Forgot Password?
          </Button>
        </motion.form>
      )}
    </>
  );
};
