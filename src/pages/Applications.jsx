import { useEffect } from "react";
import { ApplicationCard } from "../components/ApplicationCard";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import {
  FetchEmployeeApplications,
  deleteAnApplication,
  resetApplicationSlice,
} from "@/store/applicationSlice";
import NotAuthenticated from "@/components/NotAuthenticater";
import ApplicationsNotFound from "@/components/ApplicationsNotFound";

export default function ApplicationsPage() {
  const { error, loading, message, MyApplications } = useSelector(
    (state) => state.applications
  );
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { toast } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchEmployeeApplications());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
        className: "bg-red-600 text-white border border-red-700",
      });
    }

    if (message) {
      toast({
        variant: "success",
        title: "Success",
        description: message,
        className: "bg-green-600 text-white border border-green-700",
      });
      if (message === "Application Deleted.") {
        dispatch(FetchEmployeeApplications());
      }
    }

    return () => {
      dispatch(resetApplicationSlice());
    };
  }, [error, message, toast, dispatch]);

  const deleteApplication = (id) => {
    dispatch(deleteAnApplication(id));
  };

  if (!isAuthenticated) {
    return <NotAuthenticated />;
  }
  if (user && user.role === "Employer") {
    return (
      <NotAuthenticated reason={"Only Job Seeker can see his applications"} />
    );
  }

  if (MyApplications?.length === 0) {
    return <ApplicationsNotFound />;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        My Applications
      </h1>
      {loading ? (
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
          {MyApplications?.map((application) => (
            <ApplicationCard
              key={application._id}
              application={application}
              onDelete={() => deleteApplication(application._id)}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
