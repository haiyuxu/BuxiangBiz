import React, { useState } from 'react';
import { Product } from '../types';
import { Search, Plus, ShoppingCart, CheckCircle2, ChevronLeft, Share2, MoreHorizontal, MessageCircle, Store, Minus } from 'lucide-react';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: '岳阳农家自制烟熏腊肉',
    description: '选用土猪肉，传统柏树枝熏制，肥而不腻，腊味醇厚。',
    price: 88,
    image: 'https://picsum.photos/400/400?random=1',
    tags: ['特产', '热销'],
    specs: { "净含量": "500g", "保质期": "180天", "产地": "湖南岳阳", "储存方式": "阴凉干燥处" },
    details: "岳阳传统工艺，选用农家土猪五花肉，经腌制、晾晒、柏树枝慢火熏烤而成。色泽红亮，皮色金黄，肥肉透明，瘦肉鲜红，风味独特。"
  },
  {
    id: '2',
    name: '洞庭湖手撕刁子鱼',
    description: '野生刁子鱼，香辣酥脆，下酒神器。',
    price: 45,
    image: 'https://picsum.photos/400/400?random=2',
    tags: ['特产', '零食'],
    specs: { "口味": "香辣/五香", "净含量": "250g", "产地": "洞庭湖区" },
    details: "精选洞庭湖野生刁子鱼，肉质鲜嫩，去头去内脏，秘制香料腌制，低温慢炸，酥若无骨。"
  },
  {
    id: '3',
    name: '君山银针礼盒 (特级)',
    description: '中国十大名茶之一，金镶玉色，清香幽雅。',
    price: 580,
    image: 'https://picsum.photos/400/400?random=3',
    tags: ['礼品', '高端'],
    specs: { "等级": "特级", "净含量": "100g", "包装": "精美礼盒" },
    details: "君山银针，产于湖南岳阳洞庭湖中的君山。其成品茶芽头茁壮，长短大小均匀，茶芽内面呈金黄色，外层白毫显露完整，而且包裹坚实，茶芽外形很象一根根银针，雅称'金镶玉'。"
  },
  {
    id: '4',
    name: '平江酱干组合装',
    description: '经典香辣味，口感劲道，回味悠长。',
    price: 32,
    image: 'https://picsum.photos/400/400?random=4',
    tags: ['零食'],
    specs: { "口味": "混合口味", "规格": "20包/盒", "保质期": "90天" },
    details: "平江酱干，起源于清康熙年间，是湖南岳阳平江县的传统名吃。采用优质大豆，经过多道工序卤制而成，酱香浓郁，耐嚼。"
  },
  {
    id: '5',
    name: '长乐甜酒 (糯米)',
    description: '古法酿造，甜润爽口，回味悠长。',
    price: 28,
    image: 'https://picsum.photos/400/400?random=5',
    tags: ['饮品'],
    specs: { "酒精度": "0.5%vol", "净含量": "1.5L", "原料": "糯米, 泉水, 酒曲" },
    details: "长乐甜酒，岳阳汨罗特产，国家地理标志保护产品。粒粒饱满，汁液醇甜，入口软糯，老少皆宜。"
  }
];

type ViewState = 'LIST' | 'DETAIL' | 'CART';

