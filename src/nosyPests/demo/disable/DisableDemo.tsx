import React, { useState } from 'react';
import PestWrapper from '../../wrapper/PestWrapper';
import Target from '../Target';
import { DemoCnt } from '../DemoCnt';

const DURATION = 30;
const PAUSE = 1;

export default function DisableDemo() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [disabled, setDisabled] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [useNoseAnimation, setUseNoseAnimation] = useState<boolean>(true);

    const title = `disabled: boolean
                <br />
                useNoseAnimation: boolean`;
    return (
        <DemoCnt title={title}>
            <PestWrapper
                animationDuration={DURATION}
                animationPause={PAUSE}
                animationDirection='right'
                height={100}
                animationBottom={0}
                isInside
                disablePortal
                disabled={disabled}
                useNoseAnimation={useNoseAnimation}
            >
                <Target width={150} height={150} />
            </PestWrapper>
        </DemoCnt>
    );
}
