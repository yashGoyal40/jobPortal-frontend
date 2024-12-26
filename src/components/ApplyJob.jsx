import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { ApplyAJob } from "@/store/applicationSlice";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";

function ApplyJob({ job }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const employer = user.role === "Employer";
  const { error, message, loading } = useSelector(
    (state) => state.applications
  );
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
    address: "",
    coverLetter: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: files ? files[0] : value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(ApplyAJob(formData, job._id));

    if (!error && !loading) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        resume: null,
        address: "",
        coverLetter: "",
      });
    }
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
      if (message === "Application submitted") navigate("/applications");
    }
  }, [error, message, toast, dispatch]);

  const hasApplied = user.appliedJobs.includes(job._id);

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md sticky top-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Apply for this job
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Ready to take the next step in your career? Apply now and join our
            amazing team!
          </p>
          {employer && (
            <p>
              <span className="text-red-500">*</span>
              Only Job Seekers can Apply
            </p>
          )}
          {hasApplied && (
            <p>
              <span className="text-red-500">*</span>
              you have already applied for this job
            </p>
          )}

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full" disabled={employer||hasApplied}>
                Apply Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Apply for {job.title}</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={onSubmit}>
                <div>
                  <Label htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">
                    Phone <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="resume">Resume</Label>
                  <Input id="resume" type="file" onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="coverLetter">
                    Cover Letter <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading || hasApplied}
                  className="w-full"
                >
                  Submit Application
                  {loading && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </motion.div>
  );
}

export default ApplyJob;
