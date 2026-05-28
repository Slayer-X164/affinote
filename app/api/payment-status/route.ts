import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const instanceID = searchParams.get("instance");

    if (!instanceID) {
      return NextResponse.json(
        { error: "Missing instance ID", paid: false },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("template_instance")
      .select("paid")
      .eq("id", instanceID)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Database error", paid: false },
        { status: 500 }
      );
    }

    return NextResponse.json({
      paid: data?.paid || false,
    });
  } catch (err) {
    console.error("Payment status error:", err);
    return NextResponse.json(
      { error: "Internal server error", paid: false },
      { status: 500 }
    );
  }
}