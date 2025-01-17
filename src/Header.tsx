import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
    display: flex;
    justify-content: center;
    font-weight: bold;
    color: ${(props) => props.theme.headerColor};
    background-color: ${(props) => props.theme.headerBgColor};
`;

export default function Header() {
    return (
        <StyledHeader>
            <h1>Nosy Pests</h1>
        </StyledHeader>
    );
}
