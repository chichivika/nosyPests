import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import TreeContainer from './pestsTree/TreeContainer';
import Header from './Header';
import colors from './style/colors';
import WrapperDemo from './nosyPests/demo/WrapperDemo';
import AnimationElement from './nosyPests/registrar/AnimationElement';
import RegistrarDemo from './nosyPests/demo/RegistrarDemo';

const StyledApp = styled.div`
    font-family: Roboto, sans-serif;
    color: ${(props) => props.theme.headerColor};
`;

function App() {
    return (
        <ThemeProvider theme={colors}>
            <StyledApp className='app'>
                <Header />
                <TreeContainer />
                <RegistrarDemo />
                <WrapperDemo />
                <AnimationElement animationPeriodicity={1} />
            </StyledApp>
        </ThemeProvider>
    );
}

export default App;
