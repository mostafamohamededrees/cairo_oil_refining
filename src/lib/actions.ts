"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { DeviceFormData } from "@/types/device";

export async function getAllDevices() {
  return await prisma.device.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      subtitle: true,
      methodCode: true,
      lastReview: true,
      standard: true,
      createdAt: true,
    },
  });
}

export async function getDevice(id: string) {
  return await prisma.device.findUnique({
    where: { id },
  });
}

export async function createDevice(data: DeviceFormData) {
  const device = await prisma.device.create({
    data: {
      ...data,
      steps: data.steps as object[],
    },
  });
  revalidatePath("/admin/devices");
  return device;
}

export async function updateDevice(id: string, data: DeviceFormData) {
  const device = await prisma.device.update({
    where: { id },
    data: {
      ...data,
      steps: data.steps as object[],
    },
  });
  revalidatePath("/admin/devices");
  revalidatePath(`/admin/devices/${id}`);
  revalidatePath(`/device/${id}`);
  return device;
}

export async function deleteDevice(id: string) {
  await prisma.device.delete({ where: { id } });
  revalidatePath("/admin/devices");
}
