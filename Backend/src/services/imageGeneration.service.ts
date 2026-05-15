import { openai, replicate } from "../config/ai";
import { ENV } from "../config/env";
import cloudinary from "../config/cloudinary";
import { buildPrompt, getNegativePrompt } from "./promptBuilder.service";

interface GenerateInput {
  roomType: string;
  style: string;
  length?: number;
  width?: number;
  height?: number;
  floorType?: string;
  ceilingType?: string;
  assets: string[];
  outputType: "2d" | "3d" | "video";
  roomImageUrl?: string;
}

interface GenerateResult {
  outputUrl: string;
  cloudinaryId: string;
  prompt: string;
  provider: string;
}

const uploadToCloudinary = async (
  imageUrl: string,
  folder = "framework/generations"
): Promise<{ url: string; publicId: string }> => {
  const result = await cloudinary.uploader.upload(imageUrl, {
    folder,
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  });

  return { url: result.secure_url, publicId: result.public_id };
};

const isMissingSecret = (value: string, placeholders: string[]) => {
  if (!value || !value.trim()) {
    return true;
  }

  const normalized = value.toLowerCase();
  return placeholders.some((placeholder) => normalized.includes(placeholder));
};

const hasReplicateKey = () =>
  !isMissingSecret(ENV.REPLICATE_TOKEN, [
    "your-replicate-token",
    "replicate-token",
  ]);

const hasOpenAiKey = () =>
  !isMissingSecret(ENV.OPENAI_KEY, ["sk-your-openai-key", "your-openai-key"]);

const escapeSvgText = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const uploadDemoConcept = async (
  prompt: string,
  data: GenerateInput
): Promise<{ url: string; publicId: string }> => {
  const room = escapeSvgText(data.roomType || "room");
  const style = escapeSvgText(data.style || "modern");
  const output = escapeSvgText(data.outputType.toUpperCase());
  const assets = escapeSvgText(data.assets.length ? data.assets.join(", ") : "curated furniture, lighting, decor");
  const promptPreview = escapeSvgText(prompt.slice(0, 190));

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="900" viewBox="0 0 1280 900">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#09090f"/>
      <stop offset="0.55" stop-color="#191510"/>
      <stop offset="1" stop-color="#0f1018"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f8b544"/>
      <stop offset="1" stop-color="#b97612"/>
    </linearGradient>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M64 0H0V64" fill="none" stroke="#ffffff" stroke-opacity="0.06" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1280" height="900" fill="url(#bg)"/>
  <rect width="1280" height="900" fill="url(#grid)"/>
  <rect x="72" y="72" width="1136" height="756" rx="8" fill="#111118" stroke="#f5a623" stroke-opacity="0.34"/>
  <rect x="104" y="104" width="520" height="560" rx="6" fill="#1f1f1f"/>
  <path d="M104 664L274 428L392 548L510 356L624 664Z" fill="#2c2c2c"/>
  <rect x="144" y="162" width="440" height="260" rx="4" fill="#2b241b"/>
  <rect x="172" y="198" width="158" height="92" rx="4" fill="#463829"/>
  <rect x="354" y="198" width="186" height="92" rx="4" fill="#60472e"/>
  <rect x="172" y="316" width="368" height="62" rx="4" fill="#141414"/>
  <circle cx="500" cy="496" r="56" fill="url(#gold)" opacity="0.88"/>
  <rect x="672" y="124" width="420" height="24" fill="url(#gold)"/>
  <text x="672" y="204" fill="#ffffff" font-family="Arial, sans-serif" font-size="58" font-weight="800">Demo concept</text>
  <text x="672" y="254" fill="#c8c8d0" font-family="Arial, sans-serif" font-size="24">Cloudinary output generated without an AI provider key.</text>
  <text x="672" y="346" fill="#f5a623" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="4">ROOM</text>
  <text x="672" y="386" fill="#ffffff" font-family="Arial, sans-serif" font-size="34" font-weight="700">${room}</text>
  <text x="672" y="456" fill="#f5a623" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="4">STYLE</text>
  <text x="672" y="496" fill="#ffffff" font-family="Arial, sans-serif" font-size="34" font-weight="700">${style}</text>
  <text x="672" y="566" fill="#f5a623" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="4">OUTPUT</text>
  <text x="672" y="606" fill="#ffffff" font-family="Arial, sans-serif" font-size="34" font-weight="700">${output}</text>
  <text x="104" y="740" fill="#f5a623" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="4">ASSETS</text>
  <text x="104" y="780" fill="#ffffff" font-family="Arial, sans-serif" font-size="24">${assets}</text>
  <text x="104" y="814" fill="#8f95a3" font-family="Arial, sans-serif" font-size="18">${promptPreview}</text>
</svg>`;

  const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "framework/demo-generations",
    resource_type: "image",
  });

  return { url: result.secure_url, publicId: result.public_id };
};

const generateWithReplicate = async (
  prompt: string,
  negativePrompt: string
): Promise<string> => {
  if (!replicate) {
    throw new Error("Replicate token is not configured.");
  }

  const output = await replicate.run(
    "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
    {
      input: {
        prompt,
        negative_prompt: negativePrompt,
        width: 1024,
        height: 1024,
        num_inference_steps: 30,
        guidance_scale: 7.5,
      },
    }
  );

  if (Array.isArray(output) && output[0]) {
    return String(output[0]);
  }

  if (typeof output === "string") {
    return output;
  }

  throw new Error("Replicate did not return an image URL");
};

const generateWithOpenAI = async (prompt: string): Promise<string> => {
  if (!openai) {
    throw new Error("OpenAI API key is not configured.");
  }

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `Interior design: ${prompt}`,
    n: 1,
    size: "1024x1024",
    quality: "hd",
    style: "natural",
  });

  const url = response.data?.[0]?.url;
  if (!url) {
    throw new Error("OpenAI did not return an image URL");
  }

  return url;
};

export const generateInteriorDesign = async (
  data: GenerateInput
): Promise<GenerateResult> => {
  const prompt = buildPrompt(data);
  const negativePrompt = getNegativePrompt();
  let imageUrl: string;
  let provider: string;

  if (!hasReplicateKey() && !hasOpenAiKey()) {
    const { url, publicId } = await uploadDemoConcept(prompt, data);

    return {
      outputUrl: url,
      cloudinaryId: publicId,
      prompt,
      provider: "demo-cloudinary",
    };
  }

  try {
    console.log("Generating with Replicate SDXL...");
    imageUrl = await generateWithReplicate(prompt, negativePrompt);
    provider = "replicate-sdxl";
  } catch (replicateError) {
    console.warn("Replicate failed, falling back to OpenAI:", replicateError);
    const replicateMessage =
      replicateError instanceof Error ? replicateError.message : String(replicateError);

    if (replicateMessage.toLowerCase().includes("insufficient credit")) {
      throw new Error(
        "Replicate has insufficient credit. Add billing credit at https://replicate.com/account/billing, then try again."
      );
    }

    try {
      imageUrl = await generateWithOpenAI(prompt);
      provider = "openai-dalle3";
    } catch (openaiError) {
      const openaiMessage =
        openaiError instanceof Error ? openaiError.message : String(openaiError);
      throw new Error(`All AI providers failed. Replicate: ${replicateMessage}. OpenAI: ${openaiMessage}`);
    }
  }

  const { url, publicId } = await uploadToCloudinary(imageUrl);

  return {
    outputUrl: url,
    cloudinaryId: publicId,
    prompt,
    provider,
  };
};
