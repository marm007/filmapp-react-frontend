import Skeleton from 'react-loading-skeleton';

const FilmSkeleton = ({ isRecommendations }) => {

    return (
        <div className={`${isRecommendations ? 'col-sm-12' : 'col-sm-6'} mb-4 col col-12 col-md-3 col-lg-2 container-px`}>
            <div className="col-12 col-sm-12 p-0">
                <div className="embed-responsive embed-responsive-16by9 z-depth-1-half play-container">
                    <div className="embed-responsive-item">
                        <Skeleton className="w-100 h-100 line-height-unset" />
                    </div>
                </div>
            </div>
            <div className="col-12 col-sm-12 mt-2 p-0">
                <div className="col p-0">
                    <Skeleton className="w-100 h-100 line-height-unset" />
                </div>

                <div className="col p-0">
                    <Skeleton className={`${isRecommendations ? 'line-height-unset' : ''} col w-100`} />
                </div>
            </div>
        </div>
    )
}

export default FilmSkeleton