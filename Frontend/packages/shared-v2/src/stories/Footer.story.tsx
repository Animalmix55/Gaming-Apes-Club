import React from 'react';
import { Footer } from '../atoms/Footer';

export default {
    title: 'Shared/v2/Atoms/Footer',
    component: Footer,
};

export const StandAlone = (): JSX.Element => {
    return (
        <Footer
            links={[
                { name: 'Twitter', url: '#' },
                { name: 'Discord', url: '#' },
                { name: 'OpenSea', url: '#' },
            ]}
        />
    );
};
