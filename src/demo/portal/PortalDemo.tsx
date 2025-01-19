import React, { useState } from 'react';
import styled from 'styled-components';
import { FormGroup, FormControlLabel } from '@mui/material';
import Checkbox from '../base/Checkbox';
import PestWrapper from '../../nosyPests/wrapper/PestWrapper';
import Target from '../Target';
import { DemoCnt } from '../DemoCnt';

const StyledScrollCnt = styled.div`
    width: 300px;
    height: 300px;
    overflow: auto;
    border: ${(props) => `1px solid ${props.theme.blockBorderColor}`};
`;
const StyledBigCnt = styled.div`
    width: 600px;
    height: 600px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    padding: 10px;
`;
const StyledCell = styled.div`
    grid-row: 1 / span 1;
    grid-column: 2 / span 1;
`;
export default function PortalDemo() {
    const [disablePortal, setDisablePortal] = useState<boolean>(false);

    const title = 'disablePortal: boolean';
    return (
        <DemoCnt title={title}>
            <StyledScrollCnt>
                <StyledBigCnt>
                    <StyledCell>
                        <PestWrapper
                            animationDuration={5}
                            animationPause={1}
                            height={100}
                            animationBottom={0}
                            disablePortal={disablePortal}
                        >
                            <Target width={150} height={150} />
                        </PestWrapper>
                    </StyledCell>
                </StyledBigCnt>
            </StyledScrollCnt>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={disablePortal}
                            onChange={() => {
                                setDisablePortal(!disablePortal);
                            }}
                        />
                    }
                    label='disablePortal'
                />
            </FormGroup>
        </DemoCnt>
    );
}
