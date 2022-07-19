import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0
    },
    reducers:{
        replaceCart(state, action){
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        }
        ,
        additem(state, action){

            console.log(action);
            const newItem = action.payload;
            const existingItem = state.items.find((ele)=>ele.id === newItem.id);
            if(!existingItem){
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    amount: 1,
                    totalPrice: newItem.price,
                    name: newItem.name
                });
            }
            else{
                existingItem.amount += 1;
                existingItem.totalPrice += existingItem.price;
            }
            state.totalQuantity += 1;
        },
        removeItem(state, action){
            const id = action.payload;
            const existingItem = state.items.find((ele)=>ele.id === id);
            if(existingItem.amount === 1){
                state.items = state.items.filter(function(ele){
                    return ele.id !== id;
                })
            }
            else{
                existingItem.amount -= 1;
                existingItem.totalPrice -= existingItem.price;
            }
            state.totalQuantity -= 1;
        }
    }
})

export function sendCartData(cart){
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
              status: "pending",
              title: "Sending...",
              message: "Sending cart data...",
            })
          );
            async function sendRequest(){
                const req = await fetch(
                    "https://meals-ff198-default-rtdb.firebaseio.com/cart.json",
                    {
                      method: "PUT",
                      body: JSON.stringify(cart),
                    }
                  );
                  if (!req.ok) {
                    throw new Error("Sending cart data failed!");
                  }
            }
            try{
                await sendRequest();
                dispatch(
                    uiActions.showNotification({
                      status: "success",
                      title: "Success!",
                      message: "Successfully sent cart data",
                    })
                  );
            }
            catch(error){
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: error.message
                  }))
            }
          
    }
} // this code is not in  reducer and can have async functionalities

export function getCartData(){
    return  async (dispatch)=>{
        async function fetchData(){
            const res = await fetch("https://meals-ff198-default-rtdb.firebaseio.com/cart.json");
            if(!res.ok){
                throw new Error('Fetching cart data failed');
            }
            const data = await res.json();
            return data;
        }
        try{
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart(cartData));
        }
        catch(error){
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: error.message
              }))
        }
    }
}

export const cartActions = cartSlice.actions;
export default cartSlice;