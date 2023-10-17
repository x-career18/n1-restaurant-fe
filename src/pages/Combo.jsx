import React, { useContext } from 'react'
import ComboItem from '../components/home/ComboItem';
import AppContext from '../contexts/AppContext/AppContext';

const Combo = () => {
    const { combo } = useContext(AppContext);
    
    return (
        <div className='row my-5'>
            {
                combo.map((item, index) => {
                    return <ComboItem item={item} index={index}/>
                })
            }
        </div>
    );
}

export default Combo;