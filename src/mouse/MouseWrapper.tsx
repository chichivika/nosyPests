import React, { ReactElement } from 'react';
import SVGMouse, { MouseProps } from './SVGMouse';
import { Mouse } from './mouseUtils';

type Props = MouseProps & {
    bottom?: number;
    children: ReactElement;
};
export default function MouseWrapper({ bottom = 0, children, ...mouseProps }: Props) {
    const { height = 40, turnedLeft = true } = mouseProps;
    const width = Mouse.getWidthByHeight(height);
    return (
        <div
            style={{
                position: 'relative',
            }}
        >
            {children}
            <div
                style={{
                    position: 'absolute',
                    left: turnedLeft ? `${-width}px` : undefined,
                    right: turnedLeft ? undefined : `${-width}px`,
                    bottom: `${bottom}px`,
                    width: `${width}px`,
                    height: `${height}px`,
                }}
            >
                <SVGMouse height={height} turnedLeft={turnedLeft} />
            </div>
        </div>
    );
}
