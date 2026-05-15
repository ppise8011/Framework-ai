import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GeneratorStore {
  projectId: string | null;
  uploadedImage: string | null;
  uploadedUrl: string | null;
  roomType: string;
  style: string;
  length: string;
  width: string;
  height: string;
  floorType: string;
  ceilingType: string;
  assets: string[];
  outputType: string;
  resultUrl: string | null;
  setProjectId: (id: string) => void;
  setUploadedImage: (img: string, url: string) => void;
  setRoomType: (value: string) => void;
  setStyle: (value: string) => void;
  setMeasurements: (length: string, width: string, height: string) => void;
  setFloorType: (value: string) => void;
  setCeilingType: (value: string) => void;
  toggleAsset: (id: string) => void;
  setOutputType: (value: string) => void;
  setResultUrl: (url: string) => void;
  reset: () => void;
}

const defaultState = {
  projectId: null,
  uploadedImage: null,
  uploadedUrl: null,
  roomType: "",
  style: "",
  length: "",
  width: "",
  height: "",
  floorType: "",
  ceilingType: "",
  assets: [] as string[],
  outputType: "3d",
  resultUrl: null,
};

export const useGeneratorStore = create<GeneratorStore>()(
  persist(
    (set) => ({
      ...defaultState,
      setProjectId: (id) => set({ projectId: id }),
      setUploadedImage: (img, url) => set({ uploadedImage: img, uploadedUrl: url }),
      setRoomType: (value) => set({ roomType: value }),
      setStyle: (value) => set({ style: value }),
      setMeasurements: (length, width, height) => set({ length, width, height }),
      setFloorType: (value) => set({ floorType: value }),
      setCeilingType: (value) => set({ ceilingType: value }),
      toggleAsset: (id) =>
        set((state) => ({
          assets: state.assets.includes(id)
            ? state.assets.filter((asset) => asset !== id)
            : [...state.assets, id],
        })),
      setOutputType: (value) => set({ outputType: value }),
      setResultUrl: (url) => set({ resultUrl: url }),
      reset: () => set(defaultState),
    }),
    {
      name: "framework_generator_state",
    }
  )
);
