import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || "";

    // Forward notification to info@dryamfoods.com using Web3Forms API
    if (accessKey) {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          to_email: "info@dryamfoods.com",
          subject: `New DRYAM FOODS Interest: ${email}`,
          from_name: "DRYAM FOODS Coming Soon",
          message: `A new customer has expressed interest on your website:\n\nUser Email: ${email}\nSubmission Time: ${new Date().toLocaleString()}`,
        }),
      });
    }

    return NextResponse.json({ success: true, message: "Interest registered successfully!" });
  } catch (error) {
    console.error("Failed to process notify request:", error);
    return NextResponse.json({ success: true, message: "Interest registered successfully!" });
  }
}
