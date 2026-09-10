import assert from "node:assert/strict";
import { test } from "node:test";

process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = "test_service";
process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = "test_template";
process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = "test_public_key";
const { sendEnquiry } = await import("../app/emailjs.ts");

function enquiry() {
  const data = new FormData();
  for (const [key, value] of Object.entries({ name: " Test Visitor ", email: "visitor@example.com", company: "", service: "Custom software", message: "A customer portal" })) data.set(key, value);
  return data;
}

test("sends the template parameters and reply address to EmailJS", async (t) => {
  const mock = t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, "https://api.emailjs.com/api/v1.0/email/send");
    assert.equal(options.method, "POST");
    const payload = JSON.parse(options.body);
    assert.equal(payload.service_id, "test_service");
    assert.equal(payload.template_id, "test_template");
    assert.equal(payload.user_id, "test_public_key");
    assert.deepEqual(payload.template_params, { from_name: "Test Visitor", from_email: "visitor@example.com", reply_to: "visitor@example.com", company: "Not specified", service: "Custom software", message: "A customer portal" });
    return new Response("OK", { status: 200 });
  });
  await sendEnquiry(enquiry());
  assert.equal(mock.mock.callCount(), 1);
});

test("rejects blank, invalid, and oversized input without a network call", async (t) => {
  const mock = t.mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected call"); });
  for (const [field, value] of [["message", "   "], ["email", "invalid"], ["name", "x".repeat(121)]]) {
    const data = enquiry(); data.set(field, value);
    await assert.rejects(sendEnquiry(data));
  }
  assert.equal(mock.mock.callCount(), 0);
});

test("provider rejection never reports success", async (t) => {
  t.mock.method(globalThis, "fetch", async () => new Response("Template failure", { status: 400 }));
  await assert.rejects(sendEnquiry(enquiry()), /could not be sent/);
});

test("rate limits ask the visitor to wait", async (t) => {
  t.mock.method(globalThis, "fetch", async () => new Response("Rate limit", { status: 429 }));
  await assert.rejects(sendEnquiry(enquiry()), /wait a minute/);
});

test("network uncertainty does not retry automatically", async (t) => {
  const mock = t.mock.method(globalThis, "fetch", async () => { throw new TypeError("Network failure"); });
  await assert.rejects(sendEnquiry(enquiry()), /couldn’t confirm delivery/);
  assert.equal(mock.mock.callCount(), 1);
});

test("missing configuration prevents sending", async (t) => {
  t.mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected call"); });
  const previous = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  delete process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  try {
    const unconfigured = await import("../app/emailjs.ts?unconfigured");
    assert.equal(unconfigured.emailConfigured, false);
    await assert.rejects(unconfigured.sendEnquiry(enquiry()), /not available yet/);
  } finally {
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = previous;
  }
});
