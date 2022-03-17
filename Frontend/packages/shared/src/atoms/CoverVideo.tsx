import React from 'react';
import ReactPlayer from 'react-player';
import { useStyletron } from 'styletron-react';
import { ClassNameBuilder } from '../utilties';

interface Props {
    url: string;
    autoplay?: boolean;
    loop?: boolean;
    className?: string;
    /**
     * width / height of the video
     */
    aspectRatio: number;
}

export const CoverVideo = (props: Props): JSX.Element => {
    const { url, autoplay, className, aspectRatio, loop } = props;

    const [height, setHeight] = React.useState(0);
    const [width, setWidth] = React.useState(0);

    const [css] = useStyletron();

    React.useEffect(() => {
        const onResize = (): void => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            const windowAspectRatio = windowWidth / windowHeight;

            if (windowAspectRatio <= aspectRatio) {
                setHeight(windowHeight);
                setWidth(windowHeight * aspectRatio);

                return;
            }

            setHeight(windowWidth / aspectRatio);
            setWidth(windowWidth);
        };

        window.addEventListener('resize', onResize);
        onResize();

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [aspectRatio]);

    return (
        <div
            className={ClassNameBuilder(
                className,
                css({
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                })
            )}
        >
            <div style={{ height, width }}>
                <ReactPlayer
                    loop={loop}
                    url={url}
                    playing={autoplay}
                    width="100%"
                    height="100%"
                    muted
                />
            </div>
        </div>
    );
};

export default CoverVideo;
