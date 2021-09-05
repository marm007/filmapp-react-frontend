import Skeleton from 'react-loading-skeleton';

const RecommendationsSkeleton = () => {


    return (

        <div className="col-12 mx-0 mb-4 container-px">
            <div className="row p-0 m-0">
                <div className='col-6 col-sm-6 m-0 p-0' >
                    <div className="embed-responsive embed-responsive-16by9 p-0">
                        <Skeleton className="embed-responsive-item w-100 h-100 p-0" />
                    </div>
                </div>
                <div className='col-6 col-sm-6 m-0'>
                    <div className="row m-0 h-25">
                        <div className="col p-0 w-100 h-100">
                            <Skeleton className="w-100 h-100 line-height-unset" />
                        </div>
                    </div>
                    <div className="pt-2 h-75">
                            <Skeleton className="w-100 h-100 line-height-unset" />
                        </div>
                </div>
            </div>
        </div>
    )
}

export default RecommendationsSkeleton