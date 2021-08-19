import Skeleton from 'react-loading-skeleton';

const SearchSkeleton = () => {


    return (

        <div className="row mx-0 mb-4">
            <div className="row p-0 m-0">
                <div className='col-6 col-sm-6 m-0 p-0' >
                    <div className="ratio ratio-16x9">
                        <Skeleton className="w-100 h-100" />
                    </div>
                </div>
                <div className='col-6 col-sm-6 m-0'>
                    <div className="row m-0 h-25">
                        <div className="col p-0">
                            <Skeleton className="w-100 h-100" />
                        </div>
                    </div>
                    <div className="pt-2 h-75">
                            <Skeleton className="w-100 h-100" />
                        </div>
                </div>
            </div>
        </div>
    )
}

export default SearchSkeleton