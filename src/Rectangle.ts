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
        this.subject = new Subject<GameEvent>()
    }
    animate() {
        if(this.movingRight){
            this.x = this.x +10
        }
        if(this.movingLeft){
            this.x = this.x -10
        }
        if((this.x + this.width)>=600){
            this.subject.next({
                id: `${this.}`
            })
        }
    }
    draw() {
        this.animate();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    getEmitter(){
        return this.subject.asObservable
    }
}
//TODO: CREATE OBJECT TO HANDLE USER INPUTS

