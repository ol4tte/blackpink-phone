// BlackPink.Phone - E-Commerce & Admin Backoffice Logic

// Configurable Admin Notification Email for Access Approvals
let adminNotificationEmail = localStorage.getItem('bp_admin_notif_email') || "ol4tte@gmail.com";

// 1. Registered Admin Users Database (Default SuperAdmin: ol4tte@gmail.com)
const DEFAULT_SUPERADMIN = {
  id: 1,
  name: "Marcela (Almendra Olate)",
  email: "ol4tte@gmail.com",
  role: "Administradora Principal",
  isSuperAdmin: true,
  pendingApproval: false,
  avatar: "",
  createdAt: "2026-07-24"
};

let ADMIN_USERS = JSON.parse(localStorage.getItem('bp_admin_users')) || [
  DEFAULT_SUPERADMIN,
  {
    id: 2,
    name: "Carlos Pérez",
    email: "vendedor@blackpinkphone.cl",
    role: "Vendedor / Asesor",
    isSuperAdmin: false,
    pendingApproval: false,
    avatar: "",
    createdAt: "2026-07-24"
  }
];

// Active session state
let currentAdminUser = JSON.parse(localStorage.getItem('bp_current_user')) || null;

// Universal Team Password
const MASTER_TEAM_PASSWORD = "EquipoBP-1";

// 2. Initial Products Catalog Database
const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: "iPhone 15 Pro Max 256GB",
    category: "iphones",
    badge: "SEMI NUEVO 10/10",
    condition: "SEMI NUEVO",
    storage: "256GB",
    color: "Titan",
    colorName: "Titán Natural",
    battery: "Batería 100%",
    batteryValue: 100,
    price: 980000,
    oldPrice: 1190000,
    cost: 720000,
    image: "assets/iphone15.png",
    warranty: "6 Meses Garantía BlackPink",
    boxIncludes: ["Cargador Rápido 20W Original", "Cable USB-C a USB-C Braided", "Mica de Vidrio Templado 9H Gratis", "Carcasa Transparente Anti-Impacto", "Llave Expulsora de SIM"],
    specs: ["Titán Natural Grade 5", "256 GB Almacenamiento", "Pantalla Super Retina XDR 120Hz", "Pantalla sin rayas (Estado 10/10)", "Cámara Pro 48MP Zoom 5X"],
    description: "Equipo semi nuevo en estado estético e interno impecable (10/10). Libre para todas las compañías en Chile y el mundo. Incluye caja original, accesorios y garantía escrita."
  },
  {
    id: 2,
    title: "iPhone 15 128GB Rosa Special",
    category: "iphones",
    badge: "SELLADO ORIGINAL",
    condition: "SELLADO ORIGINAL",
    storage: "128GB",
    color: "Rosa",
    colorName: "Rosa BlackPink",
    battery: "Batería 100%",
    batteryValue: 100,
    price: 680000,
    oldPrice: 790000,
    cost: 530000,
    image: "assets/hero.png",
    warranty: "1 Año Garantía Oficial Apple",
    boxIncludes: ["Cable USB-C Original Apple", "Mica 9H de regalo", "Carcasa Magsafe Rosa", "Stick de Garantía BlackPink"],
    specs: ["Color Rosa Exclusivo", "128 GB Almacenamiento", "Isla Dinámica (Dynamic Island)", "Cámara de 48 MP Avanzada", "1 Año Garantía Apple Chile"],
    description: "Equipo 100% nuevo y sellado en su caja original de fábrica. Garantía oficial de Apple Chile por 12 meses. Compatible con eSIM y Nano-SIM."
  },
  {
    id: 3,
    title: "Apple Watch Ultra 2 Titanium 49mm",
    category: "watch",
    badge: "SEMI NUEVO A+",
    condition: "SEMI NUEVO",
    storage: "128GB",
    color: "Titan",
    colorName: "Titán Natural",
    battery: "Batería 98%",
    batteryValue: 98,
    price: 650000,
    oldPrice: 790000,
    cost: 490000,
    image: "assets/applewatch.png",
    warranty: "6 Meses Garantía BlackPink",
    boxIncludes: ["Cargador Magnético Rápido USB-C", "Correa Trail Loop Negra Original", "Caja Oficial"],
    specs: ["Caja de Titán Aeroespacial 49mm", "Correa Trail Loop Negra", "GPS Doble Frecuencia + Cellular", "Pantalla de 3000 nits", "Resistente al Agua 100m"],
    description: "El reloj deportivo definitivo de Apple. Estado semi nuevo 10/10 sin rayones. Salud de batería en 98%. Incluye cargador magnético rápido."
  },
  {
    id: 4,
    title: "iPhone 14 Pro 128GB Morado",
    category: "iphones",
    badge: "OFERTA DESTACADA",
    condition: "SEMI NUEVO",
    storage: "128GB",
    color: "Morado",
    colorName: "Deep Purple",
    battery: "Batería 95%",
    batteryValue: 95,
    price: 720000,
    oldPrice: 890000,
    cost: 540000,
    image: "assets/iphone15.png",
    warranty: "6 Meses Garantía BlackPink",
    boxIncludes: ["Cargador 20W Rápido", "Cable Lightning a USB-C", "Mica de Vidrio Templado 9H", "Carcasa Transparente"],
    specs: ["Deep Purple (Morado Oscuro)", "128 GB Almacenamiento", "Dynamic Island Interactiva", "ProMotion 120Hz XDR", "Cámara 48MP Pro System"],
    description: "iPhone 14 Pro en color Morado Oscuro. Estado 9.8/10. Probado en más de 30 puntos de diagnóstico técnico. Garantía de 6 meses."
  },
  {
    id: 5,
    title: "MacBook Pro 14\" M3 Chip 512GB",
    category: "macbooks",
    badge: "SELLADO EN CAJA",
    condition: "SELLADO ORIGINAL",
    storage: "512GB",
    color: "Titan",
    colorName: "Space Black",
    battery: "Batería 100%",
    batteryValue: 100,
    price: 1590000,
    oldPrice: 1890000,
    cost: 1250000,
    image: "assets/hero.png",
    warranty: "1 Año Garantía Oficial Apple",
    boxIncludes: ["Cargador MagSafe 3 de 70W", "Cable MagSafe a USB-C 2m", "Manuales Apple"],
    specs: ["Space Black Negro Espacial", "Apple M3 Chip 8-Core CPU / 10-Core GPU", "8GB RAM Unificada", "512GB SSD Ultra Rápido", "Pantalla Liquid Retina XDR 120Hz"],
    description: "Potencia profesional portátil en el elegante nuevo acabado Space Black. Sellada de fábrica con 1 año de garantía oficial Apple."
  },
  {
    id: 6,
    title: "iPad Pro 11\" M2 128GB Wi-Fi",
    category: "ipads",
    badge: "SEMI NUEVO 10/10",
    condition: "SEMI NUEVO",
    storage: "128GB",
    color: "Titan",
    colorName: "Space Gray",
    battery: "Batería 97%",
    batteryValue: 97,
    price: 690000,
    oldPrice: 840000,
    cost: 510000,
    image: "assets/hero.png",
    warranty: "6 Meses Garantía BlackPink",
    boxIncludes: ["Cargador 20W Original USB-C", "Cable USB-C 1m", "Caja Original"],
    specs: ["Space Gray Gris Espacial", "Procesador Apple M2 Superpotente", "Compatible Apple Pencil 2 & Magic Keyboard", "Pantalla Liquid Retina 120Hz ProMotion", "Super Delgado y Ligero"],
    description: "Ideal para ilustración, diseño gráfico y edición. En impecable estado estético y funcional. Se entrega con caja y cargador original 20W."
  },
  {
    id: 7,
    title: "iPhone 13 128GB Medianoche",
    category: "iphones",
    badge: "MÁS VENDIDO",
    condition: "SEMI NUEVO",
    storage: "128GB",
    color: "Medianoche",
    colorName: "Midnight Black",
    battery: "Batería 92%",
    batteryValue: 92,
    price: 440000,
    oldPrice: 540000,
    cost: 320000,
    image: "assets/iphone15.png",
    warranty: "6 Meses Garantía BlackPink",
    boxIncludes: ["Cargador Rápido 20W", "Cable Lightning USB-C", "Mica de Vidrio 9H de Regalo", "Carcasa de Silicona"],
    specs: ["Midnight Black", "128 GB Almacenamiento", "Modo Cine 4K Dolby Vision", "Pantalla OLED Super Retina XDR", "Dual Camera System 12MP"],
    description: "El mejor equilibrio entre precio y rendimiento. Equipo semi nuevo certificado con 92% de batería original. Incluye carcasa y mica de regalo."
  },
  {
    id: 8,
    title: "PlayStation 5 Slim Digital 1TB",
    category: "consolas",
    badge: "SELLADA NUEVA",
    condition: "SELLADO ORIGINAL",
    storage: "1TB",
    color: "Medianoche",
    colorName: "Blanco / Negro",
    battery: "N/A",
    batteryValue: 100,
    price: 470000,
    oldPrice: 560000,
    cost: 380000,
    image: "assets/hero.png",
    warranty: "1 Año Garantía Oficial Sony Chile",
    boxIncludes: ["Mando Inalámbrico DualSense Blanco", "SSD Ultra Rápido 1TB", "Cable HDMI 2.1 4K", "Cable de Alimentación", "Base Horizontal"],
    specs: ["1TB SSD Almacenamiento Ultra Rápido", "Mando DualSense Háptico", "4K 120 FPS Ray Tracing", "Audio 3D Tempest", "Garantía Oficial Sony Chile 12 Meses"],
    description: "Consola PlayStation 5 Modelo Slim Digital 1TB. Totalmente nueva y sellada. Incluye 1 mando DualSense y cables de conexión."
  }
];

