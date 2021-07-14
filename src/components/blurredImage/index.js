import React, { useState, useEffect } from 'react';

function BlurredImageComponent(props) {

    const [image, setImage] = useState('')

    useEffect(() => {
        setImage(props.image);
    }, [props.image])


    return (

        <img
            onLoad={() => {
                setImage(image.replace("preview", "small"));
            }}
            alt=""
            className="embed-responsive-item film-play-image"
            src={image} />);
}

export default BlurredImageComponent;