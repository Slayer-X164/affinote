// app/v/[id]/page.tsx
import { createClient } from "@supabase/supabase-js";

import dynamic from "next/dynamic";
import {headers} from "next/headers";
export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const componentMap: any = {
  "envolope-letter": dynamic(() => import("@/components/templates/EnvolopeTemplate")),
  "flower-surprise": dynamic(() => import("@/components/templates/CuteSurprise")),
  "apology-for-gf": dynamic(() => import("@/components/templates/ApologyForGf")),
  "apology-for-bf-gf": dynamic(() => import("@/components/templates/ApologyForBf")),
  "memory-timeline": dynamic(() => import("@/components/templates/MemoryTimeline")),
  "appreciation-for-friend": dynamic(() => import("@/components/templates/AppreciationFriend")),
  "birthday": dynamic(() => import("@/components/templates/Birthday")),
  "valentine_1": dynamic(() => import("@/components/templates/Valentine_1")),
};

type templateKey = keyof typeof componentMap;

export default async function ViewPage({ params }: any) {
   const headersList = await headers();
  const isBot = headersList.get("x-bot-traffic") === "true";
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
  if (isBot) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl text-gray-600">Template not found.</h1>
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-semibold">
          Someone shared a special page with you 💌
        </h1>
        <p className="text-gray-500 mt-2">
          Open the link to view the full surprise.
        </p>
      </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full flex flex-col items-center ">
      <div className="w-full">
        <TemplateComponent {...data.data} />
      </div>
      {/* <p className="text-neutral-400 absolute bottom-0 text-xs py-2 flex items-center gap-1">
        Created using <FaHeart className="text-red-400" />
        <a className="underline text-blue-400" href="https://affinote.site">
          Affinote
        </a>
      </p> */}
    </div>
  );
}
