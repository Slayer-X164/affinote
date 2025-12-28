import { supabase } from "@/lib/supabase";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { template_id, data, visitor_id } = body;

  const { data: inserted, error } = await supabase
    .from("template_instance")
    .insert({
      template_id: template_id,
      data: data,
      paid: false,
      visitor_id,
    })
    .select("id")
    .single();

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  return Response.json({ id: inserted.id });
};
