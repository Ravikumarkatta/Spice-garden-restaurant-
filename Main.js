document.addEventListener('DOMContentLoaded', function() {
    // ========== Mobile Navigation ==========
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // ========== Sticky Navigation ==========
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');
    const heroHeight = heroSection.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > heroHeight * 0.8) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ========== Menu Tab Filtering ==========
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter menu items with animation
            menuItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                    
                    // Animate in
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                }, 300);
            });
        });
    });

    // ========== Testimonial Slider ==========
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentTestimonial = 0;
    let autoSlideInterval;
    
    function showTestimonial(index) {
        // Wrap around if at ends
        if (index >= testimonials.length) index = 0;
        if (index < 0) index = testimonials.length - 1;
        
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.opacity = '0';
            testimonial.style.transform = 'translateX(20px)';
            setTimeout(() => {
                testimonial.classList.remove('active');
            }, 300);
        });
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show selected testimonial
        setTimeout(() => {
            testimonials[index].classList.add('active');
            setTimeout(() => {
                testimonials[index].style.opacity = '1';
                testimonials[index].style.transform = 'translateX(0)';
            }, 50);
        }, 300);
        
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            showTestimonial(currentTestimonial + 1);
        }, 6000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showTestimonial(index);
            startAutoSlide();
        });
    });
    
    // Previous/next buttons
    prevBtn.addEventListener('click', function() {
        stopAutoSlide();
        showTestimonial(currentTestimonial - 1);
        startAutoSlide();
    });
    
    nextBtn.addEventListener('click', function() {
        stopAutoSlide();
        showTestimonial(currentTestimonial + 1);
        startAutoSlide();
    });
    
    // Start auto-sliding
    showTestimonial(0);
    startAutoSlide();

    // Pause auto-slide when hovering
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', stopAutoSlide);
    testimonialSlider.addEventListener('mouseleave', startAutoSlide);

    // ========== Back to Top Button ==========
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========== Smooth Scrolling ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== Gallery Lightbox ==========
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const imgSrc = img.getAttribute('src');
            
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${imgSrc}" alt="${img.alt}">
                    <span class="close-btn">&times;</span>
                </div>
            `;
            
            lightbox.classList.add('active');
            document.body.classList.add('no-scroll');
        });
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target !== e.currentTarget && !e.target.classList.contains('close-btn')) return;
        
        lightbox.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    // ========== Form Submission Handling ==========
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name) {
                showAlert('Please enter your name', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            if (!message) {
                showAlert('Please enter your message', 'error');
                return;
            }
            
            // Simulate form submission
            showAlert('Thank you for your message! We will get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    function showAlert(message, type) {
        const alertBox = document.createElement('div');
        alertBox.className = `alert ${type}`;
        alertBox.textContent = message;
        
        document.body.appendChild(alertBox);
        
        setTimeout(() => {
            alertBox.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            alertBox.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(alertBox);
            }, 300);
        }, 3000);
    }

    // ========== Scroll Animations ==========
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about, .menu, .testimonials, .gallery, .location-hours, .contact');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.75) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize elements as invisible
    document.querySelectorAll('.about, .menu, .testimonials, .gallery, .location-hours, .contact').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});
