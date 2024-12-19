import { useState, useEffect } from 'react';
import { ApplicationCard } from '../components/ApplicationCard';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const mockApplications = [
  { id: 1, jobTitle: 'Frontend Developer', company: 'TechCorp', appliedDate: '2023-06-15', status: 'Pending' },
  { id: 2, jobTitle: 'UX Designer', company: 'DesignHub', appliedDate: '2023-06-10', status: 'Approved' },
  { id: 3, jobTitle: 'Data Scientist', company: 'AITech', appliedDate: '2023-06-05', status: 'Rejected' },
  { id: 4, jobTitle: 'Product Manager', company: 'ProductCo', appliedDate: '2023-06-01', status: 'Pending' },
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState(mockApplications);
  const [isLoading, setIsLoading] = useState(false);

  const deleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  useEffect(() => {
    // Simulating a loading effect when the component mounts
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate 1-second loading delay
    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">My Applications</h1>
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
          {applications.map((application) => (
            <ApplicationCard 
              key={application.id} 
              application={application} 
              onDelete={() => deleteApplication(application.id)}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
