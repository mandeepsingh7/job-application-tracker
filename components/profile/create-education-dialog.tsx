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
import { addEducation } from "@/lib/actions/profile-education";

const INITIAL_FORM_DATA = {
  institution: "",
  degree: "",
  specialization: "",
  startDate: "",
  endDate: "",
  grade: "",
};

export default function CreateEducationDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    try {
      const result = await addEducation({...formData});

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
          <Plus className="size-3" /> Add Education
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add Education
          </DialogTitle>
          <DialogDescription>
            Fill in details about your education
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
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
