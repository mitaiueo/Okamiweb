/**
 * JavaScript untuk Menu Website
 * Menambahkan animasi, interaksi, dan efek untuk pengalaman pengguna yang lebih baik
 */
// Di bagian atas file, tambahkan variabel untuk status login
let isLoggedIn = false;

// Fungsi untuk mengecek login
function checkLogin() {
    return isLoggedIn;
}

// Fungsi untuk menampilkan peringatan login
function showLoginAlert() {
    alert('Anda harus login terlebih dahulu untuk menambahkan item ke keranjang!');
    document.getElementById('loginBtn').click(); // Buka modal login
}
function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.package-btn, .drink-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Cek apakah user sudah login
            if (!checkLogin()) {
                showLoginAlert();
                return;
            }
            
            // Lanjutkan proses jika sudah login
            const productItem = this.closest('.package-item, .drink-item, .food-item');
            if (!productItem) return;
            
            const productName = productItem.querySelector('.package-name, .drink-name, .food-name')?.textContent || 'Produk';
            const productPriceText = productItem.querySelector('.package-price, .drink-price, .food-price')?.textContent || '0';
            const productPrice = parseInt(productPriceText.replace(/\D/g, '')) || 0;
            const productImage = productItem.querySelector('img')?.src || '';
            
            const productId = `${productName.toLowerCase().replace(/\s+/g, '-')}-${productPrice}`;
            
            cart.addItem(productId, productName.trim(), productPrice, productImage);
            showNotification(`${productName} ditambahkan ke keranjang!`);
        });
    });
}
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Validasi sederhana
    if (email && password) {
        isLoggedIn = true;
        loginBtn.textContent = 'Logout';
        
        // Sembunyikan modal
        this.style.transform = 'translateY(-20px)';
        this.style.opacity = '0';
        setTimeout(() => {
            authModal.style.display = 'none';
            this.style.transform = 'translateY(0)';
            this.style.opacity = '1';
        }, 300);
    } else {
        alert('Email dan password harus diisi!');
    }
});

// Tambahkan event listener untuk logout
loginBtn.addEventListener('click', function() {
    if (isLoggedIn) {
        isLoggedIn = false;
        this.textContent = 'Login';
        return;
    }
    
    // Jika belum login, tampilkan modal login
    authModal.style.display = 'flex';
    loginForm.style.display = 'flex';
    signupForm.style.display = 'none';
    modalTitle.textContent = 'Login';
});
// Modifikasi fungsi checkoutBtn event listener
checkoutBtn.addEventListener('click', function() {
    if (!checkLogin()) {
        showLoginAlert();
        return;
    }
    
    if (cart.getTotalItems() === 0) {
        alert('Keranjang belanja kosong. Silahkan tambahkan item terlebih dahulu.');
        return;
    }
    
    cartModal.style.display = 'none';
    openCheckoutModal();
});
// Di awal file, setelah deklarasi isLoggedIn
// Cek localStorage untuk status login
if (localStorage.getItem('isLoggedIn') === 'true') {
    isLoggedIn = true;
    document.getElementById('loginBtn').textContent = 'Logout';
}

// Modifikasi login form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (email && password) {
        isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
        loginBtn.textContent = 'Logout';
        // ... kode lainnya
    }
});

