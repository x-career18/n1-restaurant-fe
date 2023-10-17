import React from 'react'
import Slider from '../components/home/Slider'
import Footer from '../components/Footer'
import FindRestaurant from '../components/home/FindRestaurant'
import Combo from './Combo'
import Restaurants from './Restaurants'

const Home = () => {
    return (
        <div className='my-layout'>
            <div className='my-content my-center-vertiacal'>
                <div className='my-container'>
                    <FindRestaurant />
                    <Slider />
                    {/* Container combo */}
                    <Combo />
                    {/* Container List Restaurant */}
                    <h3 className='text-center'>
                        Danh sách các cơ sở
                    </h3>
                    <Restaurants />
                </div>
            </div>
            <div className="my-footer">
                <Footer />
            </div>
        </div>
    )
}

export default Home;