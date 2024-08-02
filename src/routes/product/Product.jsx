import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Carousel, Button } from "antd";

const Product = () => {
    const dispatch = useDispatch();
    const selectedProduct = useSelector((state) => state?.selectedProduct);

    if (!selectedProduct) {
        return <div>Loading...</div>;
    }

    const addToCart = (product) => {
        console.log(product);
        dispatch({ type: "ADD_TO_CARTH", payload: product });
    };

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "50px" }}>
            <h1>{selectedProduct.product_name}</h1>
            <Carousel arrows infinite autoplay>
                {selectedProduct.product_images.map((image) => (
                    <img key={image} alt="example" src={image} />
                ))}
            </Carousel>
            <p>{selectedProduct.description}</p>
            <h2 style={{ marginTop: "10px" }}>${selectedProduct.sale_price}</h2>
            <Button
                type="primary"
                style={{
                    marginTop: "20px",
                    marginLeft: "80%",
                    fontSize: "18px",
                    padding: "10px 20px",
                }}
                onClick={() => addToCart(selectedProduct)}
            >
                Add to Cart
            </Button>
        </div>
    );
};

export default Product;
