import { useEffect } from "react";
import { motion } from "framer-motion";
import ApplyJob from "@/components/ApplyJob";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import {
  singleJob,
  clearAllJObErrors,
  clearAllJobMessage,
} from "@/store/jobSlice";
import { Link } from "react-router";
import { Loader2, Search, ArrowLeft } from 'lucide-react';
import JobNotFound from "@/components/JobNotFound";
import NotAuthenticated from "@/components/NotAuthenticater";



export default function JobDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    singleJob: job,
    loading,
    error,
    message,
  } = useSelector((state) => state.jobs);
  const { toast } = useToast();

  const {user,isAuthenticated} = useSelector((state) => state.user)


  useEffect(() => {
    dispatch(singleJob(id));
  }, [id, dispatch]);

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


  if(!isAuthenticated){
    return(
     <NotAuthenticated /> 
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  if (!job || Object.keys(job).length === 0) {
    return (
        <JobNotFound />
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        {job.title}
      </h1>
      <div className="mb-6">
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {job.companyName}
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          {job.location} • {job.jobType}
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Job Description
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {job.introduction}
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Responsibilities
            </h2>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
              {job.responsibilities.map((resp, index) => (
                <li key={index}>{resp}</li>
              ))}
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Qualifications
            </h2>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
              {job.qualifications.map((qual, index) => (
                <li key={index}>{qual}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Perks & Benefits
            </h2>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
              {job.offers.map((offer, index) => (
                <li key={index}>{offer}</li>
              ))}
            </ul>
          </section>
          <section className="mt-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Salary:</strong> {job.salary}
            </p>
            <p>
              <strong>Hiring Multiple Candidates:</strong>{" "}
              {job.hiringMultipleCandidates}
            </p>
            <p>
              <strong>Job Niche:</strong> {job.jobNiche}
            </p>
            <p>
              <a
                href={job.personalWebsite?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {job.personalWebsite?.title}
              </a>
            </p>
          </section>
        </div>
        
        <ApplyJob job={job} />
          
      </div>
    </motion.div>
  );
}
