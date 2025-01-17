import React from 'react';
import styled from 'styled-components';
import { DemoCnt } from './DemoCnt';
import AnimationRegistrar from '../registrar/AnimationRegistrar';

const StyledGrid = styled.div`
    display: grid;
    grid-template-rows: repeat(2, 80px);
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    width: 80%;
`;
const StyledCell = styled.div`
    background-color: ${(props) => props.theme.headerBgColor};
    border: ${(props) => `2px solid ${props.theme.blockBorderColor}`};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledCellItem = styled.div`
    background-color: ${(props) => props.theme.blockBorderColor};
    width: 50%;
    height: 50px;
`;

const StyledDemoCnt = styled(DemoCnt)`
    margin-top: 1rem;
`;

export default function RegistrarDemo() {
    const title = 'Randomly looking pest';
    return (
        <StyledDemoCnt title={title} className='registrar-demo-cnt'>
            <StyledGrid>
                <AnimationRegistrar animationDirection='right'>
                    <StyledCell
                        style={{
                            gridRow: '1 / span 1',
                            gridColumn: '1/ span 1',
                        }}
                    />
                </AnimationRegistrar>
                <AnimationRegistrar animationDirection='right'>
                    <StyledCell
                        style={{
                            gridRow: '1 / span 1',
                            gridColumn: '2/ span 1',
                        }}
                    >
                        <AnimationRegistrar animationDirection='right' isInside height={50}>
                            <AnimationRegistrar animationDirection='left' isInside height={50}>
                                <StyledCellItem />
                            </AnimationRegistrar>
                        </AnimationRegistrar>
                    </StyledCell>
                </AnimationRegistrar>
                <AnimationRegistrar animationDirection='left' isInside animationBottom={15}>
                    <StyledCell
                        style={{
                            gridRow: '1 / span 1',
                            gridColumn: '3/ span 1',
                        }}
                    />
                </AnimationRegistrar>
                <AnimationRegistrar animationDirection='right' isInside>
                    <StyledCell
                        style={{
                            gridRow: '1 / span 1',
                            gridColumn: '5/ span 2',
                        }}
                    >
                        <AnimationRegistrar animationDirection='left' isInside height={50}>
                            <StyledCellItem />
                        </AnimationRegistrar>
                    </StyledCell>
                </AnimationRegistrar>
                <AnimationRegistrar animationDirection='right' isInside animationBottom={20}>
                    <StyledCell
                        style={{
                            gridRow: '2 / span 1',
                            gridColumn: '1/ span 1',
                        }}
                    />
                </AnimationRegistrar>
                <AnimationRegistrar animationDirection='right' isInside height={50}>
                    <StyledCellItem
                        style={{
                            width: '100%',
                            height: '100%',
                            gridRow: '2 / span 1',
                            gridColumn: '2 / span 1',
                        }}
                    />
                </AnimationRegistrar>
                <AnimationRegistrar animationDirection='right' height={80}>
                    <AnimationRegistrar animationDirection='left' height={80}>
                        <StyledCell
                            style={{
                                gridRow: '2 / span 1',
                                gridColumn: '4/ span 1',
                            }}
                        />
                    </AnimationRegistrar>
                </AnimationRegistrar>
                <AnimationRegistrar animationDirection='left' animationBottom={15}>
                    <StyledCell
                        style={{
                            gridRow: '2 / span 1',
                            gridColumn: '6 / span 1',
                        }}
                    />
                </AnimationRegistrar>
            </StyledGrid>
        </StyledDemoCnt>
    );
}
