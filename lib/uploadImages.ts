export async function uploadImages(
  file: File,
  instanceId: string,
  fieldName: string,
  index: number
) {
  const body = new FormData();
  body.append("file", file);
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
