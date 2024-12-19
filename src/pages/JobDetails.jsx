import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

// Mock job data simulating your schema
const job = {
  _id: '63f8578f97b2f6a7e6f1e1d4',
  title: 'Senior Frontend Developer',
  jobType: 'Full-time',
  location: 'New York, NY',
  companyName: 'TechCorp',
  introduction: 'We are seeking a talented Senior Frontend Developer to join our team...',
  responsibilities: [
    'Develop new user-facing features using React, Next.js, and TypeScript',
    'Collaborate with backend developers and UI/UX designers',
    'Optimize application for maximum speed and scalability',
  ],
  qualifications: [
    'Proficiency in React, Next.js, and TypeScript',
    '5+ years of experience in frontend development',
    'Strong understanding of web performance optimization',
    'Experience with state management libraries (e.g., Redux, MobX)',
  ],
  offers: [
    'Competitive salary',
    'Remote work options',
    'Health and dental insurance',
    '401(k) matching',
    'Professional development budget',
  ],
  salary: '$120,000 - $150,000 per year',
  hiringMultipleCandidates: 'Yes',
  personalWebsite: {
    title: 'TechCorp Careers',
    url: 'https://techcorp.com/careers',
  },
  jobNiche: 'Software Engineering',
  postedBy: 'user123',  // This would reference a user ID
};

export default function JobDetailsPage() {
  const [isApplying, setIsApplying] = useState(false);

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{job.title}</h1>
      <div className="mb-6">
        <p className="text-xl text-gray-600 dark:text-gray-300">{job.companyName}</p>
        <p className="text-gray-500 dark:text-gray-400">{job.location} • {job.jobType}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Job Description</h2>
            <p className="text-gray-600 dark:text-gray-300">{job.introduction}</p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Responsibilities</h2>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
              {job.responsibilities.map((resp, index) => (
                <li key={index}>{resp}</li>
              ))}
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Qualifications</h2>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
              {job.qualifications.map((qual, index) => (
                <li key={index}>{qual}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Perks & Benefits</h2>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
              {job.offers.map((offer, index) => (
                <li key={index}>{offer}</li>
              ))}
            </ul>
          </section>
          <section className="mt-4 text-gray-600 dark:text-gray-300">
            <p><strong>Salary:</strong> {job.salary}</p>
            <p><strong>Hiring Multiple Candidates:</strong> {job.hiringMultipleCandidates}</p>
            <p><strong>Job Niche:</strong> {job.jobNiche}</p>
            <p><a href={job.personalWebsite.url} target="_blank" className="text-blue-500">{job.personalWebsite.title}</a></p>
          </section>
        </div>
        <div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md sticky top-4">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Apply for this job</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Ready to take the next step in your career? Apply now and join our amazing team!
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Apply Now</Button>
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
                  <Button type="submit" className="w-full">Submit Application</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
