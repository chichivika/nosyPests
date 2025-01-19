import React from 'react';
import Target from '../Target';
import { MouseColorType } from '../../nosyPests/mouse/mouseUtils';

type Props = {
    colorType: MouseColorType;
    targetHeight: number;
};

export default function ColorTypeTarget({ colorType, targetHeight }: Props) {
    return (
        <Target width={150} height={targetHeight}>
            <div>
                Type: <b>{colorType}</b>
            </div>
        </Target>
    );
}
