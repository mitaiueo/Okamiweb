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

document.addEventListener('DOMContentLoaded', function() {
    // Rotating image effect
    const rotatingImage = document.getElementById('rotatingImage');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        rotatingImage.style.transform = `rotate(${scrollPosition * 0.2}deg)`;
    });

    // Animate profile content on scroll
    const profileContent = document.getElementById('profileContent');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    observer.observe(profileContent);


});