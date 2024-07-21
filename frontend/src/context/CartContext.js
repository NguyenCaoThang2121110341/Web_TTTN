import React, { Component } from 'react';

export const CartContext = React.createContext();


export class CartProvider extends Component {
    
  state = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
  };


    constructor(props){
        super(props);

        // Đọc dữ liệu từ localStorage
        const storedCartItems = localStorage.getItem('cartItems');
        this.state = {
            cartItems: storedCartItems ? JSON.parse(storedCartItems) : []
        };

        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
    }

    updateQuantity = (productId, newQuantity) => {
      this.setState((prevState) => ({
        cartItems: prevState.cartItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        ),
      }));
      localStorage.setItem('cartItems', JSON.stringify(this.state.cartItems));
    };
  
    clearCart = () => {
      this.setState({ cartItems: [] });
    };

    addToCart(newCartItem) {
      console.log('Adding to cart', newCartItem);
      const existingItem = this.state.cartItems.find(item => item.id === newCartItem.id);
      if (existingItem) {
        this.updateQuantity(newCartItem.id, existingItem.quantity + newCartItem.quantity);
      } else {
        this.setState(
          {
            cartItems: this.state.cartItems.concat({
              id: newCartItem.id,
              name: newCartItem.name,
              price: newCartItem.price,
              image: newCartItem.image,
              quantity: newCartItem.quantity
            })
          },
          () => {
            // Lưu dữ liệu vào localStorage
            localStorage.setItem('cartItems', JSON.stringify(this.state.cartItems));
          }
        );
      }
    }
    removeFromCart(productId) {
        this.setState(
          {
            cartItems: this.state.cartItems.filter((item) => item.id !== productId)
          },
          () => {
            // Lưu dữ liệu vào localStorage
            localStorage.setItem('cartItems', JSON.stringify(this.state.cartItems));
          }
        );
      }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.cartItems !== this.state.cartItems) {
            localStorage.setItem('cartItems', JSON.stringify(this.state.cartItems));
        }
    }
    
    render(){
      return <CartContext.Provider value={{
          cartItems: this.state.cartItems,
          addToCart: this.addToCart,
          removeFromCart: this.removeFromCart,
          updateQuantity: this.updateQuantity,
          clearCart: this.clearCart,
      }}>
          {this.props.children}
      </CartContext.Provider>
  }
}