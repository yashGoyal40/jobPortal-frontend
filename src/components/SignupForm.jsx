import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, KeyRound, Mail, Pin, Phone } from "lucide-react";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { clearAllUserErrors, register } from "@/store/userSlice";
import { Loader2 } from "lucide-react";
export const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    role: "",
    firstNiche: "",
    secondNiche: "",
    thirdNiche: "",
    coverLetter: "",
    resume:null
  });

  const niches = [
    "Fullstack Developer",
    "Frontend Developer",
    "Backend Developer",
    "System Administrator",
    "DevOps Engineer",
    "Site Reliability Engineer (SRE)",
    "Cloud Engineer",
    "Machine Learning Engineer",
    "Game Developer",
    "Android Developer",
    "iOS Developer",
    "Application Developer",
    "Data Scientist",
    "Data Engineer",
    "Big Data Engineer",
    "AI Engineer",
    "Blockchain Developer",
    "Cybersecurity Specialist",
    "QA Engineer",
    "Test Automation Engineer",
    "IT Support Specialist",
    "Network Engineer",
    "Database Administrator",
    "UI/UX Designer",
    "Product Manager",
    "Scrum Master",
    "Solutions Architect",
    "Technical Writer",
    "AR/VR Developer",
    "Embedded Systems Engineer",
    "IT Consultant",
  ];

  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({...prev,resume:e.target.files[0]}))
  };

  const { loading, isAuthenticated, error, message, isVerified } = useSelector(
    (state) => {
      return state.user;
    }
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

    if (isAuthenticated && isVerified) {
      navigate("/jobs");
    }
    if (isAuthenticated && (!isVerified)) {
      navigate(`/auth/confirm/${formData.email}?action=verify`);
    }

    return () => {
      dispatch(clearAllUserErrors());
    };
  }, [dispatch, error, loading, isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(register(formData));
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
    <>
      {loading ? (
        <div className="flex flex-col justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-gray-500 dark:text-gray-300 mt-4">
            Trying to Register ..
          </p>
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
            Sign Up
          </h1>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="space-y-2">
                <Label htmlFor="role" className="text-lg">
                  Select Role <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    handleInputChange({ target: { name: "role", value } })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Employer">Employer</SelectItem>
                    <SelectItem value="Job seeker">Job Seeker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <br />

              <Label htmlFor="name" className="text-lg">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
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
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-lg">
                City <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Pin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter your Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-lg">
                Phone No <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="phone"
                  name="phone"
                  type="number"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {formData.role === "Job seeker" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="firstNiche" className="text-lg">
                    First Niche <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.firstNiche}
                    onValueChange={(value) =>
                      handleInputChange({
                        target: { name: "firstNiche", value },
                      })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select First Niche" />
                    </SelectTrigger>
                    <SelectContent>
                      {niches.map((niche) => (
                        <SelectItem key={niche} value={niche}>
                          {niche}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondNiche" className="text-lg">
                    Second Niche <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.secondNiche}
                    onValueChange={(value) =>
                      handleInputChange({
                        target: { name: "secondNiche", value },
                      })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Second Niche" />
                    </SelectTrigger>
                    <SelectContent>
                      {niches.map((niche) => (
                        <SelectItem key={niche} value={niche}>
                          {niche}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thirdNiche" className="text-lg">
                    Third Niche <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.thirdNiche}
                    onValueChange={(value) =>
                      handleInputChange({
                        target: { name: "thirdNiche", value },
                      })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Third Niche" />
                    </SelectTrigger>
                    <SelectContent>
                      {niches.map((niche) => (
                        <SelectItem key={niche} value={niche}>
                          {niche}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume" className="text-lg">
                    Upload Resume
                  </Label>
                  <Input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf, .doc, .docx"
                    onChange={handleFileChange}
                  />
                </div>
              </>
            )}
          </div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </motion.form>
      )}
    </>
  );
};
