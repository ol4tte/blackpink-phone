// BlackPink.Phone - Product Catalog & App Logic

const PRODUCTS = [
  {
    id: 1,
    title: "iPhone 15 Pro Max 256GB",
    category: "iphones",
    badge: "SEMI NUEVO 10/10",
    battery: "Batería 100%",
    price: 980000,
    oldPrice: 1190000,
    image: "assets/iphone15.png",
    specs: ["Titán Natural", "256 GB Almacenamiento", "Pantalla Super Retina XDR 120Hz", "Pantalla sin rayas", "Incluye Cargador 20W + Mica Gratis"],
    description: "Equipo semi nuevo en estado estético impecable (10/10). Libre para todas las compañías en Chile. Incluye caja, cable original C a C, mica de vidrio templado y cargador rápido."
  },
  {
    id: 2,
    title: "iPhone 15 128GB Rosa Special",
    category: "iphones",
    badge: "SELLADO ORIGINAL",
    battery: "Batería 100%",
    price: 680000,
    oldPrice: 790000,
    image: "assets/hero.png",
    specs: ["Color Rosa BlackPink", "128 GB Almacenamiento", "Isla Dinámica", "Cámara de 48 MP", "1 Año Garantía Apple"],
    description: "Equipo 100% nuevo y sellado en su caja original de fábrica. Garantía oficial de Apple por 12 meses. Compatible con eSIM y SIM física."
  },
  {
    id: 3,
    title: "Apple Watch Ultra 2 Titanium",
    category: "watch",
    badge: "SEMI NUEVO A+",
    battery: "Batería 98%",
    price: 650000,
    oldPrice: 790000,
    image: "assets/applewatch.png",
    specs: ["Caja de Titán 49mm", "Correa Trail Loop Negra", "GPS + Cellular", "Pantalla 3000 nits", "Resistente a 100m"],
    description: "El reloj deportivo definitivo de Apple. Estado semi nuevo 10/10 sin rayones. Salud de batería en 98%. Incluye cargador magnético rápido."
  },
  {
    id: 4,
    title: "iPhone 14 Pro 128GB Morado",
    category: "iphones",
    badge: "OFERTA DESTACADA",
    battery: "Batería 95%",
    price: 720000,
    oldPrice: 890000,
    image: "assets/iphone15.png",
    specs: ["Deep Purple", "128 GB Almacenamiento", "Dynamic Island", "ProMotion 120Hz", "Camara 48MP Pro"],
    description: "iPhone 14 Pro en color Morado Oscuro. Estado 9.8/10. Probado en más de 30 puntos de diagnóstico técnico. Garantía de 6 meses."
  },
  {
    id: 5,
    title: "MacBook Pro 14\" M3 Chip 512GB",
    category: "macbooks",
    badge: "SELLADO EN CAJA",
    battery: "Batería 100%",
    price: 1590000,
    oldPrice: 1890000,
    image: "assets/hero.png",
    specs: ["Space Black", "Apple M3 Chip 8-Core", "8GB RAM Unified", "512GB SSD Ultra Rápido", "Pantalla Liquid Retina XDR"],
    description: "Potencia profesional portátil en el elegante nuevo acabado Space Black. Sellada de fábrica con 1 año de garantía oficial Apple."
  },
  {
    id: 6,
    title: "iPad Pro 11\" M2 128GB Wi-Fi",
    category: "ipads",
    badge: "SEMI NUEVO 10/10",
    battery: "Batería 97%",
    price: 690000,
    oldPrice: 840000,
    image: "assets/hero.png",
    specs: ["Space Gray", "Procesador Apple M2", "Compatible Apple Pencil 2", "Pantalla ProMotion", "Super Delgado"],
    description: "Ideal para ilustración, diseño gráfico y edición. En impecable estado estético y funcional. Se entrega con caja y cargador original 20W."
  },
  {
    id: 7,
    title: "iPhone 13 128GB Medianoche",
    category: "iphones",
    badge: "MÁS VENDIDO",
    battery: "Batería 92%",
    price: 440000,
    oldPrice: 540000,
    image: "assets/iphone15.png",
    specs: ["Midnight Black", "128 GB Almacenamiento", "Modo Cine 4K", "Pantalla OLED Super Retina", "Dual Camera System"],
    description: "El mejor equilibrio entre precio y rendimiento. Equipo semi nuevo certificado con 92% de batería original. Incluye carcasa y mica de regalo."
  },
  {
    id: 8,
    title: "PlayStation 5 Edición Digital 1TB",
    category: "consolas",
    badge: "SELLADA NUEVA",
    battery: "N/A",
    price: 470000,
    oldPrice: 560000,
    image: "assets/hero.png",
    specs: ["1TB SSD Almacenamiento", "Mando DualSense Blanco", "4K 120 FPS", "Ray Tracing", "Garantía Sony Chile"],
    description: "Consola PlayStation 5 Modelo Slim Digital 1TB. Totalmente nueva y sellada. Incluye 1 mando DualSense y cables de conexión."
  }
];