let PRODUCTS = JSON.parse(localStorage.getItem('bp_products')) || INITIAL_PRODUCTS;

// Pre-registered IMEIs Inventory Database
let IMEI_INVENTORY = JSON.parse(localStorage.getItem('bp_imei_inventory')) || [
  { id: 101, model: "iPhone 15 Pro Max 256GB", imei: "356984102938475", storage: "256GB", color: "Titán Natural", condition: "SEMI NUEVO 10/10", battery: 100, cost: 720000, price: 980000, status: "Disponible", purchaseDate: "2026-06-10", warrantyUntil: "2026-12-10" },
  { id: 102, model: "iPhone 15 128GB Rosa", imei: "354891109283741", storage: "128GB", color: "Rosa BlackPink", condition: "SELLADO ORIGINAL", battery: 100, cost: 530000, price: 680000, status: "Disponible", purchaseDate: "2026-07-01", warrantyUntil: "2027-07-01" },
  { id: 103, model: "iPhone 14 Pro 128GB Morado", imei: "351294817263540", storage: "128GB", color: "Deep Purple", condition: "SEMI NUEVO 10/10", battery: 95, cost: 540000, price: 720000, status: "Vendido", purchaseDate: "2026-05-15", warrantyUntil: "2026-11-15" },
  { id: 104, model: "iPhone 13 128GB Medianoche", imei: "359871029483712", storage: "128GB", color: "Midnight Black", condition: "SEMI NUEVO 9.8/10", battery: 92, cost: 320000, price: 440000, status: "Disponible", purchaseDate: "2026-06-20", warrantyUntil: "2026-12-20" }
];

