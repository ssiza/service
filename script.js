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