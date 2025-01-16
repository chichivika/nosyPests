/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
import AnimationElement from './nosyPests/registrar/AnimationElement';
import AnimationRegistrar from './nosyPests/registrar/AnimationRegistrar';
// import AnimationRegistrar from './nosyPests/registrar/AnimationRegistrar';
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
                    <StyledRowCnt>
                        <div style={{ backgroundColor: 'grey', width: '15px', height: '15px' }} />
                        <div style={{ backgroundColor: 'blue', width: '20px', height: '20px' }} />
                        <div style={{ backgroundColor: 'pink', width: '30px', height: '30px' }} />
                        <div style={{ backgroundColor: 'orange', width: '40px', height: '40px' }} />
                        <div style={{ backgroundColor: 'green', width: '50px', height: '50px' }} />
                    </StyledRowCnt>
                    <div
                        style={{
                            border: '1px solid grey',
                            width: '300px',
                            height: '300px',
                        }}
                    />
                </StyledCnt>
                <StyledCnt>
                    <StyledRowCnt>
                        <div style={{ backgroundColor: 'grey', width: '15px', height: '15px' }} />
                        {/* <AnimationRegistrar height={20} animationDirection='left'>
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
                        </AnimationRegistrar> */}
                        <AnimationRegistrar animationDuration={5}>
                            <div style={{ width: '100px', height: '100px', overflow: 'auto' }}>
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
                                    <AnimationRegistrar
                                        animationDuration={5}
                                        disablePortal
                                        isInside
                                    >
                                        <div
                                            style={{
                                                backgroundColor: 'orange',
                                                width: '50px',
                                                height: '50px',
                                                gridRow: '2 / span 1',
                                                gridColumn: '3 / span 1',
                                            }}
                                        />
                                    </AnimationRegistrar>
                                    <div
                                        style={{
                                            backgroundColor: 'yellow',
                                            width: '50px',
                                            height: '50px',
                                            gridRow: '1 / span 1',
                                            gridColumn: '2 / span 1',
                                        }}
                                    />
                                </div>
                            </div>
                        </AnimationRegistrar>
                    </StyledRowCnt>
                    <AnimationRegistrar animationDuration={5} animationDirection='right'>
                        <AnimationRegistrar animationDuration={5} animationDirection='left'>
                            <div
                                style={{
                                    border: '1px solid grey',
                                    width: '300px',
                                    height: '300px',
                                }}
                            />
                        </AnimationRegistrar>
                    </AnimationRegistrar>
                </StyledCnt>
            </StyledRowCnt>
        </div>
    );
}

export default App;
