import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  const result = await resend.emails.send({
    from: "Job Application Tracker <noreply@mandeeps.in>",
    to: "YOUR_GMAIL@gmail.com",
    subject: "Resend Test",
    text: "If you received this, Resend is working!",
  });

  return Response.json(result);
}