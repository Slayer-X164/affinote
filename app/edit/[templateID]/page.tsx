"use client";
import Navbar from "@/components/ui/Navbar";
import { Templates } from "@/data/template";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import z from "zod";
import { Toaster } from "react-hot-toast";
import ButtonLoder from "@/components/ui/ButtonLoder";
import { uploadImages } from "@/lib/uploadImages";
import dynamic from "next/dynamic";
import { getVisitorId } from "@/lib/visitor";

const componentMap: any = {
  "envolope-letter": dynamic(() => import("@/components/templates/EnvolopeTemplate"),{ssr:false}),
  "flower-surprise": dynamic(() => import("@/components/templates/CuteSurprise"),{ssr:false}),
  "apology-for-gf": dynamic(() => import("@/components/templates/ApologyForGf"),{ssr:false}),
  "apology-for-bf-gf": dynamic(() => import("@/components/templates/ApologyForBf"),{ssr:false}),
  "memory-timeline": dynamic(() => import("@/components/templates/MemoryTimeline"),{ssr:false}),
  "appreciation-for-friend": dynamic(() => import("@/components/templates/AppreciationFriend"),{ssr:false}),
  "birthday": dynamic(() => import("@/components/templates/Birthday"),{ssr:false}),
  "valentine_1": dynamic(() => import("@/components/templates/Valentine_1"),{ssr:false}),
  "gratitude-page": dynamic(() => import("@/components/templates/Gratitude"),{ssr:false}),
};

type templateKey = keyof typeof componentMap;
const generateSchema = (fields: any[]) => {
  const shape: any = {};

  fields.forEach((field) => {
    if (field.type === "text") {
      shape[field.name] = z.string().min(1, `${field.name} is required`);
    }

    if (field.type === "textarea") {
      shape[field.name] = z.string().min(1, `${field.name} is required`);
    }
    if (field.type === "image") {
      shape[field.name] = z.string().min(1, "Image required");
    }
  });

  return z.object(shape);
};

export default function page() {
  const router = useRouter();
  const params = useParams();
  const templateID = params.templateID as templateKey;
  const currTemplate = Templates.find((t) => t.id === templateID);
  const DisplayTemplate = componentMap[templateID];
  const [formData, setFormData] = useState<any>({});
  const [inputErr, setInputError] = useState<string>("");
  const [btnLoader, setBtnLoader] = useState<boolean>(false);
  // Generate Zod schema from template field validation

  const handleTextChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSingleImageUpload = async (fieldName: string, file: File) => {
    const imageUrl = await uploadImages(file, "temp", fieldName, 0);

    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: imageUrl,
    }));
  };

  // storing tempate data to supabase and redirect to payment page
  const createInstance = async () => {
    if (!generateSchema) return;
    // Create schema from template fields
    const schema = generateSchema(currTemplate?.fields ?? []);

    // Validate formData
    const parsed = schema.safeParse(formData);

    if (!parsed.success) {
      setInputError("Please fill all required fields.");
      return;
    }
    setBtnLoader(true);
    const visitor_ID = getVisitorId()
    const response = await fetch("/api/create-instance", {
      method: "POST",
      body: JSON.stringify({
        template_id: templateID,
        data: formData,
        visitor_id: visitor_ID

      }),
    });
    const supData = await response.json();

    if (supData.id) {
      setBtnLoader(false);
      if(currTemplate?.isFree){
        router.push(`/free-affinote?instance=${supData.id}`);
        return;
      }
      router.push(
        `/payment?instance=${supData.id}&price=${currTemplate?.price}`
      );
    } else {
      console.error("No ID returned from backend");
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-start items-center">
      <Navbar />
      <div className="h-full max-w-6xl px-3 w-full py-10 flex flex-col-reverse gap-6  lg:flex-row items-start ">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="w-full lg:w-[60%] bg-transparent border-blue-400 border-2 rounded-2xl overflow-hidden relative">
          <h3 className="text-center bg-black text-neutral-50 text-sm p-0.5 pb-1">
            Live Preview - updates as you type 👇
          </h3>
          <DisplayTemplate {...formData} />
        </div>
        <div className="w-full lg:w-[40%] min-h-full  bg-white px-3">
          <h2 className="text-xl font-bold mb-6 text-blue-950">
            Customize:{" "}
            <span className="underline-offset-4  text-blue-400">
              {currTemplate?.title} Template
            </span>
          </h2>

          <div className="space-y-4">
            {currTemplate?.fields.map((field) => {
              // TEXT INPUT
              if (field.type === "text") {
                return (
                  <div key={field.name}>
                    <label className="block lowercase text-neutral-900 text-sm font-semibold mb-1">
                      {field.name}:
                    </label>
                    <input
                      placeholder={field.placeholder || ""}
                      className="w-full  placeholder:opacity-80 placeholder:text-blue-400 bg-blue-50 border-3 border-blue-300   p-2 rounded-2xl "
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        handleTextChange(field.name, e.target.value)
                      }
                    />
                  </div>
                );
              }

              // TEXTAREA
              if (field.type === "textarea") {
                return (
                  <div key={field.name}>
                    <label className="block lowercase text-neutral-900 text-sm font-semibold mb-1">
                      {field.name}:
                    </label>
                    <textarea
                      placeholder={field.placeholder || ""}
                      className="w-full placeholder:opacity-80 placeholder:text-blue-400 bg-blue-50 border-3 border-blue-300   p-2 rounded-2xl "
                      rows={4}
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        handleTextChange(field.name, e.target.value)
                      }
                    />
                  </div>
                );
              }

              // IMAGES
              // SINGLE IMAGE
              if (field.type === "image") {
                return (
                  <div key={field.name}>
                    <label className="block lowercase text-neutral-900 text-sm font-semibold mb-2">
                      {field.name}:
                    </label>

                    <div className="flex items-center p-2 bg-neutral-200 border-2 rounded-2xl border-dashed">
                      <img
                        src={
                          formData[field.name] || "https://placehold.co/80x80"
                        }
                        className="w-20 h-20 rounded-2xl object-cover bg-blue-50 border border-neutral-400"
                      />

                      <input
                        className="p-4"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files) {
                            handleSingleImageUpload(
                              field.name,
                              e.target.files[0]
                            );
                          }
                        }}
                      />
                    </div>
                  </div>
                );
              }

              return null;
            })}
            {/* errror */}
            {inputErr && (
              <h2 className="text-red-600 text-center pt-2 font-semibold">
                {inputErr}..
              </h2>
            )}
          </div>
          <button
           onClick={createInstance}
            disabled={btnLoader}
            aria-busy={btnLoader}
            aria-live="polite"
            className="
    w-full mt-6 py-4 rounded-2xl text-white text-xl font-semibold
    flex items-center justify-center gap-2
    bg-blue-500 hover:bg-blue-600
    active:scale-95 transition-all duration-300

    disabled:bg-blue-300
    disabled:cursor-not-allowed
    disabled:active:scale-100
  "

          >
            {btnLoader ? (
               <>
                <ButtonLoder />
                Creating Payment...
              </>
            ) : (
              ` Get Shareable Link at ₹${currTemplate?.price}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
