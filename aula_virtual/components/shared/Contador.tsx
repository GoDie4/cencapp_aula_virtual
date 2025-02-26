import React, { useState } from 'react'
interface QuantitySpinnerProps {
    min: number;
    onQuantityChange: (newQuantity: number) => void;
  }

const Contador: React.FC<QuantitySpinnerProps> = ({ min, onQuantityChange}) => {

  const [quantity, setQuantity] = useState(min);

  const decreaseQuantity = () => {
    if (quantity > min) {
      setQuantity(quantity - 1);
      onQuantityChange(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    onQuantityChange(quantity + 1);
  };
  return (
    <div className="quantity-spinner">
      <button onClick={decreaseQuantity}>-</button>
      <input type="text" value={quantity} readOnly />
      <button onClick={increaseQuantity}>+</button>
    </div>
  )
}

export default Contador