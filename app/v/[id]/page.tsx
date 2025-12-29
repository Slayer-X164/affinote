// app/v/[id]/page.tsx
import { createClient } from "@supabase/supabase-js";

import EnvelopeLetter from "@/components/templates/EnvolopeTemplate";
import CuteSurprise from "@/components/templates/CuteSurprise";
import ApologyForGf from "@/components/templates/ApologyForGf";
import ApologyForBf from "@/components/templates/ApologyForBf";
import MemoryTimeline from "@/components/templates/MemoryTimeline";
import AppreciationFriend from "@/components/templates/AppreciationFriend";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const componentMap: any = {
  "envolope-letter": EnvelopeLetter,
  "flower-surprise": CuteSurprise,
  "apology-for-gf": ApologyForGf,
  "apology-for-bf-gf": ApologyForBf,
  "memory-timeline": MemoryTimeline,
  "appreciation-for-friend": AppreciationFriend,
};

export default async function ViewPage({ params }: any) {
  // FIX: unwrap promise
  const { id } =await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

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
    <div className="min-h-screen w-full flex flex-col items-center ">
      <div className="w-full">
        <TemplateComponent {...data.data} />
      </div>
      {/* <p className="text-gray-400 text-xs py-2">
        Created using ❤️{" "}
        <a className="underline text-blue-400" href="https://affinote.site">
          Affinote
        </a>
      </p> */}
    </div>
  );
}
