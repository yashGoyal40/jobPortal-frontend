import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import myStore from "./store";
import Hero from "./pages/Hero";
import ProfilePage from "./pages/Profile"; 
import AuthPage from "./pages/Auth";
import JobsPage from "./pages/Jobs";
import JobDetailsPage from "./pages/JobDetails";
import ApplicationsPage from "./pages/Applications";
import ApplicationDetailsPage from "./pages/ApplicationDetails";
import PostJobPage from "./pages/PostJob";
import MyJobsPage from "./pages/MyJobsPage";
import ViewApplicationsPage from "./pages/EmployerApplicationPage";
import NotFoundPage from "./pages/NotFounPage";
import AuthStructure from "./components/AuthStructure";
import Verify from "./components/Verify";
import { Toaster } from "./components/ui/toaster";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";
import VerifyResetPass from "./components/verifyResetPass";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Hero /> },
      { path: "profile", element: <ProfilePage /> },
      {
        path: "auth",
        element: <AuthPage />,
        children: [
          {path:"",element:<AuthStructure />},
          { path: "confirm/:email", element: <Verify /> },
          {path: "forgot",element:<ForgotPasswordForm />},
          {path: "verify/reset",element:<VerifyResetPass />}
          
        ],
      },
      { path: "jobs", element: <JobsPage /> },
      { path: "job/:id", element: <JobDetailsPage /> },
      { path: "applications", element: <ApplicationsPage /> },
      { path: "application/:id", element: <ApplicationDetailsPage /> },
      { path: "post-job", element: <PostJobPage /> },
      { path: "myjobs", element: <MyJobsPage /> },
      { path: "jobapplication/:id", element: <ViewApplicationsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={myStore}>
      <RouterProvider router={routes} />
      <Toaster />
    </Provider>
  </StrictMode>
);
