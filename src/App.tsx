import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Header from './Header';
import colors from './style/colors';
import WrapperDemo from './demo/WrapperDemo';
import AnimationElement from './nosyPests/registrar/AnimationElement';
import RegistrarDemo from './demo/RegistrarDemo';

const StyledApp = styled.div`
    font-family: Roboto, sans-serif;
    color: ${(props) => props.theme.headerColor};
`;

function App() {
    return (
        <ThemeProvider theme={colors}>
            <StyledApp className='app'>
                <Header />
                <RegistrarDemo />
                <WrapperDemo />
                <AnimationElement animationPeriodicity={1} />
            </StyledApp>
        </ThemeProvider>
    );
}

export default App;
