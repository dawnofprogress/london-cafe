// Hero Image Slider
const heroImages = [
    'assets/images/London-Café.jpg',
    'assets/images/coffee-bean.jpg',
    'assets/images/pastry.jpg',
    'assets/images/ambiance.jpg'
];

let currentImageIndex = 0;
const heroImage = document.querySelector('.hero-image');

function changeHeroImage() {
    heroImage.style.opacity = '0';
    setTimeout(() => {
        heroImage.src = heroImages[currentImageIndex];
        heroImage.style.opacity = '1';
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
    }, 500);
}

// Change image every 5 seconds
setInterval(changeHeroImage, 5000);

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamic Copyright Year
const footerYear = document.querySelector('footer p');
const currentYear = new Date().getFullYear();
footerYear.innerHTML = `© ${currentYear} London Café. All rights reserved.`;

// Form Validation (for contact page)
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Here you would typically send the form data to a server
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Email validation helper
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Menu Item Search (for categories page)
const searchInput = document.getElementById('menu-search');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Add to cart functionality
let cart = [];

function addToCart(itemName, price) {
    cart.push({ name: itemName, price: price });
    updateCartCount();
    saveCartToLocalStorage();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function saveCartToLocalStorage() {
    localStorage.setItem('cafeCart', JSON.stringify(cart));
}

// Load cart from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedCart = localStorage.getItem('cafeCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
});