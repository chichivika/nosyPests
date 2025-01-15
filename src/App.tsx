import React from 'react';
import styled from 'styled-components';
import AnimationElement from './nosyPests/registrar/AnimationElement';
import AnimationRegistrar from './nosyPests/registrar/AnimationRegistrar';
// import MouseWrapper from './nosyPests/wrapper/MouseWrapper';

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
                    {/* <StyledRowCnt> */}
                    {/* <MouseWrapper
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
                            animationDuration={4}
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
                        height={15}
                        animationBottom={175}
                        animationDelay={1.5}
                    >
                        <MouseWrapper
                            animationPause={5}
                            height={25}
                            animationBottom={150}
                            animationDelay={1}
                        >
                            <MouseWrapper
                                animationPause={5}
                                height={50}
                                animationBottom={100}
                                animationDelay={0.5}
                            >
                                <MouseWrapper animationPause={15} height={100}>
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
                    </MouseWrapper> */}
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
                        <AnimationRegistrar height={30} animationDirection='right'>
                            <div
                                style={{ backgroundColor: 'orange', width: '40px', height: '40px' }}
                            />
                        </AnimationRegistrar>
                        <div style={{ backgroundColor: 'green', width: '50px', height: '50px' }} />
                    </StyledRowCnt>
                    {/* <AnimationRegistrar height={15} animationBottom={150} 
                    animationDirection='left'>
                        <AnimationRegistrar
                            height={50}
                            animationBottom={100}
                            animationDirection='left'
                        >
                            <AnimationRegistrar
                                height={100}
                                animationBottom={50}
                                animationDirection='right'
                            > */}
                    <div
                        style={{
                            border: '1px solid grey',
                            width: '300px',
                            height: '300px',
                        }}
                    />
                    {/* </AnimationRegistrar>
                        </AnimationRegistrar>
                    </AnimationRegistrar> */}
                </StyledCnt>
            </StyledRowCnt>
        </div>
    );
}

export default App;
