import { useState, useRef, useEffect } from 'react';
import useIntersectionObserver from '../../helpers/hooks/useIntersectionObserver';
import "./blurred.css";

const BlurredImage = ({ src, thumb, isCached }) => {
    const [isLoaded, setIsLoaded] = useState(isCached);

    return (
        <div className="ratio ratio-16x9">
            <img
                className="image thumb"
                alt=""
                src={thumb}
                style={{ visibility: isLoaded ? "hidden" : "visible" }}
            />
            <img
                onLoad={() => {
                    setIsLoaded(true);
                }}
                className="image full"
                style={{ opacity: isLoaded ? 1 : 0 }}
                alt=""
                src={src}
            />
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
                tmp.src = image.concat('?width=small_webp');
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
                <BlurredImage isCached={isCached} src={image.concat('?width=small_webp')} thumb={image.concat('?width=preview_webp')} />
            )}
        </div>
    );
}

export default BlurredImageComponent;