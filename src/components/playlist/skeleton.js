import '../pages/film/film.css'
import Skeleton from 'react-loading-skeleton';

const FilmSkeleton = () => {

    const normalClass = "col mb-5 col-12 col-sm-6 col-md-3 col-lg-2"

    return (
        <div className={normalClass}>
            <div className="col-12 col-sm-12">
                <div className="embed-responsive embed-responsive-16by9 z-depth-1-half play-container">
                    <div className="ratio ratio-16x9">
                        <Skeleton className="w-100 h-100" />
                    </div>
                </div>
            </div>
            <div className="col-12 col-sm-12mt-2">
                <div className="col p-0">
                    <Skeleton className="w-100" />
                </div>

                <div className="col p-0">
                    <Skeleton className="w-100" />
                </div>

            </div>
        </div>
    )
}

export default FilmSkeleton