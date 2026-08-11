export type ModelModality = "text" | "image" | "audio" | "video" | "file";

export type ModalityConfig = {
  id: ModelModality;
  label: string;
  /** TheModelToken pricing icon path */
  icon: string;
};

export const MODALITIES = {
  text: {
    id: "text",
    label: "Text",
    icon: "/models/modalities/text.svg",
  },
  image: {
    id: "image",
    label: "Image",
    icon: "/models/modalities/image.svg",
  },
  audio: {
    id: "audio",
    label: "Audio",
    icon: "/models/modalities/audio.svg",
  },
  video: {
    id: "video",
    label: "Video",
    icon: "/models/modalities/video.svg",
  },
  file: {
    id: "file",
    label: "File",
    // TheModelToken uses docs.svg for the File filter mark
    icon: "/models/modalities/docs.svg",
  },
} satisfies Record<ModelModality, ModalityConfig>;

export const INPUT_MODALITIES: ModalityConfig[] = [
  MODALITIES.text,
  MODALITIES.image,
  MODALITIES.audio,
  MODALITIES.video,
  MODALITIES.file,
];

export const OUTPUT_MODALITIES: ModalityConfig[] = [
  MODALITIES.text,
  MODALITIES.image,
  MODALITIES.audio,
  MODALITIES.video,
];

export function getModalityConfig(modality: ModelModality): ModalityConfig {
  return MODALITIES[modality];
}

/** Normalize legacy / alias values → canonical ModelModality */
export function normalizeModality(value: string): ModelModality | null {
  const key = value.trim().toLowerCase();
  switch (key) {
    case "text":
    case "文字":
    case "文本":
      return "text";
    case "image":
    case "图片":
    case "图像":
    case "photo":
    case "vision":
    case "视觉":
      return "image";
    case "audio":
    case "音频":
    case "sound":
    case "声音":
      return "audio";
    case "video":
    case "视频":
      return "video";
    case "file":
    case "docs":
    case "document":
    case "documentation":
    case "文档":
    case "文件":
      return "file";
    default:
      return null;
  }
}
