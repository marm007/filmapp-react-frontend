import Skeleton from 'react-loading-skeleton';

const SearchSkeleton = () => {


    return (

        <div className="col-12 col-sm-12 col-lg-8 m-0 mb-1 container-px">
            <div className="row mb-4 m-0">
                <div className="col-8 col-sm-4 p-0">
                    <div className="embed-responsive embed-responsive-16by9 ">
                        <Skeleton className="embed-responsive-item  w-100 h-100" />
                    </div>
                </div>
                <div className="col-4 col-sm-8">
                    <div className="col-12 col-sm-12 p-0 pb-1 h-25">
                        <Skeleton className="w-100 h-100 line-height-unset" />
                    </div>
                    <div className="col-12 col-sm-12 h-75 p-0 pt-1">
                        <Skeleton className="w-100 h-100 line-height-unset"  />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchSkeleton