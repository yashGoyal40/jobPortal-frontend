import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { fetchEmployeeSingleApplication, resetApplicationSlice } from "@/store/applicationSlice"
import NotAuthenticated from "@/components/NotAuthenticater"
import { useParams } from "react-router"

export default function ApplicationDetailsPage() {
  const { singleApplication, error, message, loading } = useSelector(
    (state) => state.applications
  )
  const { user, isAuthenticated } = useSelector((state) => state.user)
  const { toast } = useToast()
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchEmployeeSingleApplication(id))
    return () => {
      dispatch(resetApplicationSlice())
    }
  }, [dispatch, id])

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
        className: "bg-red-600 text-white border border-red-700",
      })
    }

    if (message) {
      toast({
        variant: "success",
        title: "Success",
        description: message,
        className: "bg-green-600 text-white border border-green-700",
      })
    }
  }, [error, message, toast])

  if (!isAuthenticated) {
    return <NotAuthenticated />
  }

  if (user && user.role === "Employer") {
    return (
      <NotAuthenticated reason="Only Job Seekers can see their applications" />
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  const formattedDate = new Date(singleApplication.createdAt).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">
        Application Details
      </h1>
      <Card className="shadow-lg">
        <CardHeader className="bg-gray-100 dark:bg-gray-800">
          <CardTitle className="text-2xl text-gray-800 dark:text-white">
            {singleApplication.jobInfo?.jobTitle} at {singleApplication.jobInfo?.companyName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <DetailSection title="Application Status" content={singleApplication?.status} />
          <DetailSection title="Applied Date" content={formattedDate} />
          <DetailSection title="Cover Letter" content={singleApplication.jobSeekerInfo?.coverLetter} />
          
          <DetailSection
            title="Resume"
            content={
              <a
                href={singleApplication.jobSeekerInfo?.resume?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Resume
              </a>
            }
          />
          <DetailSection
            title="Job Seeker Info"
            content={
              <>
                <p><strong>Name:</strong> {singleApplication.jobSeekerInfo?.name}</p>
                <p><strong>Email:</strong> {singleApplication.jobSeekerInfo?.email}</p>
                <p><strong>Phone:</strong> {singleApplication.jobSeekerInfo?.phone}</p>
                <p><strong>Address:</strong> {singleApplication.jobSeekerInfo?.address}</p>
              </>
            }
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}

function DetailSection({ title, content }) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
      <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h2>
      <div className="text-gray-600 dark:text-gray-300">{content}</div>
    </div>
  )
}

