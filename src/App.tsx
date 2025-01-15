/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
import AnimationElement from './nosyPests/registrar/AnimationElement';
import AnimationRegistrar from './nosyPests/registrar/AnimationRegistrar';
import MouseWrapper from './nosyPests/wrapper/MouseWrapper';

const StyledCnt = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: column;
    margin: 1rem;
    & > * {
        margin: 1rem;
    }
`;
const StyledRowCnt = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    & > * {
        margin: 1rem;
    }
`;
function App() {
    return (
        <div className='app'>
            <header className='app-header'>Nosy Pests</header>
            <AnimationElement animationPeriodicity={5} />
            <StyledRowCnt>
                <StyledCnt>
                    <StyledRowCnt>
                        <MouseWrapper
                            height={15}
                            animationDirection='right'
                            animationPause={10}
                            animationDuration={2}
                        >
                            <div
                                style={{ backgroundColor: 'grey', width: '15px', height: '15px' }}
                            />
                        </MouseWrapper>
                        <MouseWrapper
                            height={15}
                            animationDirection='right'
                            animationPause={5}
                            isInside
                        >
                            <div
                                style={{ backgroundColor: 'blue', width: '20px', height: '20px' }}
                            />
                        </MouseWrapper>
                        <div style={{ backgroundColor: 'pink', width: '30px', height: '30px' }} />
                        <div style={{ backgroundColor: 'orange', width: '40px', height: '40px' }} />
                        <MouseWrapper animationPause={30}>
                            <div
                                style={{ backgroundColor: 'green', width: '50px', height: '50px' }}
                            />
                        </MouseWrapper>
                    </StyledRowCnt>
                    <MouseWrapper
                        animationPause={5}
                        height={14}
                        animationBottom={265}
                        animationDelay={2.5}
                        isInside
                    >
                        <MouseWrapper
                            animationPause={5}
                            height={15}
                            animationBottom={250}
                            animationDelay={2}
                            animationDirection='right'
                        >
                            <MouseWrapper
                                animationPause={5}
                                height={25}
                                animationBottom={225}
                                animationDelay={1.5}
                                isInside
                            >
                                <MouseWrapper
                                    animationPause={5}
                                    height={50}
                                    animationBottom={175}
                                    animationDelay={1}
                                    animationDirection='right'
                                >
                                    <MouseWrapper
                                        animationPause={5}
                                        height={75}
                                        animationBottom={100}
                                        animationDelay={0.5}
                                        isInside
                                    >
                                        <MouseWrapper
                                            animationPause={5}
                                            height={100}
                                            animationDirection='right'
                                        >
                                            <MouseWrapper
                                                animationPause={5}
                                                height={14}
                                                animationBottom={265}
                                                animationDelay={2.5}
                                                animationDirection='right'
                                                isInside
                                            >
                                                <MouseWrapper
                                                    animationPause={5}
                                                    height={15}
                                                    animationBottom={250}
                                                    animationDelay={2}
                                                >
                                                    <MouseWrapper
                                                        animationPause={5}
                                                        height={25}
                                                        animationBottom={225}
                                                        animationDelay={1.5}
                                                        animationDirection='right'
                                                        isInside
                                                    >
                                                        <MouseWrapper
                                                            animationPause={5}
                                                            height={50}
                                                            animationBottom={175}
                                                            animationDelay={1}
                                                        >
                                                            <MouseWrapper
                                                                animationPause={5}
                                                                height={75}
                                                                animationBottom={100}
                                                                animationDelay={0.5}
                                                                animationDirection='right'
                                                                isInside
                                                            >
                                                                <MouseWrapper
                                                                    animationPause={5}
                                                                    height={100}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            border: '1px solid grey',
                                                                            width: '300px',
                                                                            height: '300px',
                                                                        }}
                                                                    />
                                                                </MouseWrapper>
                                                            </MouseWrapper>
                                                        </MouseWrapper>
                                                    </MouseWrapper>
                                                </MouseWrapper>
                                            </MouseWrapper>
                                        </MouseWrapper>
                                    </MouseWrapper>
                                </MouseWrapper>
                            </MouseWrapper>
                        </MouseWrapper>
                    </MouseWrapper>
                </StyledCnt>
                <StyledCnt>
                    <StyledRowCnt>
                        <div style={{ backgroundColor: 'grey', width: '15px', height: '15px' }} />
                        <AnimationRegistrar height={20} animationDirection='left'>
                            <div
                                style={{ backgroundColor: 'blue', width: '20px', height: '20px' }}
                            />
                        </AnimationRegistrar>
                        <AnimationRegistrar height={30} animationDirection='left'>
                            <div
                                style={{ backgroundColor: 'pink', width: '30px', height: '30px' }}
                            />
                        </AnimationRegistrar>
                        <AnimationRegistrar height={20} animationDirection='right' isInside>
                            <div
                                style={{ backgroundColor: 'orange', width: '40px', height: '40px' }}
                            />
                        </AnimationRegistrar>
                        {/* <div style={{ width: '100px', height: '100px', overflow: 'auto' }}>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr 1fr',
                                    gridTemplateRows: '1fr 1fr 1fr',
                                    backgroundColor: 'green',
                                    width: '150px',
                                    height: '150px',
                                }}
                            >
                                <MouseWrapper
                                    height={30}
                                    animationDirection='right'
                                    animationBottom={10}
                                    isInside
                                >
                                    <div
                                        style={{
                                            backgroundColor: 'yellow',
                                            width: '50px',
                                            height: '50px',
                                            gridRow: '1 / span 1',
                                            gridColumn: '2 / span 1',
                                        }}
                                    />
                                </MouseWrapper>
                            </div>
                        </div> */}
                    </StyledRowCnt>
                    <MouseWrapper
                        animationPause={5}
                        height={14}
                        animationBottom={265}
                        animationDelay={2.5}
                        isInside
                    >
                        <MouseWrapper
                            animationPause={5}
                            height={15}
                            animationBottom={250}
                            animationDelay={2}
                            animationDirection='right'
                        >
                            <MouseWrapper
                                animationPause={5}
                                height={25}
                                animationBottom={225}
                                animationDelay={1.5}
                                isInside
                            >
                                <MouseWrapper
                                    animationPause={5}
                                    height={50}
                                    animationBottom={175}
                                    animationDelay={1}
                                    animationDirection='right'
                                >
                                    <MouseWrapper
                                        animationPause={5}
                                        height={75}
                                        animationBottom={100}
                                        animationDelay={0.5}
                                        isInside
                                    >
                                        <MouseWrapper
                                            animationPause={5}
                                            height={100}
                                            animationDirection='right'
                                        >
                                            <MouseWrapper
                                                animationPause={5}
                                                height={14}
                                                animationBottom={265}
                                                animationDelay={2.5}
                                                animationDirection='right'
                                            >
                                                <MouseWrapper
                                                    animationPause={5}
                                                    height={15}
                                                    animationBottom={250}
                                                    animationDelay={2}
                                                    isInside
                                                >
                                                    <MouseWrapper
                                                        animationPause={5}
                                                        height={25}
                                                        animationBottom={225}
                                                        animationDelay={1.5}
                                                        animationDirection='right'
                                                    >
                                                        <MouseWrapper
                                                            animationPause={5}
                                                            height={50}
                                                            animationBottom={175}
                                                            animationDelay={1}
                                                            isInside
                                                        >
                                                            <MouseWrapper
                                                                animationPause={5}
                                                                height={75}
                                                                animationBottom={100}
                                                                animationDelay={0.5}
                                                                animationDirection='right'
                                                            >
                                                                <MouseWrapper
                                                                    animationPause={5}
                                                                    height={100}
                                                                    isInside
                                                                >
                                                                    <div
                                                                        style={{
                                                                            border: '1px solid grey',
                                                                            width: '300px',
                                                                            height: '300px',
                                                                        }}
                                                                    />
                                                                </MouseWrapper>
                                                            </MouseWrapper>
                                                        </MouseWrapper>
                                                    </MouseWrapper>
                                                </MouseWrapper>
                                            </MouseWrapper>
                                        </MouseWrapper>
                                    </MouseWrapper>
                                </MouseWrapper>
                            </MouseWrapper>
                        </MouseWrapper>
                    </MouseWrapper>
                </StyledCnt>
            </StyledRowCnt>
        </div>
    );
}

export default App;
