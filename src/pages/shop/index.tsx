
import React, { useState, useEffect } from 'react';
import { View as ViewComp, Text as TextComp, Image as ImageComp, ScrollView as ScrollViewComp, Input as InputComp, Button as ButtonComp } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Search, ShoppingCart, Plus, X, Loader2 } from 'lucide-react';
import { api, Product } from '../../services/api';
import BottomNav from '../../components/BottomNav';
import './index.less';

const View = ViewComp as any;
const Text = TextComp as any;
const Image = ImageComp as any;
const ScrollView = ScrollViewComp as any;
const Input = InputComp as any;
const Button = ButtonComp as any;

const Shop: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await api.getFeaturedProducts();
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const addToCart = (product: any) => {
    setCart(prev => {
      const exist = prev.find(p => p.id === product.id);
      if (exist) return prev.map(p => p.id === product.id ? { ...p, count: p.count + 1 } : p);
      return [...prev, { ...product, count: 1 }];
    });
    Taro.showToast({ title: '已加入购物车', icon: 'success' });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <View className="shop-container page-safe-area">
      <View className="header">
        <View className="search-bar">
          <Search size={18} color="#94a3b8" />
          <Input className="search-input" placeholder="搜索家乡味道..." />
        </View>
      </View>

      <ScrollView scrollY className="product-list">
        {loading ? (
          <View className="flex-center p-4">
             <Loader2 className="animate-spin" color="#94a3b8" />
             <Text className="ml-2 text-muted">加载特产中...</Text>
          </View>
        ) : (
          <View className="grid">
            {products.map(p => (
              <View key={p.id} className="product-card" onClick={() => setSelectedProduct(p)}>
                <Image src={p.image} mode="aspectFill" className="product-img" />
                <View className="product-info">
                  <Text className="product-name">{p.name}</Text>
                  <Text className="product-desc">{p.desc}</Text>
                  <View className="product-footer">
                    <Text className="price">¥{p.price}</Text>
                    <View 
                      className="add-btn"
                      onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                    >
                      <Plus size={16} color="#0f172a" />
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {cart.length > 0 && (
        <View className="cart-float" style={{ bottom: '100px' }}> {/* Lift up above nav */}
          <View className="cart-info">
            <ShoppingCart size={20} color="#fff" />
            <Text className="cart-total">¥{cartTotal}</Text>
          </View>
          <View className="cart-action" onClick={() => Taro.showToast({ title: '订单已提交' })}>
            <Text className="checkout-text">去结算 ({cart.length})</Text>
          </View>
        </View>
      )}

      {selectedProduct && (
        <View className="overlay">
          <View className="modal bottom-sheet">
            <View className="modal-close" onClick={() => setSelectedProduct(null)}>
              <X size={24} color="#64748b" />
            </View>
            <Image src={selectedProduct.image} mode="aspectFill" className="detail-img" />
            <View className="detail-content">
              <Text className="detail-price">¥{selectedProduct.price}</Text>
              <Text className="detail-title">{selectedProduct.name}</Text>
              <Text className="detail-desc">详细介绍：{selectedProduct.desc}。岳阳传统工艺制作，品质保证。</Text>
              <Button className="btn-primary mt-4" onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>
                加入购物车
              </Button>
            </View>
          </View>
        </View>
      )}

      <BottomNav current={1} />
    </View>
  );
};

export default Shop;
