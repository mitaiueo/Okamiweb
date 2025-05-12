// Fungsi untuk membuka modal checkout
function openCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    const orderSummary = document.getElementById('orderSummary');
    const orderTotal = document.getElementById('orderTotal');

    // Update ringkasan pesanan
    orderSummary.innerHTML = cart.items.map(item => `
        <div class="order-item">
            <span>${item.name} (${item.quantity}x)</span>
            <span>Rp ${(item.price * item.quantity).toLocaleString()}</span>
        </div>
    `).join('');

    // Update total harga
    orderTotal.textContent = `Rp ${cart.getTotalPrice().toLocaleString()}`;

    // Tampilkan modal
    checkoutModal.style.display = 'flex';
}

// Fungsi untuk setup modal checkout
function setupCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckoutModal = document.getElementById('closeCheckoutModal');
    const checkoutForm = document.getElementById('checkoutForm');
    const deliveryMethod = document.getElementById('deliveryMethod');
    const addressField = document.getElementById('addressField');

    // Tutup modal
    closeCheckoutModal.addEventListener('click', function() {
        checkoutModal.style.display = 'none';
    });

    // Tutup modal saat klik di luar
    checkoutModal.addEventListener('click', function(e) {
        if (e.target === checkoutModal) {
            checkoutModal.style.display = 'none';
        }
    });

    // Tampilkan/sembunyikan field alamat berdasarkan metode pengiriman
    deliveryMethod.addEventListener('change', function() {
        addressField.style.display = this.value === 'delivery' ? 'block' : 'none';
    });

    // Handle submit form checkout
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simpan data pesanan
        const orderData = {
            customer: {
                name: document.getElementById('customerName').value,
                phone: document.getElementById('customerPhone').value
            },
            delivery: {
                method: deliveryMethod.value,
                address: deliveryMethod.value === 'delivery' 
                    ? document.getElementById('deliveryAddress').value 
                    : null
            },
            payment: {
                method: document.getElementById('paymentMethod').value
            },
            items: cart.items,
            total: cart.getTotalPrice(),
            orderId: 'OKAMI-' + Math.floor(Math.random() * 1000000)
        };

        // Tampilkan modal sukses
        showOrderSuccess(orderData);

        // Kosongkan keranjang
        cart.clearCart();

        // Tutup modal checkout
        checkoutModal.style.display = 'none';
    });
}

// Fungsi untuk menampilkan modal sukses
function showOrderSuccess(orderData) {
    const successModal = document.getElementById('orderSuccessModal');
    const orderDetails = document.getElementById('orderDetails');
    const closeSuccessModal = document.getElementById('closeSuccessModal');

    // Format detail pesanan
    orderDetails.innerHTML = `
        <p><strong>Nomor Pesanan:</strong> ${orderData.orderId}</p>
        <p><strong>Nama:</strong> ${orderData.customer.name}</p>
        <p><strong>Telepon:</strong> ${orderData.customer.phone}</p>
        <p><strong>Metode Pengiriman:</strong> ${orderData.delivery.method === 'delivery' ? 'Delivery' : 'Ambil di Tempat'}</p>
        <p><strong>Metode Pembayaran:</strong> ${orderData.payment.method}</p>
        <p><strong>Total Pembayaran:</strong> Rp ${orderData.total.toLocaleString()}</p>
    `;

    // Tampilkan modal
    successModal.style.display = 'flex';

    // Tutup modal
    closeSuccessModal.addEventListener('click', function() {
        successModal.style.display = 'none';
    });

    // Tutup modal saat klik di luar
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });
}

// Panggil fungsi setup saat DOM siap
document.addEventListener('DOMContentLoaded', function() {
    setupCheckoutModal();
});