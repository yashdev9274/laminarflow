export const formatFileSize = (bytes: number): string => {
   if (bytes === 0) return "0 B"
   const k = 1024
   const sizes = ["B", "kB", "MB", "GB"]
   const i = Math.floor(Math.log(bytes) / Math.log(k))
   return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
 }
 
 export const generateTags = (filename: string): string[] => {
   const name = filename.toLowerCase()
   const tags: string[] = []
 
   if (name.includes("privacy") || name.includes("policy")) {
     tags.push("Privacy Policy")
   }
   if (name.includes("mercury")) {
     tags.push("Mercury Technologies")
   }
   if (name.includes("data") || name.includes("collection")) {
     tags.push("Data Collection")
   }
   if (name.includes("contract") || name.includes("agreement")) {
     tags.push("Legal Document")
   }
   if (name.includes("invoice") || name.includes("receipt")) {
     tags.push("Financial")
   }
   if (name.includes("report") || name.includes("analysis")) {
     tags.push("Report")
   }
 
   return tags.length > 0 ? tags : ["Document"]
 }
 