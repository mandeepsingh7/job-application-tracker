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
import { Project } from "@/lib/models/models.types";
import { updateProject } from "@/lib/actions/profile-projects";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

export default function EditProjectDialog({
  isEditing,
  setIsEditing,
  project,
}: {
  isEditing: boolean;
  setIsEditing: (open: boolean) => void;
  project: Project;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description,
    projectUrl: project.projectUrl,
    githubUrl: project.githubUrl
  });

  async function handleUpdate(e: SubmitEvent) {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const result = await updateProject(project._id, {
        ...formData
      });

      if (!result.error) {
        setIsEditing(false);
        toast.success('Successifully made changes to the project entry. ');
      } else {
        console.error(result.error);
        toast.error('Failed to make changes');
      }
    } catch(err){
      console.error('Failed to edit project details. ', err);
      toast.error('Failed to make changes');
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Dialog open={isEditing} onOpenChange={setIsEditing}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Project Details
          </DialogTitle>
          <DialogDescription>
            Edit your project details
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdate}>
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
