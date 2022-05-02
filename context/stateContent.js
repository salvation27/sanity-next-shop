import React, {createContext,useContext,useState,useEffect} from 'react'
import { toast } from 'react-hot-toast';

const context = createContext()

export const StateContext = ({children}) => {
const [showCart,setShowCart] = useState(false)
const [cartItems,setCartItems] = useState([])
const [totalPrice,setTotalPrice] = useState(0)
const [totalQuantities,setTotalQuantities] = useState(0)
const [qty,setQty] = useState(1)

let foundProduct
let index

// увелич колличество товара
const incQty = () => {
    setQty((prev)=>prev+1)
}

// уменьшаеи колличество товара ,с проверкой  что бі значение не опускалось меньше 1
const decQty = () => {
    setQty((prev)=>{
        if(prev - 1 < 1) return 1
        return prev-1
    })
}

// добавление товара в корзину

const onAdd = (product,quantity) => {
const checProductInCart = cartItems.find((item)=>item._id===product._id )

setTotalPrice((prevTotal)=>prevTotal + product.price * quantity) 
setTotalQuantities((prevQty)=>prevQty + quantity) 
    if(checProductInCart) {
        const updatedCartItems = cartItems.map((cartProduct)=>{
            if(cartProduct._id ===product._id) return {
             ...cartProduct,
             quantity: cartProduct.quantity + quantity
            }
        })
        setCartItems(updatedCartItems)
    } else {
        product.quantity = quantity
        setCartItems([...cartItems,{...product}])
    }
    toast.success(`${qty} ${product.name} добавлено в корзину`)
}

const toggleCartItemQuantity = (id,value)=>{

    foundProduct = cartItems.find(item=>item._id===id) 
    index  = cartItems.findIndex((prod)=>prod._id===id)
    const newCardItems = cartItems;
    if(value === 'inc') {
        newCardItems.map((item) => (item._id === id) && (item.quantity = foundProduct.quantity + 1));
        setCartItems([...newCardItems]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
        if(foundProduct.quantity>1) {
            newCardItems.map((item) => (item._id === id) && (item.quantity = foundProduct.quantity - 1));
            setCartItems([...newCardItems]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
        }
    }
}

const onRemove = (product) => {
    foundProduct = cartItems.find(item=>item._id===product._id) 
    const res = cartItems.filter((item)=>item._id !==product._id)
    setTotalPrice((prev)=>prev - foundProduct.price * foundProduct.quantity)
    setTotalQuantities((prev)=>prev - foundProduct.quantity)
   setCartItems(res)
}


return (
    <context.Provider
    value={{
        showCart,cartItems,totalPrice,totalQuantities,qty,
        incQty,decQty,onAdd,setShowCart,toggleCartItemQuantity,
        onRemove
    }}>
        {children}
    </context.Provider>
)
}

export const useStateContext = ()=> useContext(context)