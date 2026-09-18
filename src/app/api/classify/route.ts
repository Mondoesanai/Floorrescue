import { NextResponse } from "next/server";
import { classifyFreeText } from "@/lib/ai/classify";
import type { Environment } from "@/content/types";

export async function POST(request: Request) {
  let body: { text?: string; environment?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const text = typeof body.text === "string" ? body.text.slice(0, 2000) : "";
  if (!text.trim()) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  const validEnvironments: Environment[] = ["residential", "commercial", "industrial"];
  const environment = validEnvironments.includes(body.environment as Environment)
    ? (body.environment as Environment)
    : undefined;

  const result = await classifyFreeText(text, environment);
  return NextResponse.json(result);
}
