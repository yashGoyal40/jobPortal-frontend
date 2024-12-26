import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, clearAllUserErrors } from "@/store/userSlice";
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';

const nichesList = [
  "AI Engineer",
  "AR/VR Developer",
  "Android Developer",
  "Application Developer",
  "Backend Developer",
  "Big Data Engineer",
  "Blockchain Developer",
  "Cloud Engineer",
  "Cybersecurity Specialist",
  "Data Engineer",
  "Data Scientist",
  "Database Administrator",
  "DevOps Engineer",
  "Embedded Systems Engineer",
  "Frontend Developer",
  "Fullstack Developer",
  "Game Developer",
  "IT Consultant",
  "IT Support Specialist",
  "iOS Developer",
  "Machine Learning Engineer",
  "Network Engineer",
  "Product Manager",
  "QA Engineer",
  "Scrum Master",
  "Site Reliability Engineer (SRE)",
  "Solutions Architect",
  "System Administrator",
  "Technical Writer",
  "Test Automation Engineer",
  "UI/UX Designer",
];

function ProfessionalInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const { user, loading, error, message } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    resume: user?.resume || "",
    firstNiche: user?.niches?.firstNiche || "",
    secondNiche: user?.niches?.secondNiche || "",
    thirdNiche: user?.niches?.thirdNiche || "",
  });

  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleNicheChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      resume: file || "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.firstNiche !== user.niches.firstNiche ||
      formData.secondNiche !== user.niches.secondNiche ||
      formData.thirdNiche !== user.niches.thirdNiche ||
      formData.resume !== user.resume
    ) {
      dispatch(updateUser(formData));
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "The data is already the same",
        className: "bg-red-600 text-white border border-red-700",
      });
    }
    setIsEditing(false);
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

  if (user?.role === "Employer") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Professional Information</CardTitle>
          <CardDescription>Your role is displayed below:</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">Role: {user?.role}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
    <Card>
      <CardHeader>
        <CardTitle>Professional Information</CardTitle>
        <CardDescription>Manage your professional details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-lg font-semibold">Resume</Label>
            <div className="mt-2">
              {isEditing ? (
                <Input
                  name="resume"
                  type="file"
                  accept=".pdf, .doc, .docx"
                  onChange={handleFileChange}
                />
              ) : user.resume?.url ? (
                <a
                  href={user.resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  View Resume
                </a>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  Upload Resume
                </Button>
              )}
            </div>
          </div>

          <div>
            <Label className="text-lg font-semibold">
              Niches {isEditing && <span className="text-red-500">*</span>}
            </Label>
            <div
              className={`${
                isEditing
                  ? "grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2"
                  : "flex flex-wrap gap-2 mt-2"
              }`}
            >
              {[
                { key: "firstNiche", placeholder: "Select your first niche" },
                { key: "secondNiche", placeholder: "Select your second niche" },
                { key: "thirdNiche", placeholder: "Select your third niche" },
              ].map(({ key, placeholder }) => (
                <div key={key} className="w-full sm:w-auto">
                  {isEditing ? (
                    <Select
                      onValueChange={(value) => handleNicheChange(key, value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {nichesList.map((niche) => (
                          <SelectItem key={niche} value={niche}>
                            {niche}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : formData[key] ? (
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                      {formData[key]}
                    </span>
                  ) : (
                    <span className="text-sm italic text-gray-500">
                      Not selected
                    </span>
                  )}
                </div>
              ))}
            </div>
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
            {loading && (
              <Loader2 className="h-5 w-5 animate-spin text-white ml-2" />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
    </motion.div>
  );
}

export default ProfessionalInfo;
