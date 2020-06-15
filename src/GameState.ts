import { Movable } from './Movable';
import { EventType } from './EventType';
import { GameEvent } from './GameEvent';
import { Drawable } from './Drawable';
import { Subject } from 'rxjs';
import { Rectangle } from './Rectangle';
export function StateEmitter(ctx){
  const subject = new Subject<Map<string, Rectangle>>()
  const drawables = new Map<string, Rectangle>()

  const addRectangle = (event: GameEvent) => {
    if(event.type === EventType.addRectangle){
      drawables.set(`${event.id}`,event.payload)
      subject.next(drawables)
    }
  }
  const deleteRectangle = (event: GameEvent) => {
    if(event.type === EventType.deleteRectangle){
      drawables.delete(`${event.id}`)
      subject.next(drawables)
    }
  }
  const moveRectangle = (event: GameEvent) => {
    if(event.type === EventType.startMoveRectangleRight){
      const drawable = drawables.get(`${event.id}`)
      if(drawable){
        drawable.movingRight = true
      }
    }
    if(event.type === EventType.stopMoveRectangleRight){
      const drawable = drawables.get(`${event.id}`)
      if(drawable){
        drawable.movingRight = false
      }
    }
    if(event.type === EventType.startMoveRectangleLeft){
      const drawable = drawables.get(`${event.id}`)
      if(drawable){
        drawable.movingLeft = true
      }
    }
    if(event.type === EventType.stopMoveRectangleLeft){
      const drawable = drawables.get(`${event.id}`)
      if(drawable){
        drawable.movingLeft = false
      }
    }
  }
  const receiveEvent = (event: GameEvent) => {
    console.log(event)
    const eventHandlers = [deleteRectangle,addRectangle, moveRectangle]
    
    eventHandlers.forEach( handler => handler(event) )
  }
  return {receiveEvent, subject}
}