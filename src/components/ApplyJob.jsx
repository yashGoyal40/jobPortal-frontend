import React from "react";
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSelector } from "react-redux";

function ApplyJob({job}) {
  const {user} = useSelector((state) => state.user)
  const employer = user.role === "Employer" ? true : false
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
            {employer && <p>
              <span className="text-red-500">*</span>
              Only Job Seekers can Apply
              </p>}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full" disabled={employer}>Apply Now</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Apply for {job.title}</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" />
                </div>
                <div>
                  <Label htmlFor="resume">Resume</Label>
                  <Input id="resume" type="file" />
                </div>
                <div>
                  <Label htmlFor="cover-letter">Cover Letter</Label>
                  <Textarea id="cover-letter" />
                </div>
                <Button type="submit" className="w-full">
                  Submit Application
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
