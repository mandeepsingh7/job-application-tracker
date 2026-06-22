"use client";

import Autoplay from "embla-carousel-autoplay"
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";

const images = [
  {
    title: "Dashboard",
    image: "/interface_showcase/dashboard.png",
    description: 'Track and organize job applications across different stages, from wishlist to offer stages.'
  },
  {
    title: "Add Job Application Dialog",
    image: "/interface_showcase/job_application_dialog.png",
    description: 'Create detailed job applications with company, role, salary, notes, and Job Description.'
  },
  {
    title: "Generate Cover Letter",
    image: "/interface_showcase/generate_cover_letter.png",
    description: 'Generate tailored cover letters and application notes using AI based on the job description and your profile.'
  },
  {
    title: "Generated Cover Letter",
    image: "/interface_showcase/generated_cover_letter.png",
    description: 'Generate tailored cover letters and application notes using AI based on the job description and your profile.'
  },
  {
    title: "Profile Page",
    image: "/interface_showcase/profile_page.png",
    description: 'Maintain a centralized profile containing education, experience, projects, skills, and courses.'
  },
  {
    title: "Profile Page (cont.)",
    image: "/interface_showcase/profile_page_cont.png",
    description: 'Maintain a centralized profile containing education, experience, projects, skills, and courses.'
  },
  {
    title: "Profile Management",
    image: "/interface_showcase/education_dialog.png",
    description: 'This is a sample profile section dialog. You can add details like Experience, Projects, Skills, Courses in a similar way.'
  },
];

export default function InterfaceShowcase() {
  return (
    <section className="w-full">
      <Carousel className="mx-auto w-full 2xl:w-7xl xl:w-5xl lg:w-3xl md:w-2xl"
      plugins={[
        Autoplay({
          delay: 10000,
        }),
      ]}
      >
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.title}>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold tracking-tight">{image.title}</h3>
                <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">{image.description}</p>
              </div>
              <div className="overflow-hidden rounded-2xl border-4 shadow-xl">
                <Image 
                  src={image.image}
                  alt={image.title}
                  width={1600}
                  height={868} />
              </div>

            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 xl:h-22 xl:w-12 " />
        <CarouselNext className="right-4 xl:h-22 xl:w-12"/>
      </Carousel>
    </section>
  );
}
