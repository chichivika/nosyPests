import React from 'react';
import styled from 'styled-components';
import AnimationElement from './registrar/AnimationElement';
import AnimationRegistrar from './registrar/AnimationRegistrar';
import MouseWrapper from './registrar/MouseWrapper';

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
            <div
                style={{
                    backgroundColor: 'blue',
                    width: '40px',
                    height: '40px',
                    position: 'absolute',
                    right: '0px',
                }}
            />
            <AnimationElement />
            <StyledRowCnt>
                <StyledCnt>
                    <StyledRowCnt>
                        <MouseWrapper height={15} animationDirection='right'>
                            <div
                                style={{ backgroundColor: 'grey', width: '15px', height: '15px' }}
                            />
                        </MouseWrapper>
                        <div style={{ backgroundColor: 'blue', width: '20px', height: '20px' }} />
                        <div style={{ backgroundColor: 'pink', width: '30px', height: '30px' }} />
                        <div style={{ backgroundColor: 'orange', width: '40px', height: '40px' }} />
                        <MouseWrapper>
                            <div
                                style={{ backgroundColor: 'green', width: '50px', height: '50px' }}
                            />
                        </MouseWrapper>
                    </StyledRowCnt>
                    <div style={{ border: '1px solid grey', width: '200px', height: '200px' }} />
                </StyledCnt>
                <StyledCnt>
                    <StyledRowCnt>
                        <div style={{ backgroundColor: 'grey', width: '50px', height: '50px' }} />
                        <div style={{ backgroundColor: 'blue', width: '50px', height: '50px' }} />
                        <AnimationRegistrar animationHeight={20} animationDirection='right'>
                            <div
                                style={{ backgroundColor: 'pink', width: '50px', height: '50px' }}
                            />
                        </AnimationRegistrar>
                        <AnimationRegistrar animationHeight={30} animationDirection='right'>
                            <div
                                style={{ backgroundColor: 'orange', width: '50px', height: '50px' }}
                            />
                        </AnimationRegistrar>
                        <div style={{ backgroundColor: 'green', width: '50px', height: '50px' }} />
                    </StyledRowCnt>
                    <AnimationRegistrar
                        animationHeight={100}
                        animationBottom={50}
                        animationDirection='right'
                    >
                        <div
                            style={{
                                border: '1px solid grey',
                                width: '300px',
                                height: '300px',
                            }}
                        />
                    </AnimationRegistrar>
                </StyledCnt>
            </StyledRowCnt>
        </div>
    );
}

export default App;
