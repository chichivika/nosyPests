import React from 'react';
import PestWrapper from '../../wrapper/PestWrapper';
import DirectionTarget from './DirectionTarget';
import { DemoCnt } from '../DemoCnt';

const DURATION = 5;
const PAUSE = 1;
const HEIGHT = 50;

export default function DirectionDemo() {
    const title = `animationDirection: &quot;left&quot; | &quot;right&quot;
                <br />
                isInside: boolean`;
    return (
        <DemoCnt title={title}>
            <PestWrapper
                height={HEIGHT}
                disablePortal
                animationDuration={DURATION}
                animationPause={PAUSE}
                animationDirection='right'
                isInside={false}
            >
                <DirectionTarget animationDirection='right' isInside={false} />
            </PestWrapper>
            <PestWrapper
                height={HEIGHT}
                disablePortal
                animationDuration={DURATION}
                animationPause={PAUSE}
                animationDirection='left'
                isInside
            >
                <DirectionTarget animationDirection='left' isInside />
            </PestWrapper>
            <PestWrapper
                height={HEIGHT}
                disablePortal
                animationDuration={DURATION}
                animationPause={PAUSE}
                animationDirection='right'
                isInside
            >
                <DirectionTarget animationDirection='right' isInside />
            </PestWrapper>
            <PestWrapper
                height={HEIGHT}
                disablePortal
                animationDuration={DURATION}
                animationPause={PAUSE}
                animationDirection='left'
                isInside={false}
            >
                <DirectionTarget animationDirection='left' isInside={false} />
            </PestWrapper>
        </DemoCnt>
    );
}
