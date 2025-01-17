import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const StyledPlusMinus = styled.div`
    margin-right: 0.5rem;
`;

type Props = {
    onPlus: () => void;
    onMinus: () => void;
};
export default function PlusMinus(props: Props) {
    const { onPlus, onMinus } = props;
    return (
        <StyledPlusMinus>
            <IconButton onClick={onPlus}>
                <AddCircleOutlineIcon />
            </IconButton>
            <IconButton onClick={onMinus}>
                <RemoveCircleOutlineIcon />
            </IconButton>
        </StyledPlusMinus>
    );
}