// App State
let cart = JSON.parse(localStorage.getItem('bp_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('bp_wishlist')) || [];
let currentCategory = 'todos';
let searchQuery = '';

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search');
const catPills = document.querySelectorAll('.cat-pill');
const cartTrigger = document.getElementById('cart-trigger');
const cartCount = document.getElementById('cart-count');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const checkoutWaBtn = document.getElementById('checkout-whatsapp');

const wishlistTrigger = document.getElementById('wishlist-trigger');
const wishlistCount = document.getElementById('wishlist-count');

const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');

// Helper Format CLP Currency
function formatCLP(amount) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(amount);
}

// Render Products Grid
function renderProducts() {
  let filtered = PRODUCTS.filter(product => {
    const matchesCategory = currentCategory === 'todos' || product.category === currentCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-gray);">
        <i class="fa-solid fa-mobile-screen-button" style="font-size: 3rem; margin-bottom: 16px; color: var(--pink-primary);"></i>
        <h3>No encontramos equipos con esa búsqueda</h3>
        <p style="margin-top: 8px;">Intenta buscar por "iPhone 15", "MacBook", "Ultra" o cambia de categoría.</p>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = filtered.map(product => {
    const isWishlisted = wishlist.includes(product.id);

    return `
      <div class="product-card">
        <span class="product-badge">${product.badge}</span>
        
        <button class="wishlist-toggle ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${product.id})" title="Favorito">
          <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>

        <div class="product-img-wrapper" onclick="openModal(${product.id})">
          <img src="${product.image}" alt="${product.title}">
        </div>

        <div class="product-info">
          <div class="product-meta">
            <span class="battery-tag"><i class="fa-solid fa-battery-full"></i> ${product.battery}</span>
            <span>• Envíos RM 24h</span>
          </div>

          <h3 class="product-title">${product.title}</h3>

          <div class="product-price-box">
            <div>
              <span class="price-current">${formatCLP(product.price)}</span>
              ${product.oldPrice ? `<span class="price-old">${formatCLP(product.oldPrice)}</span>` : ''}
            </div>
          </div>

          <div class="product-actions">
            <button class="btn btn-pink btn-sm" onclick="addToCart(${product.id})">
              <i class="fa-solid fa-cart-plus"></i> AGREGAR
            </button>
            <button class="btn btn-outline-pink btn-sm" onclick="quickWhatsApp(${product.id})" title="Pedir por WhatsApp">
              <i class="fa-brands fa-whatsapp"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Category Filter Handling
catPills.forEach(pill => {
  pill.addEventListener('click', () => {
    catPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    currentCategory = pill.dataset.category;
    renderProducts();
  });
});

// Search Filter Handling
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
  renderProducts();
});

clearSearchBtn.addEventListener('click', () => {
  searchInput.value = '';
  searchQuery = '';
  clearSearchBtn.style.display = 'none';
  renderProducts();
});

// Wishlist Logic
function toggleWishlist(productId) {
  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter(id => id !== productId);
  } else {
    wishlist.push(productId);
  }
  localStorage.setItem('bp_wishlist', JSON.stringify(wishlist));
  updateCounters();
  renderProducts();
}

// Cart Logic
function addToCart(productId) {
  const existingIndex = cart.findIndex(item => item.id === productId);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    const product = PRODUCTS.find(p => p.id === productId);
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  openCartDrawer();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

function saveCart() {
  localStorage.setItem('bp_cart', JSON.stringify(cart));
  updateCounters();
  renderCartDrawer();
}

function updateCounters() {
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalCartCount;
  wishlistCount.textContent = wishlist.length;
}

// Render Cart Drawer Content
function renderCartDrawer() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div style="text-align: center; padding: 40px 0; color: var(--text-gray);">
        <i class="fa-solid fa-bag-shopping" style="font-size: 2.5rem; margin-bottom: 12px; color: var(--pink-primary);"></i>
        <p>Tu carrito está vacío</p>
        <p style="font-size: 0.8rem; margin-top: 4px;">¡Agrega tus iPhones favoritos para pedir por WhatsApp!</p>
      </div>
    `;
    cartTotalEl.textContent = formatCLP(0);
    return;
  }

  let total = 0;
  cartItemsContainer.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    return `
      <div class="cart-item">
        <img src="${item.image}" class="cart-item-img" alt="${item.title}">
        <div class="cart-item-info">
          <span class="cart-item-title">${item.title}</span>
          <span class="cart-item-price">${formatCLP(item.price)} x ${item.quantity}</span>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Eliminar">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
  }).join('');

  cartTotalEl.textContent = formatCLP(total);
}

// Cart Drawer Open/Close
function openCartDrawer() {
  renderCartDrawer();
  cartDrawer.classList.add('active');
  cartOverlay.classList.add('active');
}

function closeCartDrawer() {
  cartDrawer.classList.remove('active');
  cartOverlay.classList.remove('active');
}

cartTrigger.addEventListener('click', openCartDrawer);
closeCartBtn.addEventListener('click', closeCartDrawer);
cartOverlay.addEventListener('click', closeCartDrawer);

// Checkout via WhatsApp
checkoutWaBtn.addEventListener('click', () => {
  if (cart.length === 0) return;

  let message = `¡Hola BlackPink.Phone! 📲 Quisiera comprar los siguientes equipos desde la tienda online:\n\n`;
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    message += `${index + 1}. *${item.title}* (Cant: ${item.quantity}) - ${formatCLP(itemTotal)}\n`;
  });

  message += `\n*TOTAL A PAGAR:* ${formatCLP(total)}\n`;
  message += `\n¿Tienen disponibilidad y despacho inmediato? ¡Quedo atento!`;

  const encodedUrl = `https://wa.me/56943524545?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, '_blank');
});

// Quick WhatsApp for single product
function quickWhatsApp(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const message = `¡Hola BlackPink.Phone! 📲 Me interesa el *${product.title}* por ${formatCLP(product.price)}. ¿Tienen stock disponible para envío?`;
  window.open(`https://wa.me/56943524545?text=${encodeURIComponent(message)}`, '_blank');
}

// Quick View Modal
function openModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  modalBody.innerHTML = `
    <div class="modal-grid">
      <div>
        <img src="${product.image}" class="modal-img" alt="${product.title}">
      </div>
      <div>
        <span class="product-badge" style="position:static; display:inline-block; margin-bottom:12px;">${product.badge}</span>
        <h2 style="font-family:var(--font-heading); font-size:1.8rem; margin-bottom:10px;">${product.title}</h2>
        <div style="font-size:1.5rem; font-weight:800; color:var(--pink-primary); margin-bottom:16px;">
          ${formatCLP(product.price)} <span style="font-size:0.9rem; color:var(--text-dark); text-decoration:line-through;">${product.oldPrice ? formatCLP(product.oldPrice) : ''}</span>
        </div>
        <p style="color:var(--text-gray); font-size:0.95rem; margin-bottom:20px;">${product.description}</p>
        
        <h4 style="margin-bottom:10px; font-size:0.9rem; text-transform:uppercase; letter-spacing:1px; color:var(--pink-light);">Especificaciones y Regalos:</h4>
        <ul style="list-style:none; padding:0; margin-bottom:24px;">
          ${product.specs.map(spec => `<li style="font-size:0.9rem; color:var(--text-white); margin-bottom:6px;"><i class="fa-solid fa-check text-pink" style="margin-right:8px;"></i> ${spec}</li>`).join('')}
        </ul>

        <div style="display:flex; gap:12px;">
          <button class="btn btn-pink" style="flex:1;" onclick="addToCart(${product.id}); closeModal();">
            <i class="fa-solid fa-cart-plus"></i> AGREGAR AL CARRITO
          </button>
          <button class="btn btn-outline-pink" onclick="quickWhatsApp(${product.id})">
            <i class="fa-brands fa-whatsapp"></i> PEDIR
          </button>
        </div>
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');
}

function closeModal() {
  modalOverlay.classList.remove('active');
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Mobile menu toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

mobileToggle.addEventListener('click', () => {
  if (navMenu.style.display === 'flex') {
    navMenu.style.display = 'none';
  } else {
    navMenu.style.display = 'flex';
    navMenu.style.flexDirection = 'column';
    navMenu.style.position = 'absolute';
    navMenu.style.top = '100%';
    navMenu.style.left = '0';
    navMenu.style.width = '100%';
    navMenu.style.background = '#0d0d12';
    navMenu.style.padding = '20px';
    navMenu.style.borderBottom = '1px solid var(--border-pink)';
  }
});

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCounters();
});
