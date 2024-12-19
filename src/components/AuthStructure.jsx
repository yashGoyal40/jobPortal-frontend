import React,{useState} from "react";
import  {LoginForm}  from '../components/LoginForm';
import  {SignupForm}  from '../components/SignupForm';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function AuthStructure() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        {activeTab === "login" ? "Welcome Back" : "Create an Account"}
      </h1>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm onForgotPassword={() => setActiveTab("forgot-password")} />
        </TabsContent>
        <TabsContent value="signup">
          <SignupForm />
        </TabsContent>
        <TabsContent value="forgot-password">
          <ForgotPasswordForm onBackToLogin={() => setActiveTab("login")} />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default AuthStructure;
