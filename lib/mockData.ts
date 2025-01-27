import { Member, Equipment, Admin } from './schema';

export const members: Member[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    matriculationNumber: '2021001A',
    membershipStatus: 'Active',
    lastEntry: new Date('2023-06-01T09:00:00'),
    lastExit: new Date('2023-06-01T11:00:00'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    matriculationNumber: '2021002B',
    membershipStatus: 'Active',
    lastEntry: new Date('2023-06-02T14:00:00'),
    lastExit: new Date('2023-06-02T16:00:00'),
  },
];

export const equipment: Equipment[] = [
  {
    id: '1',
    name: 'Treadmill',
    maintenanceDate: new Date('2023-07-01'),
    health: 95,
    lastMaintainedAt: new Date('2023-05-01'),
  },
  {
    id: '2',
    name: 'Bench Press',
    maintenanceDate: new Date('2023-07-15'),
    health: 88,
    lastMaintainedAt: new Date('2023-05-15'),
  },
];

export const admins: Admin[] = [
  {
    id: '1',
    name: 'Admin User',
    matriculationNo: '2020001C',
    school: 'School of Engineering',
    kind: 'Staff',
  },
  {
    id: '2',
    name: 'Super Admin',
    matriculationNo: '2019001D',
    school: 'School of Computing',
    kind: 'Staff',
  },
];

