import React from "react";

const Featured = () => {
  const item = {
    id: 1,
    title: "Sicilian",
    desc: "Ignite your taste buds with a fiery combination of spicy pepperoni, jalapeños, crushed red pepper flakes, and melted mozzarella cheese, delivering a kick with every bite.",
    img: "/temporary/p1.png",
    price: 24.9,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 4,
      },
      {
        title: "Large",
        additionalPrice: 6,
      },
    ],
  }

  const featuredProducts = [item, {
    id: 2,
    title: "Bacon Deluxe",
    desc: "Indulge in smoky goodness with a flame-grilled beef patty, topped with crispy bacon, melted cheddar cheese, caramelized onions, and a smattering of tangy BBQ sauce.",
    img: "/temporary/p2.png",
    price: 29.9,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 4,
      },
      {
        title: "Large",
        additionalPrice: 6,
      },
    ],
  },]

  return (
    <div className="w-100">
      <div className="row align-items-start text-my-color-navbar">
        {featuredProducts.map((item) => (
          <div className="col">
            <div
              key={item.id}
              className="d-flex flex-column align-items-center justify-content-around p-4"
            >
              {item.img && (
                <img src={item.img} alt={item.img} className="object-contain"
                  style={{
                    width: '100%',
                    height: 512
                  }} />
              )}
              <div className=" flex-fill flex flex-column align-items-center justify-content-center">
                <h1 className="fs-3 fw-bold text-uppercase">{item.title}</h1>
                <p className="p-4">{item.desc}</p>
                <span className="fs-3 fw-bold">${item.price}</span>
                <div className="bg-my-primary text-white p-2 rounded-1">
                  Add to Cart
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
