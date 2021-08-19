import Skeleton from 'react-loading-skeleton';

import '../../pages/film/film.css'

const FilmSkeleton = ({ isRecommendations }) => {

    return (
        <div className={`${isRecommendations ? 'col-sm-12' : 'col-sm-6'} mb-5 col col-12 col-md-3 col-lg-2`}>
            <div className="col-12 col-sm-12">
                <div className="embed-responsive embed-responsive-16by9 z-depth-1-half play-container">
                    <div className="ratio ratio-16x9">
                        <Skeleton className="w-100 h-100" style={{ lineHeight: '1.5' }} />
                    </div>
                </div>
            </div>
            <div className="col-12 col-sm-12 mt-2">
                <div className="col p-0">
                    <Skeleton className="col w-100" />
                </div>

                <div className="col p-0">
                    <Skeleton className="w-100" />
                </div>
            </div>
        </div>
    )
}

export default FilmSkeleton