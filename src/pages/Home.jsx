import React from 'react'
import Slider from '../components/Slider'
import Footer from '../components/Footer'
import FindRestaurant from '../components/FindRestaurant'

const Home = () => {
    return (
        <div>
            <FindRestaurant />
            <Slider />
            <Footer />
        </div>
    )
}

export default Home