export interface IEvent {
  id: number;
  date: string;
  event_status: string;
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
