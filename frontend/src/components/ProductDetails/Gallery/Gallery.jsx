import { useState } from "react";
import productData from "../../../data.json";
import Slider from "react-slick";
import "./Gallery.css";

function NextBtn({ onClick }) {
  return (
    <button
      className="glide__arrow glide__arrow--right"
      data-glide-dir=">"
      onClick={onClick}
      style={{zIndex:'2'}}
    >
      <i className="bi bi-chevron-right"></i>
    </button>
  );
}
function PrevBtn({ onClick }) {
  return (
    <button
      className="glide__arrow glide__arrow--left"
      data-glide-dir="<"
      onClick={onClick}
      style={{zIndex:'2'}}
    >
      <i className="bi bi-chevron-left"></i>
    </button>
  );
}

const Gallery = () => {
  const [activeImg, setActiveImg] = useState(productData[0].img.thumbs[0]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
  };

  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <img src={activeImg} id="single-image" alt="" />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
          <ol
            className="gallery-thumbs glide__slides"
            style={{ transform: "0ms", width: "375px" }}
            // style="transition: transform 0ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s; width: 357px; transform: translate3d(0px, 0px, 0px);"
          >
            <Slider {...sliderSettings}>
              {productData[0].img.thumbs.map((item, index) => (
                <li
                  key={index}
                  onClick={() => setActiveImg(item)}
                  className="glide__slide glide__slide--active"
                  style={{ width: "109px", marginRight: "5px" }}
                >
                  <img
                    src={item}
                    alt=""
                    className={`img-fluid ${item === activeImg && "active"}`}
                  />
                </li>
              ))}
            </Slider>
          </ol>
        </div>
        <div className="glide__arrows" data-glide-el="controls"></div>
      </div>
    </div>
  );
};

export default Gallery;