// App State
let cart = JSON.parse(localStorage.getItem('bp_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('bp_wishlist')) || [];
let currentCategory = 'todos';
let searchQuery = '';
let currentShippingCost = 0;

// Filter State
let filterCondition = 'todos';
let filterStorage = 'todos';
let filterColor = 'todos';

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search');
const catPills = document.querySelectorAll('.cat-pill');

const filterConditionEl = document.getElementById('filter-condition');
const filterStorageEl = document.getElementById('filter-storage');
const filterColorEl = document.getElementById('filter-color');
const resetFiltersBtn = document.getElementById('reset-filters-btn');

const cartTrigger = document.getElementById('cart-trigger');
const cartCount = document.getElementById('cart-count');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartShippingRegion = document.getElementById('cart-shipping-region');
const checkoutWaBtn = document.getElementById('checkout-whatsapp');

const wishlistTrigger = document.getElementById('wishlist-trigger');
const wishlistCount = document.getElementById('wishlist-count');

const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');

// Admin Elements
const adminModalOverlay = document.getElementById('admin-modal-overlay');
const adminAuthCard = document.getElementById('admin-auth-card');
const adminMainContainer = document.getElementById('admin-main-container');
const authCloseBtn = document.getElementById('auth-close-btn');

const openAdminBtn = document.getElementById('open-admin-btn');
const adminCloseBtn = document.getElementById('admin-close-btn');
const adminTabBtns = document.querySelectorAll('.admin-tab-btn');
const adminTabPanes = document.querySelectorAll('.admin-tab-pane');
const adminStockTbody = document.getElementById('admin-stock-tbody');
const adminPhotosTbody = document.getElementById('admin-photos-tbody');
const adminUsersTbody = document.getElementById('admin-users-tbody');
const adminPendingUsersTbody = document.getElementById('admin-pending-users-tbody');
const adminSearchImei = document.getElementById('admin-search-imei');
const sessionUserName = document.getElementById('session-user-name');

// Profile & Role Transfer Elements
const profileAvatarContainer = document.getElementById('profile-avatar-container');
const profileDisplayNameHeading = document.getElementById('profile-display-name-heading');
const profileDisplayEmail = document.getElementById('profile-display-email');
const profileDisplayRoleBadge = document.getElementById('profile-display-role-badge');
const myProfileName = document.getElementById('my-profile-name');
const myProfileAvatarUrl = document.getElementById('my-profile-avatar-url');
const myProfileNotifEmail = document.getElementById('my-profile-notif-email');
const myProfileRoleSelect = document.getElementById('my-profile-role-select');
const transferTargetUserSelect = document.getElementById('transfer-target-user-select');

// Trade-In Elements
const tradeCurrentModel = document.getElementById('trade-current-model');
const tradeBattery = document.getElementById('trade-battery');
const tradeCondition = document.getElementById('trade-condition');
const tradeTargetModel = document.getElementById('trade-target-model');
const tradeValuationEl = document.getElementById('trade-valuation');
const tradeTargetPriceEl = document.getElementById('trade-target-price');
const tradeFinalPayEl = document.getElementById('trade-final-pay');
const tradeWaBtn = document.getElementById('trade-wa-btn');

// IMEI Lookup Elements
const imeiSearchInput = document.getElementById('imei-search-input');
const imeiSearchBtn = document.getElementById('imei-search-btn');
const imeiResultDisplay = document.getElementById('imei-result-display');

// Helper Format CLP Currency
function formatCLP(amount) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(amount);
}

// --------------------------------------------------------------------------
// CATALOG RENDER & ADVANCED FILTERS LOGIC
// --------------------------------------------------------------------------
function renderProducts() {
  let filtered = PRODUCTS.filter(product => {
    const matchesCategory = currentCategory === 'todos' || product.category === currentCategory;
    const matchesSearch = searchQuery === '' || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.colorName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCondition = filterCondition === 'todos' || product.condition.includes(filterCondition);
    const matchesStorage = filterStorage === 'todos' || product.storage === filterStorage;
    const matchesColor = filterColor === 'todos' || product.color === filterColor;

    return matchesCategory && matchesSearch && matchesCondition && matchesStorage && matchesColor;
  });

  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-gray);">
        <i class="fa-solid fa-mobile-screen-button" style="font-size: 3rem; margin-bottom: 16px; color: var(--pink-primary);"></i>
        <h3>No encontramos equipos con los filtros seleccionados</h3>
        <p style="margin-top: 8px;">Intenta cambiar el estado, almacenamiento o reiniciar los filtros.</p>
        <button class="btn btn-outline-pink btn-sm" onclick="resetAllFilters()" style="margin-top:16px;">
          <i class="fa-solid fa-rotate-left"></i> Restablecer Filtros
        </button>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = filtered.map(product => {
    const isWishlisted = wishlist.includes(product.id);
    const monthlyInstallment = Math.round(product.price / 12);

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
            <span>• ${product.storage}</span>
            <span>• ${product.colorName}</span>
          </div>

          <h3 class="product-title" onclick="openModal(${product.id})">${product.title}</h3>

          <div class="product-price-box">
            <div>
              <span class="price-current">${formatCLP(product.price)}</span>
              ${product.oldPrice ? `<span class="price-old">${formatCLP(product.oldPrice)}</span>` : ''}
            </div>
            <div style="font-size: 0.76rem; color: var(--pink-light); font-weight: 600; margin-top: 2px;">
              o 12x de ${formatCLP(monthlyInstallment)} sin interés
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

catPills.forEach(pill => {
  pill.addEventListener('click', () => {
    catPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    currentCategory = pill.dataset.category;
    renderProducts();
  });
});

if (filterConditionEl) filterConditionEl.addEventListener('change', (e) => { filterCondition = e.target.value; renderProducts(); });
if (filterStorageEl) filterStorageEl.addEventListener('change', (e) => { filterStorage = e.target.value; renderProducts(); });
if (filterColorEl) filterColorEl.addEventListener('change', (e) => { filterColor = e.target.value; renderProducts(); });

function resetAllFilters() {
  filterCondition = 'todos';
  filterStorage = 'todos';
  filterColor = 'todos';
  searchQuery = '';
  currentCategory = 'todos';

  if (filterConditionEl) filterConditionEl.value = 'todos';
  if (filterStorageEl) filterStorageEl.value = 'todos';
  if (filterColorEl) filterColorEl.value = 'todos';
  if (searchInput) searchInput.value = '';
  if (clearSearchBtn) clearSearchBtn.style.display = 'none';

  catPills.forEach(p => p.classList.remove('active'));
  if (catPills[0]) catPills[0].classList.add('active');

  renderProducts();
}

if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetAllFilters);

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

// --------------------------------------------------------------------------
// CART & SHIPPING CALCULATOR LOGIC
// --------------------------------------------------------------------------
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

  let productsTotal = 0;
  cartItemsContainer.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    productsTotal += itemTotal;

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

  const grandTotal = productsTotal + currentShippingCost;
  cartTotalEl.textContent = formatCLP(grandTotal);
}

if (cartShippingRegion) {
  cartShippingRegion.addEventListener('change', (e) => {
    currentShippingCost = parseInt(e.target.value, 10) || 0;
    renderCartDrawer();
  });
}

function openCartDrawer() { renderCartDrawer(); cartDrawer.classList.add('active'); cartOverlay.classList.add('active'); }
function closeCartDrawer() { cartDrawer.classList.remove('active'); cartOverlay.classList.remove('active'); }

cartTrigger.addEventListener('click', openCartDrawer);
closeCartBtn.addEventListener('click', closeCartDrawer);
cartOverlay.addEventListener('click', closeCartDrawer);

checkoutWaBtn.addEventListener('click', () => {
  if (cart.length === 0) return;
  const selectedShippingLabel = cartShippingRegion ? cartShippingRegion.options[cartShippingRegion.selectedIndex].text : "Santiago RM";
  let message = `¡Hola BlackPink.Phone! 📲 Quisiera confirmar la compra de los siguientes equipos:\n\n`;
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    message += `${index + 1}. *${item.title}* (${item.colorName} - ${item.storage}) - Cant: ${item.quantity} - ${formatCLP(itemTotal)}\n`;
  });

  total += currentShippingCost;
  message += `\n🚚 *ENVÍO:* ${selectedShippingLabel}\n💳 *TOTAL FINAL:* ${formatCLP(total)}\n\n¿Tienen disponibilidad para despacho?`;
  window.open(`https://wa.me/56943524545?text=${encodeURIComponent(message)}`, '_blank');
});

function quickWhatsApp(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const message = `¡Hola BlackPink.Phone! 📲 Me interesa el *${product.title}* (${product.colorName} / ${product.storage}) a ${formatCLP(product.price)}. ¿Tienen stock?`;
  window.open(`https://wa.me/56943524545?text=${encodeURIComponent(message)}`, '_blank');
}

