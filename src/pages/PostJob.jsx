import React, { useState } from "react";
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
import { Briefcase, MapPin, Users ,IndianRupee} from "lucide-react";

export default function PostJobPage() {
  const [jobData, setJobData] = useState({
    title: "",
    companyName: "",
    location: "",
    jobType: "",
    responsibilities: "",
    qualifications: "",
    salary: "",
    hiringMultipleCandidates: "No",
    personalWebsiteTitle: "",
    personalWebsiteUrl: "",
    jobNiche: "",
    newsLettersSent: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setJobData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSwitchChange = (name, checked) => {
    setJobData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit the form, making sure to validate all required fields
  };

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
                <Label htmlFor="responsibilities" className="text-lg">
                  Responsibilities <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="responsibilities"
                  name="responsibilities"
                  value={jobData.responsibilities}
                  onChange={handleInputChange}
                  required
                  className="h-32"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualifications" className="text-lg">
                  Qualifications <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="qualifications"
                  name="qualifications"
                  value={jobData.qualifications}
                  onChange={handleInputChange}
                  required
                  className="h-32"
                />
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
                    type="number"
                    required
                  />
                </div>
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
                    <SelectItem value="Fullstack Developer">
                      Fullstack Developer
                    </SelectItem>
                    <SelectItem value="Frontend Developer">
                      Frontend Developer
                    </SelectItem>
                    <SelectItem value="Backend Developer">
                      Backend Developer
                    </SelectItem>
                    <SelectItem value="System Administrator">
                      System Administrator
                    </SelectItem>
                    <SelectItem value="DevOps Engineer">
                      DevOps Engineer
                    </SelectItem>
                    <SelectItem value="Site Reliability Engineer (SRE)">
                      Site Reliability Engineer (SRE)
                    </SelectItem>
                    <SelectItem value="Cloud Engineer">
                      Cloud Engineer
                    </SelectItem>
                    <SelectItem value="Machine Learning Engineer">
                      Machine Learning Engineer
                    </SelectItem>
                    <SelectItem value="Game Developer">
                      Game Developer
                    </SelectItem>
                    <SelectItem value="Android Developer">
                      Android Developer
                    </SelectItem>
                    <SelectItem value="iOS Developer">iOS Developer</SelectItem>
                    <SelectItem value="Application Developer">
                      Application Developer
                    </SelectItem>
                    <SelectItem value="Data Scientist">
                      Data Scientist
                    </SelectItem>
                    <SelectItem value="Data Engineer">Data Engineer</SelectItem>
                    <SelectItem value="Big Data Engineer">
                      Big Data Engineer
                    </SelectItem>
                    <SelectItem value="AI Engineer">AI Engineer</SelectItem>
                    <SelectItem value="Blockchain Developer">
                      Blockchain Developer
                    </SelectItem>
                    <SelectItem value="Cybersecurity Specialist">
                      Cybersecurity Specialist
                    </SelectItem>
                    <SelectItem value="QA Engineer">QA Engineer</SelectItem>
                    <SelectItem value="Test Automation Engineer">
                      Test Automation Engineer
                    </SelectItem>
                    <SelectItem value="IT Support Specialist">
                      IT Support Specialist
                    </SelectItem>
                    <SelectItem value="Network Engineer">
                      Network Engineer
                    </SelectItem>
                    <SelectItem value="Database Administrator">
                      Database Administrator
                    </SelectItem>
                    <SelectItem value="UI/UX Designer">
                      UI/UX Designer
                    </SelectItem>
                    <SelectItem value="Product Manager">
                      Product Manager
                    </SelectItem>
                    <SelectItem value="Scrum Master">Scrum Master</SelectItem>
                    <SelectItem value="Solutions Architect">
                      Solutions Architect
                    </SelectItem>
                    <SelectItem value="Technical Writer">
                      Technical Writer
                    </SelectItem>
                    <SelectItem value="AR/VR Developer">
                      AR/VR Developer
                    </SelectItem>
                    <SelectItem value="Embedded Systems Engineer">
                      Embedded Systems Engineer
                    </SelectItem>
                    <SelectItem value="IT Consultant">IT Consultant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button type="submit" onClick={handleSubmit} className="w-1/4">
              Post Job
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
