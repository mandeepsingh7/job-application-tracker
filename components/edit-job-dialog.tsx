"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { SubmitEvent, useState } from "react";
import { createJobApplication, updateJobApplication } from "@/lib/actions/job-applications";
import { JobApplication } from "@/lib/models/models.types";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

export default function EditJobApplicationDialog({
  isEditing,
  setIsEditing,
  job,
}: {
  isEditing: boolean;
  setIsEditing: (open: boolean) => void;
  job: JobApplication;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    company: job.company,
    role: job.role,
    location: job.location || "",
    salary: job.salary || "",
    jobUrl: job.jobUrl || "",
    description: job.description,
    appliedDate: job.appliedDate ? new Date(job.appliedDate).toISOString().slice(0,10): "",
    lastResponseDate: job.lastResponseDate ? new Date(job.lastResponseDate).toISOString().slice(0,10): "",
    notes: job.notes || "",
    coverLetter: job.coverLetter || "",
  });
  // To use state hook, it needs to be client component. 

  async function handleUpdate(e: SubmitEvent) { 
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const result = await updateJobApplication(job._id, {
        ...formData,
      });

      if (!result.error) {
        setIsEditing(false);
        toast.success("Updated Job Application.");
      }
    } catch(err){
      console.error('Failed to edit job application', err);
      toast.error('Failed to edit Job Application.')
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isEditing} onOpenChange={setIsEditing}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Job Application
          </DialogTitle>
          <DialogDescription>
            Update the details of your job application
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdate}>
          <div>
            <div className="grid grid-cols-2 gap-4 space-y-2">
              <div className="space-y-1">
                <Label htmlFor="company">Company*</Label>
                <Input
                  id="company"
                  required
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="role">Role*</Label>
                <Input
                  id="role"
                  required
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 space-y-2">
              <div className="space-y-1">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="salary">Salary</Label>
                <Input
                  id="salary"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                  className="text-sm"
                />
              </div>
            </div>
            <div className="space-y-1 pb-2">
              <Label htmlFor="jobUrl">Job URL</Label>
              <Input
                id="jobUrl"
                type="url"
                placeholder="https://example.com"
                value={formData.jobUrl}
                onChange={(e) =>
                  setFormData({ ...formData, jobUrl: e.target.value })
                }
                className="text-sm"
              />
            </div>
            <div className="space-y-1 pb-2">
              <Label htmlFor="description">Description*</Label>
              <Textarea
                id="description"
                placeholder="Job description goes here (max 5000 characters)"
                className="text-sm h-24 resize-none overflow-y-auto"
                maxLength={5000}
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4 space-y-2">
              <div className="space-y-1">
                <Label htmlFor="appliedDate">Applied Date</Label>
                <Input
                  id="appliedDate"
                  type="date"
                  className="text-sm"
                  value={formData.appliedDate}
                  onChange={(e) =>
                    setFormData({ ...formData, appliedDate: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastResponseDate">Last Response Date</Label>
                <Input
                  id="lastResponseDate"
                  type="date"
                  className="text-sm"
                  value={formData.lastResponseDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lastResponseDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-1 pb-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="You can add notes here about the interview process, prep, or any miscellaneous notes (max 5000 characters)"
                className="text-sm h-24 resize-none overflow-y-auto"
                maxLength={5000}
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
            </div>
            <div className="space-y-1 pb-10">
              <Label htmlFor="coverLetter">Cover Letter</Label>
              <Textarea
                id="coverLetter"
                placeholder="Cover Letter goes here"
                className="text-sm h-24 resize-none overflow-y-auto"
                maxLength={5000}
                value={formData.coverLetter}
                onChange={(e) =>
                  setFormData({ ...formData, coverLetter: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex gap-3">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <>
                <Spinner /> Saving changes...
                </> : <>Save Changes</>}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
