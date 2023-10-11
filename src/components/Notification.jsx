import React from 'react'

const Notification = () => {
  return (
    <div className='bg-my-primary d-flex justify-content-center align-items-center'
      style={{
        height: 30
      }}
    >
      <div className='fs-4 text-white text-sm md:text-base cursor-pointer'>
        Hôm nay miễn phí toàn bộ, mau đặt bàn!
      </div>
    </div>
  )
}

export default Notification