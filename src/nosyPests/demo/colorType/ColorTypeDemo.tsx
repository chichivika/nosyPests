import React from 'react';
import styled from 'styled-components';
import PestWrapper from '../../wrapper/PestWrapper';
import ColorTypeTarget from './ColorTypeTarget';
import { DemoCnt } from '../DemoCnt';

const DURATION = 5;
const PAUSE = 1;

const StyledTargetsCnt = styled.div`
    :not(:last-child) {
        border-bottom: none;
    }
    :not(:first-child) {
        border-top: none;
    }
`;

export default function ColorTypeDemo() {
    const title = 'colorType: &quot;alpha&quot; | &quot;beta&quot; | &quot;gamma&quot;';

    return (
        <DemoCnt title={title}>
            <PestWrapper
                animationDuration={DURATION}
                animationPause={PAUSE}
                height={80}
                animationBottom={160}
                colorType='alpha'
            >
                <PestWrapper
                    animationDuration={DURATION}
                    animationPause={PAUSE}
                    height={80}
                    animationBottom={80}
                    colorType='beta'
                >
                    <PestWrapper
                        animationDuration={DURATION}
                        animationPause={PAUSE}
                        height={80}
                        animationBottom={0}
                        colorType='gamma'
                    >
                        <PestWrapper
                            animationDuration={DURATION}
                            animationPause={PAUSE}
                            height={80}
                            animationBottom={160}
                            animationDirection='right'
                            colorType='alpha'
                        >
                            <PestWrapper
                                animationDuration={DURATION}
                                animationPause={PAUSE}
                                height={80}
                                animationBottom={80}
                                animationDirection='right'
                                colorType='beta'
                            >
                                <PestWrapper
                                    animationDuration={DURATION}
                                    animationPause={PAUSE}
                                    height={80}
                                    animationBottom={0}
                                    animationDirection='right'
                                    colorType='gamma'
                                >
                                    <StyledTargetsCnt>
                                        <ColorTypeTarget targetHeight={80} colorType='alpha' />
                                        <ColorTypeTarget targetHeight={80} colorType='beta' />
                                        <ColorTypeTarget targetHeight={80} colorType='gamma' />
                                    </StyledTargetsCnt>
                                </PestWrapper>
                            </PestWrapper>
                        </PestWrapper>
                    </PestWrapper>
                </PestWrapper>
            </PestWrapper>
        </DemoCnt>
    );
}
