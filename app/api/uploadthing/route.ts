import { createRouteHandler } from "uploadthing/next";
 
import { ourFileRouter } from "./core";
 
// Export routes for App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});