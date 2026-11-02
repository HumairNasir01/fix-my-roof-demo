/**
 * FIX MY ROOF Total Roof Restorations
 * Global JavaScript (script.js)
 * Mobile Navigation Toggle, Sticky Header & Shared Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initStickyHeader();
  highlightActiveNavLink();
  initContactForm();
});

/**
 * 1. Mobile Hamburger Menu Toggle & Drawer Interaction
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('hamburgerToggle');
  const navDrawer = document.getElementById('mobileNavDrawer');
  
  if (!toggleBtn || !navDrawer) return;

  function openMenu() {
    toggleBtn.classList.add('is-active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    navDrawer.classList.add('is-open');
    document.body.classList.add('no-scroll');
  }

  function closeMenu() {
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    navDrawer.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navDrawer.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking any link inside the mobile drawer
  const drawerLinks = navDrawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navDrawer.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Close when clicking outside of drawer and toggle
  document.addEventListener('click', (e) => {
    if (navDrawer.classList.contains('is-open')) {
      if (!navDrawer.contains(e.target) && !toggleBtn.contains(e.target)) {
        closeMenu();
      }
    }
  });
}

/**
 * 2. Sticky Header with Scroll Shadow
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check on load
}

/**
 * 3. Automatically Highlight Active Nav Link
 */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname;
  const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentFile || (currentFile === '' && href === 'index.html')) {
      link.classList.add('active');
    } else if (href && href !== 'index.html' && currentFile.includes(href)) {
      link.classList.add('active');
    }
  });
}

/**
 * 4. Contact Form Handler (contact.html)
 */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const successBanner = document.getElementById('contactSuccessBanner');
  const submitBtn = document.getElementById('contactSubmitBtn');

  if (!contactForm || !successBanner) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting Request...';
    }

    // Simulate reliable dispatch & show confirmation state
    setTimeout(() => {
      contactForm.style.display = 'none';
      successBanner.classList.add('is-visible');
      successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 600);
  });
}

