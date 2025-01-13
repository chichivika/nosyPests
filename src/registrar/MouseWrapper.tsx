import React, { ReactElement } from 'react';
import SVGMouse from '../mouse/SVGMouse';
import { Mouse } from '../mouse/classMouse';
import { MouseProps, defaultMouseProps } from '../mouse/mouseUtils';

type Props = MouseProps & {
    bottom?: number;
    children: ReactElement;
};
export default function MouseWrapper({ bottom = 0, children, ...mouseProps }: Props) {
    const { height, animationDirection, ...restMouseProps } = {
        ...defaultMouseProps,
        ...mouseProps,
    };
    const width = Mouse.getWidthByHeight(height);

    const isTurnedLeft = animationDirection === 'left';
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
                    left: isTurnedLeft ? `${-width}px` : undefined,
                    right: isTurnedLeft ? undefined : `${-width}px`,
                    bottom: `${bottom}px`,
                    width: `${width}px`,
                    height: `${height}px`,
                }}
            >
                <SVGMouse
                    height={height}
                    animationDirection={animationDirection}
                    {...restMouseProps}
                />
            </div>
        </div>
    );
}
