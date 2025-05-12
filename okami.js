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
    // Nav link click effects - Perbaikan di menu.js
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

    // Image rotation functionality
    const images = ['tengah.png']; // Update with your image paths
    const rotatingImage = document.getElementById('rotatingImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;
    let rotateInterval;
    
    // Set initial image
    rotatingImage.src = images[currentIndex];
    
    // Auto rotate images every 3 seconds
    function startAutoRotate() {
        rotateInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            fadeImageChange(images[currentIndex]);
        }, 3000);
    }
    
    startAutoRotate();
    
    // Image change with fade effect
    function fadeImageChange(newSrc) {
        rotatingImage.style.opacity = 0;
        setTimeout(() => {
            rotatingImage.src = newSrc;
            rotatingImage.style.opacity = 1;
        }, 500);
    }
    
    // Previous button
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        fadeImageChange(images[currentIndex]);
        resetAutoRotate();
    });
    
    // Next button
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        fadeImageChange(images[currentIndex]);
        resetAutoRotate();
    });
    
    // Reset auto rotate timer when manually changing images
    function resetAutoRotate() {
        clearInterval(rotateInterval);
        startAutoRotate();
    }

    // Gallery hover effects
    const imageCards = document.querySelectorAll('.image-card');
    
    imageCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const x = e.clientX - card.getBoundingClientRect().left;
            const y = e.clientY - card.getBoundingClientRect().top;
            
            const centerX = card.offsetWidth / 2;
            const centerY = card.offsetHeight / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = 'perspective(1000px) rotateX(' + angleX + 'deg) rotateY(' + angleY + 'deg) translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-5px)';
        });
    });

    // Running Text and Photocard functionality
    const marquees = document.querySelectorAll('.marquee');
    const photocard = document.getElementById('photocard');
    
    // Duplicate text in each marquee to make continuous effect
    marquees.forEach(marquee => {
        const marqueeText = marquee.querySelector('.marquee-text');
        const textContent = marqueeText.textContent;
        // Add it four times for a smooth infinite loop
        marqueeText.textContent = textContent.repeat(4);
    });
    
    // Event listeners for all marquees
    marquees.forEach(marquee => {
        marquee.addEventListener('mouseenter', function() {
            // Pause animation
            this.classList.add('paused');
            
            // Show photocard at a random position
            const maxX = window.innerWidth - 250;
            const maxY = window.innerHeight - 375;
            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);
            const randomRotation = Math.floor(Math.random() * 10) - 5; // -5 to +5 degrees
            
            photocard.style.left = randomX + 'px';
            photocard.style.top = randomY + 'px';
            photocard.style.transform = 'rotate(' + randomRotation + 'deg)';
            photocard.style.display = 'block';
        });
        
        marquee.addEventListener('mouseleave', function() {
            // Resume animation
            this.classList.remove('paused');
            
            // Hide photocard
            photocard.style.display = 'none';
        });
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
});

