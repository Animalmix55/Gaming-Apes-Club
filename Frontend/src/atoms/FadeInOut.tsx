import React from 'react';
import '../styles/fadeInOut.css';
import { CSSTransition } from 'react-transition-group';

export const FadeInOut = ({
    children,
    visible,
    onEnter,
    onExited,
}: {
    children: React.ReactNode;
    visible?: boolean;
    onEnter?: () => void;
    onExited?: () => void;
}): JSX.Element => {
    return (
        <CSSTransition
            className="Test"
            timeout={300}
            unmountOnExit
            mountOnEnter
            onEnter={onEnter}
            onExited={onExited}
            in={visible}
            classNames="fade"
        >
            {children}
        </CSSTransition>
    );
};

export default FadeInOut;
