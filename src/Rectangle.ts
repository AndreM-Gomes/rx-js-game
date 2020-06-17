import { EventType } from './EventType';
import { GameEvent } from './GameEvent';
import { Movable } from './Movable';
import { Drawable } from './Drawable';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators'
export class Rectangle {
    ctx
    x
    y
    width
    height
    color
    id
    movingRight
    movingLeft
    rightBlocked
    leftBlocked
    falling
    private subject: Subject<GameEvent>
    constructor(ctx, x, y, width, height, color, id) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.id = id;
        this.movingRight = false;
        this.movingLeft = false;
        this.rightBlocked = false
        this.leftBlocked = false
        this.falling = true
        this.subject = new Subject<GameEvent>()
        console.log(this)
    }
    animate() {
        if(this.movingRight && !this.rightBlocked){
            this.x = this.x +10
        }
        if(this.movingLeft && !this.leftBlocked){
            this.x = this.x -10
        }
        if((this.x + this.width)>=600){
            this.subject.next({
                id: `${this.id}`,
                payload: null,
                type: EventType.collisionRight
            })
        }else{
            this.subject.next({
                id: `${this.id}`,
                payload: null,
                type: EventType.freeRight
            })
        }
        if(this.x <= 0){
            this.subject.next({
                id: `${this.id}`,
                payload: null,
                type: EventType.collisionLeft
            })
        }else{
            this.subject.next({
                id: `${this.id}`,
                payload: null,
                type: EventType.freeLeft
            })
        }
        if(this.y >= 100){
            this.falling = false
        }
        if(this.falling){
            this.y = this.y + this.y * 0.01
        }
    }
    draw() {
        this.animate();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    getEmitter(){
        return this.subject.asObservable()
    }
}
function handleColision(){

}

//TODO: CREATE OBJECT TO HANDLE USER INPUTS

