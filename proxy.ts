import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";
  const isBot = /bot|facebook|whatsapp|twitter|discord|linkedin/i.test(ua);

  const res = NextResponse.next();
  if (isBot) res.headers.set("x-bot-traffic", "true");
  return res;
}
