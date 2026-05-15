interface PromptData {
  roomType: string;
  style: string;
  length?: number;
  width?: number;
  height?: number;
  floorType?: string;
  ceilingType?: string;
  assets: string[];
  outputType: string;
}

const styleDescriptions: Record<string, string> = {
  modern: "modern contemporary design with clean lines, neutral tones, minimalist furniture",
  luxury: "ultra-luxury design with rich textures, marble surfaces, gold accents, premium materials",
  scandinavian: "Scandinavian hygge design with warm woods, white walls, cozy textiles, functional simplicity",
  minimal: "ultra-minimalist design with white spaces, hidden storage, monochrome palette",
  industrial: "industrial loft design with exposed brick, raw metal, Edison bulbs, concrete floors",
  traditional: "traditional classic design with ornate furniture, rich colors, crown molding, timeless elegance",
  bohemian: "bohemian eclectic design with layered textiles, vibrant colors, plants, macrame, vintage pieces",
  japandi: "Japandi fusion design blending Japanese minimalism with Scandinavian warmth, natural materials",
  indian: "Indian contemporary design with rich jewel tones, intricate patterns, brass accents, cultural elements",
  hotel: "premium 5-star hotel suite design with sophisticated finishes, curated art, plush textures",
  office: "modern corporate office design with clean lines, ergonomic furniture, professional atmosphere",
  coastal: "coastal beach house design with light blues, whites, natural textures, airy open feel",
};

const assetDescriptions: Record<string, string> = {
  sofa: "comfortable premium sofa",
  armchair: "elegant armchair",
  ottoman: "stylish ottoman",
  bench: "decorative bench",
  coffee: "designer coffee table",
  dining: "dining table with chairs",
  study: "modern study table",
  side_table: "bedside side table",
  wardrobe: "built-in wardrobe",
  bookshelf: "floor-to-ceiling bookshelf",
  tv_unit: "sleek TV unit with storage",
  cabinet: "storage cabinet",
  plants: "lush indoor plants and greenery",
  wall_art: "curated wall art and decor",
  carpet: "premium area rug",
  curtains: "floor-length elegant curtains",
  ceiling_light: "designer ceiling light fixture",
  floor_lamp: "artistic floor lamp",
  wall_lamp: "ambient wall sconces",
  pendant: "statement pendant lighting",
  bed: "king-size luxury bed with headboard",
  nightstand: "matching nightstands",
  dresser: "elegant dresser with mirror",
  mirror: "full-length decorative mirror",
};

const roomDescriptions: Record<string, string> = {
  living: "living room",
  bedroom: "master bedroom",
  kitchen: "modern kitchen",
  office: "home office",
  bathroom: "luxury bathroom",
  dining: "dining room",
  hall: "entrance hallway",
  kids: "children's bedroom",
};

export const buildPrompt = (data: PromptData): string => {
  const room = roomDescriptions[data.roomType] || data.roomType;
  const style = styleDescriptions[data.style] || data.style;
  const assetList = data.assets.map((asset) => assetDescriptions[asset] || asset).join(", ");
  const sizeContext =
    data.length && data.width
      ? `${data.length}ft x ${data.width}ft${data.height ? ` x ${data.height}ft ceiling` : ""}`
      : "";
  const materialContext = [
    data.floorType ? `${data.floorType.toLowerCase()} flooring` : "",
    data.ceilingType ? `${data.ceilingType.toLowerCase()} ceiling` : "",
  ]
    .filter(Boolean)
    .join(", ");
  const outputSuffix =
    {
      "2d": "professional 2D architectural floor plan layout, top-down view, clean lines, labeled rooms",
      "3d": "photorealistic 3D interior render, architectural visualization, ultra realistic, 8K quality, ray tracing, professional photography, interior design magazine quality",
      video:
        "cinematic interior walkthrough, smooth camera movement, photorealistic render, professional architectural visualization",
    }[data.outputType] || "photorealistic 3D render";

  return [
    `A stunning ${style} ${room} interior design`,
    sizeContext ? `in a ${sizeContext} space` : "",
    assetList ? `featuring ${assetList}` : "",
    materialContext ? `with ${materialContext}` : "",
    "perfect lighting, professional interior design",
    outputSuffix,
  ]
    .filter(Boolean)
    .join(", ");
};

export const getNegativePrompt = (): string =>
  "blurry, low quality, distorted, unrealistic, cartoon, sketch, drawing, watermark, text, people, humans, ugly, bad proportions, oversaturated";
