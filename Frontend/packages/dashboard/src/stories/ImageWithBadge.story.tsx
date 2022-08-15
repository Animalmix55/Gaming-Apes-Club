import React from 'react';
import { ImageWithBadge } from '../atoms/ImageWithBadge';

export default {
    title: 'Market/Atoms/ImageWithBadge',
    component: ImageWithBadge,
};

export const StandAlone = (): JSX.Element => (
    <ImageWithBadge
        image="https://i.ibb.co/3NwhsNs/FXo-VKQr-UYAEzo37.png"
        badgeImage="https://cdn.discordapp.com/avatars/322106367982829579/39db3ce204c931811d1174b56182ab9f.webp"
    />
);
