import React, { useState, useEffect } from "react";
import { JobCard } from "../components/JobCard";
import { JobFilters } from "../components/JobFilters";
import { Input } from "@/components/ui/input";
import { Loader2, Search, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, clearAllJObErrors,clearAllJobMessage } from "../store/jobSlice";
import { useToast } from "@/hooks/use-toast";

const JobsPage = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error,message } = useSelector((state) => state.jobs);

  const [searchQuery, setSearchQuery] = useState("");
  const [submittedSearchQuery, setSubmittedSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    niche: "",
    workType: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    dispatch(
      fetchJobs(
        filters.location,
        filters.niche,
        filters.workType,
        submittedSearchQuery
      )
    );
  }, [filters, submittedSearchQuery, dispatch]);

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

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleSearchSubmit = () => {
    setSubmittedSearchQuery(searchQuery.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Briefcase className="inline-block mb-4 h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            Available Jobs
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Find your dream job from our curated list of opportunities
          </p>
        </motion.div>
      </div>

      <div className="flex justify-center mb-8">
        <div className="relative w-full md:w-2/3 lg:w-1/2">
          <Input
            placeholder="Search for jobs..."
            className="w-full p-4 pl-12 pr-12 rounded-full shadow-lg dark:bg-neutral-800 dark:text-white text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 h-8 w-8 flex items-center justify-center"
            onClick={handleSearchSubmit}
            disabled={loading}
          >
            <Search className={`h-6 w-6 ${loading ? "animate-pulse" : ""}`} />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <JobFilters filters={filters} onFilterChange={handleFilterChange} />

        <div className="flex-1" aria-live="polite">
          {error && !loading && (
            <p className="text-center text-red-500 dark:text-red-400 py-4">
              {error}
            </p>
          )}

          {loading ? (
            <div className="flex flex-col justify-center items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-gray-500 dark:text-gray-300 mt-4">
                Loading jobs...
              </p>
            </div>
          ) : (
            <motion.div
              key={jobs?.length}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {jobs?.length > 0 ? (
                jobs.map((job) => <JobCard key={job._id} job={job} />)
              ) : (
                <p className="text-xl text-gray-500 dark:text-gray-300 col-span-full text-center py-12">
                  No jobs found matching your search.
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