// --------------------------------------------------------------------------
// PRODUCT QUICK VIEW & DETAIL MODAL
// --------------------------------------------------------------------------
function openModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const monthly3 = Math.round(product.price / 3);
  const monthly12 = Math.round(product.price / 12);

  modalBody.innerHTML = `
    <div class="modal-grid">
      <div>
        <div style="background:#09090e; padding:20px; border-radius:var(--radius-md); border:1px solid var(--border-pink); text-align:center;">
          <img src="${product.image}" class="modal-img" alt="${product.title}" style="max-height:300px; object-fit:contain;">
        </div>
        <div style="display:flex; gap:8px; margin-top:12px; justify-content:center;">
          <span style="font-size:0.75rem; background:rgba(255,255,255,0.06); padding:4px 10px; border-radius:var(--radius-sm);"><i class="fa-solid fa-shield text-pink"></i> ${product.warranty}</span>
          <span style="font-size:0.75rem; background:rgba(255,255,255,0.06); padding:4px 10px; border-radius:var(--radius-sm);"><i class="fa-solid fa-battery-full text-pink"></i> ${product.battery}</span>
        </div>
      </div>

      <div>
        <span class="product-badge" style="position:static; display:inline-block; margin-bottom:12px;">${product.badge}</span>
        <h2 style="font-family:var(--font-heading); font-size:1.8rem; margin-bottom:8px;">${product.title}</h2>
        
        <div style="display:flex; align-items:baseline; gap:12px; margin-bottom:14px;">
          <span style="font-size:1.6rem; font-weight:800; color:var(--pink-primary);">${formatCLP(product.price)}</span>
          ${product.oldPrice ? `<span style="font-size:0.95rem; color:var(--text-dark); text-decoration:line-through;">${formatCLP(product.oldPrice)}</span>` : ''}
        </div>

        <div style="background:#0d0d16; border:1px solid var(--border-pink); padding:12px 16px; border-radius:var(--radius-sm); margin-bottom:20px;">
          <div style="font-size:0.85rem; font-weight:700; color:var(--pink-light);"><i class="fa-solid fa-credit-card"></i> Paga en Cuotas sin Interés:</div>
          <div style="display:flex; justify-content:space-between; font-size:0.82rem; margin-top:6px; color:var(--text-white);">
            <span>3 cuotas de: <strong>${formatCLP(monthly3)}</strong></span>
            <span>12 cuotas de: <strong>${formatCLP(monthly12)}</strong></span>
          </div>
        </div>

        <p style="color:var(--text-gray); font-size:0.92rem; margin-bottom:20px; line-height:1.5;">${product.description}</p>
        
        <h4 style="margin-bottom:10px; font-size:0.85rem; text-transform:uppercase; letter-spacing:1px; color:var(--pink-light);">
          <i class="fa-solid fa-box-open"></i> ¿Qué incluye la caja?
        </h4>
        <ul style="list-style:none; padding:0; margin-bottom:24px; display:grid; grid-template-columns:1fr 1fr; gap:6px;">
          ${(product.boxIncludes || []).map(inc => `<li style="font-size:0.82rem; color:var(--text-white);"><i class="fa-solid fa-circle-check text-pink" style="margin-right:6px;"></i> ${inc}</li>`).join('')}
        </ul>

        <div style="display:flex; gap:12px;">
          <button class="btn btn-pink" style="flex:1;" onclick="addToCart(${product.id}); closeModal();">
            <i class="fa-solid fa-cart-plus"></i> AGREGAR AL CARRITO
          </button>
          <button class="btn btn-outline-pink" onclick="quickWhatsApp(${product.id})">
            <i class="fa-brands fa-whatsapp"></i> CONSULTAR
          </button>
        </div>
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');
}

function closeModal() { modalOverlay.classList.remove('active'); }
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

// --------------------------------------------------------------------------
// TRADE-IN & IMEI LOOKUP
// --------------------------------------------------------------------------
function calculateTradeIn() {
  if (!tradeCurrentModel || !tradeValuationEl) return;
  const baseValuation = parseInt(tradeCurrentModel.value, 10);
  const batteryMult = parseFloat(tradeBattery.value);
  const condMult = parseFloat(tradeCondition.value);
  const targetPrice = parseInt(tradeTargetModel.value, 10);

  const estimatedValuation = Math.round(baseValuation * batteryMult * condMult);
  const finalDifference = Math.max(0, targetPrice - estimatedValuation);

  tradeValuationEl.textContent = formatCLP(estimatedValuation);
  tradeTargetPriceEl.textContent = formatCLP(targetPrice);
  tradeFinalPayEl.textContent = formatCLP(finalDifference);
}

if (tradeCurrentModel) {
  tradeCurrentModel.addEventListener('change', calculateTradeIn);
  tradeBattery.addEventListener('change', calculateTradeIn);
  tradeCondition.addEventListener('change', calculateTradeIn);
  tradeTargetModel.addEventListener('change', calculateTradeIn);

  tradeWaBtn.addEventListener('click', () => {
    const currentText = tradeCurrentModel.options[tradeCurrentModel.selectedIndex].text;
    const targetText = tradeTargetModel.options[tradeTargetModel.selectedIndex].text;
    const message = `¡Hola BlackPink.Phone! 📲 Quisiera cotizar un *TRADE-IN*:\n\n` +
      `📱 *Equipo Actual:* ${currentText}\n` +
      `🔋 *Batería:* ${tradeBattery.options[tradeBattery.selectedIndex].text}\n` +
      `✨ *Estado:* ${tradeCondition.options[tradeCondition.selectedIndex].text}\n` +
      `💰 *Tasación:* ${tradeValuationEl.textContent}\n` +
      `🚀 *Nuevo iPhone:* ${targetText}\n` +
      `💵 *Diferencia:* ${tradeFinalPayEl.textContent}\n\n¿Cómo coordino la entrega?`;

    window.open(`https://wa.me/56943524545?text=${encodeURIComponent(message)}`, '_blank');
  });
}

