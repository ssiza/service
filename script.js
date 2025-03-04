
// Add smooth scrolling to links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        behavior: 'smooth',
        top: targetElement.offsetTop
      });
    }
  });
});

// Add interactive elements (example: hover effect)
document.querySelectorAll('.interactive-element').forEach(element => {
  element.addEventListener('mouseover', () => {
    element.classList.add('hover-effect');
  });
  element.addEventListener('mouseout', () => {
    element.classList.remove('hover-effect');
  });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (email) {
      // Here you would normally send the data to your server
      // For demo purposes, we'll just show an alert
      alert(`Thank you for subscribing with ${email}! You've been added to our mailing list.`);
      emailInput.value = '';
    }
  });
}

// Animate elements on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('.feature-card, .testimonial');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementPosition < windowHeight * 0.9) {
      element.classList.add('fade-in');
    }
  });
}

// Add fade-in class to CSS
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    animation: fadeIn 0.8s ease-in-out forwards;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .feature-card, .testimonial {
    opacity: 0;
  }
  
  .hover-effect {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
`;
document.head.appendChild(style);

// Run animation check on scroll
window.addEventListener('scroll', animateOnScroll);
// Run once on page load
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Mobile menu toggle for smaller screens
const createMobileMenu = () => {
  const mobileMenuContainer = document.querySelector('.mobile-menu-container');
  
  // Create mobile menu button
  const mobileMenuBtn = document.createElement('button');
  mobileMenuBtn.classList.add('mobile-menu-btn');
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  mobileMenuContainer.appendChild(mobileMenuBtn);
  
  // Add mobile menu functionality
  mobileMenuBtn.addEventListener('click', () => {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
  });
  
  // Add style for mobile menu
  const mobileStyle = document.createElement('style');
  mobileStyle.textContent = `
    @media (max-width: 768px) {
      .header-container {
        position: relative;
      }
      
      .mobile-menu-container {
        display: block;
      }
      
      nav {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: #f0f0f0;
        z-index: 100;
        padding: 10px;
        box-shadow: 0 5px 5px rgba(0,0,0,0.1);
      }
      
      nav.active {
        display: block;
        width: 100%;
      }
      
      nav.active ul {
        flex-direction: column;
      }
      
      nav.active li {
        margin: 10px 0;
        display: block;
      }
      
      .mobile-menu-btn {
        display: block;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
      }
    }
    
    @media (min-width: 769px) {
      .mobile-menu-btn, .mobile-menu-container {
        display: none;
      }
    }
  `;
  document.head.appendChild(mobileStyle);
};

// Initialize mobile menu on page load
document.addEventListener('DOMContentLoaded', () => {
  createMobileMenu();
  initializeServices();
  initializePortfolio();
  initializeFAQ();
  initializeDarkMode();
});

// FAQ accordion functionality
function initializeFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
}

// Portfolio filtering functionality
function initializePortfolio() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // Portfolio items click - could expand to show details modal
  portfolioItems.forEach(item => {
    item.addEventListener('click', function() {
      // Future enhancement: could show a detailed modal
      console.log('Portfolio item clicked:', this.querySelector('h3').textContent);
    });
  });
}

// Services section functionality
function initializeServices() {
  // Read More/Less functionality
  const readMoreButtons = document.querySelectorAll('.read-more-btn');
  readMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const descriptionContainer = this.parentElement;
      const description = descriptionContainer.querySelector('.service-description');
      
      if (description.classList.contains('expanded')) {
        description.classList.remove('expanded');
        this.textContent = 'Read More';
      } else {
        description.classList.add('expanded');
        this.textContent = 'Read Less';
      }
    });
  });
  
  // Image preview functionality
  const serviceImages = document.querySelectorAll('.service-image');
  
  // Create image preview overlay if it doesn't exist
  if (!document.querySelector('.image-preview-overlay')) {
    const overlay = document.createElement('div');
    overlay.classList.add('image-preview-overlay');
    
    const previewImage = document.createElement('img');
    previewImage.classList.add('preview-image');
    overlay.appendChild(previewImage);
    
    const closeButton = document.createElement('div');
    closeButton.classList.add('close-preview');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => {
      overlay.classList.remove('active');
    });
    overlay.appendChild(closeButton);
    
    // Close overlay when clicking outside the image
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
    
    // Close overlay with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        overlay.classList.remove('active');
      }
    });
    
    document.body.appendChild(overlay);
  }
  
  // Add click event to service images
  const overlay = document.querySelector('.image-preview-overlay');
  const previewImage = overlay.querySelector('.preview-image');
  
  serviceImages.forEach(image => {
    image.addEventListener('click', function() {
      previewImage.src = this.src;
      overlay.classList.add('active');
    });
  });
}


// Dark mode toggle functionality
function initializeDarkMode() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const icon = darkModeToggle.querySelector('i');
  
  // Check for saved user preference
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  // Set initial state
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
  
  // Toggle dark mode
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Update icon
    if (document.body.classList.contains('dark-mode')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      localStorage.setItem('darkMode', 'true');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      localStorage.setItem('darkMode', 'false');
    }
  });
}

// Update CSS variables for various components in dark mode
const updateDarkModeStyles = document.createElement('style');
updateDarkModeStyles.textContent = `
  .feature-card, .service-card, .testimonial, .team-member, .portfolio-item {
    background-color: var(--card-bg-color);
    box-shadow: 0 3px 15px var(--shadow-color);
    transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .service-price, .team-position {
    color: var(--primary-color);
  }
  
  .cta-button, .newsletter-button {
    background-color: var(--primary-color);
  }
  
  .cta-button:hover, .newsletter-button:hover {
    background-color: var(--secondary-color);
  }
  
  .read-more-btn, .filter-btn {
    color: var(--primary-color);
  }
  
  nav a {
    color: var(--text-color);
  }
  
  nav a:hover {
    color: var(--primary-color);
  }
`;
document.head.appendChild(updateDarkModeStyles);
