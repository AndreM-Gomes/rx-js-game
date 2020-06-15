import { EventType } from './EventType';
import { GameEvent } from './GameEvent';
import { Observable, fromEvent, Subject } from 'rxjs'

export function InputEmitter(canvas: HTMLCanvasElement){
  const keyDown$ = fromEvent(canvas, 'keydown') as Observable<KeyboardEvent>
  const keyUp$ = fromEvent(canvas, 'keyup') as Observable<KeyboardEvent>
  const subject = new Subject<GameEvent>()
  
  const handleArrowRight = (ev: KeyboardEvent) => {
    if(ev.code === "ArrowRight"){
      if(ev.type === "keyup"){
        subject.next({
          id: 'main',
          payload: null,
          type: EventType.stopMoveRectangleRight
        }) 
      }
      if(ev.type === "keydown"){
        subject.next({
          id: 'main',
          payload: null,
          type: EventType.startMoveRectangleRight
        })
      }
    }
  }
  const handleArrowLeft = (ev: KeyboardEvent) => {
    if(ev.code === "ArrowLeft"){
      if(ev.type === "keyup"){
        subject.next({
          id: 'main',
          payload: null,
          type: EventType.stopMoveRectangleLeft
        }) 
      }
      if(ev.type === "keydown"){
        subject.next({
          id: 'main',
          payload: null,
          type: EventType.startMoveRectangleLeft
        })
      }
    }
  }
  const handlers = [handleArrowLeft,handleArrowRight]
  keyDown$.subscribe( ev => {
    handlers.forEach(handler=>{ handler(ev) })
  })
  keyUp$.subscribe( ev => {
    handlers.forEach(handler=>{ handler(ev) })
  })
  return subject
}