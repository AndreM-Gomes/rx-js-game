import { EventType } from './EventType';
export interface GameEvent{
  type: EventType
  id: string
  payload: any
}