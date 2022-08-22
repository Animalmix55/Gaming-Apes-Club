/* eslint-disable react/jsx-props-no-spreading */
import { LinkButton, Header } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import DashboardSection from '../molecules/DashboardSection';
import '../styles/global.css';

export default {
    title: 'Dashboard/Molecules/DashboardSection',
    component: DashboardSection,
};

export const WithoutAction = (): JSX.Element => {
    const [css] = useStyletron();
    return (
        <DashboardSection
            className={css({ padding: '3rem', backgroundColor: 'black' })}
            heading={<Header title="A Simple" subtitle="Heading" />}
        >
            <p className={css({ height: '300px', backgroundColor: 'blue' })}>
                Content
            </p>
        </DashboardSection>
    );
};

export const WithAction = (): JSX.Element => {
    const [css] = useStyletron();
    return (
        <DashboardSection
            className={css({ padding: '3rem', backgroundColor: 'black' })}
            heading={<Header title="A Simple" subtitle="Heading" />}
            action={<LinkButton href="#" text="An action link" />}
        >
            <p className={css({ height: '300px', backgroundColor: 'blue' })}>
                Content
            </p>
        </DashboardSection>
    );
};
