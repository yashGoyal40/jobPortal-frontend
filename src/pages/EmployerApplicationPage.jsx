"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Phone, MapPin, FileText } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router";
import {
  acceptApplication,
  deleteAnApplication,
  fetchEmployerApplication,
  resetApplicationSlice,
} from "@/store/applicationSlice";
import ApplicationsNotFound from "@/components/ApplicationsNotFound";
import NotAuthenticated from "@/components/NotAuthenticater";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ViewApplicationsPage() {
  const { MyApplications, error, message, loading } = useSelector(
    (state) => state.applications
  );
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployerApplication(id));
    }
  }, [dispatch, id]);

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
      if (
        message === "Application Deleted." ||
        message === "application is approved"
      ) {
        dispatch(fetchEmployerApplication(id));
      }
    }

    return () => {
      dispatch(resetApplicationSlice());
    };
  }, [error, message, toast, dispatch, id]);

  const deleteApplication = (applicationId) => {
    dispatch(deleteAnApplication(applicationId));
  };

  const approveApplication = (applicationId) => {
    dispatch(acceptApplication(applicationId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <Loader2 className="animate-spin h-12 w-12 text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <NotAuthenticated />;
  }

  if (user?.role === "Job seeker") {
    return (
      <NotAuthenticated reason={"Only Employers can see job applications"} />
    );
  }

  if (!MyApplications || MyApplications.length === 0) {
    return <ApplicationsNotFound employer={true} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">
        Applications for {MyApplications[0]?.jobInfo?.jobTitle || "the Job"}
      </h1>
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {MyApplications?.map((application) => (
          <Card key={application._id} className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl">
                {application.jobSeekerInfo.name}
              </CardTitle>
              <span>
                <Badge
                  variant={
                    application.status === "approved" ? "success" : "warning"
                  }
                  className={`mt-2 inline-block ${
                    application.status === "approved"
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-black"
                  }`}
                >
                  {application.status === "approved" ? "Approved" : "Pending"}
                </Badge>
              </span>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`mailto:${application.jobSeekerInfo.email}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {application.jobSeekerInfo.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{application.jobSeekerInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{application.jobSeekerInfo.address}</span>
              </div>
              <div>
                <h3 className="font-semibold flex items-center mb-2">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  Cover Letter
                </h3>
                <ScrollArea className="h-32 rounded-md border p-4">
                  <p className="text-sm text-muted-foreground">
                    {application.jobSeekerInfo.coverLetter}
                  </p>
                </ScrollArea>
              </div>
              {application.jobSeekerInfo.resume?.url && (
                <div>
                  <a
                    href={application.jobSeekerInfo.resume.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Resume
                  </a>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between space-x-4">
              <Button
                variant="destructive"
                onClick={() => {approveApplication(application._id);
                  {console.log(application._id);}

                }}
                
                disabled={application.status === "approved" || loading}
                className="w-full"
              >
                {application.status === "approved" ? "Approved" : "Approve"}
                {loading && <Loader2 className="ml-2 animate-spin h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                onClick={() => deleteApplication(application._id)}
                disabled={loading}
                className="w-full"
              >
                Reject
                {loading && <Loader2 className="ml-2 animate-spin h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
