"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Bath, Bed, Briefcase, ChefHat, DoorOpen, Sofa, Utensils, Baby } from "lucide-react";
import { ProjectStepper } from "@/components/generator/ProjectStepper";
import { Button } from "@/components/ui/Button";
import { useGeneratorStore } from "@/store/generator.store";

const roomTypes = [
  { id: "living", label: "Living Room", icon: Sofa },
  { id: "bedroom", label: "Bedroom", icon: Bed },
  { id: "kitchen", label: "Kitchen", icon: ChefHat },
  { id: "office", label: "Office", icon: Briefcase },
  { id: "bathroom", label: "Bathroom", icon: Bath },
  { id: "dining", label: "Dining Room", icon: Utensils },
  { id: "hall", label: "Hallway", icon: DoorOpen },
  { id: "kids", label: "Kids Room", icon: Baby },
];

const floorTypes = ["Marble", "Hardwood", "Tiles", "Carpet", "Concrete", "Vinyl"];
const ceilingTypes = ["Standard", "False Ceiling", "Tray Ceiling", "Vaulted", "Coffered"];

export default function RoomDetailsPage() {
  const router = useRouter();
  const store = useGeneratorStore();
  const [roomType, setRoomType] = useState(store.roomType);
  const [floor, setFloor] = useState(store.floorType);
  const [ceiling, setCeiling] = useState(store.ceilingType);
  const [measurements, setMeasurements] = useState({
    length: store.length,
    width: store.width,
    height: store.height,
  });

  const isValid = roomType && measurements.length && measurements.width;
  const handleContinue = () => {
    store.setRoomType(roomType);
    store.setMeasurements(measurements.length, measurements.width, measurements.height);
    store.setFloorType(floor);
    store.setCeilingType(ceiling);
    router.push("/dashboard/style-selection");
  };

  return (
    <div className="mx-auto max-w-3xl">
      <ProjectStepper currentStep={2} />

      <div className="mb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-gold">Step 2</p>
        <h1 className="text-3xl font-bold text-white">Room details</h1>
        <p className="mt-2 text-sm text-gray-400">Add the room context AI needs for a better result.</p>
      </div>

      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-8 rounded-sm border border-white/10 bg-brand-panel/80 p-5">
        <h2 className="mb-4 font-semibold text-white">
          Room type <span className="text-red-400">*</span>
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {roomTypes.map((room) => (
            <button
              key={room.id}
              onClick={() => setRoomType(room.id)}
              className={`flex flex-col items-center gap-3 rounded-sm border p-4 text-center transition-all ${
                roomType === room.id
                  ? "border-brand-gold/60 bg-brand-gold/10 text-white"
                  : "border-white/10 bg-white/[0.03] text-gray-400 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <room.icon size={22} className={roomType === room.id ? "text-brand-gold" : "text-gray-500"} />
              <span className="text-xs font-medium leading-tight">{room.label}</span>
            </button>
          ))}
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mb-8 rounded-sm border border-white/10 bg-brand-panel/80 p-5">
        <h2 className="mb-4 font-semibold text-white">
          Measurements <span className="text-red-400">*</span>
          <span className="ml-2 text-sm font-normal text-gray-500">(feet)</span>
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { key: "length", label: "Length", placeholder: "14" },
            { key: "width", label: "Width", placeholder: "12" },
            { key: "height", label: "Height", placeholder: "10" },
          ].map((field) => (
            <div key={field.key}>
              <label className="mb-1.5 block text-sm text-gray-400">{field.label}</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder={field.placeholder}
                  value={measurements[field.key as keyof typeof measurements]}
                  onChange={(e) => setMeasurements({ ...measurements, [field.key]: e.target.value })}
                  className="w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3 pr-10 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-brand-gold/60"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-600">ft</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <div className="mb-10 grid gap-5 md:grid-cols-2">
        <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="rounded-sm border border-white/10 bg-brand-panel/80 p-5">
          <h2 className="mb-4 font-semibold text-white">Floor type <span className="text-sm font-normal text-gray-500">(optional)</span></h2>
          <div className="flex flex-wrap gap-2">
            {floorTypes.map((f) => (
              <button
                key={f}
                onClick={() => setFloor(floor === f ? "" : f)}
                className={`rounded-sm border px-4 py-2 text-sm font-medium transition-all ${
                  floor === f
                    ? "border-brand-gold/50 bg-brand-gold/10 text-brand-gold"
                    : "border-white/10 bg-white/[0.03] text-gray-400 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="rounded-sm border border-white/10 bg-brand-panel/80 p-5">
          <h2 className="mb-4 font-semibold text-white">Ceiling type <span className="text-sm font-normal text-gray-500">(optional)</span></h2>
          <div className="flex flex-wrap gap-2">
            {ceilingTypes.map((c) => (
              <button
                key={c}
                onClick={() => setCeiling(ceiling === c ? "" : c)}
                className={`rounded-sm border px-4 py-2 text-sm font-medium transition-all ${
                  ceiling === c
                    ? "border-brand-gold/50 bg-brand-gold/10 text-brand-gold"
                    : "border-white/10 bg-white/[0.03] text-gray-400 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </motion.section>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <Button variant="outline" size="lg" onClick={() => router.back()} className="rounded-sm border-white/15 text-white hover:bg-white/5 sm:w-auto">
          <ArrowLeft size={16} /> Back
        </Button>
        <Button variant="brand" size="lg" className="flex-1 rounded-sm uppercase tracking-wide" disabled={!isValid} onClick={handleContinue}>
          Continue to style <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}
