import React from 'react';

const WishlistItem = ({ item, onRemove }) => {
  return (
    <li className="wishlist-item">
      <span><strong>{item.name}</strong> - {item.category}</span>
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </li>
  );
};

export default WishlistItem;

