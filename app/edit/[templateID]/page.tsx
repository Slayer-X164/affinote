"use client";
import BirthdayTimeline from "@/components/templates/Template1";
import LoveLetter from "@/components/templates/Template2";
import Navbar from "@/components/ui/Navbar";
import { Templates } from "@/data/template";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import z from "zod";
import toast, { Toaster } from "react-hot-toast";
import ButtonLoder from "@/components/ui/ButtonLoder";
import { uploadImages } from "@/lib/uploadImages";
import EnvelopeLetter from "@/components/templates/EnvolopeTemplate";
const componentMap = {
  "birthday-timeline": BirthdayTimeline,
  "love-letter": LoveLetter,
  "envolope-letter":EnvelopeLetter,
};
type templateKey = keyof typeof componentMap;

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
  const generateSchema = (fields: any[]) => {
    const shape: any = {};

    fields.forEach((field) => {
      if (field.type === "text") {
        shape[field.name] = z.string().min(1, `${field.name} is required`);
      }

      if (field.type === "textarea") {
        shape[field.name] = z.string().min(1, `${field.name} is required`);
      }

      if (field.type === "images") {
        shape[field.name] = z
          .array(
            z.object({
              img: z.string().min(1, "Image missing"),
              text: z.string().optional(),
            })
          )
          .length(
            field.count!,
            `Please upload all ${field.count} images for ${field.name}`
          );
      }
    });

    return z.object(shape);
  };
  const handleTextChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleImageUpload = async (
    fieldName: string,
    index: number,
    file: File
  ) => {
    if (!templateID) return;

    const imageUrl = await uploadImages(
      file,
      "temp",
      fieldName,
      index
    );

    setFormData((prev: any) => {
      const updated = { ...prev };
      if (!updated[fieldName]) updated[fieldName] = [];
      updated[fieldName][index] = { img: imageUrl, text: "" };
      return updated;
    });
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
    const response = await fetch("/api/create-instance", {
      method: "POST",
      body: JSON.stringify({
        template_id: templateID,
        data: formData,
      }),
    });
    const supData = await response.json();

    if (supData.id) {
      setBtnLoader(false);
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
        <div className="w-full lg:w-[60%] bg-blue-50 border-blue-400 border-2 rounded-2xl overflow-hidden relative">
          <h3 className="text-center bg-black text-neutral-50 text-sm py-0.5">
            Live Preview
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
                      className="w-full bg-blue-50 border-3 border-blue-300   p-2 rounded-2xl "
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
                      className="w-full bg-blue-50 border-3 border-blue-300   p-2 rounded-2xl "
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
                    <label className="block lowercase text-neutral-900 text-sm font-semibold mb-2">
                      {field.name}:
                    </label>

                    <div className="space-y-3">
                      {Array.from({ length: field.count ?? 0 }).map(
                        (_, index) => (
                          <div
                            key={index}
                            className="flex items-center p-2  bg-neutral-200 border-2 rounded-2xl  border-dashed "
                          >
                            {/* Preview */}
                            <img
                              src={
                                formData[field.name]?.[index]?.img ||
                                "https://placehold.co/80x80"
                              }
                              className="w-20 h-20 rounded-2xl object-cover bg-blue-50 border  border-neutral-400"
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
            {/* errror */}
            {inputErr && (
              <h2 className="text-red-600 text-center pt-2 font-semibold">
                {inputErr}..
              </h2>
            )}
          </div>
          <button
            onClick={() => {
              createInstance();
            }}
            className="w-full transition-all duration-300 py-4 active:scale-95 cursor-pointer mt-6 bg-blue-500 hover:bg-blue-600  rounded-2xl text-white text-xl font-semibold flex justify-center"
          >
            {btnLoader ? (
              <ButtonLoder />
            ) : (
              ` Get Shareable Link at ₹${currTemplate?.price}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
