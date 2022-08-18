/* eslint-disable react/jsx-props-no-spreading */
import { LinkButton } from '@gac/shared-v2';
import React from 'react';
import { useStyletron } from 'styletron-react';
import DashboardSection from '../atoms/DashboardSection';
import Heading from '../atoms/Heading';
import '../styles/global.css';

export default {
    title: 'Dashboard/Atoms/DashboardSection',
    component: DashboardSection,
};

const Template = (
    args: React.ComponentProps<typeof DashboardSection>
): JSX.Element => {
    return (
        <div style={{ padding: '3rem', backgroundColor: 'black' }}>
            <DashboardSection {...args} />
        </div>
    );
};

export const WithoutAction = (): JSX.Element => {
    const [css] = useStyletron();
    return (
        <DashboardSection
            className={css({ padding: '3rem', backgroundColor: 'black' })}
            heading={<Heading highlightedTitle="A Simple" title="Heading" />}
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
            heading={<Heading highlightedTitle="A Simple" title="Heading" />}
            action={<LinkButton href="#" text="An action link" />}
        >
            <p className={css({ height: '300px', backgroundColor: 'blue' })}>
                Content
            </p>
        </DashboardSection>
    );
};
