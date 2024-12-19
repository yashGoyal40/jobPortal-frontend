import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';

// Mock data for a single application
const mockApplication = {
  id: 1,
  jobTitle: 'Frontend Developer',
  company: 'TechCorp',
  appliedDate: '2023-06-15',
  status: 'Pending',
  description: 'We are seeking a talented Frontend Developer to join our team and help build innovative web applications.',
  requirements: [
    'Proficiency in React and TypeScript',
    '3+ years of experience in frontend development',
    'Strong understanding of web performance optimization',
    'Experience with state management libraries (e.g., Redux, MobX)',
  ],
  notes: 'Had a great initial call with the hiring manager. Looking forward to the technical interview.',
};

export default function ApplicationDetailsPage() {
  const [application, setApplication] = useState(mockApplication);



  return (
      <motion.div 
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Application Details</h1>
        <Card>
          <CardHeader>
            <CardTitle>{application.jobTitle} at {application.company}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Application Status</h2>
              <p className="text-lg">{application.status}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Applied Date</h2>
              <p>{application.appliedDate}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Job Description</h2>
              <p>{application.description}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Requirements</h2>
              <ul className="list-disc pl-5">
                {application.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Your Notes</h2>
              <p>{application.notes}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
  );
}
