"use client";
import BirthdayTimeline from "@/components/templates/Template1";
import LoveLetter from "@/components/templates/Template2";
import Navbar from "@/components/ui/Navbar";
import { Templates } from "@/data/template";
import { useParams } from "next/navigation";
import { useState } from "react";

const componentMap = {
  "birthday-timeline": BirthdayTimeline,
  "love-letter": LoveLetter,
};
type templateKey = keyof typeof componentMap;

export default function page() {
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

      updated[fieldName][index] = url;
      return updated;
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Navbar />
      <div className="h-full max-w-6xl px-3 w-full py-10 flex gap-6 flex-col lg:flex-row items-start ">
        <div className="w-1/2  ">
          <DisplayTemplate {...formData} />
        </div>
        <div className="w-full lg:w-1/2 min-h-full  bg-white p-6">
          <h2 className="text-2xl font-semibold mb-6 text-pink-600">
            Customize: {currTemplate?.title}
          </h2>

          {/* THE EDITOR WILL BE ADDED HERE */}
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

              // TEXTAREA INPUT
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
                      {Array.from({ length: field.count ?? 0 }).map((_, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 bg-neutral-300 border-2 rounded-2xl border-dashed p-4"
                        >
                          {/* Preview */}
                          <img
                            src={
                              formData[field.name]?.[index] ||
                              "https://placehold.co/80x80"
                            }
                            className="w-20 h-20 rounded-2xl object-cover border border-neutral-400"
                          />

                          {/* Upload */}
                          <input
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
                      ))}
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>
          <button className="w-full py-3 cursor-pointer mt-4 bg-pink-600 rounded-xl text-neutral-50 text-xl font-semibold">
            get shareable link at ₹{currTemplate?.price}
          </button>
        </div>
      </div>
    </div>
  );
}
