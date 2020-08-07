import React from 'react'
import Navbar from '../layout/Navbar'
const WithUserHeaders = (Component) => (props) => {
    return (
        <>
            <Navbar />
            <Component {...props} />
        </>
    )
}

export default WithUserHeaders
