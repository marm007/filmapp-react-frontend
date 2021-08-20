import React, { useState, useRef } from 'react';
import useIntersectionObserver from '../../../helpers/hooks/useIntersectionObserver';
import "./blurred.css";

const BlurredImage = ({ src, srcWebp, thumb, thumbWebp, isCached }) => {
    const [isLoaded, setIsLoaded] = useState(isCached);

    return (
        <div className="ratio ratio-16x9">

            <picture>
                <source type="image/webp" srcSet={thumbWebp} />
                <source type="image/jpeg" srcSet={thumb} />
                <img className="image thumb" alt=""
                    style={{ visibility: isLoaded ? "hidden" : "visible" }}
                    src={thumb}
                    onLoad={() => {
                        setIsLoaded(true);
                    }} />
            </picture>

            <picture>
                <source type="image/webp" srcSet={srcWebp} />
                <source type="image/jpeg" srcSet={src} />
                <img className="image full" alt=""
                    style={{ opacity: isLoaded ? 1 : 0 }}
                    src={src}
                    onLoad={() => {
                        setIsLoaded(true);
                    }} />
            </picture>
        </div>
    );
}

function BlurredImageComponent({ image }) {
    const ref = useRef();
    const [isVisible, setIsVisible] = useState(false);
    const [isCached, setIsCached] = useState(false);

    useIntersectionObserver({
        target: ref,
        onIntersect: ([{ isIntersecting }], observerElement) => {
            if (isIntersecting) {
                let tmp = new Image();
                tmp.src = image.concat('?width=poster_webp');
                setIsCached(tmp.complete)
                setIsVisible(true);
                observerElement.unobserve(ref.current);
            }
        }
    });

    return (
        <div
            ref={ref}
            className="image-container ratio ratio-16x9 play-image"
        >
            {isVisible && (
                <BlurredImage isCached={isCached}
                    src={image.concat('?width=poster')}
                    srcWebp={image.concat('?width=poster_webp')}
                    thumb={image.concat('?width=preview')}
                    thumbWebp={image.concat('?width=preview_webp')} />
            )}
        </div>
    );
}

export default BlurredImageComponent;