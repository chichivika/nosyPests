import React, { useState } from 'react';
import styled from 'styled-components';
import { FormGroup, FormControlLabel } from '@mui/material';
import Checkbox from '../base/Checkbox';
import PestWrapper from '../../wrapper/PestWrapper';
import Target from '../Target';
import { DemoCnt } from '../DemoCnt';
import PlusMinus from '../base/PlusMinus';

const StyledFormsCnt = styled.div`
    display: flex;
    flex-wrap: wrap;
    row-gap: 10px;
    column-gap: 10px;
`;

export default function DisableDemo() {
    const [disabled, setDisabled] = useState<boolean>(false);
    const [useNoseAnimation, setUseNoseAnimation] = useState<boolean>(true);
    const [duration, setDuration] = useState<number>(5);
    const [pause, setPause] = useState<number>(1);

    const title = `disabled: boolean
                <br />
                useNoseAnimation: boolean
                <br />
                animationDuration: number
                <br />
                animationPause: number
                `;
    return (
        <DemoCnt title={title}>
            <PestWrapper
                animationDuration={duration}
                animationPause={pause}
                disabled={disabled}
                animationDirection='right'
                height={100}
                animationBottom={0}
                isInside
                useNoseAnimation={useNoseAnimation}
            >
                <Target width={150} height={150} />
            </PestWrapper>
            <StyledFormsCnt>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={disabled}
                                onChange={() => {
                                    setDisabled(!disabled);
                                }}
                            />
                        }
                        label='disabled'
                    />
                    <FormControlLabel
                        control={<Checkbox checked={useNoseAnimation} />}
                        label='useNoseAnimation'
                        onChange={() => {
                            setUseNoseAnimation(!useNoseAnimation);
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <PlusMinus
                                onPlus={() => {
                                    setDuration(parseValue(duration + 1));
                                }}
                                onMinus={() => {
                                    setDuration(parseValue(duration - 1));
                                }}
                            />
                        }
                        label={`duration: ${duration}s`}
                    />
                    <FormControlLabel
                        control={
                            <PlusMinus
                                onPlus={() => {
                                    setPause(parseValue(pause + 1));
                                }}
                                onMinus={() => {
                                    setPause(parseValue(pause - 1));
                                }}
                            />
                        }
                        label={`pause: ${pause}s`}
                    />
                </FormGroup>
            </StyledFormsCnt>
        </DemoCnt>
    );
}

function parseValue(value: number) {
    if (value < 1) {
        return 1;
    }
    return value;
}
