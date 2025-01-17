import React from 'react';
import styled from 'styled-components';
import PestsTree from './PestsTree';

const StyledTreeContainer = styled.div`
    display: flex;
    flex-wrap: no-wrap;
    overflow: hidden;
    column-gap: 170px;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.headerBgColor};
    padding: 1rem 0px;
`;

export default function TreeContainer() {
    return (
        <StyledTreeContainer>
            <PestsTree flip />
            <PestsTree mirror />
            <PestsTree />
        </StyledTreeContainer>
    );
}
