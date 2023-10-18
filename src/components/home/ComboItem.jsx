import React from 'react'

const ComboItem = ({ item, index }) => {
    return (
        <div key={index} className='col-md-4 p-3'>
            <div className="card border-0 p-0">
                <div className="card-body"
                    style={{
                        borderLeft: "9px solid #F6921E",

                    }}
                >
                    <h1 className="card-title text-uppercase">
                        {item.comboCategory}
                        <span
                            className='text-my-color-navbar'
                            style={{
                                marginLeft: 10
                            }}>
                            {item.comboName}</span>
                    </h1>
                    <p className="card-text">{item.comboDescription}</p>
                    <p className="card-text"><small className="text-muted">{item.comboCount}</small></p>
                </div>
                <div className='mt-3 position-relative'>
                    <img src="https://cdn.lauphan.com:9998/api/file/img?PathFile=/Menu/37/menu1685431458177.png" alt='...' className="img-fluid card-img-bottom" />
                    <div className='position-absolute bottom-0 start-50 translate-middle-x p-4 w-100 d-flex justify-content-center'>
                        <button
                            style={{
                                border: "1px solid black",
                                background: "black",
                                borderRadius: 6,
                                color: 'white',
                                height: 46,
                                width: '100%',
                                maxWidth: 221,
                                fontSize: 16
                            }}
                        >
                            Xem thực đơn
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ComboItem;