
// Thể hiện thông tin món ăn
export const Food = {
    foodCode: '',
    foodName: "",
    category: "",
    description: "",
    unit: "",
    price: 10,
    discount: 10
};

const createFood = ({ foodCode,
    foodName,
    category,
    description,
    unit,
    price,
    discount }) => {
    return {
        foodCode,
        foodName,
        category,
        description,
        unit,
        price,
        discount
    }
}

export default createFood;