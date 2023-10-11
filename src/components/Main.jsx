import React from 'react'

const Main = ({ children }) => {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center'
            style={{
                height: 'calc(100vh - 100px)'
            }}>
            {children}
        </div>
    )
}
    ;
export default Main;