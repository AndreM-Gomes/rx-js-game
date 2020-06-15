import { EventType } from './EventType';
import { Observable, Subject } from 'rxjs';
import { Drawable } from './Drawable';
import { Renderer } from "./Renderer";
import { Rectangle } from "./Rectangle";
import { StateEmitter } from './GameState';
import { InputEmitter } from './InputEmitter';

window.onload = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') ;

    const inputEmitter$ = InputEmitter(canvas)
    inputEmitter$.subscribe( ev => {
        gameState$.receiveEvent(ev)
    })
    const gameState$ = StateEmitter(ctx)
    const renderer = Renderer(ctx, 60,gameState$.subject);
    gameState$.receiveEvent({
        id: 'main',
        payload: new Rectangle(ctx,15,15,45,40,'blue','rect'),
        type: EventType.addRectangle
    })
    gameState$.receiveEvent({
        id: 'rects',
        payload: null,
        type: EventType.deleteRectangle
    })

    renderer.run();
};
