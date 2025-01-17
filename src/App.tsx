import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PestsTree from './pestsTree/PestsTree';
import Header from './Header';
import colors from './style/colors';

const StyledApp = styled.div`
    font-family: Roboto, sans-serif;
`;
const StyledRowCnt = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.headerBgColor};
    & > * {
        margin: 1rem;
    }
`;

const StyledTreeContainer = styled(StyledRowCnt)`
    flex-wrap: wrap;
    column-gap: 150px;
`;
function App() {
    return (
        <ThemeProvider theme={colors}>
            <StyledApp className='app'>
                <Header />
                <StyledTreeContainer>
                    <PestsTree flip />
                    <PestsTree mirror />
                    <PestsTree />
                </StyledTreeContainer>
            </StyledApp>
        </ThemeProvider>
    );
}

export default App;
