import React from 'react'
import WithUserHeaders from '../HOC/WithUserHeaders'
function Home() {
    return (
        <div>
            Home
        </div>
    )
}

export default WithUserHeaders(Home)
