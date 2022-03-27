import React from 'react';
import { RolesDropdown } from '../atoms/RolesDropdown';

export default {
    title: 'Market/Atoms/RolesDropdown',
    component: RolesDropdown,
};

export const StandAlone = (): JSX.Element => (
    <div
        style={{
            backgroundColor: 'black',
            height: '900px',
            width: '600px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <RolesDropdown />
    </div>
);
