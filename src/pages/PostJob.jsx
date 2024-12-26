import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Users, IndianRupee } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import {
  PostJob,
  clearAllJObErrors,
  clearAllJobMessage,
} from "@/store/jobSlice";
import NotAuthenticated from "@/components/NotAuthenticater";

export default function PostJobPage() {
  const { user, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [jobData, setJobData] = useState({
    title: "",
    companyName: "",
    location: "",
    jobType: "Full-time",
    responsibilities: [],
    qualifications: [],
    salary: "",
    hiringMultipleCandidates: "No",
    personalWebsiteTitle: "",
    personalWebsiteUrl: "",
    jobNiche: "",
    newsLettersSent: false,
    offers: [],
    introduction: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleArrayChange = (name, index, value) => {
    setJobData((prevData) => {
      const updatedArray = [...prevData[name]];
      updatedArray[index] = value;
      return { ...prevData, [name]: updatedArray };
    });
  };

  const handleAddItem = (name) => {
    setJobData((prevData) => ({
      ...prevData,
      [name]: [...prevData[name], ""],
    }));
  };

  const handleRemoveItem = (name, index) => {
    setJobData((prevData) => {
      const updatedArray = prevData[name].filter((_, i) => i !== index);
      return { ...prevData, [name]: updatedArray };
    });
  };

  const handleSelectChange = (name, value) => {
    setJobData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { loading, error, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
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
      dispatch(clearAllJObErrors());
      dispatch(clearAllJobMessage());
    };
  }, [error, message, dispatch, toast]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(PostJob(jobData));
    if (!loading && !error) {
      setJobData({
        title: "",
        companyName: "",
        location: "",
        jobType: "Full-time",
        responsibilities: [],
        qualifications: [],
        salary: "",
        hiringMultipleCandidates: "No",
        personalWebsiteTitle: "",
        personalWebsiteUrl: "",
        jobNiche: "",
        newsLettersSent: false,
        offers: [],
        introduction: "",
      });
    }
  };

  if (!isAuthenticated) {
    return <NotAuthenticated />;
  }
  if (user && user.role === "Job seeker") {
    return <NotAuthenticated reason={"Only Employer can Post Jobs"} />;
  }

  return (
    <motion.div
      className="flex container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full md:w-3/5 md:pr-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          Post a New Job
        </h1>
        <Card className="bg-white dark:bg-black shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Job Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-lg">
                  Job Title <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="title"
                    name="title"
                    value={jobData.title}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-lg">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="companyName"
                    name="companyName"
                    value={jobData.companyName}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-lg">
                  Location <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="location"
                    name="location"
                    value={jobData.location}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobType" className="text-lg">
                  Job Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("jobType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="introduction" className="text-lg">
                  Job Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="introduction"
                  name="introduction"
                  value={jobData.introduction}
                  onChange={handleInputChange}
                  required
                  className="h-32"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsibilities" className="text-lg">
                  Responsibilities <span className="text-red-500">*</span>
                </Label>
                {jobData.responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={responsibility}
                      onChange={(e) =>
                        handleArrayChange(
                          "responsibilities",
                          index,
                          e.target.value
                        )
                      }
                      placeholder={`Responsibility ${index + 1}`}
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        handleRemoveItem("responsibilities", index)
                      }
                      className="text-red-500"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <br />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleAddItem("responsibilities")}
                  className="text-blue-500"
                >
                  Add Responsibility
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualifications" className="text-lg">
                  Qualifications <span className="text-red-500">*</span>
                </Label>
                {jobData.qualifications.map((qualification, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={qualification}
                      onChange={(e) =>
                        handleArrayChange(
                          "qualifications",
                          index,
                          e.target.value
                        )
                      }
                      placeholder={`Qualification ${index + 1}`}
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleRemoveItem("qualifications", index)}
                      className="text-red-500"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <br />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleAddItem("qualifications")}
                  className="text-blue-500"
                >
                  Add Qualification
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary" className="text-lg">
                  Salary <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="salary"
                    name="salary"
                    value={jobData.salary}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="offers" className="text-lg">
                  Offers <span className="text-red-500">*</span>
                </Label>
                {jobData.offers.map((offer, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={offer}
                      onChange={(e) =>
                        handleArrayChange("offers", index, e.target.value)
                      }
                      placeholder={`Offer ${index + 1}`}
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleRemoveItem("offers", index)}
                      className="text-red-500"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <br />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleAddItem("offers")}
                  className="text-blue-500"
                >
                  Add Offer
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hiringMultipleCandidates" className="text-lg">
                  Hiring Multiple Candidates?
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("hiringMultipleCandidates", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="personalWebsite" className="text-lg">
                  Personal Website
                </Label>
                <div className="space-y-2">
                  <Input
                    id="personalWebsiteTitle"
                    name="personalWebsiteTitle"
                    value={jobData.personalWebsiteTitle}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="Website Title"
                  />
                  <Input
                    id="personalWebsiteUrl"
                    name="personalWebsiteUrl"
                    value={jobData.personalWebsiteUrl}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="Website URL"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobNiche" className="text-lg">
                  Job Niche <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("jobNiche", value)
                  }
                  value={jobData.jobNiche}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Job Niche" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AI Engineer">AI Engineer</SelectItem>
                    <SelectItem value="AR/VR Developer">
                      AR/VR Developer
                    </SelectItem>
                    <SelectItem value="Android Developer">
                      Android Developer
                    </SelectItem>
                    <SelectItem value="Application Developer">
                      Application Developer
                    </SelectItem>
                    <SelectItem value="Backend Developer">
                      Backend Developer
                    </SelectItem>
                    <SelectItem value="Big Data Engineer">
                      Big Data Engineer
                    </SelectItem>
                    <SelectItem value="Blockchain Developer">
                      Blockchain Developer
                    </SelectItem>
                    <SelectItem value="Cloud Engineer">
                      Cloud Engineer
                    </SelectItem>
                    <SelectItem value="Cybersecurity Specialist">
                      Cybersecurity Specialist
                    </SelectItem>
                    <SelectItem value="Data Engineer">Data Engineer</SelectItem>
                    <SelectItem value="Data Scientist">
                      Data Scientist
                    </SelectItem>
                    <SelectItem value="Database Administrator">
                      Database Administrator
                    </SelectItem>
                    <SelectItem value="DevOps Engineer">
                      DevOps Engineer
                    </SelectItem>
                    <SelectItem value="Embedded Systems Engineer">
                      Embedded Systems Engineer
                    </SelectItem>
                    <SelectItem value="Frontend Developer">
                      Frontend Developer
                    </SelectItem>
                    <SelectItem value="Fullstack Developer">
                      Fullstack Developer
                    </SelectItem>
                    <SelectItem value="Game Developer">
                      Game Developer
                    </SelectItem>
                    <SelectItem value="IT Consultant">IT Consultant</SelectItem>
                    <SelectItem value="IT Support Specialist">
                      IT Support Specialist
                    </SelectItem>
                    <SelectItem value="iOS Developer">iOS Developer</SelectItem>
                    <SelectItem value="Machine Learning Engineer">
                      Machine Learning Engineer
                    </SelectItem>
                    <SelectItem value="Network Engineer">
                      Network Engineer
                    </SelectItem>
                    <SelectItem value="Product Manager">
                      Product Manager
                    </SelectItem>
                    <SelectItem value="QA Engineer">QA Engineer</SelectItem>
                    <SelectItem value="Scrum Master">Scrum Master</SelectItem>
                    <SelectItem value="Site Reliability Engineer (SRE)">
                      Site Reliability Engineer (SRE)
                    </SelectItem>
                    <SelectItem value="Solutions Architect">
                      Solutions Architect
                    </SelectItem>
                    <SelectItem value="System Administrator">
                      System Administrator
                    </SelectItem>
                    <SelectItem value="Technical Writer">
                      Technical Writer
                    </SelectItem>
                    <SelectItem value="Test Automation Engineer">
                      Test Automation Engineer
                    </SelectItem>
                    <SelectItem value="UI/UX Designer">
                      UI/UX Designer
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="w-1/4"
            >
              Post Job
              {loading && (
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="hidden md:block w-2/5">
        <img
          src="job1.jpeg"
          alt="Job Posting Illustration"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
    </motion.div>
  );
}
