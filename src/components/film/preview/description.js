import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextTruncate from "react-text-truncate";

export default function Description({ description }) {

    let { id } = useParams()

    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        setIsExpanded(false)
    }, [id])

    const handleTruncate = (event) => {
        event.preventDefault();
        setIsExpanded(!isExpanded)
    }
    const TruncateButton = (title) => {
        return (
            <span>
                <button className="btn btn-link p-0 m-0 mb-1 title font-weight-bold"
                    onClick={handleTruncate}>{title}</button>
            </span>
        )
    }

    return (
        <div className="col-12 col-sm-12 p-0" style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>
            <TextTruncate line={!isExpanded && 2}
                truncateText="…"
                text={description}
                textTruncateChild={TruncateButton('Show more')} />

            {isExpanded && TruncateButton('Show less')}
        </div>
    )
}