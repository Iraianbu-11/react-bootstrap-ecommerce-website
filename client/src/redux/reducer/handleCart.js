/* eslint-disable no-case-declarations */
const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

const handleCart = (state = cart, action) => {
    const product = action.payload;

    switch(action.type) {
        case "ADDITEM":
            const exist = state.find((x) => x.id === product.id);
            if (exist) {
                const updatedState = state.map((x) => 
                    x.id === product.id ? { ...x, qty: x.qty + 1 } : x
                );
                localStorage.setItem("cartItems", JSON.stringify(updatedState));
                return updatedState;
            } else {
                const updatedState = [...state, { ...product, qty: 1 }];
                localStorage.setItem("cartItems", JSON.stringify(updatedState));
                return updatedState;
            }
        
        case "DELITEM":
            const exist1 = state.find((x) => x.id === product.id);
            if (exist1) {
                let updatedState;
                if (exist1.qty === 1) {
                    updatedState = state.filter((x) => x.id !== exist1.id);
                } else {
                    updatedState = state.map((x) => 
                        x.id === product.id ? { ...x, qty: x.qty - 1 } : x
                    );
                }
                localStorage.setItem("cartItems", JSON.stringify(updatedState));
                return updatedState;
            }
            return state;
        default:
            return state;
    }
};

export default handleCart;
