import React from 'react'
import Main from '../components/Main'
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const navigate = useNavigate();
    let foodList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


    const handleSuccess = () => {
        navigate("/");
    }

    return (
        <Main>
            <div className='container h-100'>
                {/* Hiển thị hóa đơn được trích xuất */}
                <h1>
                    Nội dung hóa đơn
                </h1>
                {
                    foodList.map((item, index) => {
                        const title = "Món ăn số " + item;
                        return <FormShowValue title={title} value="0" />
                    })
                }
                <hr />
                {/* Nhóm thông tin cần xử lý */}
                <div className='row justify-content-end'>
                    <div className='col-5 align-self-end'>
                        {/* Giá tạm tính = Tổng tiền hóa đơn */}
                        <FormShowValue title="Tổng số tiền" value="0" />
                        {/* Giảm giá */}
                        <FormShowValue title="Giảm giá" value="0" />
                        {/* Hình thức thanh toán */}
                        <FormShowValue title="Tiền mặt" value="0" />
                        <FormShowValue title="Chuyển khoản" value="0" />
                        {/* In hóa đơn */}
                        <div className='row justify-content-end mt-5'>
                            <button type="button" className="bg-my-primary text-center text-white fs-3 p-2 rounded-1 border-0 w-50"
                                onClick={handleSuccess}>
                                Thanh toán
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </Main>
    )
}

const FormShowValue = ({ title, value }) => {
    return (
        <div className='row'>
            <div className='col-7 text-start'>
                <h2>
                    {title}
                </h2>
            </div>
            <div className='col text-end'>
                <h2>
                    {value}
                </h2>
            </div>
        </div>);
}

export default Payment;