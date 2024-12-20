import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, ArrowRight } from 'lucide-react'

function NotAuthenticated({ reason }) {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-black">
      <div className="text-center p-8 bg-white dark:bg-black rounded-lg shadow-lg max-w-2xl w-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Lock className="h-24 w-24 mx-auto mb-6 text-black dark:text-white" />
        </motion.div>
        <motion.h2
          className="text-4xl font-bold text-black dark:text-white mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Not Authenticated
        </motion.h2>
        <motion.p
          className="text-xl text-gray-600 dark:text-gray-300 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {reason || "You need to be authenticated to access this page."}
        </motion.p>
        <motion.div
          className="flex justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link
            to="/auth"
            className="inline-flex items-center px-6 py-3 rounded-md bg-black text-white hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-400 transition-colors"
          >
            Authenticate
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotAuthenticated

