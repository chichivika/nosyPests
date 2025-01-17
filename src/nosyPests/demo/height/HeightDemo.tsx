import React from 'react';
import styled from 'styled-components';
import PestWrapper from '../../wrapper/PestWrapper';
import HeightTarget from './HeightTarget';
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

export default function HeightDemo() {
    const title = `animationBottom: number
                <br />
                height: number`;
    return (
        <DemoCnt title={title}>
            <PestWrapper
                animationDuration={DURATION}
                animationPause={PAUSE}
                height={20}
                animationBottom={160}
            >
                <PestWrapper
                    animationDuration={DURATION}
                    animationPause={PAUSE}
                    height={50}
                    animationBottom={80}
                >
                    <PestWrapper
                        animationDuration={DURATION}
                        animationPause={PAUSE}
                        height={80}
                        animationBottom={0}
                    >
                        <PestWrapper
                            animationDuration={DURATION}
                            animationPause={PAUSE}
                            animationDirection='right'
                            height={20}
                            animationBottom={160}
                        >
                            <PestWrapper
                                animationDuration={DURATION}
                                animationPause={PAUSE}
                                animationDirection='right'
                                height={50}
                                animationBottom={80}
                            >
                                <PestWrapper
                                    animationDuration={DURATION}
                                    animationPause={PAUSE}
                                    animationDirection='right'
                                    height={80}
                                    animationBottom={0}
                                >
                                    <StyledTargetsCnt>
                                        <HeightTarget
                                            animationBottom={160}
                                            height={20}
                                            targetHeight={80}
                                        />
                                        <HeightTarget
                                            animationBottom={80}
                                            height={50}
                                            targetHeight={80}
                                        />
                                        <HeightTarget
                                            animationBottom={0}
                                            height={80}
                                            targetHeight={80}
                                        />
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
