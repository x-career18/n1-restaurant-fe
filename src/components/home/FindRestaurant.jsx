import { AutoComplete, Input } from 'antd';
import React, { useState } from 'react'

const historySearch = [
    "Hà Nội",
    "Hồ Chí Minh",
    "Cần Thơ",
    "Cần Giờ",
];

const searchResult = (query) => {
    const result = historySearch.filter((item) => item.includes(query));
    if (!result) return [];
    return result.map((item, idx) => {
        return {
            value: item,
            label: (
                <div>
                    {item}
                </div>
            ),
        };
    });
}

const FindRestaurant = () => {
    const [options, setOptions] = useState([]);

    const handleSearch = (value) => {
        setOptions(value ? searchResult(value) : []);
    };

    const onSelect = (value) => {
        console.log('onSelect', value);
    };

    return (
        <div className='mt-3 mb-4 px-3 d-flex justify-content-end'>
            <div className='d-flex flex-column'>
                <p>
                    Tìm kiếm nhà hàng gần nhất
                </p>
                <AutoComplete
                    popupMatchSelectWidth={252}
                    style={{
                            width: 300,
                    }}
                    options={options}
                    onSelect={onSelect}
                    onSearch={handleSearch}
                    size="middle"
                >
                    <Input.Search placeholder="Nhập tên đường của bạn" enterButton />
                </AutoComplete>
            </div>

        </div>
    );
}

export default FindRestaurant