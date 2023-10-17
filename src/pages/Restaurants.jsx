import React, { useContext } from 'react'
import AppContext from '../contexts/AppContext/AppContext';
import CardRestaurant from '../components/home/CardRestaurant';

const Restaurants = () => {
    const { restaurants } = useContext(AppContext);
    let listShowRestaurant = [];

    for (let index = 0; index < restaurants.length; index += 2) {
        let item = [];
        for (let i = 0; i < 2; i++) {
            const element = restaurants[index + i];
            item.push(element);
        }
        listShowRestaurant.push(item);
    }

    return (
        <>
            {
                listShowRestaurant.map((item, index) => {
                    return (
                        <div key={index} className='row gap-4 text-center mt-4'>
                            {
                                item.map((item1, index1) => {
                                    if (!item1) {
                                        return (
                                            <div key={index} className='col'
                                            ></div>
                                        );
                                    }
                                    return <CardRestaurant index={index1 + index} item={item1} />
                                })
                            }
                        </div>
                    );
                })
            }
        </>
    )
}

export default Restaurants;