export const emailConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim() || "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim() || "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim() || "",
};

export const emailConfigured = Object.values(emailConfig).every(Boolean);

export async function sendEnquiry(data: FormData) {
  if (!emailConfigured) {
    throw new Error("Online enquiries are not available yet. Please try again later.");
  }

  const field = (name: string) => String(data.get(name) || "").trim();
  const name = field("name");
  const email = field("email");
  const company = field("company");
  const service = field("service");
  const message = field("message");

  if (!name || !email || !service || !message) {
    throw new Error("Please complete your name, email, service, and project details.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Please enter a valid email address.");
  }
  if (name.length > 120 || email.length > 200 || company.length > 150 || service.length > 100 || message.length > 5000) {
    throw new Error("Please shorten your details to fit the form limits.");
  }

  let response: Response;
  try {
    response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: emailConfig.serviceId,
        template_id: emailConfig.templateId,
        user_id: emailConfig.publicKey,
        template_params: {
          from_name: name,
          from_email: email,
          reply_to: email,
          company: company || "Not specified",
          service,
          message,
        },
      }),
      signal: AbortSignal.timeout(20000),
    });
  } catch {
    throw new Error("We couldn’t confirm delivery. Check your connection before trying again. Your message has been kept below.");
  }
  if (response.status === 429) {
    throw new Error("The enquiry service is busy. Please wait a minute before trying again.");
  }
  if (!response.ok) {
    throw new Error("Your enquiry could not be sent. Please try again later. Your message has been kept below.");
  }
}
