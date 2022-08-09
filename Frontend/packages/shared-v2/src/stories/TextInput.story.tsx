import React from 'react';
import { TextInput } from '../atoms/TextInput';

export default {
    title: 'Shared/v2/Atoms/TextInput',
    component: TextInput,
};

export const TextOnly = (): JSX.Element => {
    const [value, setValue] = React.useState(
        '0x1569ab627df0c74E55B8e099a3F2B7d133665186'
    );
    return (
        <TextInput value={value} onChange={setValue} label="Wallet Address" />
    );
};
