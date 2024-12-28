import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from "@/components/ui/badge";
import { MapPin, Building,IndianRupee,FolderCode } from 'lucide-react';

export function JobCard({ job }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300 }}

    >
      <Card className="h-full flex flex-col overflow-hidden">
        <CardContent className="pt-6 flex-grow relative">
          <Badge className="absolute top-4 right-4" variant="secondary">{job?.jobType}</Badge>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
            {job?.title}
          </h2>
          <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
            <Building size={16} className="mr-2" />
            <span>{job?.companyName}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
            <MapPin size={16} className="mr-2" />
            <span>{job?.location}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
            <FolderCode size={16} className="mr-2" />
            <span>{job?.jobNiche}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
            <IndianRupee size={16} className="mr-2" />
            <span>{job?.salary}</span>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 dark:bg-black">
          <Button asChild className="w-full">
            <Link to={`/job/${job?._id}`}>View Details</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