// Modifikasi logout
loginBtn.addEventListener('click', function() {
    if (isLoggedIn) {
        isLoggedIn = false;
        localStorage.removeItem('isLoggedIn');
        this.textContent = 'Login';
        return;
    }
    // ... kode lainnya
});
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const header = document.getElementById('mainHeader');
    const navLinks = document.querySelectorAll('.nav-link');
    const profileImg = document.querySelector('.profile-img');
    const loginBtn = document.getElementById('loginBtn');
    const authModal = document.getElementById('authModal');
    const closeModal = document.getElementById('closeModal');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    const modalTitle = document.getElementById('modalTitle');
    
    // Scroll effect for header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Nav link click effects
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Navigasi manual setelah efek selesai
            setTimeout(() => {
                window.location.href = this.getAttribute('href');
            }, 300); // Delay untuk animasi ripple
        });
    });
    
    // Profile image hover effect
    profileImg.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
        this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
    });
    
    profileImg.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0)';
        if (header.classList.contains('scrolled')) {
            this.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.1)';
        } else {
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
        }
    });
    
    // Auth modal functionality
    loginBtn.addEventListener('click', function() {
        authModal.style.display = 'flex';
        loginForm.style.display = 'flex';
        signupForm.style.display = 'none';
        modalTitle.textContent = 'Login';
    });
    
    closeModal.addEventListener('click', function() {
        authModal.style.display = 'none';
    });
    
    // Switch between login and signup forms
    switchToSignup.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'flex';
        modalTitle.textContent = 'Sign Up';
        
        // Add animation
        signupForm.style.animation = 'fadeIn 0.4s ease';
    });
    
    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'flex';
        modalTitle.textContent = 'Login';
        
        // Add animation
        loginForm.style.animation = 'fadeIn 0.4s ease';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === authModal) {
            authModal.style.display = 'none';
        }
    });
    
    // Form submissions
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Add your login logic here
        console.log('Login attempt with:', email, password);
        
        // Show success animation
        this.style.transform = 'translateY(-20px)';
        this.style.opacity = '0';
        setTimeout(() => {
            authModal.style.display = 'none';
            this.style.transform = 'translateY(0)';
            this.style.opacity = '1';
        }, 300);
    });
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirm = document.getElementById('signupConfirm').value;
        
        if (password !== confirm) {
            alert("Passwords don't match!");
            return;
        }
        
        // Add your signup logic here
        console.log('Signup attempt with:', name, email, password);
        
        // Show success animation
        this.style.transform = 'translateY(-20px)';
        this.style.opacity = '0';
        setTimeout(() => {
            authModal.style.display = 'none';
            this.style.transform = 'translateY(0)';
            this.style.opacity = '1';
            
            // Switch back to login form
            signupForm.style.display = 'none';
            loginForm.style.display = 'flex';
            modalTitle.textContent = 'Login';
        }, 300);
    });
});

// Tunggu hingga dokumen selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi tombol Back to Top
    const backToTopBtn = document.createElement('div');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.innerHTML = '&uarr;';
    document.body.appendChild(backToTopBtn);
    
    // Tampilkan tombol ketika pengguna menggulir ke bawah
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll ke atas ketika tombol diklik
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animasi untuk elemen-elemen saat muncul di viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Terapkan animasi ke elemen-elemen
    const animateElements = (selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
    };

    animateElements('.food-item');
    animateElements('.drink-item');
    animateElements('.package-item');

    // Event untuk rotating items
    const rotatingItems = document.querySelectorAll('.rotating-item');
    rotatingItems.forEach(item => {
        item.addEventListener('click', () => {
            item.style.animationPlayState = item.style.animationPlayState === 'paused' ? 'running' : 'paused';
        });
    });

    // Tambahkan efek hover untuk tombol
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Tambahkan efek gelembung untuk tombol-tombol
    const addBubbleEffect = (buttons) => {
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const bubble = document.createElement('span');
                bubble.className = 'bubble-effect';
                bubble.style.left = `${x}px`;
                bubble.style.top = `${y}px`;
                
                this.appendChild(bubble);
                
                setTimeout(() => {
                    bubble.remove();
                }, 500);
            });
        });
    };



    // Efek parallax sederhana
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const header = document.querySelector('header');
        if (header) {
            header.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });

    // Animasi untuk menu saat di-hover
    const animateFoodItems = () => {
        const foodItems = document.querySelectorAll('.food-item');
        foodItems.forEach((item, index) => {
            item.addEventListener('mouseenter', function() {
                setTimeout(() => {
                    this.style.transform = 'translateY(-10px) rotate(2deg)';
                    this.style.boxShadow = '0 15px 30px rgba(229, 57, 53, 0.3)';
                }, index * 50);
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    };

    animateFoodItems();

    // Tambahkan efek label "Best Seller" atau "Spicy" secara acak pada makanan
    const addRandomBadges = () => {
        const badges = ['BEST SELLER', 'SPICY', 'NEW', 'PREMIUM'];
        const foodItems = document.querySelectorAll('.food-item:not(:has(.food-badge))');
        const itemsToBadge = Array.from(foodItems).sort(() => 0.5 - Math.random()).slice(0, 3);
        
        itemsToBadge.forEach(item => {
            const badge = document.createElement('div');
            badge.className = 'food-badge';
            badge.textContent = badges[Math.floor(Math.random() * badges.length)];
            item.appendChild(badge);
        });
    };

    addRandomBadges();

    // Tambahkan efek blink pada header
    const blinkEffect = () => {
        const header = document.querySelector('header h1');
        if (!header) return;
        
        setInterval(() => {
            header.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)';
            
            setTimeout(() => {
                header.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.3)';
            }, 200);
        }, 3000);
    };

    blinkEffect();

    // Tambahkan notifikasi pesan berhasil ketika tombol pesan diklik
    const addOrderNotification = () => {
        const orderButtons = document.querySelectorAll('.package-btn, .drink-btn');
        
        orderButtons.forEach(button => {
            button.addEventListener('click', function() {
                let productName = "item";
                const closestItem = this.closest('.package-item, .drink-item, .food-item');
                
                if (closestItem) {
                    const nameElement = closestItem.querySelector('.package-name, .drink-name, .food-name');
                    if (nameElement) {
                        productName = nameElement.textContent;
                    }
                }
                
                // Buat notifikasi
                const notification = document.createElement('div');
                notification.className = 'order-notification';
                notification.textContent = `${productName} ditambahkan ke keranjang!`;
                notification.style.position = 'fixed';
                notification.style.bottom = '20px';
                notification.style.left = '20px';
                notification.style.backgroundColor = '#d50000';
                notification.style.color = 'white';
                notification.style.padding = '10px 20px';
                notification.style.borderRadius = '5px';
                notification.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
                notification.style.zIndex = '9999';
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(20px)';
                notification.style.transition = 'all 0.3s ease';
                
                document.body.appendChild(notification);
                
               
            });
        });
    };

    

    addOrderNotification();
});

