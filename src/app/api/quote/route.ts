import { NextResponse } from "next/server";
import { getEmailAdapter } from "@/lib/email";
import { quoteFieldsSchema, MAX_ATTACHMENT_BYTES, MAX_TOTAL_ATTACHMENT_BYTES } from "@/lib/quote/schema";
import type { QuoteAttachment, QuoteLead } from "@/lib/quote/types";

export async function POST(request: Request) {
  const formData = await request.formData();

  const raw = {
    name: formData.get("name")?.toString() ?? "",
    company: formData.get("company")?.toString() || undefined,
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    location: formData.get("location")?.toString() || undefined,
    environment: (formData.get("environment")?.toString() || null) as QuoteLead["environment"],
    sectorId: formData.get("sectorId")?.toString() || undefined,
    sectorLabel: formData.get("sectorLabel")?.toString() || undefined,
    projectState: (formData.get("projectState")?.toString() || null) as QuoteLead["projectState"],
    concerns: formData.getAll("concerns").map(String),
    squareFootage: formData.get("squareFootage")?.toString() || undefined,
    timeline: formData.get("timeline")?.toString() || undefined,
    otherDescription: formData.get("otherDescription")?.toString() || undefined,
    landingRoute: formData.get("landingRoute")?.toString() || undefined,
    notes: formData.get("notes")?.toString() || undefined,
  };

  const parsed = quoteFieldsSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const files = formData.getAll("attachments").filter((f): f is File => f instanceof File && f.size > 0);
  let totalBytes = 0;
  const attachments: QuoteAttachment[] = [];
  for (const file of files) {
    if (file.size > MAX_ATTACHMENT_BYTES) {
      return NextResponse.json({ error: `${file.name} is larger than 8MB` }, { status: 400 });
    }
    totalBytes += file.size;
    if (totalBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
      return NextResponse.json({ error: "Total upload size exceeds 15MB" }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({ filename: file.name, contentType: file.type || "application/octet-stream", base64: buffer.toString("base64") });
  }

  const lead: QuoteLead = {
    ...parsed.data,
    environment: parsed.data.environment ?? null,
    concerns: parsed.data.concerns ?? [],
    attachments,
  };

  const adapter = getEmailAdapter();
  const result = await adapter.send(lead);

  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? "Failed to send lead" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, devFallback: result.devFallback });
}
