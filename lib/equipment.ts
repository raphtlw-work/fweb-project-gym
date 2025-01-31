import { parseISO } from "date-fns";

export function calculateEquipmentHealth(
  lastMaintainedAt: Date | string,
  maintenanceDate: Date | string
): number {
  if (typeof lastMaintainedAt === "string") {
    lastMaintainedAt = parseISO(lastMaintainedAt);
  }
  if (typeof maintenanceDate === "string") {
    maintenanceDate = parseISO(maintenanceDate);
  }

  const totalDuration = maintenanceDate.getTime() - lastMaintainedAt.getTime();
  const elapsedDuration = Date.now() - lastMaintainedAt.getTime();
  const health = 100 - (elapsedDuration / totalDuration) * 100;
  return Math.max(0, Math.min(100, Math.round(health)));
}

export function needsReplacement(lastMaintainedAt: Date): boolean {
  const replacementDate = new Date(lastMaintainedAt);
  replacementDate.setFullYear(replacementDate.getFullYear() + EQUIPMENT_REPLACEMENT_PERIOD_YEARS);
  return new Date() >= replacementDate;
}
