import React from 'react';
import Target from '../Target';

type Props = {
    animationBottom: number;
    height: number;
    targetHeight: number;
};

export default function HeightTarget({ animationBottom, height, targetHeight }: Props) {
    return (
        <Target width={150} height={targetHeight}>
            <div>
                Bottom: <b>{animationBottom}px</b>
            </div>
            <div>
                Height: <b>{height}px</b>
            </div>
        </Target>
    );
}
