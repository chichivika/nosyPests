import React from 'react';
import styled from 'styled-components';
import { CheckboxProps, Checkbox as UiCheckbox } from '@mui/material';

const StyledUiCheckbox = styled(UiCheckbox)`
    &.MuiButtonBase-root.MuiCheckbox-root.MuiCheckbox-colorPrimary {
        .Mui-checked {
            background-color: ${(props) => props.theme.headerColor};
        }
        svg {
            fill: ${(props) => props.theme.headerColor};
        }
    }
`;

export default function Checkbox(props: CheckboxProps) {
    return <StyledUiCheckbox {...props} />;
}
