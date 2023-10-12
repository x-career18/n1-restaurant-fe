import React from 'react'

const Main = ({ children }) => {
    return (
        <div className='mx-0 my-0'
            style={{
                height: 'calc(100vh - 100px)'
            }}>
            {children}
        </div>
    )
}
    ;
export default Main;