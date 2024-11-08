import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatviews(view : string){
  if (Number(view) > 1 ) return  `${view} views`
  else if(Number(view) <= 1  ) return `${view} view`
}

export function parseServerActionResponse<T>(response : T){
  return JSON.parse(JSON.stringify(response))
}