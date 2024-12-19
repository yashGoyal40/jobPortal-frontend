import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";

const mockApplications = [
  {
    id: 1,
    jobSeekerInfo: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: 1234567890,
      address: "123 Elm Street, Cityville",
      resume: { url: "https://example.com/resume-alice.pdf" },
      coverLetter: "I am very interested in this position and believe my skills align perfectly with your needs.",
      role: "Job seeker",
    },
    employerInfo: {
      id: "employerId123",
      role: "Employer",
    },
    jobInfo: {
      jobId: "jobId123",
      jobTitle: "Frontend Developer",
    },
    status: "Pending",
  },
  {
    id: 2,
    jobSeekerInfo: {
      name: "Bob Smith",
      email: "bob.smith@example.com",
      phone: 9876543210,
      address: "456 Oak Street, Townsville",
      resume: { url: "https://example.com/resume-bob.pdf" },
      coverLetter: "I am passionate about frontend development and would love to contribute to your team.",
      role: "Job seeker",
    },
    employerInfo: {
      id: "employerId123",
      role: "Employer",
    },
    jobInfo: {
      jobId: "jobId123",
      jobTitle: "Frontend Developer",
    },
    status: "Approved",
  },
];

export default function ViewApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [pageLoading, setPageLoading] = useState(true); // Page loading state
  const [loading, setLoading] = useState(null); // Individual action loading state

  useEffect(() => {
    // Simulate fetching data
    const fetchApplications = async () => {
      setPageLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      setApplications(mockApplications);
      setPageLoading(false);
    };
    fetchApplications();
  }, []);

  const deleteApplication = async (id) => {
    setLoading(id);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
    setApplications(applications.filter((app) => app.id !== id));
    setLoading(null);
  };

  const approveApplication = async (id) => {
    setLoading(id);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: "Approved" } : app
      )
    );
    setLoading(null);
  };

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-black">
        <Loader2 className="animate-spin h-12 w-12 text-black dark:text-white" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Applications for Frontend Developer
      </h1>
      {applications.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>No applications available for this job.</p>
        </div>
      ) : (
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {applications.map((application) => (
            <Card key={application.id} className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>{application.jobSeekerInfo.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href={`mailto:${application.jobSeekerInfo.email}`}
                    className="text-blue-600 underline"
                  >
                    {application.jobSeekerInfo.email}
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong> {application.jobSeekerInfo.phone}
                </p>
                <p>
                  <strong>Address:</strong> {application.jobSeekerInfo.address}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      application.status === "Approved"
                        ? "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-800"
                        : "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-800"
                    }`}
                  >
                    {application.status}
                  </span>
                </p>
                <p>
                  <strong>Cover Letter:</strong> {application.jobSeekerInfo.coverLetter}
                </p>
                {application.jobSeekerInfo.resume?.url && (
                  <p>
                    <strong>Resume:</strong>{" "}
                    <a
                      href={application.jobSeekerInfo.resume.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Resume
                    </a>
                  </p>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => approveApplication(application.id)}
                  disabled={application.status === "Approved" || loading === application.id}
                >
                  {loading === application.id ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : (
                    "Approve"
                  )}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteApplication(application.id)}
                  disabled={loading === application.id}
                >
                  {loading === application.id ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </motion.div>
      )}
    </div>
  );
}
