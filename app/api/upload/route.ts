import { createUploadthing, type FileRouter } from "uploadthing/server";
import { createRouteHandler } from "uploadthing/next";

const f = createUploadthing();

const ourFileRouter = {
  resumeUploader: f({
    pdf: { maxFileSize: "8MB" },
  })
    .middleware(async () => {
      return { uploadedAt: new Date().toISOString() };
    })
    .onUploadComplete(async ({ file }) => {
      console.log("Upload complete:", file.ufsUrl ?? file.url);
      return { url: file.ufsUrl ?? file.url };
    }),
} satisfies FileRouter;

type OurFileRouter = typeof ourFileRouter;

const handlers = createRouteHandler({
  router: ourFileRouter,
});

export { handlers as GET, handlers as POST };
