import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../../context/UserContext'

function AdminRoute({ component: Component, ...rest }) {
    const { userData } = useContext(UserContext);
    // console.log(userData);
    const RenderComponent = (props) => {
        if (userData && userData.isAdmin) {
            return <Component {...props} />
        } else {
            return <Redirect to={{
                pathname: "/login",
                state: { from: props.location },
            }} />;
        }
    }

    return (
        <Route
            {...rest}
            component={RenderComponent}
        />
    )
}

function UserRoute({ component: Component, ...rest }) {
    const { userData } = useContext(UserContext);
    const RenderComponent = (props) => {
        if (userData) {
            return <Component {...props} />
        } else {
            return <Redirect to={{
                pathname: "/login",
                state: { from: props.location },
            }} />;
        }
    }
    return (
        <Route
            {...rest}
            component={RenderComponent}
        />
    )
}

export { AdminRoute, UserRoute }
