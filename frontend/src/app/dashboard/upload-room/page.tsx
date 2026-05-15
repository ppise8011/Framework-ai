"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Expand, ImageIcon, Lightbulb, ScanLine, Upload, X } from "lucide-react";
import { ProjectStepper } from "@/components/generator/ProjectStepper";
import { Button } from "@/components/ui/Button";
import { projectService } from "@/services/project.service";
import { useGeneratorStore } from "@/store/generator.store";
import toast from "react-hot-toast";

const tips = [
  { icon: Lightbulb, tip: "Good lighting" },
  { icon: Expand, tip: "Show full room" },
  { icon: ScanLine, tip: "Avoid blur" },
];

export default function UploadRoomPage() {
  const router = useRouter();
  const store = useGeneratorStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setSelectedFile(file);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleContinue = async () => {
    if (!image || !selectedFile) return;

    if (!store.projectId) {
      toast.error("Please start from Create Project");
      router.push("/dashboard/create-project");
      return;
    }

    setUploading(true);
    try {
      const upload = await projectService.uploadRoomImage(store.projectId, selectedFile);
      store.setUploadedImage(image, upload.url);
      router.push("/dashboard/room-details");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to upload room image";
      toast.error(message);
      setUploading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <ProjectStepper currentStep={1} />

      <div className="mb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-gold">Step 1</p>
        <h1 className="text-3xl font-bold text-white">Upload your room photo</h1>
        <p className="mt-2 text-sm text-gray-400">
          A clear, wide room photo gives better AI analysis. Any angle works.
        </p>
      </div>

      {!image ? (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`interactive-lift relative cursor-pointer rounded-md border-2 border-dashed p-8 text-center sm:p-16 ${
            dragging
              ? "border-brand-gold bg-brand-gold/10"
              : "border-white/10 bg-brand-panel/80 hover:border-brand-gold/45 hover:bg-brand-panel2"
          }`}
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-sm border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">
            <Upload size={28} />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">
            {dragging ? "Drop your photo here" : "Click or drag to upload"}
          </h3>
          <p className="mb-5 text-sm text-gray-500">Supports JPG, PNG, WEBP. Max 10MB.</p>
          <div className="inline-flex items-center gap-2 rounded-sm border border-brand-gold/30 bg-brand-gold/10 px-4 py-2">
            <ImageIcon size={14} className="text-brand-gold" />
            <span className="text-xs font-semibold text-brand-gold">Choose photo</span>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-sm border border-white/10 bg-brand-panel"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="Room" className="max-h-[320px] w-full object-cover sm:max-h-[440px]" />
          <button
            onClick={() => {
              setImage(null);
              setSelectedFile(null);
              setFileName("");
            }}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-sm bg-black/70 text-white transition-all hover:bg-black"
            aria-label="Remove uploaded photo"
          >
            <X size={15} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent p-5">
            <p className="text-sm font-semibold text-white">{fileName}</p>
            <p className="mt-1 text-xs text-gray-300">Photo ready for AI analysis</p>
          </div>
        </motion.div>
      )}

      <div className="my-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {tips.map((t) => (
          <div key={t.tip} className="rounded-sm border border-white/10 bg-brand-panel/80 p-4 text-center">
            <t.icon size={20} className="mx-auto mb-2 text-brand-gold" />
            <div className="text-xs font-medium text-gray-400">{t.tip}</div>
          </div>
        ))}
      </div>

      <Button
        variant="brand"
        size="lg"
        className="w-full rounded-sm uppercase tracking-wide"
        disabled={!image}
        loading={uploading}
        onClick={handleContinue}
      >
        Continue to room details
        <ArrowRight size={18} />
      </Button>
    </div>
  );
}