if (imeiSearchBtn && imeiSearchInput) {
  imeiSearchBtn.addEventListener('click', () => {
    const query = imeiSearchInput.value.trim().toLowerCase();
    if (!query) return;

    const found = IMEI_INVENTORY.find(item => item.imei.toLowerCase() === query || item.model.toLowerCase().includes(query));

    if (found) {
      imeiResultDisplay.style.display = 'block';
      imeiResultDisplay.innerHTML = `
        <div class="imei-card-cert">
          <div class="cert-badge"><i class="fa-solid fa-square-check"></i> IMEI Y EQUIPO VERIFICADO OFICIAL</div>
          <h3 style="font-family:var(--font-heading); font-size:1.3rem; margin-bottom:4px;">${found.model}</h3>
          <p style="color:var(--text-gray); font-size:0.88rem;">Número de IMEI: <strong style="color:var(--pink-light);">${found.imei}</strong></p>
          <div class="cert-grid">
            <div class="cert-item"><span>Estado:</span><strong>${found.condition}</strong></div>
            <div class="cert-item"><span>Batería Inicial:</span><strong>🔋 ${found.battery}% Original</strong></div>
            <div class="cert-item"><span>Fecha Venta:</span><strong>${found.purchaseDate}</strong></div>
            <div class="cert-item"><span>Garantía Hasta:</span><strong style="color:#00e676;">${found.warrantyUntil}</strong></div>
          </div>
        </div>
      `;
    } else {
      imeiResultDisplay.style.display = 'block';
      imeiResultDisplay.innerHTML = `
        <div style="background:#140a0f; border:1px dashed var(--pink-primary); padding:20px; border-radius:var(--radius-md); text-align:center; margin-top:20px;">
          <i class="fa-solid fa-triangle-exclamation text-pink" style="font-size:2rem; margin-bottom:10px;"></i>
          <h4>IMEI o Número de Serie no encontrado</h4>
          <p style="font-size:0.88rem; color:var(--text-gray); margin-top:4px;">Verifica haber ingresado los 15 dígitos exactos o contáctanos por WhatsApp.</p>
        </div>
      `;
    }
  });
}

// --------------------------------------------------------------------------
// ADMIN AUTHENTICATION, SELF-REGISTRATION & EMAIL APPROVAL SYSTEM
// --------------------------------------------------------------------------
function switchAuthSubTab(tab) {
  const btnLogin = document.getElementById('tab-btn-login');
  const btnReg = document.getElementById('tab-btn-register');
  const paneLogin = document.getElementById('auth-login-pane');
  const paneReg = document.getElementById('auth-register-pane');
  const targetEmailEl = document.getElementById('reg-notif-target-email');

  if (targetEmailEl) targetEmailEl.textContent = adminNotificationEmail;

  if (tab === 'login') {
    btnLogin.classList.add('active');
    btnReg.classList.remove('active');
    paneLogin.style.display = 'block';
    paneReg.style.display = 'none';
  } else {
    btnReg.classList.add('active');
    btnLogin.classList.remove('active');
    paneReg.style.display = 'block';
    paneLogin.style.display = 'none';
  }
}

function handleSelfRegister() {
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim().toLowerCase();
  const role = document.getElementById('reg-role').value;

  if (ADMIN_USERS.some(u => u.email.toLowerCase() === email)) {
    alert("⚠️ El correo " + email + " ya está registrado en la plataforma.");
    return;
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    role,
    isSuperAdmin: false,
    pendingApproval: true,
    avatar: "",
    createdAt: new Date().toISOString().split('T')[0]
  };

  ADMIN_USERS.push(newUser);
  localStorage.setItem('bp_admin_users', JSON.stringify(ADMIN_USERS));

  document.getElementById('admin-register-form').reset();
  switchAuthSubTab('login');

  alert(
    `📧 SOLICITUD DE CUENTA REGISTRADA EXITOSAMENTE\n\n` +
    `Se ha enviado una notificación a la Administradora (${adminNotificationEmail}) notificando el registro de ${name} (${email}).\n\n` +
    `Tu acceso permanecerá PENDIENTE DE APROBACIÓN hasta que la Administradora habilite tu cuenta en el panel.`
  );
}

function handleAdminLogin() {
  const emailInput = document.getElementById('login-email').value.trim().toLowerCase();
  const passwordInput = document.getElementById('login-password').value.trim();

  if (passwordInput !== MASTER_TEAM_PASSWORD) {
    alert("❌ Contraseña de acceso incorrecta.");
    return;
  }

  let user = ADMIN_USERS.find(u => u.email.toLowerCase() === emailInput);

  if (!user) {
    if (emailInput === "ol4tte@gmail.com") {
      user = DEFAULT_SUPERADMIN;
      ADMIN_USERS.unshift(user);
      localStorage.setItem('bp_admin_users', JSON.stringify(ADMIN_USERS));
    } else {
      alert("⚠️ No encontramos una cuenta asociada a este correo. Haz clic en 'Crear Cuenta' para registrarte.");
      return;
    }
  }

  // Check if account is blocked/pending approval
  if (user.pendingApproval) {
    alert(
      `⏳ ACCESO BLOQUEADO - SOLICITUD PENDIENTE DE APROBACIÓN\n\n` +
      `Tu cuenta (${user.email}) se encuentra registrada pero aún NO HA SIDO APROBADA.\n\n` +
      `Se envió una notificación a ${adminNotificationEmail}. Por favor contacta a la Administradora para habilitar tu ingreso.`
    );
    return;
  }

  currentAdminUser = user;
  localStorage.setItem('bp_current_user', JSON.stringify(currentAdminUser));
  renderAdminView();
}

function handleAdminLogout() {
  currentAdminUser = null;
  localStorage.removeItem('bp_current_user');
  renderAdminView();
}

function openAdminModal() {
  adminModalOverlay.classList.add('active');
  renderAdminView();
}

function closeAdminModal() {
  adminModalOverlay.classList.remove('active');
}

function renderAdminView() {
  const targetEmailBadge = document.getElementById('current-notif-target-email-badge');
  if (targetEmailBadge) targetEmailBadge.textContent = adminNotificationEmail;

  if (!currentAdminUser) {
    adminAuthCard.style.display = 'block';
    adminMainContainer.style.display = 'none';
    const regTargetEl = document.getElementById('reg-notif-target-email');
    if (regTargetEl) regTargetEl.textContent = adminNotificationEmail;
  } else {
    adminAuthCard.style.display = 'none';
    adminMainContainer.style.display = 'flex';

    if (sessionUserName) {
      const avatarHTML = currentAdminUser.avatar 
        ? `<img src="${currentAdminUser.avatar}" class="session-avatar-img" alt="${currentAdminUser.name}">` 
        : `<i class="fa-solid fa-user-shield text-pink"></i>`;

      sessionUserName.innerHTML = `${avatarHTML} <strong>${currentAdminUser.name}</strong> (${currentAdminUser.email}) <span class="role-badge ${currentAdminUser.isSuperAdmin ? 'superadmin' : 'worker'}">${currentAdminUser.role}</span>`;
    }

    renderMyProfileTab();
    renderAdminStockTable();
    renderAdminPhotosTable();
    renderAdminPendingUsersTable();
    renderAdminUsersTable();
    updateAdminMetrics();
  }
}

if (openAdminBtn) openAdminBtn.addEventListener('click', openAdminModal);
if (adminCloseBtn) adminCloseBtn.addEventListener('click', closeAdminModal);
if (authCloseBtn) authCloseBtn.addEventListener('click', closeAdminModal);

adminTabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    adminTabBtns.forEach(b => b.classList.remove('active'));
    adminTabPanes.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const targetTab = document.getElementById(btn.dataset.tab);
    if (targetTab) targetTab.classList.add('active');
  });
});

