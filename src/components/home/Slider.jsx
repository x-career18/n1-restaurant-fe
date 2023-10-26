import React, { useContext, useState } from "react";
import AppContext from "../../contexts/AppContext/AppContext";
import Carousel from "react-bootstrap/Carousel";
import RestaurantDetailModal from "../../modals/RestaurantDetailModal";

const Slider = () => {
  const { restaurants } = useContext(AppContext);
  const [indexCarousel, setIndexCarousel] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [select, setSelect] = useState(null);

  const handleChangeSlider = (selectedIndex) => {
    setIndexCarousel(selectedIndex);
  };

  const handleSelect = (e, item) => {
    e.preventDefault();
    setSelect(item);
    setModalShow(true);
  };

  return (
    <>
      <div className="container">
        <Carousel
          activeIndex={indexCarousel}
          onSelect={handleChangeSlider}
          interval={3000}
          className="w-100"
        >
          {restaurants.length > 0 && restaurants?.map((item, index) => {
            return (
              <Carousel.Item
                key={index}
                interval={3000}
                onClick={(e) => handleSelect(e, item)}
              >
                <button className="w-100 border-0">
                  <img
                    src={item.images[0]}
                    alt={item.images[0]}
                    style={{
                      width: "100%",
                      height: 700,
                    }}
                  />
                </button>
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