// Footer animations
const footerSections = document.querySelectorAll('.footer-section');

const observerOptions = {
threshold: 0.1,
rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(function(entries, observer) {
entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
    }
});
}, observerOptions);

footerSections.forEach(section => {
section.style.opacity = 0;
section.style.transform = 'translateY(20px)';
section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
observer.observe(section);
});

// Mobile hover effects
const deliveryApps = document.querySelectorAll('.delivery-app');
const socialIcons = document.querySelectorAll('.social-icon');

function addMobileHoverEffect(elements) {
elements.forEach(element => {
    element.addEventListener('touchstart', function() {
        this.classList.add('hover-effect');
    });
    
    element.addEventListener('touchend', function() {
        setTimeout(() => {
            this.classList.remove('hover-effect');
        }, 200);
    });
});
}

addMobileHoverEffect(deliveryApps);
addMobileHoverEffect(socialIcons);

// Cart Functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadCart();
    }
    
    addItem(productId, name, price, image) {
        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: productId,
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartUI();
    }
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
    }
    
    updateQuantity(productId, newQuantity) {
        if (newQuantity < 1) {
            this.removeItem(productId);
            return;
        }
        
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            this.updateCartUI();
        }
    }
    
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }
    
    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartUI();
    }
    
    saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }
    
    loadCart() {
        const savedCart = localStorage.getItem('shoppingCart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
        }
    }
    
    updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        // Update cart count
        cartCount.textContent = this.getTotalItems();
        
        // Update cart items list
        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart">Keranjang belanja kosong</div>';
        } else {
            cartItemsContainer.innerHTML = this.items.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">Rp ${item.price.toLocaleString()}</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <div class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </div>
                </div>
            `).join('');
        }
        
        // Update total price
        cartTotal.textContent = `Rp ${this.getTotalPrice().toLocaleString()}`;
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Add to cart functionality
function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.package-btn, .drink-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Find the closest product item
            const productItem = this.closest('.package-item, .drink-item, .food-item');
            if (!productItem) return;
            
            // Get product details
            const productName = productItem.querySelector('.package-name, .drink-name, .food-name')?.textContent || 'Produk';
            const productPriceText = productItem.querySelector('.package-price, .drink-price, .food-price')?.textContent || '0';
            const productPrice = parseInt(productPriceText.replace(/\D/g, '')) || 0;
            const productImage = productItem.querySelector('img')?.src || '';
            
            // Generate a simple ID based on name and price
            const productId = `${productName.toLowerCase().replace(/\s+/g, '-')}-${productPrice}`;
            
            // Add to cart
            cart.addItem(productId, productName.trim(), productPrice, productImage);
            
            // Show notification
            showNotification(`${productName} ditambahkan ke keranjang!`);
        });
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'order-notification';
    notification.textContent = message;
    
    // Style the notification (add these styles to your CSS)
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = 'white';
    notification.style.padding = '12px 24px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
    notification.style.zIndex = '9999';
    notification.style.opacity = '0';
    notification.style.transition = 'all 0.3s ease';
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.bottom = '30px';
    }, 10);
    
    // Animate out after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.bottom = '20px';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Cart modal functionality
function setupCartModal() {
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const closeCartModal = document.getElementById('closeCartModal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // Open cart modal
    cartIcon.addEventListener('click', function() {
        cart.updateCartUI();
        cartModal.style.display = 'flex';
    });
    
    // Close cart modal
    closeCartModal.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });
    
    // Close when clicking outside
    cartModal.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    // Handle quantity changes
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quantity-btn')) {
            const productId = e.target.getAttribute('data-id');
            const itemElement = e.target.closest('.cart-item');
            const quantityElement = itemElement.querySelector('.cart-item-quantity span');
            let quantity = parseInt(quantityElement.textContent);
            
            if (e.target.classList.contains('plus')) {
                quantity += 1;
            } else if (e.target.classList.contains('minus')) {
                quantity -= 1;
            }
            
            cart.updateQuantity(productId, quantity);
        }
        
        if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
            const element = e.target.classList.contains('remove-item') ? e.target : e.target.closest('.remove-item');
            const productId = element.getAttribute('data-id');
            cart.removeItem(productId);
        }
    });
    
    // Proceed to checkout
    checkoutBtn.addEventListener('click', function() {
        if (cart.getTotalItems() === 0) {
            alert('Keranjang belanja kosong. Silahkan tambahkan item terlebih dahulu.');
            return;
        }
        
        cartModal.style.display = 'none';
        openCheckoutModal();
    });
}

// Checkout functionality
function openCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    const orderSummary = document.getElementById('orderSummary');
    const orderTotal = document.getElementById('orderTotal');
    
    // Update order summary
    orderSummary.innerHTML = cart.items.map(item => `
        <div class="order-item">
            <span>${item.name} (${item.quantity}x)</span>
            <span>Rp ${(item.price * item.quantity).toLocaleString()}</span>
        </div>
    `).join('');
    
    // Update order total
    orderTotal.textContent = `Rp ${cart.getTotalPrice().toLocaleString()}`;
    
    // Show modal
    checkoutModal.style.display = 'flex';
}

function setupCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckoutModal = document.getElementById('closeCheckoutModal');
    const checkoutForm = document.getElementById('checkoutForm');
    const deliveryMethod = document.getElementById('deliveryMethod');
    const addressField = document.getElementById('addressField');
    
    // Close checkout modal
    closeCheckoutModal.addEventListener('click', function() {
        checkoutModal.style.display = 'none';
    });
    
    // Close when clicking outside
    checkoutModal.addEventListener('click', function(e) {
        if (e.target === checkoutModal) {
            checkoutModal.style.display = 'none';
        }
    });
    
    // Show/hide address field based on delivery method
    deliveryMethod.addEventListener('change', function() {
        if (this.value === 'delivery') {
            addressField.style.display = 'block';
            document.getElementById('deliveryAddress').required = true;
        } else {
            addressField.style.display = 'none';
            document.getElementById('deliveryAddress').required = false;
        }
    });
    
    // Handle form submission
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const orderData = {
            customer: {
                name: document.getElementById('customerName').value,
                phone: document.getElementById('customerPhone').value
            },
            delivery: {
                method: document.getElementById('deliveryMethod').value,
                address: document.getElementById('deliveryMethod').value === 'delivery' 
                    ? document.getElementById('deliveryAddress').value 
                    : null
            },
            payment: {
                method: document.getElementById('paymentMethod').value
            },
            items: cart.items,
            total: cart.getTotalPrice(),
            date: new Date().toISOString(),
            orderId: 'OKAMI-' + Math.floor(Math.random() * 1000000)
        };
        
        // In a real app, you would send this data to your server here
        console.log('Order submitted:', orderData);
        
        // Show success modal
        showOrderSuccess(orderData);
        
        // Clear the cart
        cart.clearCart();
        
        // Close checkout modal
        checkoutModal.style.display = 'none';
    });
}

// Order success modal
function showOrderSuccess(orderData) {
    const successModal = document.getElementById('orderSuccessModal');
    const orderDetails = document.getElementById('orderDetails');
    const closeSuccessModal = document.getElementById('closeSuccessModal');
    
    // Format order details
    const deliveryMethod = orderData.delivery.method === 'delivery' 
        ? `Delivery (${orderData.delivery.address})` 
        : 'Ambil di Tempat';
    
    orderDetails.innerHTML = `
        <p><strong>Nomor Pesanan:</strong> ${orderData.orderId}</p>
        <p><strong>Nama:</strong> ${orderData.customer.name}</p>
        <p><strong>Telepon:</strong> ${orderData.customer.phone}</p>
        <p><strong>Metode Pengiriman:</strong> ${deliveryMethod}</p>
        <p><strong>Metode Pembayaran:</strong> ${orderData.payment.method}</p>
        <p><strong>Total Pembayaran:</strong> Rp ${orderData.total.toLocaleString()}</p>
    `;
    
    // Show modal
    successModal.style.display = 'flex';
    
    // Close modal
    closeSuccessModal.addEventListener('click', function() {
        successModal.style.display = 'none';
    });
    
    // Close when clicking outside
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    
    // Initialize cart functionality
    setupAddToCartButtons();
    setupCartModal();
    setupCheckoutModal();
    
    // Update cart UI on page load
    cart.updateCartUI();
    
    // Rest of your existing code...
});