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
    const gameState$ = StateEmitter(ctx)
    inputEmitter$.subscribe(gameState$.receiveEvent)
    const renderer = Renderer(ctx, 60,gameState$.subject);
    const rect = new Rectangle(ctx,15,15,45,40,'blue','main')

    rect.getEmitter().subscribe(gameState$.receiveEvent)
    
    gameState$.receiveEvent({
        id: 'main',
        payload: rect,
        type: EventType.addRectangle
    })
    renderer.run();
};
