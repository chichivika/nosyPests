import React from 'react';
import { AnimationDirection } from '../../nosyPests/utils/types';
import Target from '../Target';

type Props = {
    animationDirection: AnimationDirection;
    isInside: boolean;
};
export default function DirectionTarget({ animationDirection, isInside }: Props) {
    return (
        <Target width={150} height={100}>
            <div>
                Direction: <b>&quot;{animationDirection}&quot;</b>
            </div>
            <div>
                IsInside: <b>{String(isInside)}</b>
            </div>
        </Target>
    );
}
