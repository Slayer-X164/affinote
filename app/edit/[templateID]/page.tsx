"use client";
import Navbar from "@/components/ui/Navbar";
import { Templates } from "@/data/template";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import z from "zod";
import toast, { Toaster } from "react-hot-toast";
import ButtonLoder from "@/components/ui/ButtonLoder";
import { uploadImages } from "@/lib/uploadImages";
import dynamic from "next/dynamic";
import { getVisitorId } from "@/lib/visitor";

const componentMap: any = {
  "envolope-letter": dynamic(() => import("@/components/templates/EnvolopeTemplate"), { ssr: false }),
  "flower-surprise": dynamic(() => import("@/components/templates/CuteSurprise"), { ssr: false }),
  "apology-for-gf": dynamic(() => import("@/components/templates/ApologyForGf"), { ssr: false }),
  "apology-for-bf-gf": dynamic(() => import("@/components/templates/ApologyForBf"), { ssr: false }),
  "memory-timeline": dynamic(() => import("@/components/templates/MemoryTimeline"), { ssr: false }),
  "appreciation-for-friend": dynamic(() => import("@/components/templates/AppreciationFriend"), { ssr: false }),
  "birthday": dynamic(() => import("@/components/templates/Birthday"), { ssr: false }),
  "valentine_1": dynamic(() => import("@/components/templates/Valentine_1"), { ssr: false }),
  "gratitude-page": dynamic(() => import("@/components/templates/Gratitude"), { ssr: false }),
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
  const [email, setEmail] = useState<string>("")
  const [loadingImg, setLoadingImg] = useState<Record<string, boolean>>({})

  const handleTextChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSingleImageUpload = async (fieldName: string, file: File) => {
    setLoadingImg(prev => ({ ...prev, [fieldName]: true }))
    try {
      const imageUrl = await uploadImages(file, "temp", fieldName, 0);

      setFormData((prev: any) => ({
        ...prev,
        [fieldName]: imageUrl,
      }));
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingImg(prev => ({ ...prev, [fieldName]: false }))
    }
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
    if (z.string().email().safeParse(email).success == false) {
      toast.error("enter a valid email")
      setInputError("")
      return
    }
    setBtnLoader(true);
    const visitor_ID = getVisitorId()
    const response = await fetch("/api/create-instance", {
      method: "POST",
      body: JSON.stringify({
        template_id: templateID,
        data: formData,
        visitor_id: visitor_ID,
        email
      }),
    });
    const supData = await response.json();
    console.log("supdata", supData)
    if (supData.id) {
      setBtnLoader(false);
      if (currTemplate?.isFree) {
        router.push(`/free-affinote?instance=${supData.id}`);
        return;
      }
      router.push(
        `/payment?instance=${supData.id}&template_id=${supData.template_id}`
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
              if (field.type === "image") {
                return (
                  <div key={field.name}>
                    <label className="block lowercase text-neutral-900 text-sm font-semibold mb-2">
                      {field.name}:
                    </label>

                    <div className="flex items-center p-2  gap-4 rounded-2xl border-dashed">

                      <img
                        src={
                          formData[field.name] || "https://placehold.co/80x80"
                        }
                        className="w-20 h-20 rounded-2xl object-cover border-dashed bg-blue-50 border-2 border-neutral-400"
                      />


                      <label className={`py-2 px-6 rounded-2xl border-neutral-300 cursor-pointer ${loadingImg[field.name]?"text-neutral-400":"text-neutral-900"}  border-2 `}>
                        {loadingImg[field.name] ? "uploading.." : "upload"}
                        <input
                          className="hidden"
                          type="file"
                          accept="image/*"
                          disabled={loadingImg[field.name]}
                          onChange={(e) => {
                            if (e.target.files) {
                              handleSingleImageUpload(
                                field.name,
                                e.target.files[0]
                              );
                            }
                          }}
                        />

                      </label>
                      {loadingImg[field.name] && (
                          <div className="w-6 h-6 border-3 border-blue-400 border-t-transparent rounded-full animate-spin" />
                        )}
                    </div>
                  </div>
                );
              }

              return null;
            })}
            {/* errror */}
            {inputErr && (
              <h2 className="text-red-600 text-center pt-0 font-semibold">
                {inputErr}..
              </h2>
            )}
          </div>
          <div className="flex flex-col justify-center items-center gap-2 mt-4 p-4 bg-green-100 rounded-lg">
            <h2 className="text-sm text-green-900 mr-10">you will receive Shareable Link on your email after payment is completed</h2>
            <input
              type="email"
              placeholder="Enter your email "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="py-3 px-3  w-full bg-green-50 rounded-lg border-dashed border-green-600 border-2 outline-0 text-green-800"
            />
            <button
              onClick={createInstance}
              disabled={btnLoader}
              aria-busy={btnLoader}
              aria-live="polite"
              className="
    w-full mt-0 py-3 rounded-2xl text-white text-xl font-semibold
    flex items-center justify-center gap-2
    bg-green-700 hover:bg-green-800 cursor-pointer
    active:scale-95 transition-all duration-300

    disabled:bg-neutral-300
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
    </div>
  );
}
