import React from 'react';
import styled from 'styled-components';
import DirectionDemo from './direction/DirectionDemo';
import HeightDemo from './height/HeightDemo';
import DisableDemo from './disable/DisableDemo';
import PortalDemo from './portal/PortalDemo';

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
            <HeightDemo />
            <DisableDemo />
            <PortalDemo />
        </StyledWrapperDemo>
    );
}
