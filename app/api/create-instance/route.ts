import { Templates } from "@/data/template";
import { supabaseAdmin } from "@/lib/supabaseAdmin";


export const POST = async (req: Request) => {
  const body = await req.json();
  const { template_id, data, visitor_id } = body;

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
    })
    .select("id, template_id")
    .single();

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  return Response.json({ id: inserted.id,template_id: inserted.template_id });
};
