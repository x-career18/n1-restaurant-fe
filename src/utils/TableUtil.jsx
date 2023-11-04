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

const getIdByTableName = (table, name) => {
    let listTableId = [];
    for (let index = 0; index < table.length; index++) {
        const element = table[index];
        if (element.name == name) {
            listTableId.push(table._id);
        }
    }

    if (listTableId.length == 0) return null;

    return listTableId;
};

export { getIdByRestaurantName,getIdByTableName };