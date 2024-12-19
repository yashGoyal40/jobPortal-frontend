import React from 'react';

import { motion } from 'framer-motion';
import { Outlet, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useToast } from '@/hooks/use-toast';

const AuthPage = () => {

  const {isAuthenticated,isVerified} = useSelector(state => state.user)

  const navigate = useNavigate()
  const {toast} = useToast();

  if(isAuthenticated && isVerified){
    navigate("/jobs")
    toast({
      variant: "success",
      title: "Success",
      description: "you are already logged in",
      className: "bg-green-600 text-white border border-green-700",
    });
  }
  

  return (
      <motion.div
        className="container mx-auto px-4 py-8 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
      <Outlet />
      
      </motion.div>
  );
};

export default AuthPage;
