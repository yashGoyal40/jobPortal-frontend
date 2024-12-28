import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Search, Briefcase, Users } from 'lucide-react';

export default function Hero() {
  return (
    <motion.div
      className="container mx-auto px-4 py-12 md:py-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Find Your Dream Job
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-6 text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Connect with top employers and take the next step in your career journey.
          </motion.p>
          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button asChild size="lg" className="bg-gray-800 hover:bg-gray-900 text-white">
              <Link to={"/jobs"}>Explore Jobs</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-gray-800 text-gray-800 dark:border-gray-300 dark:text-gray-300">
              <Link to={"/auth"}>Get Started</Link>
            </Button>
          </motion.div>
        </div>
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <img
            src="main.webp"
            alt="Job seekers and employers"
            className="rounded-lg shadow-lg"
            width={600}
            height={400}
          />
        </motion.div>
      </div>
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Search, title: 'Search Jobs', description: 'Browse through our curated list of job openings.' },
            { icon: Briefcase, title: 'Apply with Ease', description: 'Submit your applications with just a few clicks.' },
            { icon: Users, title: 'Connect with Employers', description: 'Interact directly with potential employers.' },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <step.icon className="w-12 h-12 mb-4 text-gray-800 dark:text-gray-300" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{step.title}</h3>
              <p className="text-gray-700 dark:text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
