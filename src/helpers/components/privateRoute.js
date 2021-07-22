import {Redirect, Route} from "react-router";
import React from "react";

const PrivateRoute = ({component: Component, ...rest}) => {
    return <Route
        {...rest}
        render={props =>
            localStorage.getItem('accessToken') ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: `${process.env.REACT_APP_PATH_NAME}login`,
                    state: {from: props.location}
                }}/>
            )
        }/>
};

export default PrivateRoute