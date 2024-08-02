import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { Button, Card, Carousel } from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../api";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
const { Meta } = Card;

const Cart = () => {
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state?.cart);
    const [trigger, setTrigger] = useState(false);
    const user = useSelector((state) => state?.user);
    const [data, isLoading] = useFetch("/product/all", trigger);

    const handleLikeAndDislike = async (product) => {
        try {
            const response = await axios.patch(
                `/product/${product._id}/${
                    product.likedby.includes(user.username) ? "unlike" : "like"
                }`
            );
            if (response.status === 202) {
                setTrigger(!trigger);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const removeFromCart = (id) => {
        dispatch({ type: "REMOVE_FROM_CARTH", payload: id });
    };

    return (
        <div>
            <div
                style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    padding: "50px",
                }}
            >
                {!cartProducts.length > 0 && <h1>Cart is empty</h1>}
                {cartProducts &&
                    cartProducts?.map((product) => (
                        <Card
                            key={product._id}
                            style={{
                                width: 300,
                            }}
                            cover={
                                <Carousel
                                    arrows
                                    infinite
                                    autoplay
                                    style={{
                                        height: "300px",
                                        width: "300px",
                                    }}
                                >
                                    {product.product_images.map((image) => (
                                        <img
                                            onClick={() => singlePage(product)}
                                            key={image}
                                            alt="example"
                                            src={image}
                                        />
                                    ))}
                                </Carousel>
                            }
                        >
                            <button
                                onClick={() => handleLikeAndDislike(product)}
                                style={{
                                    padding: "5px",
                                    backgroundColor: "white",
                                    border: "none",
                                    border: "1px solid gray",
                                    borderRadius: "50%",
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: "red",
                                }}
                            >
                                {product.likedby.includes(user.username) ? (
                                    <AiFillHeart
                                        size={24}
                                        style={{ cursor: "pointer" }}
                                    />
                                ) : (
                                    <AiOutlineHeart
                                        size={24}
                                        style={{ cursor: "pointer" }}
                                    />
                                )}
                            </button>
                            <Meta
                                title={product.product_name}
                                description={"$" + product.sale_price}
                            />
                            <Button
                                style={{
                                    marginTop: "20px",
                                    marginLeft: "120px",
                                }}
                                danger
                                type="primary"
                                onClick={() => removeFromCart(product._id)}
                            >
                                Remove from cart
                            </Button>
                        </Card>
                    ))}
            </div>
        </div>
    );
};

export default Cart;
