export type TEventStatus = "AVAILABLE" | "IN_PROGRESS" | "BOOKED";

export interface IEvent {
  id: number;
  date: string;
  event_status: TEventStatus;
  created_at: string;
  updated_at: string;
}

export interface IEventPaginatedResponse {
  events: IEvent[];
  total_pages: number;
  total_records: number;
}

export interface IEventCreateRequest {
  event_status: "AVAILABLE";
  date: Date;
}

export interface IEventCreateResponse {}

export type TSlotStatus = "AVAILABLE" | "BOOKED";

export interface ISlot {
  id: number;
  time_slot: string;
  status: TSlotStatus;
  created_at: string;
  updated_at: string;
  event_id: number;
}

export interface ISlotPaginatedResponse {
  slots: ISlot[];
  total_pages: number;
  total_records: number;
}

export interface ISlotCreateRequest {
  status: "AVAILABLE";
  time_slot: string;
}

export interface ISlotCreateResponse {}

export type TRegisterationStatus = "PENDING" | "CONFIRMED" | "CANCELED";

export interface IRegistration {
  id: number;
  status: TRegisterationStatus;
  created_at: string;
  updated_at: string;
  user_id: number;
  slot_id: number;

  receipt_url: string | null;
  payment_id: number | null;
}

export interface IRegistrationPaginatedResponse {
  registrations: IRegistration[];
  total_pages: number;
  total_records: number;
}

export interface IUserRegistrationPaginatedResponse {
  users: IRegistration[];
  total_pages: number;
  total_records: number;
}
