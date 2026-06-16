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
import { addExperience } from "@/lib/actions/profile-experience";
import { Textarea } from "../ui/textarea";

const INITIAL_FORM_DATA = {
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  description: ""
};

export default function CreateExperienceDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    try {
      const result = await addExperience({...formData});

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
          <Plus className="size-3" /> Add Experience
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add Experience
          </DialogTitle>
          <DialogDescription>
            Fill in details about your experience
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="space-y-1 pb-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                className="text-sm"
                required
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />
            </div>

            <div className="space-y-1 pb-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                className="text-sm"
                required
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              />
            </div>
            <div className="space-y-1 pb-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                className="text-sm"
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4 ">
              <div className="space-y-1 pb-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="month"
                  max={formData.endDate || undefined}
                  className="text-sm"
                  required
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1 pb-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="month"
                  min={formData.startDate || undefined}
                  className="text-sm"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-1 pb-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Experience details go here. "
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
