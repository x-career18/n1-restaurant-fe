const getIdByRestaurantName = (restaurants, name) => {
    let restaurantsId = null;
    for (let index = 0; index < restaurants.length; index++) {
        const element = restaurants[index];
        if (element.name == name) {
            restaurantsId = element._id;
            break;
        }
    }

    return restaurantsId;
};

export { getIdByRestaurantName };