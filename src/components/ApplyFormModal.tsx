import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, FileText, Send, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch } from "@/store/hooks";
import { addAppliedJob } from "@/features/jobsDataSlice";
import { toast } from "sonner";

// Form validation schema - cover letter is now optional
const applyFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  coverLetter: z.string().optional(),
  resume: z.instanceof(File, { message: "Please upload your resume" }),
});

type ApplyFormData = z.infer<typeof applyFormSchema>;

interface ApplyFormModalProps {
  jobTitle: string;
  companyName: string;
  jobId: string;
  trigger?: React.ReactNode;
}

const ApplyFormModal: React.FC<ApplyFormModalProps> = ({
  jobTitle,
  companyName,
  jobId,
  trigger,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ApplyFormData>({
    resolver: zodResolver(applyFormSchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue("resume", file);
    }
  };

  const onSubmit = async (data: ApplyFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", data);
    console.log("Job Title:", jobTitle);
    console.log("Company:", companyName);
    console.log("Job ID:", jobId);

    // Store applied job in Redux
    dispatch(addAppliedJob(jobId));

    // Store in localStorage
    const existingAppliedJobs = JSON.parse(
      localStorage.getItem("appliedJobs") || "[]"
    );
    if (!existingAppliedJobs.includes(jobId)) {
      existingAppliedJobs.push(jobId);
      localStorage.setItem("appliedJobs", JSON.stringify(existingAppliedJobs));
    }

    // Show success message
    toast.success("Application submitted successfully!");

    // Reset form and close modal
    reset();
    setSelectedFile(null);
    setIsOpen(false);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    reset();
    setSelectedFile(null);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Apply Now
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
          <DialogDescription>
            Submit your application for the {jobTitle} position at {companyName}
            .
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              {...register("name")}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Resume Upload */}
          <div className="space-y-2">
            <Label htmlFor="resume">Resume/CV *</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("resume")?.click()}
                className="w-full justify-start"
              >
                <Upload className="mr-2 h-4 w-4" />
                {selectedFile ? selectedFile.name : "Choose file"}
              </Button>
            </div>
            {selectedFile && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>{selectedFile.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedFile(null);
                    setValue("resume", undefined as any);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            {errors.resume && (
              <p className="text-sm text-destructive">
                {errors.resume.message}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Accepted formats: PDF, DOC, DOCX (Max 5MB)
            </p>
          </div>

          {/* Cover Letter - Now Optional */}
          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
            <Textarea
              id="coverLetter"
              placeholder="Tell us why you're interested in this position and why you'd be a great fit... (Optional)"
              rows={5}
              {...register("coverLetter")}
            />
            <p className="text-xs text-muted-foreground">
              Optional: Add a cover letter to strengthen your application
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="mt-2"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="mt-2">
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Application
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyFormModal;
