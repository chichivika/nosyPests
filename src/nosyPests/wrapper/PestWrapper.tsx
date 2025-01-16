/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { RefObject } from 'react';
import PestWrapperStandard from './PestWrapperStandard';
import PestWrapperPortal from './PestWrapperPortal';
import { PestWrapperGeneralParam } from './utils';

type Props = PestWrapperGeneralParam & {
    disablePortal?: boolean;
};

export default function PestWrapper({ disablePortal = true, ...restProps }: Props) {
    return disablePortal ? (
        <PestWrapperStandard {...restProps} />
    ) : (
        <PestWrapperPortal {...restProps} />
    );
}
