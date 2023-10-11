import React from 'react'

const MainLayout = ({ children }) => {
    return (
        <div className='my-layout'>
            <div className='my-container'>
                {children}
            </div>
        </div>

    )
};

export default MainLayout;