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

const INITIAL_FORM_DATA = {
  title: "",
  description: "",
  projectUrl: "",
  githubUrl: ""
};

export default function CreateProjectDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    try {
      const result = await addProject({...formData});

      if (!result.error) {
        setFormData(INITIAL_FORM_DATA);
        setOpen(false);
      }
    } catch(err) {
      console.error(err);
      throw err;
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
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                className="text-sm"
                required
                value={formData.title}
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
                onChange={(e) =>
                  setFormData({ ...formData, githubUrl: e.target.value })
                }
              />
            </div>

            <div className="space-y-1 pb-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Project details go here. "
                className="text-sm h-24 resize-none overflow-y-auto"
                maxLength={5000}
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex gap-3">
              <Button type="submit">Submit</Button>
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
