// src/types/index.ts

export type VisitStatus = 
  | 'PENDING'
  | 'APPROVED'
  | 'DENIED'
  | 'CHECKED_IN'
  | 'CHECKED_OUT'
  | 'OVERSTAY';

export interface Visitor {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    company?: string;
    photoUrl?: string;
  }
  
  export interface Employee {
    id: number;
    fullName: string;
    email: string;
    department: string;
  }
  
  export interface Visit {
    id: number;
    visitorId: number;
    employeeId: number;
    purpose: string;
    checkIn: Date;
    checkOut?: Date;
    status: VisitStatus;
    visitor: Visitor;
    employee: Employee;
  }
  
  export interface Event {
    id: number;
    title: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    location: string;
    hostId: number;
    host: Employee;
    visitors: Visitor[];
  }
  
  export interface Admin {
    id: number;
    fullName: string;
    email: string;
  }


  // src/types/index.ts
export interface QRData {
    id: number;
    visitorId: number;
    timestamp: string;
  }