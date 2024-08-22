import { configureStore } from "@reduxjs/toolkit"; // configuracion de la tienda
import userReducer from "./usersSlice" // importa a userReducer que maneja el estado con los usuarios.
import productsReducer from "./productsSlice" // importa a productsReducer que maneja el estado con los productos.
// configuracion del store global

const store = configureStore({
    // reducer es el estado global. data es un campo del estado global que esta manejado por userReducer
    reducer: {
        users: userReducer,
        products: productsReducer
    }, 
})

export default store;