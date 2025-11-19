import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card, Select } from 'antd';
import axios from 'axios';
const { Option } = Select;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('electronics');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8080/api/products?category=${category}&page=${page}&limit=10`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProducts(prev => [...prev, ...res.data.products]);
      setHasMore(res.data.hasMore);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Lỗi load sản phẩm');
    }
    setLoading(false);
  };

  useEffect(() => {
    setProducts([]); setPage(1); setHasMore(true); fetchProducts();
  }, [category]);

  return (
    <div>
      <Select value={category} onChange={setCategory}>
        <Option value="electronics">Điện tử</Option>
        <Option value="clothing">Quần áo</Option>
      </Select>
      <InfiniteScroll
        dataLength={products.length}
        next={fetchProducts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>Đã load hết!</p>}
      >
        {products.map(product => (
          <Card key={product._id} title={product.name}>Giá: {product.price}</Card>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Products;