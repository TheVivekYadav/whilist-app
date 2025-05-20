import { useEffect, useState } from 'react';
import WishlistItem from './components/WishlistItem';
import './index.css';

const App = () => {
  // Load from localStorage initially
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [filter, setFilter] = useState('All');

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Add item to wishlist
  const handleAdd = (e) => {
    e.preventDefault();
    if (!itemName.trim() || !category.trim()) return;

    const newItem = {
      id: Date.now(),
      name: itemName.trim(),
      category: category.trim(),
    };

    setWishlist([...wishlist, newItem]);
    setItemName('');
    setCategory('');
  };

  // Remove item by ID
  const handleRemove = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  // Filtered list based on category
  const filteredList =
    filter === 'All'
      ? wishlist
      : wishlist.filter(
        (item) =>
          item.category.toLowerCase() === filter.toLowerCase()
      );

  // Unique category list for dropdown
  const uniqueCategories = [
    ...new Set(wishlist.map((item) => item.category)),
  ];

  return (
    <div className="app-container">
      <h1>🎯 My Wishlist</h1>

      <form onSubmit={handleAdd} className="form">
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category (e.g., Gadget, Travel)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <div className="filter">
        <label>Filter by Category:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <ul className="wishlist">
        {filteredList.length === 0 ? (
          <p>No items found in this category.</p>
        ) : (
          filteredList.map((item) => (
            <WishlistItem
              key={item.id}
              item={item}
              onRemove={handleRemove}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default App;
