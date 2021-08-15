import Skeleton from 'react-loading-skeleton';

const SearchSkeleton = () => {


    return (

        <div className="col-12 col-sm-12 col-lg-8 m-0 mb-1">
            <div className="row mb-4 m-0">
                <div className="col-8 col-sm-4 p-0">
                    <div className="ratio ratio-16x9">
                        <Skeleton className="w-100 h-100" style={{ lineHeight: '1.5' }} />
                    </div>
                </div>
                <div className="col-4 col-sm-8">
                    <div className="col-12 col-sm-12 p-0 pb-1 h-25">
                        <Skeleton className="w-100 h-100" style={{ lineHeight: '1.5' }} />
                    </div>
                    <div className="col-12 col-sm-12 h-75 pt-1">
                        <Skeleton className="w-100 h-100" style={{ lineHeight: '1.5' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchSkeleton