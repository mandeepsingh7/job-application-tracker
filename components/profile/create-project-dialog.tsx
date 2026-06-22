"use client";

import { SubmitEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { addProject } from "@/lib/actions/profile-projects";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

const INITIAL_FORM_DATA = {
  title: "",
  description: "",
  projectUrl: "",
  githubUrl: ""
};

export default function CreateProjectDialog() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const result = await addProject({...formData});

      if (!result.error) {
        setFormData(INITIAL_FORM_DATA);
        setOpen(false);
        toast.success('Successfully added the project entry. ');
      }
    } catch(err) {
      console.error(err);
      toast.error('Failed to add the project entry.');
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs py-2 px-2 gap-2" variant="outline">
          <Plus className="size-3" /> Add Project
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add Project
          </DialogTitle>
          <DialogDescription>
            Fill in project details
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="space-y-1 pb-2">
              <Label htmlFor="title">Title*</Label>
              <Input
                id="title"
                className="text-sm"
                required
                value={formData.title}
                maxLength={500}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-1 pb-2">
              <Label htmlFor="projectUrl">Project URL</Label>
              <Input
                id="projectUrl"
                className="text-sm"
                value={formData.projectUrl}
                maxLength={500}
                onChange={(e) =>
                  setFormData({ ...formData, projectUrl: e.target.value })
                }
              />
            </div>

            <div className="space-y-1 pb-2">
              <Label htmlFor="githubUrl">Github URL</Label>
              <Input
                id="githubUrl"
                className="text-sm"
                value={formData.githubUrl}
                maxLength={500}
                onChange={(e) =>
                  setFormData({ ...formData, githubUrl: e.target.value })
                }
              />
            </div>

            <div className="space-y-1 pb-2">
              <Label htmlFor="description">Description*</Label>
              <Textarea
                id="description"
                placeholder="Project details go here. "
                className="text-sm h-24 resize-none overflow-y-auto"
                maxLength={10000}
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter className="mt-3">
            <div className="flex gap-3">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <>
                <Spinner /> Adding Project Entry...
                </> : <>Submit</>}
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
