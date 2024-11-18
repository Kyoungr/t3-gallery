import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm/sql";
import { revalidatePath } from "next/cache";

export async function getMyImages() {
  const user = await auth();

  if (!user.userId) throw new Error("Unauthorized");
  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}

export async function getImage(id: number) {
  const user = await auth();
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");
  if (image.userId !== user.userId) throw new Error("Unathorized");

  return image;
}

export async function deleteImage(id: number) {
  const user = await auth();
  if (!user.userId) throw new Error("Unathorized");
  try {
    await db
      .delete(images)
      .where(and(eq(images.id, id), eq(images.userId, user.userId)));
    redirect("/");
  } catch (error) {
    // Log the error if needed
    console.error("Error deleting image:", error);
    throw error;
  }
}
