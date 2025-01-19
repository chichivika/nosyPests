import React from 'react';
import styled from 'styled-components';
import { DemoCnt } from './DemoCnt';
import AnimationRegistrar from '../nosyPests/registrar/AnimationRegistrar';

const StyledGrid = styled.div`
    display: grid;
    width: 100%;
    max-width: 700px;
    grid-auto-rows: 80px;
    grid-template-columns: repeat(auto-fill, 100px);
    grid-auto-columns: 100px;
    gap: 15px;
    place-content: center;
`;
const StyledCell = styled.div`
    background-color: ${(props) => props.theme.headerBgColor};
    border: ${(props) => `2px solid ${props.theme.blockBorderColor}`};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledCellItem = styled.div<{ $width?: string; $height?: string; $reverse?: boolean }>(
    (props) => {
        const lightColor = props.theme.headerBgColor;
        const darkColor = props.theme.blockBorderColor;
        return {
            backgroundColor: props.$reverse ? lightColor : darkColor,
            width: props.$width ?? '50%',
            height: props.$height ?? '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        };
    },
);

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
                            gridColumn: 'span 1',
                        }}
                    />
                </AnimationRegistrar>
                <AnimationRegistrar animationDirection='right'>
                    <StyledCell
                        style={{
                            gridColumn: 'span 1',
                        }}
                    >
                        <AnimationRegistrar animationDirection='right' isInside height={40}>
                            <AnimationRegistrar animationDirection='left' isInside height={30}>
                                <StyledCellItem />
                            </AnimationRegistrar>
                        </AnimationRegistrar>
                    </StyledCell>
                </AnimationRegistrar>
                <AnimationRegistrar animationDirection='right' animationBottom={15}>
                    <StyledCell
                        style={{
                            gridColumn: 'span 1',
                        }}
                    >
                        <StyledCellItem $width='55px' $height='45px'>
                            <AnimationRegistrar animationDirection='left' isInside height={40}>
                                <StyledCellItem $width='50px' $height='40px' $reverse />
                            </AnimationRegistrar>
                        </StyledCellItem>
                    </StyledCell>
                </AnimationRegistrar>
                <AnimationRegistrar animationDirection='right' isInside>
                    <StyledCell
                        style={{
                            gridColumn: 'span 2',
                        }}
                    >
                        <AnimationRegistrar animationDirection='left' isInside height={40}>
                            <StyledCellItem />
                        </AnimationRegistrar>
                    </StyledCell>
                </AnimationRegistrar>
                <AnimationRegistrar animationDirection='right' isInside animationBottom={20}>
                    <StyledCell
                        style={{
                            gridColumn: 'span 1',
                        }}
                    />
                </AnimationRegistrar>
                <AnimationRegistrar animationDirection='right' isInside height={50}>
                    <StyledCellItem
                        style={{
                            width: '100%',
                            height: '100%',
                            gridColumn: 'span 1',
                        }}
                    />
                </AnimationRegistrar>
                <AnimationRegistrar animationDirection='right' height={80} isInside>
                    <AnimationRegistrar animationDirection='left' height={80} isInside>
                        <StyledCell
                            style={{
                                gridColumn: 'span 2',
                            }}
                        />
                    </AnimationRegistrar>
                </AnimationRegistrar>
                <AnimationRegistrar animationDirection='left'>
                    <StyledCell
                        style={{
                            gridColumn: 'span 1',
                        }}
                    >
                        <AnimationRegistrar animationDirection='right' isInside height={25}>
                            <AnimationRegistrar animationDirection='left' isInside height={50}>
                                <StyledCellItem />
                            </AnimationRegistrar>
                        </AnimationRegistrar>
                    </StyledCell>
                </AnimationRegistrar>
                <AnimationRegistrar animationDirection='left' isInside animationBottom={15}>
                    <StyledCell
                        style={{
                            gridColumn: 'span 1',
                        }}
                    />
                </AnimationRegistrar>
                <AnimationRegistrar animationDirection='left' animationBottom={15}>
                    <StyledCell
                        style={{
                            gridColumn: 'span 1',
                        }}
                    >
                        <StyledCellItem $width='55px' $height='45px'>
                            <AnimationRegistrar animationDirection='right' isInside height={40}>
                                <StyledCellItem $width='50px' $height='40px' $reverse />
                            </AnimationRegistrar>
                        </StyledCellItem>
                    </StyledCell>
                </AnimationRegistrar>
            </StyledGrid>
        </StyledDemoCnt>
    );
}