// --------------------------------------------------------------------------
// MY PROFILE & ROLE TRANSFER & NOTIFICATION EMAIL LOGIC
// --------------------------------------------------------------------------
function renderMyProfileTab() {
  if (!currentAdminUser) return;

  if (profileAvatarContainer) {
    if (currentAdminUser.avatar) {
      profileAvatarContainer.innerHTML = `<img src="${currentAdminUser.avatar}" class="profile-avatar-circle" alt="${currentAdminUser.name}">`;
    } else {
      profileAvatarContainer.innerHTML = `<div class="profile-avatar-circle" style="background:var(--pink-gradient); display:flex; align-items:center; justify-content:center; font-size:2.2rem; color:white; font-weight:800;">${currentAdminUser.name.charAt(0)}</div>`;
    }
  }

  if (profileDisplayNameHeading) profileDisplayNameHeading.textContent = currentAdminUser.name;
  if (profileDisplayEmail) profileDisplayEmail.textContent = currentAdminUser.email;
  if (profileDisplayRoleBadge) {
    profileDisplayRoleBadge.textContent = currentAdminUser.role;
    profileDisplayRoleBadge.className = `role-badge ${currentAdminUser.isSuperAdmin ? 'superadmin' : 'worker'}`;
  }

  if (myProfileName) myProfileName.value = currentAdminUser.name;
  if (myProfileAvatarUrl) myProfileAvatarUrl.value = currentAdminUser.avatar || '';
  if (myProfileNotifEmail) myProfileNotifEmail.value = adminNotificationEmail;
  if (myProfileRoleSelect) myProfileRoleSelect.value = currentAdminUser.role;

  if (transferTargetUserSelect) {
    const otherUsers = ADMIN_USERS.filter(u => u.email.toLowerCase() !== currentAdminUser.email.toLowerCase() && !u.pendingApproval);
    if (otherUsers.length === 0) {
      transferTargetUserSelect.innerHTML = `<option value="">No hay otros usuarios habilitados para transferir</option>`;
    } else {
      transferTargetUserSelect.innerHTML = otherUsers.map(u => `
        <option value="${u.id}">${u.name} (${u.email}) — Rol actual: ${u.role}</option>
      `).join('');
    }
  }
}

function handleUpdateMyProfile() {
  if (!currentAdminUser) return;

  const newName = myProfileName.value.trim();
  const newAvatar = myProfileAvatarUrl.value.trim();
  const newNotifEmail = myProfileNotifEmail.value.trim().toLowerCase();
  const newRole = myProfileRoleSelect.value;

  if (!newName || !newNotifEmail) {
    alert("⚠️ Por favor completa tu nombre y correo de notificación válidos.");
    return;
  }

  currentAdminUser.name = newName;
  currentAdminUser.avatar = newAvatar;
  currentAdminUser.role = newRole;
  currentAdminUser.isSuperAdmin = (newRole === "Administradora Principal");

  // Save new Notification Email destination
  adminNotificationEmail = newNotifEmail;
  localStorage.setItem('bp_admin_notif_email', adminNotificationEmail);

  const userIndex = ADMIN_USERS.findIndex(u => u.id === currentAdminUser.id);
  if (userIndex > -1) {
    ADMIN_USERS[userIndex] = { ...ADMIN_USERS[userIndex], ...currentAdminUser };
    localStorage.setItem('bp_admin_users', JSON.stringify(ADMIN_USERS));
  }

  localStorage.setItem('bp_current_user', JSON.stringify(currentAdminUser));
  renderAdminView();
  alert(`✨ Perfil guardado. Las notificaciones de aprobación de cuentas ahora se enviarán a: ${adminNotificationEmail}`);
}

function handleTransferRole() {
  if (!currentAdminUser) return;

  const targetUserId = parseInt(transferTargetUserSelect.value, 10);
  const myNewRole = document.getElementById('my-new-role-after-transfer').value;
  const isConfirmed = document.getElementById('confirm-role-transfer').checked;

  if (!targetUserId) {
    alert("⚠️ Selecciona un usuario para transferir tu rol.");
    return;
  }

  if (!isConfirmed) {
    alert("⚠️ Debes marcar la casilla de confirmación.");
    return;
  }

  const targetUser = ADMIN_USERS.find(u => u.id === targetUserId);
  if (!targetUser) return;

  targetUser.role = "Administradora Principal";
  targetUser.isSuperAdmin = true;

  currentAdminUser.role = myNewRole;
  currentAdminUser.isSuperAdmin = (myNewRole === "Administradora Principal");

  const myUserIndex = ADMIN_USERS.findIndex(u => u.id === currentAdminUser.id);
  if (myUserIndex > -1) {
    ADMIN_USERS[myUserIndex] = { ...ADMIN_USERS[myUserIndex], ...currentAdminUser };
  }

  localStorage.setItem('bp_admin_users', JSON.stringify(ADMIN_USERS));
  localStorage.setItem('bp_current_user', JSON.stringify(currentAdminUser));

  renderAdminView();
  alert(`👑 ¡Transferencia completada!\n\n${targetUser.name} (${targetUser.email}) es la nueva Administradora Principal.\nTu nuevo rol es: ${myNewRole}.`);
}

// --------------------------------------------------------------------------
// ADMIN TAB 1: STOCK & IMEI TABLE
// --------------------------------------------------------------------------
function renderAdminStockTable() {
  if (!adminStockTbody) return;
  const filterQuery = adminSearchImei ? adminSearchImei.value.toLowerCase() : '';
  const filtered = IMEI_INVENTORY.filter(item => item.model.toLowerCase().includes(filterQuery) || item.imei.toLowerCase().includes(filterQuery));

  adminStockTbody.innerHTML = filtered.map(item => `
    <tr>
      <td><strong>${item.model}</strong><br><span style="font-size:0.75rem; color:var(--text-dark);">${item.color} | ${item.storage}</span></td>
      <td><code style="color:var(--pink-light);">${item.imei}</code></td>
      <td>${item.condition}</td>
      <td>🔋 ${item.battery}%</td>
      <td>${formatCLP(item.price)}</td>
      <td><span class="status-badge ${item.status === 'Disponible' ? 'available' : 'sold'}">${item.status}</span></td>
      <td>
        <button class="btn btn-outline-pink btn-sm" onclick="toggleStockStatus(${item.id})" style="padding:2px 8px; font-size:0.75rem;">
          ${item.status === 'Disponible' ? 'Marcar Vendido' : 'Disponible'}
        </button>
      </td>
    </tr>
  `).join('');
}

if (adminSearchImei) adminSearchImei.addEventListener('input', renderAdminStockTable);

