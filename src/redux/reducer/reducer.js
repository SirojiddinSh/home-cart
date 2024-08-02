const initialState = {
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    isError: false,
    isSuccess: false,
    error: null,
    cartProducts: JSON.parse(localStorage.getItem("cartProducts")) || [],
    selectedProduct: null,
    cart: JSON.parse(localStorage.getItem("cart")) || [],
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
        case "REGISTER":
            localStorage.setItem("token", action.token);
            localStorage.setItem("user", JSON.stringify(action.user));
            return {
                token: action.token,
                user: action.user,
                loading: false,
                isError: false,
                isSuccess: true,
                error: null,
            };
        case "LOADING":
            return {
                ...state,
                loading: true,
            };
        case "ERROR":
            return {
                isError: true,
                loading: false,
                error: "ERROR",
                token: null,
                user: null,
            };
        case "SIGN_OUT":
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return {
                ...state,
                token: null,
                user: null,
            };

        case "ADD_TO_CART":
            const updatedCartProductsAdd = [
                ...state.cartProducts,
                action.payload,
            ];
            localStorage.setItem(
                "cartProducts",
                JSON.stringify(updatedCartProductsAdd)
            );
            return {
                ...state,
                cartProducts: updatedCartProductsAdd,
            };
        case "REMOVE_FROM_CART":
            const remove = state.cartProducts.filter(
                (p) => p.id !== action.payload
            );
            localStorage.setItem("cartProducts", JSON.stringify(remove));
            return {
                ...state,
                cartProducts: remove,
            };
        case "CLEAR_CART":
            localStorage.removeItem("cartProducts");
            return {
                ...state,
                cartProducts: [],
            };
        case "SEARCH":
            return {
                ...state,
                search: action.payload,
            };
        case "SINGLE_PAGE":
            return {
                ...state,
                selectedProduct: action.payload,
            };
        case "ADD_TO_CARTH":
            const updatedCartProductsAdd1 = [...state.cart, action.payload];
            localStorage.setItem(
                "cart",
                JSON.stringify(updatedCartProductsAdd1)
            );
            return {
                ...state,
                cart: updatedCartProductsAdd1,
            };
        case "REMOVE_FROM_CARTH":
            const remove1 = state.cart.filter((p) => p._id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(remove1));
            return {
                ...state,
                cart: remove1,
            };
        default:
            return state;
    }
};

export default reducer;
