import React from 'react'
import { COMBOMENU } from '../utils/LoadImage';

const ComboMenu = () => {
    return (
        <div className="container">
            <div className='row mx-0 gap-3 mt-3'>
                {
                    COMBOMENU.map((item, index) => {
                        return <div className="col-12">
                            <img src={item} alt={index} className='img-fluid' />
                        </div>
                    })
                }

            </div>
        </div>
    )
}

export default ComboMenu;