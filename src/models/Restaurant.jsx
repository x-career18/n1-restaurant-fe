export const Restaurant = {
    name: "",
    address: "",
    openTime: "",
    closeTime: "",
    description: "",
    images: [],
};

const createRestaurant = ({
    name,
    address,
    openTime,
    closeTime,
    description,
    images,
}) => {
    return {
        name,
        address,
        openTime,
        closeTime,
        description,
        images,
    }
}

export default createRestaurant;