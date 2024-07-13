import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatGithubUrl = (url: string): string => {
  if (url.includes("git://")) {
    return url.replace("git://", "https://");
  }

  if (url.includes("git+https://")) {
    return url.replace("git+https://", "https://");
  }

  return url;
};
