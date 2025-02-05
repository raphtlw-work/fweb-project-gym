export interface Member {
  id: string;
  name: string;
  email: string;
  matriculationNumber: string;
  membershipStatus: "Active" | "Inactive";
  type: "Student" | "Staff";
  remarks: string;

  lastEntry: Date | null;
  lastExit: Date | null;
}

export interface Equipment {
  id: string;
  name: string;
  maintenanceDate: Date;
  lastMaintainedAt: Date;
}

export interface Admin {
  id: string;
  name: string;
  matriculationNo: string;
  school: string;
  kind: string;
}

export type UserRole = "member" | "staff" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}
