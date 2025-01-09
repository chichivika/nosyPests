import React from 'react';
import styled from 'styled-components';
import MouseWrapper from './mouse/MouseWrapper';

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
            <StyledRowCnt>
                <StyledCnt>
                    <StyledRowCnt>
                        <div style={{ backgroundColor: 'grey', width: '15px', height: '15px' }} />
                        <div style={{ backgroundColor: 'blue', width: '20px', height: '20px' }} />
                        <div style={{ backgroundColor: 'pink', width: '30px', height: '30px' }} />
                        <div style={{ backgroundColor: 'orange', width: '40px', height: '40px' }} />
                        <div style={{ backgroundColor: 'green', width: '50px', height: '50px' }} />
                    </StyledRowCnt>
                    <div style={{ border: '1px solid grey', width: '200px', height: '200px' }} />
                </StyledCnt>
                <StyledCnt>
                    <StyledRowCnt>
                        <MouseWrapper height={15}>
                            <div
                                style={{ backgroundColor: 'grey', width: '50px', height: '50px' }}
                            />
                        </MouseWrapper>
                        <MouseWrapper height={20}>
                            <div
                                style={{ backgroundColor: 'blue', width: '50px', height: '50px' }}
                            />
                        </MouseWrapper>
                        <MouseWrapper height={30}>
                            <div
                                style={{ backgroundColor: 'pink', width: '50px', height: '50px' }}
                            />
                        </MouseWrapper>
                        <MouseWrapper height={40}>
                            <div
                                style={{ backgroundColor: 'orange', width: '50px', height: '50px' }}
                            />
                        </MouseWrapper>
                        <MouseWrapper height={50} turnedLeft={false}>
                            <div
                                style={{ backgroundColor: 'green', width: '50px', height: '50px' }}
                            />
                        </MouseWrapper>
                    </StyledRowCnt>
                    <MouseWrapper>
                        <MouseWrapper bottom={0} height={300}>
                            <div
                                style={{
                                    border: '1px solid grey',
                                    width: '300px',
                                    height: '300px',
                                }}
                            />
                        </MouseWrapper>
                    </MouseWrapper>
                </StyledCnt>
            </StyledRowCnt>
        </div>
    );
}

export default App;
