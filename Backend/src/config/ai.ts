import OpenAI from "openai";
import Replicate from "replicate";
import { ENV } from "./env";

const hasOpenAiKey =
  ENV.OPENAI_KEY &&
  !ENV.OPENAI_KEY.toLowerCase().includes("sk-your-openai-key") &&
  !ENV.OPENAI_KEY.toLowerCase().includes("your-openai-key");

const hasReplicateToken =
  ENV.REPLICATE_TOKEN &&
  !ENV.REPLICATE_TOKEN.toLowerCase().includes("your-replicate-token") &&
  !ENV.REPLICATE_TOKEN.toLowerCase().includes("replicate-token");

export const openai = hasOpenAiKey
  ? new OpenAI({
      apiKey: ENV.OPENAI_KEY,
    })
  : null;

export const replicate = hasReplicateToken
  ? new Replicate({
      auth: ENV.REPLICATE_TOKEN,
    })
  : null;
