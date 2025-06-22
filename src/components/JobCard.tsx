import React from "react";
import Link from "next/link";
import { CircleDollarSign, Clock, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";
import { useAppSelector } from "@/store/hooks";
import { selectIsJobApplied, JobDto } from "@/features/jobsDataSlice";
import ApplyFormModal from "./ApplyFormModal";

interface JobCardProps {
  job: JobDto;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const isApplied = useAppSelector(selectIsJobApplied(job.id.toString()));

  return (
    <Card className="my-2" key={job.id}>
      <CardHeader>
        <CardTitle>
          <Link href={`/job-detail/${job.id}`} className="hover:underline">
            {job.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="md:flex items-end">
        <div className="space-y-4 flex-1">
          <CardDescription>Company : {job.company}</CardDescription>
          <div className="flex flex-wrap gap-4">
            <Badge variant={"secondary"} className="w-max">
              <CardDescription className="flex gap-2 items-center">
                <MapPin height={16} width={16} />
                {job.location}
              </CardDescription>
            </Badge>
            <Badge variant={"secondary"} className="w-max">
              <CardDescription className="flex gap-2 items-center">
                <Clock height={16} width={16} />
                {job.type}
              </CardDescription>
            </Badge>
            <Badge variant={"secondary"} className="w-max">
              <CardDescription className="flex gap-2 items-center">
                <CircleDollarSign height={16} width={16} />
                {job.salary}
              </CardDescription>
            </Badge>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          {isApplied ? (
            <Button variant="outline" disabled className="w-full">
              Applied
            </Button>
          ) : (
            <ApplyFormModal
              jobTitle={job.title}
              companyName={job.company}
              jobId={job.id}
              trigger={
                <Button variant="default" className="w-full">
                  Apply Now
                </Button>
              }
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
