import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, message } = await req.json();

  // Send email using a service like nodemailer, SendGrid, etc.
  // For demo, just log and return success
  // In production, replace this with actual email sending logic
  console.log(`Contact form from: ${email}\nMessage: ${message}`);

  // Example: send to ramchouhan045@gmail.com
  // ...email sending logic here...

  return NextResponse.json({ success: true });
}
