import React, { useState } from "react";
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

const nichesList = [
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

function ProfessionalInfo({ user }) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    resume: user?.resume || "",
    firstNiche: user?.niches?.firstNiche || "",
    secondNiche: user?.niches?.secondNiche || "",
    thirdNiche: user?.niches?.thirdNiche || "",
  });

  const handleNicheChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    setIsEditing(false);
  };

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
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      resume: e.target.files?.[0]?.name || "",
                    }))
                  }
                />
              ) : formData.resume ? (
                <a
                  href="#"
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
            <Button type="submit" onClick={handleSubmit}>
              Save Changes
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ProfessionalInfo;
