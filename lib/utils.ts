import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateEquipmentHealth(
  lastMaintainedAt: Date,
  maintenanceDate: Date
): number {
  const now = new Date();
  const totalDays =
    (maintenanceDate.getTime() - lastMaintainedAt.getTime()) /
    (1000 * 3600 * 24);
  const daysSinceLastMaintenance =
    (now.getTime() - lastMaintainedAt.getTime()) / (1000 * 3600 * 24);

  const healthPercentage = 100 - (daysSinceLastMaintenance / totalDays) * 100;
  return Math.max(0, Math.min(100, Math.round(healthPercentage)));
}
