import { Col } from 'react-bootstrap';

import Skeleton from 'react-loading-skeleton';

import '../pages/film/film.css'

const FilmSkeleton = () => {

    const normalClass = "col mb-5 col-12 col-sm-6 col-md-3 col-lg-2"

    return (
        <div className={normalClass}>
            <Col xs={12} sm={12}>
                <div className="embed-responsive embed-responsive-16by9 z-depth-1-half play-container">
                    <div className="ratio ratio-16x9">
                        <Skeleton className="w-100 h-100" style={{ lineHeight: '1.5' }} />
                    </div>
                </div>
            </Col>
            <Col xs={12} sm={12} className="mt-2">
                <Col className="p-0">
                    <Skeleton className="w-100" />
                </Col>

                <Col className="p-0">
                    <Skeleton className="w-100" />
                </Col>

            </Col>
        </div>
    )
}

export default FilmSkeleton