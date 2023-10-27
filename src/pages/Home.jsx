import React, { useContext, useEffect } from 'react'
import Slider from '../components/home/Slider'
import Footer from '../components/Footer'
import FindRestaurant from '../components/home/FindRestaurant'
import Combo from './Combo'
import Restaurants from './Restaurants'
import AppContext from '../contexts/AppContext/AppContext'
import { notification } from "antd";

const Home = () => {
    const { requestError } = useContext(AppContext);
    const [mode, contextHolder] = notification.useNotification(); // success info warning error

    useEffect(() => {
        if (requestError) {
            openNotificationWithIcon("info", "Hệ thống hiện không hoạt động");
        }
    }, [requestError]);

    const openNotificationWithIcon = (type, message) => {
        mode[type]({
            message: "Thông báo",
            description: message,
        });
    };

    return (
        <div className='my-layout'>
            {contextHolder}
            <div className='my-content my-center-vertiacal'>
                <div className='container'>
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

const HomeV1 = () => {
    return <div className='my-layout'>
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
    </div>;
}

export default Home;