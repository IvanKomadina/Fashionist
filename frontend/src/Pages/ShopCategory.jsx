import React, { useContext, useState, useEffect } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Item/Item'
import cross_icon from '../Components/Assets/cross_icon.png'

const ShopCategory = (props) => {
  const {all_products} = useContext(ShopContext);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('noSort');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // reset searchQuery, sortOrder and filterType to defaults when category changes
  useEffect(() => {
    setSearchQuery('');
    setSortOrder('noSort');
    setFilterType('all');
  }, [props.category]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterType, sortOrder, props.category]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  let products = all_products;
  // filter by searchQuery
  if (searchQuery.trim() !== '') {
    products = products.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  // filter and sort products based on category, type and sort order
  products = products
  .filter(item => item.category === props.category)
  .filter(item => item.type === filterType || filterType === "all")
  .sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } 
    else if (sortOrder === 'desc') {
      return b.price - a.price;
    } 
    else {
      return 0;
    }
  });

  // Calculate the index of the first and last products on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Slice the products array to get only the products for the current page
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  }

  return (
    <div className="shop-category">
      <div className="controls">
        <div className="search-control">
          <label htmlFor="searchQuery">Search products:</label>
          <input 
            id="searchQuery" 
            type="text" 
            value={searchQuery} 
            onChange={handleSearchChange} 
            placeholder="Type product name" 
          /> 
          <img onClick={() => setSearchQuery('')} src={cross_icon} alt="" />
        </div>
        <div className="filter-control">
          <ul>
            <li onClick={() => {setFilterType("all")}}>All</li>
            <li onClick={() => {setFilterType("t-shirt")}}>T-shirts</li>
            <li onClick={() => {setFilterType("hoodie")}}>Hoodies</li>
            <li onClick={() => {setFilterType("pants")}}>Pants</li>
            <li onClick={() => {setFilterType("jacket")}}>Jackets</li>
          </ul>
        </div>
        <div className="sort-control">
          <label htmlFor="sortOrder">Sort by price:</label>
          <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
            <option value="noSort">---</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>
      <div className="shopcategory-productlist">
          {currentProducts.map((item) => {
              if (props.category === item.category) {
                  return <Item 
                          key={item._id} 
                          id={item._id} 
                          name={item.name} 
                          image={item.image} 
                          price={item.price}
                          discount={item.discount}
                          old_price={item.old_price}   
                          />
              } else {
                  return null;
              }
          })}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
          <button 
            key={index + 1} 
            onClick={() => paginate(index + 1)} 
            className={currentPage === index + 1 ? 'active' : ''}
            >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ShopCategory