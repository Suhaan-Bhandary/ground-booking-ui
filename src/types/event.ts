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
}

export interface IEventCreateRequest {
  event_status: "AVAILABLE";
  date: Date;
}

export interface IEventCreateResponse {}

export interface IEventUpdateRequest {
  id: number;
  event_status: TEventStatus;
}

export interface ISlotCreateRequest {
  status: "AVAILABLE";
  time_slot: string;
}

export interface ISlotCreateResponse {}
