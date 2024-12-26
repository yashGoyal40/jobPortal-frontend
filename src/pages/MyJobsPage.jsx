import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
} from "../components/ui/alert-dialog";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import JobNotFound from "@/components/JobNotFound";
import {
  clearAllJObErrors,
  clearAllJobMessage,
  deleteJob,
  fetchMyJobs,
} from "@/store/jobSlice";
import NotAuthenticated from "@/components/NotAuthenticater";

export default function MyJobsPage() {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { user, isAuthenticated, isVerified } = useSelector(
    (state) => state.user
  );

  const { loading, myJobs, error, message } = useSelector(
    (state) => state.jobs
  );

  const handleDelete = (id) => {
    dispatch(deleteJob(id));
  };

  useEffect(() => {
    dispatch(fetchMyJobs());
  }, [dispatch, loading]);

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

  if (!isAuthenticated) {
    return <NotAuthenticated />;
  }
  if (user && user.role === "Job seeker") {
    return <NotAuthenticated reason={"Only Employer Can Post Jobs"} />;
  }

  if (!loading && myJobs.length === 0) {
    return <JobNotFound emoployer={true} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        My Jobs
      </h1>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : (
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {myJobs.map((job) => (
            <Card key={job._id} className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Posted on:{" "}
                  {new Date(job.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Job Niche: {job.jobNiche}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Job Type: {job.jobType}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Applications: {job.applicationCount}
                </p>
                <p className="text-blue-500 underlin">
                  <Link to={`/job/${job._id}`}>View job</Link>
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between items-center w-full">
                  <Button variant="destructive" className="mr-4">
                    <Link to={`/jobapplication/${job._id}`}>
                      View Applications
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your job and all its applications
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(job._id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardFooter>
            </Card>
          ))}
        </motion.div>
      )}
    </div>
  );
}
