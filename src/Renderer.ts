import { Rectangle } from './Rectangle';
import { Drawable } from './Drawable';
import { Subject } from 'rxjs';

export function Renderer(ctx, fpsLockedIn, $drawables: Subject<Map<string, Rectangle>>) {
    var updateId, previousDelta = 0, fpsLimit = fpsLockedIn;
    let objectsToDraw = new Map<string,Rectangle>()
    let counter
    $drawables.subscribe({
        next: (ev) => {
            objectsToDraw = ev
        },
    })

    const run = (currentDelta?) => {
        updateId = requestAnimationFrame(run);
        var delta = currentDelta - previousDelta;
        if (fpsLimit && delta < 1000 / fpsLimit) {
            return;
        }
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 600, 600);
        objectsToDraw.forEach(objectsToDraw => {
            objectsToDraw.animate()
            objectsToDraw.draw();
        });
        previousDelta = currentDelta;
    };
    return { run };
}
//# sourceMappingURL=Renderer.js.map