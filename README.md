# Tshabalala Innovations

Company website built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

## Development

Run `npm install`, then `npm run dev`. Open http://localhost:3000.
Run `npm run lint` and `npm run build` before deployment. Use `npm start` to serve a production build.

## EmailJS setup

1. In the [EmailJS dashboard](https://dashboard.emailjs.com/), connect the company mailbox under **Email Services**. Save the Service ID.
2. Create an email template. Set **To Email** to the company's receiving email address as a fixed value in the dashboard (not a visitor-controlled variable).
3. Use the connected service's default sender address. Set **From Name** to `{{from_name}}` and **Reply To** to `{{reply_to}}`.
4. Use this subject: `Website enquiry: {{service}}`.
5. Add the following template content, using double braces so EmailJS escapes submitted values:

```text
New enquiry from the Tshabalala Innovations website

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Service: {{service}}

Project details:
{{message}}
```

6. Copy `.env.example` to `.env.local`. Fill in the Service ID, Template ID, and Account Public Key:

```dotenv
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

These values are intentionally public browser configuration. Do not add a private key. `.env.local` is ignored by Git.

7. Restart `npm run dev` after changing these values. For deployment, configure the same variables on the hosting platform **before building**, then rebuild/redeploy: Next.js embeds public environment variables during the build.
8. If you use EmailJS's domain allowlist, include the local testing origin and the production website origin. CAPTCHA is not configured by this integration; enabling it on the template requires adding its corresponding widget and token handling.
9. Send a test enquiry from the website, verify arrival in the configured inbox and EmailJS Email History, and confirm that Reply addresses the visitor.

The button stays disabled until all three settings exist. The form sends through the [EmailJS REST API](https://www.emailjs.com/docs/rest-api/send/) and handles missing configuration, invalid input, provider errors, throttling, and uncertain network delivery. It makes no automatic retries. Success confirms EmailJS accepted the request, not that it reached the inbox.

Run mocked integration checks without sending email:

```sh
node --experimental-strip-types --test tests/emailjs.test.mjs
```

## Site structure

- `app/page.tsx`: company content, services, mission, vision, process, and contact section.
- `app/ui.tsx`: mobile navigation, solution tabs, and contact form.
- `app/emailjs.ts`: public configuration, validation, and EmailJS delivery.
- `app/globals.css`: responsive logo palette and reduced-motion-aware animation.
- `app/layout.tsx`: metadata and browser icon.
- `public/tshabalala-logo.png`: supplied company logo.

Dashboard figures are illustrative concepts, not client results.
