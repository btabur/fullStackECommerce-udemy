import "./Gallery.css";

const Gallery = () => {
  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <img src="img/products/product2/1.png" id="single-image" alt="" />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
          <ol
           className="gallery-thumbs glide__slides"
            style={{transform:'0ms', width:'375px'}}
           // style="transition: transform 0ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s; width: 357px; transform: translate3d(0px, 0px, 0px);"
          >
            <li
             className="glide__slide glide__slide--active"
            
              style={{width:'109px' , marginRight:'5px'}}
            >
              <img
                src="img/products/product2/1.png"
                alt=""
               className="img-fluid active"
              />
            </li>

            <li
             className="glide__slide"
              style={{width:'109px', marginLeft:'5px', marginRight:'5px'}}
           
            >
              <img src="img/products/product2/2.png" alt=""className="img-fluid" />
            </li>

            <li className="glide__slide" 
            style={{width:'109px', marginLeft:'5px'}}
        
             >
              <img src="img/products/product2/3.png" alt=""className="img-fluid" />
            </li>
          </ol>
        </div>
        <div className="glide__arrows" data-glide-el="controls">
          <button
            className="glide__arrow glide__arrow--left"
            data-glide-dir="<"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            className="glide__arrow glide__arrow--right"
            data-glide-dir=">"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
