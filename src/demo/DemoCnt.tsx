import React, { ReactElement } from 'react';
import styled from 'styled-components';

const StyledPestWrapperCnt = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: 80px;
    row-gap: 20px;
`;

const StyledTitle2 = styled.h2`
    text-align: center;
    font-weight: normal;
`;

type Props = {
    title: string;
    children: ReactElement | ReactElement[];
    className?: string;
};
export function DemoCnt({ title, children, className }: Props) {
    return (
        <div className={className}>
            <StyledTitle2
                dangerouslySetInnerHTML={{
                    __html: title,
                }}
            />
            <StyledPestWrapperCnt>{children}</StyledPestWrapperCnt>
        </div>
    );
}
