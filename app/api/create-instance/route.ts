import { Templates } from "@/data/template";
import { createInstanceLimiter } from "@/lib/ratelimit";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";


export const POST = async (req: Request) => {

  // rate limit
  const ip = req.headers.get("x-forwarded-for") ?? "unknown"
  console.log("ip:",ip);

  const { success: rateLimitSucces } = await createInstanceLimiter.limit(ip)

  if (!rateLimitSucces) {
    return Response.json({
      error: "Too many requests! , try again in a minute"
    }, {
      status: 429
    })
  }

  const body = await req.json();
  const { template_id, data, visitor_id, email } = body;
  const supabaseAdmin = getSupabaseAdmin();
  const currentTemplate = Templates.find((t) => t.id === template_id);
  if (!currentTemplate) {
    return Response.json({ error: "Template not found" }, { status: 404 });
  }
  const { data: inserted, error } = await supabaseAdmin
    .from("template_instance")
    .insert({
      template_id: template_id,
      data: data,
      paid: currentTemplate.isFree ? true : false,
      visitor_id,
      email
    })
    .select("id, template_id")
    .single();

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  return Response.json({ id: inserted.id, template_id: inserted.template_id });
};
