import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
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
import { Calendar, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ApplicationCard({ application, onDelete }) {
  const statusColor = 
    application.status === 'Approved' ? 
    'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-800' :
    application.status === 'Rejected' ? 
    'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-800' :
    'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-800';

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className="h-full flex flex-col">
        <CardContent className="pt-6 flex-grow">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
            {application.jobTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {application.company}
          </p>
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
            <Calendar size={16} className="mr-2" />
            <span>Applied on {application.appliedDate}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Briefcase size={16} className="mr-2" />
            <span className={`px-2 py-1 rounded-full text-sm ${statusColor}`}>
              {application.status}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to={`/application/${application.id}`}>View Details</Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your application for {application.jobTitle} at {application.company}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
