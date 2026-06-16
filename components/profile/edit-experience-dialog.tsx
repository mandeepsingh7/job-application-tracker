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
import { Experience } from "@/lib/models/models.types";
import { updateExperience } from "@/lib/actions/profile-experience";
import { Textarea } from "../ui/textarea";

export default function EditExperienceDialog({
  isEditing,
  setIsEditing,
  experience,
}: {
  isEditing: boolean;
  setIsEditing: (open: boolean) => void;
  experience: Experience;
}) {
  const [formData, setFormData] = useState({
    company: experience.company,
    role: experience.role,
    location: experience.location,
    startDate: experience.startDate ? new Date(experience.startDate).toISOString().slice(0,7): "",
    endDate: experience.endDate ? new Date(experience.endDate).toISOString().slice(0,7): "",
    description: experience.description
  });

  async function handleUpdate(e: SubmitEvent) {
    e.preventDefault();

    try {
      const result = await updateExperience(experience._id, {
        ...formData
      });

      if (!result.error) {
        setIsEditing(false);
      } else {
        console.error(result.error);
      }
    } catch(err){
      console.error('Failed to edit experience details. ', err);
    }
  }
  return (
    <Dialog open={isEditing} onOpenChange={setIsEditing}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Experience Details
          </DialogTitle>
          <DialogDescription>
            Edit your experience details
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdate}>
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
              <Button type="submit">Save Changes</Button>
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
