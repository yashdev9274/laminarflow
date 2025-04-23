import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function createSectionId(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}