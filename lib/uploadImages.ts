import imageCompression from "browser-image-compression"
export async function uploadImages(
  file: File,
  instanceId: string,
  fieldName: string,
  index: number
) {
  // compress images
  const compressedFile = await imageCompression(file,{
    maxSizeMB:0.2,
    maxWidthOrHeight: 1920,
    fileType:"image/webp",
    useWebWorker:true
  })
  const body = new FormData();
  body.append("file", compressedFile);
  body.append(
    "fileName",
    `${instanceId}-${fieldName}-${index}-${Date.now()}`
  );

  const res = await fetch("/api/imagekit/upload", {
    method: "POST",
    body,
  });

  if (!res.ok) {
    throw new Error("Image upload failed");
  }

  const data = await res.json();
  return data.url;
}
