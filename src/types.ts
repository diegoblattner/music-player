export type Track = {
  src: string;
  title: string;
  artist: string;
  duration: number;
  type: "audio" | "video";
};

export type Repeat = "none" | "one" | "all";

