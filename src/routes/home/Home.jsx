import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import React from "react";
import useFetch from "../../hooks/useFetch";
import { Loading } from "../../utils/index";
import { Card, Carousel } from "antd";
import { useSelector } from "react-redux";
import axios from "../../api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

const Home = () => {
    const user = useSelector((state) => state?.user);
    const cart = useSelector((state) => state?.cart);
    const length = cart?.length;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [trigger, setTrigger] = useState(false);
    const [data, isLoading] = useFetch("/product/all", trigger);

    const handleLikeAndDislike = async (product) => {
        try {
            const response = await axios.patch(
                `/product/${product._id}/${
                    product.likedby.includes(user?.username) ? "unlike" : "like"
                }`
            );
            if (response.status === 202) {
                setTrigger(!trigger);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const singlePage = (product) => {
        dispatch({ type: "SINGLE_PAGE", payload: product });
        navigate(`/product/${product._id}`);
    };

    return (
        <div>
            <div
                style={{
                    position: "relative",
                    marginLeft: "95%",
                    marginTop: "30px",
                }}
            >
                <AiOutlineShoppingCart
                    style={{
                        fontSize: "30px",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/cart")}
                />
                <span
                    style={{
                        position: "absolute",
                        width: "20px",
                        height: "20px",
                        fontSize: "18px",
                        fontFamily: "sans-serif",
                        background: "red",
                        color: "white",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        top: "-5px",
                        left: "16px",
                    }}
                >
                    {length}
                </span>
            </div>
            {isLoading ? (
                <Loading />
            ) : (
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
                    {data &&
                        data.map((product) => (
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
                                            cursor: "pointer",
                                        }}
                                    >
                                        {product.product_images.map((image) => (
                                            <img
                                                onClick={() =>
                                                    singlePage(product)
                                                }
                                                key={image}
                                                alt="example"
                                                src={image}
                                            />
                                        ))}
                                    </Carousel>
                                }
                            >
                                <button
                                    onClick={() =>
                                        handleLikeAndDislike(product)
                                    }
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
                                    {product.likedby.includes(
                                        user?.username
                                    ) ? (
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
                            </Card>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Home;
