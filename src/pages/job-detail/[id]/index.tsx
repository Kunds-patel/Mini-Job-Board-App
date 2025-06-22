import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Building,
  Calendar,
  CheckCircle,
  CircleDollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectAllJobs,
  selectIsJobApplied,
  fetchJobById,
  selectLoading,
  selectError,
} from "@/features/jobsDataSlice";
import ApplyFormModal from "@/components/ApplyFormModal";
import { Job } from "@/services/api";

export default function JobDetail() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();

  const allJobs = useAppSelector(selectAllJobs);
  const isApplied = useAppSelector(selectIsJobApplied(id as string));
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (id) {
      // First try to find job in existing jobs
      const existingJob = allJobs.find((job) => job.id === id);
      if (existingJob) {
        setJob(existingJob);
      } else {
        // If not found, fetch from API
        dispatch(fetchJobById(id as string));
      }
    }
  }, [id, allJobs, dispatch]);

  // Update job when allJobs changes (after API fetch)
  useEffect(() => {
    if (id && allJobs.length > 0) {
      const foundJob = allJobs.find((job) => job.id === id);
      if (foundJob) {
        setJob(foundJob);
      }
    }
  }, [id, allJobs]);

  if (loading && !job) {
    return (
      <>
        <Head>
          <title>Loading Job Details - Mini Job Board App</title>
        </Head>
        <div className="min-h-screen bg-background p-8">
          <div className="container mx-auto">
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-muted-foreground mt-2">
                Loading job details...
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error && !job) {
    return (
      <>
        <Head>
          <title>Error - Mini Job Board App</title>
        </Head>
        <div className="min-h-screen bg-background p-8">
          <div className="container mx-auto">
            <div className="text-center py-8">
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Error Loading Job
              </h1>
              <p className="text-destructive mb-6">{error}</p>
              <Link href="/">
                <Button variant="default">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Head>
          <title>Job Not Found - Mini Job Board App</title>
        </Head>
        <div className="min-h-screen bg-background p-8">
          <div className="container mx-auto">
            <div className="text-center py-8">
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Job Not Found
              </h1>
              <p className="text-muted-foreground mb-6">
                The job you're looking for doesn't exist.
              </p>
              <Link href="/">
                <Button variant="default">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>
          {job.title} at {job.company} - Mini Job Board App
        </title>
        <meta name="description" content={job.description.substring(0, 160)} />
        <meta
          name="keywords"
          content={`${job.title}, ${job.company}, ${job.type}, ${job.location}, jobs, careers`}
        />
        <meta property="og:title" content={`${job.title} at ${job.company}`} />
        <meta
          property="og:description"
          content={job.description.substring(0, 160)}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-background p-8">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Jobs
              </Button>
            </Link>
          </div>

          {/* Job Header */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl font-bold text-foreground mb-2">
                    {job.title}
                  </CardTitle>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Building className="mr-2 h-4 w-4" />
                    {job.company}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    {job.location}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="mb-2">
                    <Clock className="mr-1 h-3 w-3" />
                    {job.type}
                  </Badge>
                  {isApplied && (
                    <div className="flex items-center text-green-600 text-sm">
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Applied
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground leading-relaxed">
                    {job.description}
                  </p>
                  <p className="text-foreground leading-relaxed">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. A
                    laborum corrupti tenetur veritatis rem! Officiis quae
                    consequuntur, harum eius eligendi hic excepturi laudantium
                    velit praesentium, cupiditate possimus, eum modi adipisci!
                  </p>
                  <p className="text-foreground leading-relaxed">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. A
                    laborum corrupti tenetur veritatis rem! Officiis quae
                    consequuntur, harum eius eligendi hic excepturi laudantium
                    velit praesentium, cupiditate possimus, eum modi adipisci!
                  </p>
                </CardContent>
              </Card>

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((requirement, index) => (
                        <Badge key={index} variant="outline">
                          {requirement}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Apply for this position</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {job.salary && (
                    <div className="flex items-center text-foreground">
                      <CircleDollarSign className="mr-2 h-4 w-4" />
                      <span className="font-medium">{job.salary}</span>
                    </div>
                  )}

                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Posted: {job.postedDate}</span>
                  </div>

                  {isApplied ? (
                    <Button
                      variant="outline"
                      className="w-full"
                      size="lg"
                      disabled
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Applied
                    </Button>
                  ) : (
                    <ApplyFormModal
                      jobTitle={job.title}
                      companyName={job.company}
                      jobId={job.id}
                      trigger={
                        <Button className="w-full" size="lg">
                          Apply Now
                        </Button>
                      }
                    />
                  )}
                </CardContent>
              </Card>

              {/* Job Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Company</span>
                    <span className="font-medium">{job.company}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium">{job.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Job Type</span>
                    <Badge variant="secondary">{job.type}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Posted</span>
                    <span className="font-medium">{job.postedDate}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
