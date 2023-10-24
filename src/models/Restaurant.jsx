export const Restaurant = {
    name: "",
    address: "",
    openTime: "",
    closeTime: "",
    description: "",
    images: [],
};

const createRestaurant = ({
    id,
    name,
    address,
    openTime,
    closeTime,
    description,
    images,
}) => {
    return {
        id,
        name,
        address,
        openTime,
        closeTime,
        description,
        images,
    }
}

export default createRestaurant;