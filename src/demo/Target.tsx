import React, { ReactElement } from 'react';
import styled from 'styled-components';

const StyledWrapperTarget = styled.div<{ $width: number; $height: number }>`
    width: ${(props) => `${props.$width}px`};
    height: ${(props) => `${props.$height}px`};
    padding: 0px 10px;
    background-color: ${(props) => props.theme.headerBgColor};
    border: ${(props) => `2px solid ${props.theme.blockBorderColor}`};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
`;

type Props = {
    width: number;
    height: number;
    children?: ReactElement | ReactElement[];
    ref?: React.RefObject<HTMLDivElement>;
};
export default function Target({ width, height, children, ref }: Props) {
    return (
        <StyledWrapperTarget ref={ref} $width={width} $height={height}>
            {children}
        </StyledWrapperTarget>
    );
}
