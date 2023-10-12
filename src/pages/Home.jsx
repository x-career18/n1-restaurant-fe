import React from 'react'
import Slider from '../components/Slider'
import Footer from '../components/Footer'
import FindRestaurant from '../components/FindRestaurant'

const Home = () => {
    return (
        <div className='my-layout'>
            <div className='my-header'>
                <FindRestaurant />
            </div>
            <div className='my-content'>
                <Slider />
            </div>
            <div className="my-footer">
                <Footer />
            </div>
        </div>
    )
}

export default Home;