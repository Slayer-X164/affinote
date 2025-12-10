import { supabase } from "@/lib/supabase";
import BirthdayTimeline from "@/components/templates/Template1";
import LoveLetter from "@/components/templates/Template2";

const componentMap: any = {
  "birthday-timeline": BirthdayTimeline,
  "love-letter": LoveLetter,
};

export default async function ViewPage({ params }: any) {
  const id = params.id;

  // Fetch instance from Supabase
  const { data, error } = await supabase
    .from("template_instance")
    .select("*")
    .eq("id", id)
    .single();

  if (!data || error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-red-600">
          ❌ Invalid link. Page not found.
        </h1>
      </div>
    );
  }

  if (!data.paid) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl text-red-600 font-bold">🚫 Payment Pending</h1>
        <p className="text-gray-600 mt-2">
          This page is not unlocked yet. Complete payment to access it.
        </p>
      </div>
    );
  }

  const TemplateComponent = componentMap[data.template_id];

  if (!TemplateComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl text-gray-600">Template not found.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-pink-50 py-10 px-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl border p-6">
        <TemplateComponent {...data.data} />
      </div>

      <p className="text-gray-400 text-sm mt-6">
        Created using ❤️ Affinote
      </p>
    </div>
  );
}
