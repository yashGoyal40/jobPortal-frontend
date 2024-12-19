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
  AlertDialogTrigger ,
  AlertDialogFooter
} from '../components/ui/alert-dialog';

const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    postedDate: "2023-06-01",
    applicationsCount: 5,
  },
  {
    id: 2,
    title: "UX Designer",
    postedDate: "2023-06-05",
    applicationsCount: 3,
  },
  {
    id: 3,
    title: "Data Scientist",
    postedDate: "2023-06-10",
    applicationsCount: 7,
  },
];

export default function MyJobsPage() {
  const [jobs, setJobs] = useState(mockJobs);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        My Jobs
      </h1>
      {isLoading ? (
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
          {jobs.map((job) => (
            <Card key={job.id} className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Posted on: {job.postedDate}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Applications: {job.applicationsCount}
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between items-center w-full">
                  <Button variant="destructive" className="mr-4">
                    <Link to={`/jobapplication/${job.id}`}>
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
                        <AlertDialogAction onClick={()=>{}}>
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
