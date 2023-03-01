import React, {createContext, useContext, useState, useEffect} from 'react'
import {toast} from 'react-hot-toast'

const Context = createContext();


export const StateContext = ({children}) => {
    const initialCart = [];
    const initialQuantity = 0;
    const initialPrice = 0;
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState(initialCart);
    const [totalPrice, setTotalPrice] = useState(initialPrice);
    const [totalQuantities, setTotalQuantities] = useState(initialQuantity);
    const [qty, setQty] = useState(1);
    
    let foundProduct;
    let index;

   /** This will persist the cart items **/

   useEffect(() => {
      const cartData = JSON.parse(localStorage.getItem('cart'));
      if (cartData) {
         setCartItems(cartData);
      }
   }, []);

   useEffect(() => {
      if (cartItems !== initialCart) {
         localStorage.setItem('cart', JSON.stringify(cartItems));
      }
   }, [cartItems]);

   /** This will persist the quantity **/

   useEffect(() => {
      const qtyData = JSON.parse(localStorage.getItem('quantity'));
      if (qtyData) {
         setTotalQuantities(qtyData);
      }
   }, []);

   useEffect(() => {
      if (totalQuantities !== initialQuantity) {
         localStorage.setItem('quantity', JSON.stringify(totalQuantities));
      }
   }, [totalQuantities]);

      /** This will persist the quantity **/

      useEffect(() => {
        const priceData = JSON.parse(localStorage.getItem('total'));
        if (priceData) {
           setTotalPrice(priceData);
        }
     }, []);
  
     useEffect(() => {
        if (totalPrice !== initialPrice) {
           localStorage.setItem('total', JSON.stringify(totalPrice));
        }
     }, [totalPrice]);

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        setTotalPrice((prevTotalPrice) => Math.round((prevTotalPrice + product.price * quantity)*100)/100);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if(checkProductInCart){
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id)return { 
                    ...cartProduct, 
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
        }else{
            product.quantity = quantity;

            setCartItems([...cartItems, {...product}])
        }
        toast.success(`${qty} ${product.name} added to the cart`);
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item)=> item._id !== product._id);

        setTotalPrice((prevTotalPrice) => Math.round((prevTotalPrice - foundProduct.price * foundProduct.quantity)*100)/100);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
        localStorage.clear();
    }
    
    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id );
        const newCartItems = cartItems.filter((item)=> item._id !== id);
        if(value === 'inc'){
            setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity +1 }]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
        }else if(value === 'dec'){
            if(foundProduct.quantity > 1){
                setCartItems([...newCartItems , {...foundProduct, quantity: foundProduct.quantity - 1 }]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
            }
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }
    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1;
            
            return prevQty - 1;
        });
    }

    return(
        <Context.Provider
            value = {{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)