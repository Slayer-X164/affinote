"use client";
import BirthdayTimeline from "@/components/templates/Template1";
import LoveLetter from "@/components/templates/Template2";
import Navbar from "@/components/ui/Navbar";
import { Templates } from "@/data/template";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
const componentMap = {
  "birthday-timeline": BirthdayTimeline,
  "love-letter": LoveLetter,
};
type templateKey = keyof typeof componentMap;

export default function page() {
  const router = useRouter();
  const params = useParams();
  const templateID = params.templateID as templateKey;
  const currTemplate = Templates.find((t) => t.id === templateID);
  const DisplayTemplate = componentMap[templateID];
  //   form control
  const [formData, setFormData] = useState<any>({});
  const handleTextChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleImageUpload = (fieldName: string, index: number, file: File) => {
    const url = URL.createObjectURL(file);

    setFormData((prev: any) => {
      const updated = { ...prev };

      if (!updated[fieldName]) {
        updated[fieldName] = [];
      }

      updated[fieldName][index] = { img: url, text: "" };
      return updated;
    });
  };
  // storing tempate data to supabase and redirect to payment page
  const createInstance = async () => {
    const response = await fetch("/api/create-instance", {
      method: "POST",
      body: JSON.stringify({
        template_id: templateID,
        data: formData,
      }),
    });
    const supData = await response.json();

    if (supData.id) {
      router.push(`/payment?instance=${supData.id}`);
    } else {
      console.error("No ID returned from backend");
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Navbar />
      <div className="h-full max-w-6xl px-3 w-full py-10 flex flex-col-reverse gap-6  lg:flex-row items-start ">
        <div className="w-full lg:w-[60%] border-rose-400 border-2 rounded-2xl overflow-hidden relative">
          <h3 className="text-center bg-black text-neutral-50 text-sm py-0.5">
            Live Preview
          </h3>
          <DisplayTemplate {...formData} />
        </div>
        <div className="w-full lg:w-[40%] min-h-full  bg-white px-3">
          <h2 className="text-2xl font-semibold mb-6 text-pink-600">
            Customize: {currTemplate?.title}
          </h2>

          <div className="space-y-6">
            {currTemplate?.fields.map((field) => {
              // TEXT INPUT
              if (field.type === "text") {
                return (
                  <div key={field.name}>
                    <label className="block font-medium mb-1">
                      {field.name}
                    </label>
                    <input
                      className="w-full border p-2 rounded"
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
                    <label className="block font-medium mb-1">
                      {field.name}
                    </label>
                    <textarea
                      className="w-full border p-2 rounded"
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
              if (field.type === "images") {
                return (
                  <div key={field.name}>
                    <label className="block font-medium mb-2">
                      {field.name}
                    </label>

                    <div className="space-y-3">
                      {Array.from({ length: field.count ?? 0 }).map(
                        (_, index) => (
                          <div
                            key={index}
                            className="flex items-center p-2 bg-neutral-300 border-2 rounded-2xl border-dashed "
                          >
                            {/* Preview */}
                            <img
                              src={
                                formData[field.name]?.[index]?.img ||
                                "https://placehold.co/80x80"
                              }
                              className="w-20 h-20 rounded-2xl object-cover border border-neutral-400"
                            />

                            {/* Upload */}
                            <input
                              className="p-4 "
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files) {
                                  handleImageUpload(
                                    field.name,
                                    index,
                                    e.target.files[0]
                                  );
                                }
                              }}
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>
          <button
            onClick={createInstance}
            className="w-full py-3 cursor-pointer mt-4 bg-pink-600 rounded-xl text-neutral-50 text-xl font-semibold"
          >
            get shareable link at ₹{currTemplate?.price}
          </button>
        </div>
      </div>
    </div>
  );
}
