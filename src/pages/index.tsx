import { useEffect } from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import JobFilter from "@/components/JobFilter";
import JobCard from "@/components/JobCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchJobs,
  selectFilteredJobs,
  selectLoading,
  selectError,
} from "@/features/jobsDataSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const filteredJobs = useAppSelector(selectFilteredJobs);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    // Fetch jobs from API using Redux thunk
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Mini Job Board App - Find Your Next Career</title>
        <meta
          name="description"
          content="Discover amazing job opportunities in tech, design, and more. Apply to top companies with our easy-to-use job board."
        />
        <meta
          name="keywords"
          content="jobs, careers, employment, tech jobs, remote work, full-time, part-time"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Mini Job Board App" />
        <meta
          property="og:description"
          content="Find your next career opportunity"
        />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-background md:p-8 p-4">
        <div className="sm:container mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">
            Mini Job Board App
          </h1>

          <JobFilter />

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-muted-foreground mt-2">Loading jobs...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-destructive mb-4">{error}</p>
              <Button variant="outline" onClick={() => dispatch(fetchJobs())}>
                Try Again
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}

          {filteredJobs.length === 0 && !loading && !error && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No jobs found matching your criteria.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => dispatch(fetchJobs())}
              >
                Refresh Jobs
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
