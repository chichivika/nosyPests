import React from 'react';
import styled from 'styled-components';
import DirectionDemo from './direction/DirectionDemo';
import HightDemo from './height/HeightDemo';
import DisableDemo from './disable/DisableDemo';

const StyledWrapperDemo = styled.div`
    padding: 0px;
    & > * {
        margin-top: 3rem;
    }
`;

export default function WrapperDemo() {
    return (
        <StyledWrapperDemo>
            <DirectionDemo />
            <HightDemo />
            <DisableDemo />
        </StyledWrapperDemo>
    );
}
