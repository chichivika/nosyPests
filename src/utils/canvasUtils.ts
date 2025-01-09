import { Points } from './drawUtils';

export function drawLinesChain({ ctx, verts }: { ctx: CanvasRenderingContext2D; verts: Points }) {
    if (verts.length === 0) {
        return;
    }

    verts.forEach((vert, index) => {
        if (index === 0) {
            ctx.moveTo(vert[0], vert[1]);
            return;
        }
        ctx.lineTo(vert[0], vert[1]);
    });
}

export function drawLines({ ctx, lines }: { ctx: CanvasRenderingContext2D; lines: Points[] }) {
    lines.forEach((line) => {
        const [firstVert, secondVert] = line;
        ctx.moveTo(firstVert[0], firstVert[1]);
        ctx.lineTo(secondVert[0], secondVert[1]);
    });
}
