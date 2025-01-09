import React, { SVGLineElementAttributes } from 'react';
import { Points, Lines, Line } from './drawUtils';

export function renderLines(lines: Lines, lineAttrs?: SVGLineElementAttributes<SVGLineElement>) {
    return lines.map((line, i) => {
        return renderLine(line, lineAttrs, `${i}`);
    });
}

export function renderLinesChain(
    verts: Points,
    lineAttrs: SVGLineElementAttributes<SVGLineElement> = {},
) {
    const vertsLength = verts.length;
    if (vertsLength < 2) {
        return;
    }

    const lines: ReturnType<typeof renderLine>[] = [];

    for (let i = 0; i < vertsLength - 1; ++i) {
        lines.push(renderLine([verts[i], verts[i + 1]], lineAttrs, `${i}`));
    }

    return lines;
}

export function renderLine(
    verts: Line,
    lineAttrs: SVGLineElementAttributes<SVGLineElement> = {},
    key?: string,
) {
    if (verts.length < 2) {
        return null;
    }

    const firstVert = verts[0];
    const secondVert = verts[1];

    return (
        <line
            x1={firstVert[0]}
            y1={firstVert[1]}
            x2={secondVert[0]}
            y2={secondVert[1]}
            key={key}
            {...lineAttrs}
        />
    );
}
