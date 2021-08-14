import { useState, useRef } from 'react';
import useIntersectionObserver from '../../helpers/hooks/useIntersectionObserver';
import "./blurred.css";

const Image = ({ src, thumb }) => {
    const [isLoaded, setIsLoaded] = useState(false);

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
    
    useIntersectionObserver({
        target: ref,
        onIntersect: ([{ isIntersecting }], observerElement) => {
            if (isIntersecting) {
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
                <Image  src={image.concat('?width=small_webp')} thumb={image.concat('?width=preview_webp')} />
            )}
        </div>
    );
}

export default BlurredImageComponent;