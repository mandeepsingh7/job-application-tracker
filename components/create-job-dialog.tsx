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
import { addCoverLetter, createJobApplication } from "@/lib/actions/job-applications";
import { Spinner } from "./ui/spinner";
import { toast} from "sonner";

const INITIAL_FORM_DATA = {
  company: "",
  role: "",
  location: "",
  salary: "",
  jobUrl: "",
  description: "",
  appliedDate: "",
  lastResponseDate: "",
  notes: "",
  coverLetter: "",
};

export default function CreateJobApplicationDialog({
  boardId,
}: {
  boardId: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  // To use state hook, it needs to be client component.

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault(); // It prevents page from refreshing

    try {
      // If we were in a server component, we could use connecDB and then create JobApplication like we did for Column, but this is client component.
      setIsSubmitting(true);
      const result = await createJobApplication({
        ...formData,
        boardId,
      });

      if (!result.error) {
        setFormData(INITIAL_FORM_DATA);
        setOpen(false);
        toast.success('Successfully added Job Application. You can generate cover letter now.');
      } else {
        console.error("Failed to create job. ", result.error);
        toast.error('Failed to add Job Application.')
      }
    } catch (err) {
      console.error(err);
      throw new Error("Error occured while creating job application");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-lg py-5 px-8 gap-4">
          <Plus className="size-5" /> Add Job Application
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add Job Application
          </DialogTitle>
          <DialogDescription>
            Fill in details about your job application
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="grid grid-cols-2 gap-4 space-y-2">
              <div className="space-y-1">
                <Label htmlFor="company">Company*</Label>
                <Input
                  id="company"
                  required
                  value={formData.company}
                  maxLength={200}
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
                  maxLength={200}
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
                  maxLength={500}
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
                  maxLength={200}
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
                maxLength={500}
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
                maxLength={10000}
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
                maxLength={10000}
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
                maxLength={10000}
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
                <Spinner /> Adding Application...
                </> : <>Add Application</>}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
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
