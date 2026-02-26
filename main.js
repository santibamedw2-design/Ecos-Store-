// Datos de los productos
const products = {
    servicios: [
        { id: 's1', name: 'Reportaje Especial', price: 5000, desc: 'Cobertura a profundidad de tu evento o tema.', img: 'file:///C:/Users/utric/.gemini/antigravity/brain/48d3896a-fe1c-4e48-8304-3686bc6e6041/ecosmedia_services_1771962697776.png' },
        { id: 's2', name: 'Videograma', price: 3000, desc: 'Video dinámico y adaptado para redes sociales.', img: 'file:///C:/Users/utric/.gemini/antigravity/brain/48d3896a-fe1c-4e48-8304-3686bc6e6041/ecosmedia_services_1771962697776.png' },
        { id: 's3', name: 'Infografía Dinámica', price: 1500, desc: 'Datos y estadísticas explicados de forma visual.', img: 'file:///C:/Users/utric/.gemini/antigravity/brain/48d3896a-fe1c-4e48-8304-3686bc6e6041/ecosmedia_services_1771962697776.png' },
        { id: 's4', name: 'Banner Publicitario', price: 2500, desc: 'Publicidad en el portal ecosmediamx.com por 1 mes.', img: 'file:///C:/Users/utric/.gemini/antigravity/brain/48d3896a-fe1c-4e48-8304-3686bc6e6041/ecosmedia_services_1771962697776.png' }
    ],
    tienda: [
        { id: 't1', name: 'Playera Ecos', price: 350, desc: 'Playera oficial, edición Marcela Lecuona.', img: 'file:///C:/Users/utric/.gemini/antigravity/brain/48d3896a-fe1c-4e48-8304-3686bc6e6041/ecosmedia_shirt_1771962640322.png' },
        { id: 't2', name: 'Pin Coleccionable', price: 100, desc: 'Pin metálico con el logo del medio.', img: 'file:///C:/Users/utric/.gemini/antigravity/brain/48d3896a-fe1c-4e48-8304-3686bc6e6041/ecosmedia_pin_1771962681545.png' },
        { id: 't3', name: 'Termo / Botella', price: 400, desc: 'Mantiene tus bebidas calientes o frías.', img: 'file:///C:/Users/utric/.gemini/antigravity/brain/48d3896a-fe1c-4e48-8304-3686bc6e6041/ecosmedia_thermos_1771962664410.png' }
    ]
};

let cart = [];

// Elementos del DOM
const serviciosContainer = document.getElementById('servicios');
const tiendaContainer = document.getElementById('tienda');
const tabBtns = document.querySelectorAll('.tab-btn');
const cartToggle = document.getElementById('cart-toggle');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.getElementById('close-cart');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');

// Renderizar Productos
function renderProducts(category, container) {
    container.innerHTML = products[category].map(prod => `
        <div class="product-card">
            <img src="${prod.img}" alt="${prod.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${prod.name}</h3>
                <p class="product-desc">${prod.desc}</p>
                <div class="product-price">$${prod.price.toLocaleString('es-MX')} MXN</div>
                <button class="add-btn" onclick="addToCart('${prod.id}', '${category}')">Agregar al Carrito</button>
            </div>
        </div>
    `).join('');
}

// Inicializar vistas
renderProducts('servicios', serviciosContainer);
renderProducts('tienda', tiendaContainer);

// Manejo de Tabs
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover active de todos
        tabBtns.forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.products-grid').forEach(g => g.classList.remove('active-tab'));

        // Activar el clickeado
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active-tab');
    });
});

// Funciones del Carrito
function toggleCart() {
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('show');
}

cartToggle.addEventListener('click', toggleCart);
closeCartBtn.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);

// Agregar al carrito
window.addToCart = function (productId, category) {
    const product = products[category].find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();

    // Pequeña animación visual (opcional)
    cartToggle.style.transform = 'scale(1.2)';
    setTimeout(() => cartToggle.style.transform = 'scale(1)', 200);
};

// Remover del carrito
window.removeFromCart = function (productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
};

function updateCartUI() {
    // Actualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Renderizar items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="color: #666; text-align: center; margin-top: 2rem;">El carrito está vacío.</p>';
        cartTotalPrice.textContent = '$0.00 MXN';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.img}" alt="${item.name}">
            <div class="item-details">
                <div class="item-title">${item.name} <span style="color:#666">x${item.quantity}</span></div>
                <div class="item-price">$${(item.price * item.quantity).toLocaleString('es-MX')} MXN</div>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')">Eliminar</button>
            </div>
        </div>
    `).join('');

    // Calcular total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = `$${total.toLocaleString('es-MX')} MXN`;
}

// Inicializar carrito UI
updateCartUI();
