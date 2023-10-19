
// Thể hiện thông tin món ăn
const Food = {
    foodCode: '',
    foodName: "",
    category: "",
    description: "",
    unit: "",
    price: 10,
    discount: 10
};

const FoodName = [
    'Đồ nướng',
    'Đồ sào',
    'Đồ thui',
    'Đồ uống',
];

const createFood = ({
    id,
    foodCode,
    img,
    foodName,
    category,
    description,
    unit,
    price,
    discount }) => {
    return {
        id,
        foodCode,
        img,
        foodName: FoodName[foodName],
        category,
        description,
        unit,
        price,
        discount
    }
}

export default createFood;