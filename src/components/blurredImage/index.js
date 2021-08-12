import React, { useState, useEffect } from 'react';
import { Ratio } from 'react-bootstrap'

function BlurredImageComponent(props) {

    const [image, setImage] = useState("data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==")

    useEffect(() => {
        setImage(props.image);
    }, [props.image])


    return (
        <Ratio aspectRatio="16x9">
            <img
                alt=""
                className="embed-responsive-item play-image"
                src={image} />
        </Ratio>);
}

export default BlurredImageComponent;