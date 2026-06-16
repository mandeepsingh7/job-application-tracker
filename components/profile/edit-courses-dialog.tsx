"use client";

import { SubmitEvent, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Edit, Plus } from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { editCourses } from "@/lib/actions/profile-courses";

export default function EditCoursesDialog({
  isEditing,
  setIsEditing,
  courses,
}: {
  isEditing: boolean;
  setIsEditing: (open: boolean) => void;
  courses: string;
}) {
  const [coursesText, setCoursesText] = useState(courses);
  async function handleUpdate(e: SubmitEvent) {
    e.preventDefault();

    try {
      const result = await editCourses(
        coursesText.split('\n').map((course) => course.trim())
        .filter((course) => course.length > 0)
      );
      if (!result.error) {
        setIsEditing(false);
      } else {
        console.error(result.error);
      }
    } catch(err) {
      console.error('Failed to edit courses. ', err)
    }
  }
  return (
    <Dialog open={isEditing} onOpenChange={setIsEditing}>
      <DialogTrigger asChild>
        <Button className="text-xs py-2 px-2 gap-2" variant="outline">
          <Edit className="size-3" /> Edit Courses
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Courses
          </DialogTitle>
          <VisuallyHidden.Root>
          <DialogDescription>
            Edit your courses
          </DialogDescription>
          </VisuallyHidden.Root>
        </DialogHeader>
        <form onSubmit={handleUpdate}>
          <div>
            <div className="space-y-1 pb-2">
              <Label htmlFor="courses">Courses (comma-separated)</Label>
              <Textarea
                id="courses"
                placeholder="Type your courses here (separated by commas). "
                className="text-sm h-24 resize-none overflow-y-auto"
                maxLength={1000}
                value={coursesText}
                onChange={(e) =>
                  setCoursesText(e.target.value)
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