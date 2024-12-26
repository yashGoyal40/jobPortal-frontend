import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PersonalInfo from '@/components/PersonalInfo';
import ProfessionalInfo from '@/components/ProfessionalInfo';
import AccountSettings from '@/components/AccountSettings';
import { useToast } from '@/hooks/use-toast';
import NotAuthenticated from '@/components/NotAuthenticater';

function ProfilePage() {
  const navigate = useNavigate();
  const { isAuthenticated, isVerified, user } = useSelector((state) => state.user);
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated && !isVerified) {
      navigate(`confirm/${user.email}`); 
    }
  }, [isAuthenticated, isVerified, navigate]);



  if (!isAuthenticated) {    
    return(
      <NotAuthenticated />
    )
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">My Profile</h1>
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="professional">Professional Info</TabsTrigger>
          <TabsTrigger value="settings">Account Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <PersonalInfo/>
        </TabsContent>
        <TabsContent value="professional">
          <ProfessionalInfo/>
        </TabsContent>
        <TabsContent value="settings">
          <AccountSettings/>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

export default ProfilePage;
