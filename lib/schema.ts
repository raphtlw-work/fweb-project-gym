export interface Member {
  id: string;
  name: string;
  email: string;
  matriculationNumber: string;
  membershipStatus: string;
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
