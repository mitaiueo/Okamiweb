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


        // Location Button Functionality
        document.getElementById('locationBtn').addEventListener('click', function() {
            const details = document.getElementById('locationDetails');
            const button = this;
            
            if (details.style.display === 'block') {
                details.style.display = 'none';
                button.textContent = 'CLICK FOR LOCATION DETAILS';
            } else {
                details.style.display = 'block';
                button.textContent = 'HIDE DETAILS';
            }
        });
        
        // Animate Review Cards on Scroll
        function animateReviews() {
            const reviewCards = document.querySelectorAll('.review-card');
            const windowHeight = window.innerHeight;
            
            reviewCards.forEach(card => {
                const cardPosition = card.getBoundingClientRect().top;
                const scrollPosition = windowHeight - 100;
                
                if (cardPosition < scrollPosition) {
                    card.classList.add('show');
                }
            });
        }
        
        // Initial check when page loads
        window.addEventListener('load', animateReviews);
        
        // Check when scrolling
        window.addEventListener('scroll', animateReviews);
        
        // Add click effect to location button
        document.getElementById('locationBtn').addEventListener('mousedown', function() {
            this.style.transform = 'translateY(2px)';
        });
        
        document.getElementById('locationBtn').addEventListener('mouseup', function() {
            this.style.transform = 'translateY(0)';
        });
        
        document.getElementById('locationBtn').addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });