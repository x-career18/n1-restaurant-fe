import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../contexts/AppContext/AppContext";
import Carousel from "react-bootstrap/Carousel";
import RestaurantDetailModal from "../../modals/RestaurantDetailModal";

const Slider = () => {
  const { restaurants } = useContext(AppContext);
  const [indexCarousel, setIndexCarousel] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [select, setSelect] = useState(null);

  const handleSelect = (selectedIndex) => {
    setIndexCarousel(selectedIndex);
  };

  return (
    <>
      <div className="container">
        <Carousel
          activeIndex={indexCarousel}
          onSelect={handleSelect}
          interval={3000}
          className="w-100"
        >
          {restaurants.map((item, index) => {
            return (
              <Carousel.Item
                key={index}
                interval={3000}
                onClick={(e) => {
                  e.preventDefault();
                  setSelect(item);
                  setModalShow(true);
                }}
              >
                <button className="w-100 border-0">
                  <img
                    src={item.images[index]}
                    alt={item.images[index]}
                    style={{
                      width: "100%",
                      height: 700,
                    }}
                  />
                </button>
                {/* < Carousel.Caption className="text-body">
                    <h3>{item.name}</h3>
                    <p>Địa chỉ: {item.address}.</p>
                  </Carousel.Caption> */}
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
      <RestaurantDetailModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        restaurant={select}
      />
    </>
  );
};

export default Slider;
