import React from 'react'
import error_500 from '../../../images/error_500.svg'; // Tell Webpack this JS file uses this image

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        console.error('BoundaryError', error)
        console.error('BoundaryError', errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return <>
            {this.props.children[1].props.children[0]}
                <div className="text-center">
                    <div className="col-12 col-sm-12 my-4 px-4">
                        <div className="ratio ratio-21x9">
                            <img className="embed-responsive-item" src={error_500} alt="" />
                        </div>
                    </div>
                    <h1>Something went wrong!</h1>
                    <h5>Try reloading this page</h5>
                    <div className="btn btn-success">Reload page</div>
                </div>
            </>
        }

        return this.props.children

    }
}

export default ErrorBoundary