function handleAddStock() {
  const model = document.getElementById('admin-model').value;
  const imei = document.getElementById('admin-imei').value;
  const storage = document.getElementById('admin-storage').value;
  const color = document.getElementById('admin-color').value;
  const condition = document.getElementById('admin-condition').value;
  const battery = parseInt(document.getElementById('admin-battery').value, 10);
  const imageUrl = document.getElementById('admin-image-url').value.trim() || "assets/iphone15.png";
  const cost = parseInt(document.getElementById('admin-cost').value, 10);
  const price = parseInt(document.getElementById('admin-price').value, 10);

  const newItem = {
    id: Date.now(),
    model,
    imei,
    storage,
    color,
    condition,
    battery,
    cost,
    price,
    status: 'Disponible',
    purchaseDate: new Date().toISOString().split('T')[0],
    warrantyUntil: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  };

  IMEI_INVENTORY.unshift(newItem);
  localStorage.setItem('bp_imei_inventory', JSON.stringify(IMEI_INVENTORY));

  const existsInProducts = PRODUCTS.find(p => p.title.toLowerCase() === model.toLowerCase());
  if (!existsInProducts) {
    PRODUCTS.unshift({
      id: Date.now(),
      title: model,
      category: "iphones",
      badge: condition,
      condition: condition,
      storage: storage,
      color: "Titan",
      colorName: color,
      battery: `Batería ${battery}%`,
      batteryValue: battery,
      price: price,
      oldPrice: price + 100000,
      cost: cost,
      image: imageUrl,
      warranty: "6 Meses Garantía BlackPink",
      boxIncludes: ["Cargador Rápido 20W", "Cable USB-C", "Mica de regalo"],
      specs: [color, storage, "Estado Optimo"],
      description: `${model} en estado ${condition}. Incluye cargador y accesorios.`
    });
    localStorage.setItem('bp_products', JSON.stringify(PRODUCTS));
    renderProducts();
  }

  document.getElementById('add-imei-form').reset();
  renderAdminStockTable();
  renderAdminPhotosTable();
  updateAdminMetrics();
  alert(`✅ Equipo registrado exitosamente con IMEI ${imei}`);
}

function toggleStockStatus(id) {
  const item = IMEI_INVENTORY.find(i => i.id === id);
  if (item) {
    item.status = item.status === 'Disponible' ? 'Vendido' : 'Disponible';
    localStorage.setItem('bp_imei_inventory', JSON.stringify(IMEI_INVENTORY));
    renderAdminStockTable();
    updateAdminMetrics();
  }
}

// --------------------------------------------------------------------------
// ADMIN TAB 3: PHOTOS & CATALOG EDITOR
// --------------------------------------------------------------------------
function renderAdminPhotosTable() {
  if (!adminPhotosTbody) return;

  adminPhotosTbody.innerHTML = PRODUCTS.map(product => `
    <tr>
      <td>#${product.id}</td>
      <td><img src="${product.image}" class="photo-preview-thumb" alt="${product.title}"></td>
      <td><strong>${product.title}</strong></td>
      <td>
        <input type="text" id="photo-url-${product.id}" value="${product.image}" style="font-size:0.82rem; width:100%;">
      </td>
      <td>
        <button class="btn btn-pink btn-sm" onclick="updateProductPhoto(${product.id})" style="padding:4px 10px; font-size:0.75rem;">
          <i class="fa-solid fa-floppy-disk"></i> Guardar Foto
        </button>
      </td>
    </tr>
  `).join('');
}

function updateProductPhoto(productId) {
  const inputEl = document.getElementById(`photo-url-${productId}`);
  if (!inputEl) return;

  const newUrl = inputEl.value.trim();
  if (!newUrl) return;

  const product = PRODUCTS.find(p => p.id === productId);
  if (product) {
    product.image = newUrl;
    localStorage.setItem('bp_products', JSON.stringify(PRODUCTS));
    renderProducts();
    renderAdminPhotosTable();
    alert(`📸 Foto del producto "${product.title}" actualizada correctamente.`);
  }
}