const Shop: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('LIST');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('全部');
  const [cart, setCart] = useState<{product: Product, count: number}[]>([]);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  const categories = ['全部', '腊味', '水产', '茗茶', '休闲零食'];

  // --- Actions ---
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setViewState('DETAIL');
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? {...item, count: item.count + 1} : item);
      }
      return [...prev, {product, count: 1}];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === productId);
      if (existing && existing.count > 1) {
         return prev.map(item => item.product.id === productId ? {...item, count: item.count - 1} : item);
      }
      return prev.filter(item => item.product.id !== productId);
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.count), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.count, 0);

  const handleCheckout = () => {
    setTimeout(() => {
      setCart([]);
      setShowCheckoutSuccess(true);
      setViewState('LIST');
      setTimeout(() => setShowCheckoutSuccess(false), 3000);
    }, 800);
  };

  // --- Render Views ---

  // 1. Detail View
  if (viewState === 'DETAIL' && selectedProduct) {
    return (
      <div className="bg-slate-50 min-h-screen pb-24 animate-in slide-in-from-right">
        {/* Top Bar for Detail */}
        <div className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center p-3 bg-transparent pointer-events-none">
          <button 
            onClick={() => setViewState('LIST')}
            className="w-8 h-8 bg-black/30 backdrop-blur-md rounded-full text-white flex items-center justify-center pointer-events-auto"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex space-x-2 pointer-events-auto">
            <button className="w-8 h-8 bg-black/30 backdrop-blur-md rounded-full text-white flex items-center justify-center">
              <Share2 size={18} />
            </button>
            <button className="w-8 h-8 bg-black/30 backdrop-blur-md rounded-full text-white flex items-center justify-center">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Product Image */}
        <div className="aspect-square bg-white relative">
          <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
        </div>

        {/* Price & Title Block */}
        <div className="bg-white p-4 mb-2">
          <div className="flex items-baseline space-x-2 mb-2">
            <span className="text-amber-600 text-lg font-bold">¥</span>
            <span className="text-amber-600 text-3xl font-bold">{selectedProduct.price}</span>
            {selectedProduct.tags.includes('热销') && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-sm ml-2">热销爆款</span>
            )}
          </div>
          <h1 className="text-slate-900 font-bold text-lg leading-snug mb-2">{selectedProduct.name}</h1>
          <div className="flex justify-between text-xs text-slate-400">
            <span>运费: 免运费</span>
            <span>月销 1000+</span>
            <span>岳阳发货</span>
          </div>
        </div>

        {/* Specs */}
        <div className="bg-white p-4 mb-2 space-y-3">
          <div className="flex justify-between items-center">
             <h3 className="font-bold text-slate-800 text-sm">参数规格</h3>
             <ChevronLeft size={16} className="rotate-180 text-slate-300"/>
          </div>
          <div className="grid grid-cols-1 gap-2 text-sm">
            {selectedProduct.specs && Object.entries(selectedProduct.specs).map(([key, val]) => (
              <div key={key} className="flex border-b border-slate-50 pb-2">
                <span className="text-slate-400 w-20">{key}</span>
                <span className="text-slate-800">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Details Content */}
        <div className="bg-white p-4 pb-20">
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className="h-px bg-slate-200 w-12"></div>
            <span className="text-slate-500 text-sm">商品详情</span>
            <div className="h-px bg-slate-200 w-12"></div>
          </div>
          <div className="text-slate-600 text-sm leading-relaxed space-y-4">
             <p>{selectedProduct.details}</p>
             <div className="w-full h-48 bg-slate-100 rounded-lg flex items-center justify-center text-slate-300">
                商品实拍图展示区域
             </div>
             <p>{selectedProduct.description}</p>
             <div className="w-full h-48 bg-slate-100 rounded-lg flex items-center justify-center text-slate-300">
                细节图展示区域
             </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 pb-safe flex items-center z-50 h-16">
          <div className="flex space-x-5 mr-4 text-slate-600">
            <div className="flex flex-col items-center space-y-0.5">
              <Store size={20} />
              <span className="text-[10px]">店铺</span>
            </div>
            <div className="flex flex-col items-center space-y-0.5">
              <MessageCircle size={20} />
              <span className="text-[10px]">客服</span>
            </div>
            <div className="flex flex-col items-center space-y-0.5 relative" onClick={() => setViewState('CART')}>
              <ShoppingCart size={20} />
              <span className="text-[10px]">购物车</span>
              {cartCount > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
            </div>
          </div>
          <div className="flex-1 flex space-x-2">
            <button 
              onClick={() => { addToCart(selectedProduct); }}
              className="flex-1 bg-amber-100 text-amber-700 rounded-full text-sm font-bold py-2"
            >
              加入购物车
            </button>
            <button 
              onClick={() => { addToCart(selectedProduct); setViewState('CART'); }}
              className="flex-1 bg-amber-700 text-white rounded-full text-sm font-bold py-2"
            >
              立即购买
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Cart View
  if (viewState === 'CART') {
    return (
      <div className="bg-slate-50 min-h-screen pb-24 animate-in slide-in-from-right">
        <div className="bg-white p-4 sticky top-0 z-30 shadow-sm flex items-center space-x-2">
           <button onClick={() => setViewState('LIST')} className="p-1"><ChevronLeft size={24}/></button>
           <h2 className="text-lg font-bold">购物车 ({cartCount})</h2>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
             <ShoppingCart size={64} className="mb-4 opacity-20"/>
             <p>购物车还是空的</p>
             <button onClick={() => setViewState('LIST')} className="mt-4 px-6 py-2 border border-slate-300 rounded-full text-sm text-slate-600">去逛逛</button>
          </div>
        ) : (
          <div className="p-4 space-y-4">
             {cart.map(item => (
               <div key={item.product.id} className="bg-white p-3 rounded-xl flex space-x-3 shadow-sm">
                 <img src={item.product.image} className="w-20 h-20 object-cover rounded-lg bg-slate-100" />
                 <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm line-clamp-1">{item.product.name}</h3>
                      <p className="text-xs text-slate-400 mt-1">{Object.values(item.product.specs || {})[0] || '标准规格'}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-600 font-bold">¥{item.product.price}</span>
                      <div className="flex items-center space-x-2 bg-slate-50 rounded-lg p-1">
                        <button onClick={() => removeFromCart(item.product.id)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-slate-600"><Minus size={12}/></button>
                        <span className="text-xs font-bold w-4 text-center">{item.count}</span>
                        <button onClick={() => addToCart(item.product)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-slate-600"><Plus size={12}/></button>
                      </div>
                    </div>
                 </div>
               </div>
             ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 pb-safe flex justify-between items-center z-50">
             <div className="flex items-baseline space-x-1">
               <span className="text-sm text-slate-500">合计:</span>
               <span className="text-amber-600 font-bold text-xl">¥{cartTotal}</span>
             </div>
             <button onClick={handleCheckout} className="bg-amber-700 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-amber-700/30">
               去结算 ({cartCount})
             </button>
          </div>
        )}
      </div>
    );
  }

  // 3. List View (Default)
  return (
    <div className="pb-32 bg-slate-50 min-h-screen">
      {/* Header with Search */}
      <div className="bg-white p-4 sticky top-[60px] z-30 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-slate-800">特产甄选</h2>
          <div onClick={() => setViewState('CART')} className="relative p-2">
            <ShoppingCart size={24} className="text-slate-700"/>
            {cartCount > 0 && <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center border-2 border-white">{cartCount}</span>}
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="搜索家乡味道..."
            className="w-full bg-slate-100 text-slate-700 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
        </div>
        
        {/* Categories */}
        <div className="flex space-x-4 mt-4 overflow-x-auto no-scrollbar pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm transition-colors ${
                activeCategory === cat 
                  ? 'bg-amber-700 text-white font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {MOCK_PRODUCTS.map((product) => (
          <div 
            key={product.id} 
            onClick={() => handleProductClick(product)}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 group flex flex-col cursor-pointer active:scale-95 transition-transform"
          >
            <div className="relative aspect-square overflow-hidden bg-slate-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {product.tags.includes('热销') && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  热销
                </span>
              )}
            </div>
            <div className="p-3 flex-1 flex flex-col">
              <h3 className="font-bold text-slate-800 text-sm line-clamp-1">{product.name}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 mb-3 flex-1">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-amber-700 font-bold">¥{product.price}</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                  className="w-8 h-8 bg-slate-100 text-slate-800 rounded-full flex items-center justify-center hover:bg-amber-700 hover:text-white transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Success Modal */}
      {showCheckoutSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">订单提交成功</h3>
            <p className="text-slate-500 text-sm mb-6">您的家乡特产正在打包中，管家稍后会联系您确认发货信息。</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;