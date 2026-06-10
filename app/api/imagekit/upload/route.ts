import { imageKitLimiter } from "@/lib/ratelimit";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: Request) {
  try {
    // rate limit
    const ip = req.headers.get("x-forwarded-for") ?? "unknown"
    console.log("ip:", ip);

    const { success: rateLimitSucces } = await imageKitLimiter.limit(ip)

    if (!rateLimitSucces) {
      return Response.json({
        error: "Too many requests! , try again in a minute"
      }, {
        status: 429
      })
    }
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const fileName = formData.get("fileName") as string;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName,
      folder: "/template-images",
    });

    return Response.json({
      url: uploadResponse.url,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