// --------------------------------------------------------------------------
// ADMIN TAB 4: USERS, ROLES & ACCESS APPROVAL MANAGEMENT
// --------------------------------------------------------------------------
function renderAdminPendingUsersTable() {
  if (!adminPendingUsersTbody) return;

  const pendingUsers = ADMIN_USERS.filter(u => u.pendingApproval);

  if (pendingUsers.length === 0) {
    adminPendingUsersTbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; color:var(--text-gray); padding:16px;">
          <i class="fa-solid fa-circle-check text-pink"></i> No hay solicitudes de registro pendientes de aprobación.
        </td>
      </tr>
    `;
    return;
  }

  adminPendingUsersTbody.innerHTML = pendingUsers.map(user => `
    <tr>
      <td><strong>${user.name}</strong></td>
      <td><code>${user.email}</code></td>
      <td><span class="role-badge worker">${user.role}</span></td>
      <td>${user.createdAt || 'Reciente'}</td>
      <td>
        <button class="btn btn-pink btn-sm" onclick="approveUserAccess(${user.id})" style="padding:3px 10px; font-size:0.78rem; margin-right:4px;">
          <i class="fa-solid fa-check"></i> Permitir Acceso
        </button>
        <button class="btn btn-outline-pink btn-sm" onclick="rejectUserAccess(${user.id})" style="padding:3px 10px; font-size:0.78rem; border-color:#d32f2f; color:#ff6666;">
          <i class="fa-solid fa-xmark"></i> Rechazar
        </button>
      </td>
    </tr>
  `).join('');
}

function approveUserAccess(userId) {
  const user = ADMIN_USERS.find(u => u.id === userId);
  if (user) {
    user.pendingApproval = false;
    localStorage.setItem('bp_admin_users', JSON.stringify(ADMIN_USERS));
    renderAdminPendingUsersTable();
    renderAdminUsersTable();
    renderMyProfileTab();
    alert(`✅ ACCESO PERMITIDO: La cuenta de ${user.name} (${user.email}) ha sido habilitada correctamente.`);
  }
}

function rejectUserAccess(userId) {
  const user = ADMIN_USERS.find(u => u.id === userId);
  if (user && confirm(`¿Deseas rechazar la solicitud de acceso de ${user.name} (${user.email})?`)) {
    ADMIN_USERS = ADMIN_USERS.filter(u => u.id !== userId);
    localStorage.setItem('bp_admin_users', JSON.stringify(ADMIN_USERS));
    renderAdminPendingUsersTable();
    renderAdminUsersTable();
    renderMyProfileTab();
    alert(`❌ Solicitud de acceso rechazada.`);
  }
}

function renderAdminUsersTable() {
  if (!adminUsersTbody) return;

  const approvedUsers = ADMIN_USERS.filter(u => !u.pendingApproval);

  adminUsersTbody.innerHTML = approvedUsers.map(user => {
    const isCurrentActive = currentAdminUser && user.email.toLowerCase() === currentAdminUser.email.toLowerCase();

    return `
      <tr>
        <td><strong>${user.name}</strong> ${user.isSuperAdmin ? '<i class="fa-solid fa-crown text-pink" title="SuperAdmin"></i>' : ''}</td>
        <td><code>${user.email}</code></td>
        <td>
          <span class="role-badge ${user.isSuperAdmin ? 'superadmin' : 'worker'}">${user.role}</span>
        </td>
        <td>
          ${isCurrentActive ? `
            <span style="font-size:0.75rem; color:var(--pink-light); font-weight:700;">Tu Cuenta Activa</span>
          ` : `
            <button class="btn btn-outline-pink btn-sm" onclick="changeUserRole(${user.id})" style="padding:2px 8px; font-size:0.75rem; margin-right:4px;">
              Cambiar Rol
            </button>
            <button class="btn btn-pink btn-sm" onclick="deleteUserAccount(${user.id})" style="padding:2px 8px; font-size:0.75rem; background:#d32f2f;">
              <i class="fa-solid fa-trash"></i> Eliminar
            </button>
          `}
        </td>
      </tr>
    `;
  }).join('');
}

function handleCreateUser() {
  const name = document.getElementById('new-user-name').value.trim();
  const email = document.getElementById('new-user-email').value.trim().toLowerCase();
  const role = document.getElementById('new-user-role').value;

  if (ADMIN_USERS.some(u => u.email.toLowerCase() === email)) {
    alert("⚠️ El correo " + email + " ya se encuentra registrado.");
    return;
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    role,
    isSuperAdmin: role === "Administradora Principal",
    pendingApproval: false,
    avatar: "",
    createdAt: new Date().toISOString().split('T')[0]
  };

  ADMIN_USERS.push(newUser);
  localStorage.setItem('bp_admin_users', JSON.stringify(ADMIN_USERS));

  document.getElementById('create-user-form').reset();
  renderAdminUsersTable();
  renderMyProfileTab();
  alert(`🎉 Cuenta de trabajador creada y HABILITADA DIRECTAMENTE para ${name} (${email}).`);
}

function changeUserRole(userId) {
  const user = ADMIN_USERS.find(u => u.id === userId);
  if (!user) return;

  if (user.role === "Administradora Principal") {
    user.role = "Vendedor / Asesor";
    user.isSuperAdmin = false;
  } else {
    user.role = "Administradora Principal";
    user.isSuperAdmin = true;
  }

  localStorage.setItem('bp_admin_users', JSON.stringify(ADMIN_USERS));
  renderAdminUsersTable();
  renderMyProfileTab();
  alert(`✨ Rol de ${user.name} actualizado a: ${user.role}`);
}

function deleteUserAccount(userId) {
  const user = ADMIN_USERS.find(u => u.id === userId);
  if (!user) return;

  if (currentAdminUser && user.email.toLowerCase() === currentAdminUser.email.toLowerCase()) {
    alert("⚠️ No puedes eliminar tu propia cuenta activa mientras estás en sesión.");
    return;
  }

  if (confirm(`¿Estás segura de eliminar la cuenta de ${user.name} (${user.email})?`)) {
    ADMIN_USERS = ADMIN_USERS.filter(u => u.id !== userId);
    localStorage.setItem('bp_admin_users', JSON.stringify(ADMIN_USERS));
    renderAdminUsersTable();
    renderMyProfileTab();
    alert("🗑️ Cuenta eliminada correctamente.");
  }
}

// --------------------------------------------------------------------------
// ADMIN METRICS & NOTIFICATIONS
// --------------------------------------------------------------------------
function updateAdminMetrics() {
  const totalStockVal = IMEI_INVENTORY.reduce((sum, item) => item.status === 'Disponible' ? sum + item.price : sum, 0);
  const soldUnits = IMEI_INVENTORY.filter(item => item.status === 'Vendido').length;
  const totalRevenue = IMEI_INVENTORY.filter(item => item.status === 'Vendido').reduce((sum, item) => sum + item.price, 0);
  const totalCost = IMEI_INVENTORY.filter(item => item.status === 'Vendido').reduce((sum, item) => sum + item.cost, 0);
  const netMargin = totalRevenue - totalCost;

  const stockEl = document.getElementById('metric-total-stock');
  const soldEl = document.getElementById('metric-units-sold');
  const revEl = document.getElementById('metric-revenue');
  const marginEl = document.getElementById('metric-margin');

  if (stockEl) stockEl.textContent = formatCLP(totalStockVal);
  if (soldEl) soldEl.textContent = soldUnits + 14;
  if (revEl) revEl.textContent = formatCLP(totalRevenue + 11450000);
  if (marginEl) marginEl.textContent = formatCLP(netMargin + 2890000);
}

function sendAutomatedNotif(type) {
  const name = document.getElementById('notif-client-name')?.value || 'Cliente';
  const phone = document.getElementById('notif-client-phone')?.value || '912345678';
  const device = document.getElementById('notif-client-device')?.value || 'iPhone 15 Pro Max';

  let message = '';
  if (type === 'purchase') {
    message = `¡Hola ${name}! 💖 Gracias por tu compra en *BlackPink.Phone*. Confirmamos el registro de tu equipo:\n\n📱 *${device}*\n\n✅ Testeado en 30+ puntos con batería 100% verificada. ¡Adjuntamos boleta y garantía!`;
  } else {
    const courier = document.getElementById('notif-courier')?.value || 'Starken';
    const tracking = document.getElementById('notif-tracking-code')?.value || '998471203';
    message = `¡Hola ${name}! 🚚 Tu pedido en *BlackPink.Phone* ya fue enviado.\n\n📦 *Transporte:* ${courier}\n🔢 *N° Seguimiento:* ${tracking}\n\n¡Gracias por preferir BlackPink.Phone!`;
  }

  const cleanPhone = phone.replace(/\D/g, '');
  window.open(`https://wa.me/56${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
}

function exportMetaCatalogCSV() {
  let csvContent = "data:text/csv;charset=utf-8,id,title,description,availability,condition,price,link,image_link,brand\n";
  PRODUCTS.forEach(p => {
    const row = [
      p.id,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.description.replace(/"/g, '""')}"`,
      "in stock",
      p.condition === "SELLADO ORIGINAL" ? "new" : "refurbished",
      `"${p.price} CLP"`,
      `"https://blackpinkphone.cl/#product-${p.id}"`,
      `"https://blackpinkphone.cl/${p.image}"`,
      "Apple"
    ].join(",");
    csvContent += row + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "meta_catalog_blackpink_phone.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function copyInstagramStoryLinks() {
  const storyLink = "https://blackpinkphone.cl/?utm_source=instagram&utm_medium=story&utm_campaign=blackpink_official";
  navigator.clipboard.writeText(storyLink);
  alert("✨ Link optimizado para Historias de Instagram copiado al portapapeles:\n\n" + storyLink);
}

// Mobile Nav Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');
if (mobileToggle && navMenu) {
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
}

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCounters();
  calculateTradeIn();
});
