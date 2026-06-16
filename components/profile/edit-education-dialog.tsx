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
import { addEducation, updateEducation } from "@/lib/actions/profile-education";
import { Education } from "@/lib/models/models.types";

export default function EditEducationDialog({
  isEditing,
  setIsEditing,
  education,
}: {
  isEditing: boolean;
  setIsEditing: (open: boolean) => void;
  education: Education;
}) {
  const [formData, setFormData] = useState({
    institution: education.institution,
    degree: education.degree,
    specialization: education.specialization,
    startDate: education.startDate ? new Date(education.startDate).toISOString().slice(0,7): "",
    endDate: education.endDate ? new Date(education.endDate).toISOString().slice(0,7): "",
    grade: education.grade,
  });

  async function handleUpdate(e: SubmitEvent) {
    e.preventDefault();

    try {
      const result = await updateEducation(education._id, {
        ...formData
      });

      if (!result.error) {
        setIsEditing(false);
      } else {
        console.error(result.error);
      }
    } catch(err){
      console.error('Failed to edit education details. ', err);
    }
  }
  return (
    <Dialog open={isEditing} onOpenChange={setIsEditing}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Education Details
          </DialogTitle>
          <DialogDescription>
            Edit your education details
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdate}>
          <div>
            <div className="space-y-1 pb-2">
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                placeholder="IISc Bangalore"
                className="text-sm"
                required
                value={formData.institution}
                onChange={(e) =>
                  setFormData({ ...formData, institution: e.target.value })
                }
              />
            </div>

            <div className="space-y-1 pb-2">
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                placeholder="M Tech"
                className="text-sm"
                required
                value={formData.degree}
                onChange={(e) =>
                  setFormData({ ...formData, degree: e.target.value })
                }
              />
            </div>
            <div className="space-y-1 pb-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                placeholder="Computational and Data Science"
                className="text-sm"
                required
                value={formData.specialization}
                onChange={(e) =>
                  setFormData({ ...formData, specialization: e.target.value })
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
                  required
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-1 pb-2">
              <Label htmlFor="grade">Grade</Label>
              <Input
                id="grade"
                placeholder="CGPA: 8.4/10.0 or 84.00%"
                className="text-sm"
                required
                value={formData.grade}
                onChange={(e) =>
                  setFormData({ ...formData, grade: e.target.value })
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
