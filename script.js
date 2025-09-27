/**
 * MEISTERCO - DRIVING THE FUTURE
 * Advanced JavaScript Framework for Competition-Grade Performance
 * Optimized for performance, accessibility, and user experience
 */

'use strict';

// ========================================================================
// PERFORMANCE MONITORING & OPTIMIZATION
// ========================================================================

class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.observers = new Map();
    this.init();
  }

  init() {
    // Monitor Core Web Vitals
    this.measureCLS();
    this.measureFID();
    this.measureLCP();
    
    // Monitor custom metrics
    this.measurePageLoad();
    this.measureScrollPerformance();
  }

  measureCLS() {
    if ('web-vital' in window) {
      import('web-vitals').then(({ getCLS }) => {
        getCLS((metric) => {
          this.metrics.cls = metric.value;
          console.log('CLS:', metric.value);
        });
      });
    }
  }

  measureFID() {
    if ('web-vital' in window) {
      import('web-vitals').then(({ getFID }) => {
        getFID((metric) => {
          this.metrics.fid = metric.value;
          console.log('FID:', metric.value);
        });
      });
    }
  }

  measureLCP() {
    if ('web-vital' in window) {
      import('web-vitals').then(({ getLCP }) => {
        getLCP((metric) => {
          this.metrics.lcp = metric.value;
          console.log('LCP:', metric.value);
        });
      });
    }
  }

  measurePageLoad() {
    window.addEventListener('load', () => {
      const navigationEntry = performance.getEntriesByType('navigation')[0];
      this.metrics.pageLoad = navigationEntry.loadEventEnd - navigationEntry.loadEventStart;
      console.log('Page Load Time:', this.metrics.pageLoad);
    });
  }

  measureScrollPerformance() {
    let lastScrollTime = 0;
    let scrollCount = 0;
    
    const measureScroll = () => {
      const now = performance.now();
      if (lastScrollTime) {
        const delta = now - lastScrollTime;
        scrollCount++;
        
        if (scrollCount % 10 === 0) {
          console.log('Average scroll delta:', delta);
        }
      }
      lastScrollTime = now;
    };

    window.addEventListener('scroll', measureScroll, { passive: true });
  }
}

// ========================================================================
// ADVANCED ANIMATION SYSTEM
// ========================================================================

class AnimationEngine {
  constructor() {
    this.activeAnimations = new Set();
    this.animationQueue = [];
    this.isProcessing = false;
    this.rafId = null;
    
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.preloadAnimations();
  }

  setupIntersectionObserver() {
    const options = {
      threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
      rootMargin: '0px 0px -50px 0px'
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.triggerAnimation(entry.target, entry.intersectionRatio);
        }
      });
    }, options);

    // Observe elements with animation classes
    document.querySelectorAll('[data-aos], .animate-on-scroll, .loading-fade-in').forEach(el => {
      this.intersectionObserver.observe(el);
    });
  }

  setupScrollAnimations() {
    let ticking = false;
    
    const updateScrollAnimations = () => {
      const scrollY = window.pageYOffset;
      
      // Parallax effects
      this.updateParallax(scrollY);
      
      // Header transform
      this.updateHeader(scrollY);
      
      // Progress indicators
      this.updateProgressIndicators(scrollY);
      
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollAnimations);
        ticking = true;
      }
    }, { passive: true });
  }

  updateParallax(scrollY) {
    const hero = document.querySelector('.hero');
    const particles = document.querySelector('.hero-particles');
    const glow = document.querySelector('.hero-glow');
    
    if (hero) {
      const speed = scrollY * 0.5;
      hero.style.transform = `translateY(${speed}px)`;
    }
    
    if (particles) {
      const speed = scrollY * 0.3;
      particles.style.transform = `translateY(${speed}px)`;
    }
    
    if (glow) {
      const speed = scrollY * 0.2;
      glow.style.transform = `translate(-50%, -50%) translateY(${speed}px)`;
    }
  }

  updateHeader(scrollY) {
    const header = document.getElementById('header');
    if (!header) return;
    
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  updateProgressIndicators(scrollY) {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const progress = (scrollY / (documentHeight - windowHeight)) * 100;
    
    // Update any progress bars
    document.querySelectorAll('.progress-bar').forEach(bar => {
      bar.style.width = `${Math.min(progress, 100)}%`;
    });
  }

  triggerAnimation(element, ratio) {
    if (element.classList.contains('animated')) return;
    
    const animationType = element.dataset.aos || 'fadeInUp';
    const delay = parseInt(element.dataset.aosDelay) || 0;
    
    setTimeout(() => {
      element.classList.add('animated');
      this.playAnimation(element, animationType);
    }, delay);
  }

  playAnimation(element, type) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  }

  preloadAnimations() {
    // Preload critical animations
    const criticalElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-actions');
    criticalElements.forEach(el => {
      el.style.willChange = 'transform, opacity';
    });
  }
}

// ========================================================================
// ADVANCED UI CONTROLLER
// ========================================================================

class UIController {
  constructor() {
    this.state = {
      mobileMenuOpen: false,
      quickActionsOpen: false,
      currentSection: 'home',
      scrollPosition: 0,
      isScrolling: false,
      userPreferences: this.loadUserPreferences()
    };
    
    this.elements = {};
    this.boundMethods = {};
    
    this.init();
  }

  init() {
    this.cacheElements();
    this.bindEvents();
    this.setupKeyboardNavigation();
    this.setupAccessibility();
    this.initializeComponents();
    this.loadUserPreferences();
  }

  cacheElements() {
    this.elements = {
      header: document.getElementById('header'),
      mobileMenuToggle: document.getElementById('mobileMenuToggle'),
      mobileNav: document.getElementById('mobileNav'),
      backToTop: document.getElementById('backToTop'),
      quickActions: document.getElementById('quickActions'),
      quickActionToggle: document.getElementById('quickActionToggle'),
      loadingScreen: document.getElementById('loadingScreen'),
      heroParticles: document.getElementById('heroParticles'),
      modelsGrid: document.getElementById('modelsGrid')
    };
  }

  bindEvents() {
    // Bind methods to maintain context
    this.boundMethods = {
      handleMobileMenuToggle: this.handleMobileMenuToggle.bind(this),
      handleNavClick: this.handleNavClick.bind(this),
      handleQuickActionToggle: this.handleQuickActionToggle.bind(this),
      handleBackToTop: this.handleBackToTop.bind(this),
      handleScroll: this.throttle(this.handleScroll.bind(this), 16),
      handleResize: this.debounce(this.handleResize.bind(this), 250),
      handleKeyboard: this.handleKeyboard.bind(this),
      handleFilterClick: this.handleFilterClick.bind(this)
    };

    // Event listeners
    if (this.elements.mobileMenuToggle) {
      this.elements.mobileMenuToggle.addEventListener('click', this.boundMethods.handleMobileMenuToggle);
    }

    if (this.elements.quickActionToggle) {
      this.elements.quickActionToggle.addEventListener('click', this.boundMethods.handleQuickActionToggle);
    }

    if (this.elements.backToTop) {
      this.elements.backToTop.addEventListener('click', this.boundMethods.handleBackToTop);
    }

    // Navigation links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      link.addEventListener('click', this.boundMethods.handleNavClick);
    });

    // Model filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', this.boundMethods.handleFilterClick);
    });

    // Global events
    window.addEventListener('scroll', this.boundMethods.handleScroll, { passive: true });
    window.addEventListener('resize', this.boundMethods.handleResize);
    document.addEventListener('keydown', this.boundMethods.handleKeyboard);
    
    // Touch events for mobile
    this.setupTouchEvents();
  }

  setupTouchEvents() {
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      
      // Swipe gestures
      if (Math.abs(deltaX) > 100 && Math.abs(deltaY) < 50) {
        if (deltaX > 0) {
          this.handleSwipeRight();
        } else {
          this.handleSwipeLeft();
        }
      }
    }, { passive: true });
  }

  handleSwipeRight() {
    if (this.state.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  handleSwipeLeft() {
    if (!this.state.mobileMenuOpen && window.innerWidth <= 768) {
      this.openMobileMenu();
    }
  }

  handleMobileMenuToggle() {
    this.state.mobileMenuOpen ? this.closeMobileMenu() : this.openMobileMenu();
  }

  openMobileMenu() {
    this.state.mobileMenuOpen = true;
    this.elements.mobileMenuToggle.classList.add('active');
    this.elements.mobileMenuToggle.setAttribute('aria-expanded', 'true');
    this.elements.mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    this.elements.mobileNav.querySelector('a').focus();
  }

  closeMobileMenu() {
    this.state.mobileMenuOpen = false;
    this.elements.mobileMenuToggle.classList.remove('active');
    this.elements.mobileMenuToggle.setAttribute('aria-expanded', 'false');
    this.elements.mobileNav.classList.remove('active');
    document.body.style.overflow = '';
  }

  handleNavClick(e) {
    e.preventDefault();
    const target = e.target.getAttribute('href');
    const section = target.substring(1);
    
    this.scrollToSection(section);
    this.updateActiveNavigation(section);
    this.closeMobileMenu();
    
    // Update state
    this.state.currentSection = section;
  }

  handleQuickActionToggle() {
    this.state.quickActionsOpen = !this.state.quickActionsOpen;
    this.elements.quickActions.classList.toggle('active', this.state.quickActionsOpen);
  }

  handleBackToTop() {
    this.smoothScrollTo(0, 1000);
  }

  handleScroll() {
    const scrollY = window.pageYOffset;
    this.state.scrollPosition = scrollY;
    
    // Show/hide back to top button
    if (this.elements.backToTop) {
      this.elements.backToTop.classList.toggle('visible', scrollY > 500);
    }
    
    // Update active section
    this.updateActiveSectionOnScroll();
    
    // Reading progress (if implemented)
    this.updateReadingProgress();
  }

  handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 1024 && this.state.mobileMenuOpen) {
      this.closeMobileMenu();
    }
    
    // Recalculate particles
    this.updateParticles();
  }

  handleKeyboard(e) {
    // Escape key closes modals
    if (e.key === 'Escape') {
      if (this.state.mobileMenuOpen) {
        this.closeMobileMenu();
      }
      if (this.state.quickActionsOpen) {
        this.handleQuickActionToggle();
      }
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
    }
  }

  handleFilterClick(e) {
    const filter = e.target.dataset.filter;
    
    // Update active filter
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Filter models
    this.filterModels(filter);
  }

  filterModels(filter) {
    const cards = document.querySelectorAll('.model-card');
    
    cards.forEach(card => {
      const category = card.dataset.category;
      const shouldShow = filter === 'all' || category === filter;
      
      if (shouldShow) {
        card.style.display = 'block';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        // Animate in
        requestAnimationFrame(() => {
          card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      } else {
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '0';
        card.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  }

  setupKeyboardNavigation() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--color-primary);
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 1000;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  setupAccessibility() {
    // Add ARIA labels where needed
    this.elements.mobileMenuToggle?.setAttribute('aria-label', 'Toggle mobile menu');
    this.elements.backToTop?.setAttribute('aria-label', 'Back to top');
    
    // Add role attributes
    document.querySelector('.models-grid')?.setAttribute('role', 'list');
    document.querySelectorAll('.model-card').forEach(card => {
      card.setAttribute('role', 'listitem');
    });
    
    // Ensure focus indicators
    const style = document.createElement('style');
    style.textContent = `
      .user-is-tabbing *:focus {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(style);
  }

  initializeComponents() {
    this.initializeCounters();
    this.initializeParticles();
    this.initializeTypewriter();
    this.initializeLazyLoading();
  }

  initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
      const target = parseInt(counter.dataset.target);
      const suffix = counter.dataset.suffix || '';
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
        current += step;
        if (current >= target) {
          counter.textContent = target + suffix;
          return;
        }
        counter.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(updateCounter);
      };
      
      updateCounter();
    };

    // Observe counters for intersection
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          animateCounter(entry.target);
        }
      });
    });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  initializeParticles() {
    if (!this.elements.heroParticles) return;
    
    const particleCount = Math.min(30, Math.floor(window.innerWidth / 50));
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 4 + 2;
      const left = Math.random() * 100;
      const animationDelay = Math.random() * 6;
      const animationDuration = Math.random() * 3 + 3;
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(0, 122, 255, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        left: ${left}%;
        top: ${Math.random() * 100}%;
        animation: particleFloat ${animationDuration}s ease-in-out ${animationDelay}s infinite alternate;
        pointer-events: none;
      `;
      
      this.elements.heroParticles.appendChild(particle);
    }
  }

  initializeTypewriter() {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach(element => {
      const text = element.textContent;
      const speed = parseInt(element.dataset.typewriterSpeed) || 100;
      
      element.textContent = '';
      element.style.borderRight = '2px solid var(--color-primary)';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, speed);
        } else {
          // Remove cursor after typing
          setTimeout(() => {
            element.style.borderRight = 'none';
          }, 1000);
        }
      };
      
      // Start typing when element comes into view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(typeWriter, 500);
            observer.unobserve(entry.target);
          }
        });
      });
      
      observer.observe(element);
    });
  }

  initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[loading="lazy"], img.lazy').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  updateParticles() {
    // Adjust particle count based on screen size
    if (this.elements.heroParticles && window.innerWidth !== this.lastWindowWidth) {
      this.elements.heroParticles.innerHTML = '';
      this.initializeParticles();
      this.lastWindowWidth = window.innerWidth;
    }
  }

  updateActiveSectionOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 100;
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        if (this.state.currentSection !== id) {
          this.state.currentSection = id;
          this.updateActiveNavigation(id);
        }
      }
    });
  }

  updateActiveNavigation(activeSection) {
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${activeSection}`) {
        link.classList.add('active');
      }
    });
  }

  updateReadingProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Update progress bar if exists
    const progressBar = document.querySelector('.reading-progress');
    if (progressBar) {
      progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    }
  }

  scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (!element) return;
    
    const headerHeight = this.elements.header?.offsetHeight || 80;
    const targetPosition = element.offsetTop - headerHeight;
    
    this.smoothScrollTo(targetPosition, 1000);
  }

  smoothScrollTo(targetPosition, duration = 1000) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };
    
    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      
      window.scrollTo(0, startPosition + distance * ease);
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  }

  loadUserPreferences() {
    try {
      const saved = localStorage.getItem('meisterco-preferences');
      if (saved) {
        this.state.userPreferences = { ...this.state.userPreferences, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Could not load user preferences:', e);
    }
  }

  saveUserPreferences() {
    try {
      localStorage.setItem('meisterco-preferences', JSON.stringify(this.state.userPreferences));
    } catch (e) {
      console.warn('Could not save user preferences:', e);
    }
  }

  // Utility functions
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  debounce(func, wait, immediate) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}

// ========================================================================
// ADVANCED LOADING SYSTEM
// ========================================================================

class LoadingManager {
  constructor() {
    this.loadingScreen = document.getElementById('loadingScreen');
    this.progressBar = document.querySelector('.loading-progress');
    this.loadingText = document.querySelector('.loading-text');
    
    this.resources = [];
    this.loadedCount = 0;
    this.totalCount = 0;
    
    this.init();
  }

  init() {
    this.collectResources();
    this.startLoading();
  }

  collectResources() {
    // Collect images
    const images = Array.from(document.querySelectorAll('img[src]'));
    images.forEach(img => {
      this.resources.push({
        type: 'image',
        url: img.src,
        element: img
      });
    });

    // Collect CSS files
    const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    stylesheets.forEach(link => {
      this.resources.push({
        type: 'stylesheet',
        url: link.href,
        element: link
      });
    });

    // Collect fonts (if using web fonts)
    if (document.fonts) {
      document.fonts.ready.then(() => {
        this.onResourceLoaded();
      });
      this.resources.push({ type: 'fonts' });
    }

    this.totalCount = this.resources.length;
  }

  startLoading() {
    if (this.totalCount === 0) {
      this.completeLoading();
      return;
    }

    this.resources.forEach(resource => {
      this.loadResource(resource);
    });

    // Fallback timeout
    setTimeout(() => {
      if (!this.isComplete) {
        this.completeLoading();
      }
    }, 5000);
  }

  loadResource(resource) {
    switch (resource.type) {
      case 'image':
        this.loadImage(resource);
        break;
      case 'stylesheet':
        this.loadStylesheet(resource);
        break;
      case 'fonts':
        // Already handled in collectResources
        break;
    }
  }

  loadImage(resource) {
    const img = new Image();
    img.onload = () => this.onResourceLoaded();
    img.onerror = () => this.onResourceLoaded();
    img.src = resource.url;
  }

  loadStylesheet(resource) {
    const link = resource.element;
    if (link.sheet) {
      this.onResourceLoaded();
    } else {
      link.onload = () => this.onResourceLoaded();
      link.onerror = () => this.onResourceLoaded();
    }
  }

  onResourceLoaded() {
    this.loadedCount++;
    const progress = (this.loadedCount / this.totalCount) * 100;
    
    this.updateProgress(progress);
    
    if (this.loadedCount >= this.totalCount) {
      setTimeout(() => this.completeLoading(), 500);
    }
  }

  updateProgress(progress) {
    if (this.progressBar) {
      this.progressBar.style.width = `${progress}%`;
    }
    
    if (this.loadingText) {
      const messages = [
        'Loading experience...',
        'Preparing models...',
        'Initializing systems...',
        'Almost ready...'
      ];
      const messageIndex = Math.floor((progress / 100) * (messages.length - 1));
      this.loadingText.textContent = messages[messageIndex] || 'Loading...';
    }
  }

  completeLoading() {
    if (this.isComplete) return;
    this.isComplete = true;
    
    if (this.loadingScreen) {
      this.loadingScreen.style.opacity = '0';
      setTimeout(() => {
        this.loadingScreen.style.display = 'none';
        this.onLoadingComplete();
      }, 500);
    } else {
      this.onLoadingComplete();
    }
  }

  onLoadingComplete() {
    // Trigger page loaded event
    document.body.classList.add('loaded');
    
    // Start entrance animations
    this.triggerEntranceAnimations();
    
    // Initialize other systems
    window.dispatchEvent(new CustomEvent('pageLoaded'));
  }

  triggerEntranceAnimations() {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-actions');
    
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }
}

// ========================================================================
// BUSINESS LOGIC FUNCTIONS
// ========================================================================

// Global functions for business logic
window.scrollToSection = function(sectionId) {
  if (window.uiController) {
    window.uiController.scrollToSection(sectionId);
  }
};

window.openModelDetail = function(modelId) {
  console.log(`Opening details for ${modelId}`);
  // Implementation for model detail modal/page
  
  // Track analytics
  if (window.gtag) {
    gtag('event', 'model_detail_view', {
      'model_name': modelId,
      'event_category': 'engagement'
    });
  }
};

window.bookTestDrive = function(modelId = '') {
  console.log(`Booking test drive for ${modelId || 'general'}`);
  
  // Create and show booking modal
  const modal = createBookingModal(modelId);
  document.body.appendChild(modal);
  
  // Track analytics
  if (window.gtag) {
    gtag('event', 'test_drive_booking_start', {
      'model_name': modelId || 'unknown',
      'event_category': 'conversion'
    });
  }
};

window.openChat = function() {
  console.log('Opening AI chat assistant');
  
  // Implementation for chat widget
  if (window.Intercom) {
    Intercom('show');
  } else {
    // Fallback chat implementation
    showChatFallback();
  }
};

window.callShowroom = function() {
  const phoneNumber = '+60380001234';
  window.open(`tel:${phoneNumber}`, '_self');
  
  // Track analytics
  if (window.gtag) {
    gtag('event', 'phone_call', {
      'event_category': 'contact'
    });
  }
};

window.getDirections = function() {
  const address = encodeURIComponent('123 Jalan Automotive, Taman Industri Perdana, 47100 Puchong, Selangor');
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
  window.open(mapsUrl, '_blank');
  
  // Track analytics
  if (window.gtag) {
    gtag('event', 'directions_clicked', {
      'event_category': 'location'
    });
  }
};

// Helper functions
function createBookingModal(modelId) {
  const modal = document.createElement('div');
  modal.className = 'booking-modal';
  modal.innerHTML = `
    <div class="modal-overlay" onclick="closeBookingModal()"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h3>Book Your Test Drive</h3>
        <button class="modal-close" onclick="closeBookingModal()" aria-label="Close modal">×</button>
      </div>
      <div class="modal-body">
        <form class="booking-form">
          <div class="form-group">
            <label for="model-select">Select Model</label>
            <select id="model-select" name="model" required>
              <option value="${modelId}" selected>${modelId ? modelId.toUpperCase() : 'Select a model'}</option>
              <option value="alza">Perodua Alza</option>
              <option value="ativa">Perodua Ativa</option>
              <option value="myvi">Perodua Myvi</option>
              <option value="axia">Perodua Axia</option>
              <option value="bezza">Perodua Bezza</option>
              <option value="aruz">Perodua Aruz</option>
            </select>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="first-name">First Name</label>
              <input type="text" id="first-name" name="firstName" required>
            </div>
            <div class="form-group">
              <label for="last-name">Last Name</label>
              <input type="text" id="last-name" name="lastName" required>
            </div>
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>
          
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" required>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="preferred-date">Preferred Date</label>
              <input type="date" id="preferred-date" name="preferredDate" required>
            </div>
            <div class="form-group">
              <label for="preferred-time">Preferred Time</label>
              <select id="preferred-time" name="preferredTime" required>
                <option value="">Select time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label for="message">Additional Message (Optional)</label>
            <textarea id="message" name="message" rows="3"></textarea>
          </div>
          
          <div class="form-group">
            <div class="consent-checkbox">
              <input type="checkbox" id="pdpa-consent" name="pdpaConsent" required>
              <label for="pdpa-consent" class="consent-label">
                I hereby acknowledge and confirm my consent for the processing of my personal data in accordance with the 
                <a href="#" class="pdpa-link" target="_blank">Personal Data Protection Act (PDPA) Notice</a>. 
                I understand that my personal information will be used solely for the purpose of arranging and conducting 
                the test drive appointment and related automotive services. <span class="required-asterisk">*</span>
              </label>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn-secondary" onclick="closeBookingModal()">Cancel</button>
            <button type="submit" class="btn-primary" id="submit-booking" disabled>Book Test Drive</button>
          </div>
        </form>
      </div>
    </div>
  `;
  
  // Style the modal
  const style = document.createElement('style');
  style.textContent = `
    .booking-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
    
    .modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(10px);
    }
    
    .modal-content {
      background: var(--glass-bg);
      backdrop-filter: var(--backdrop-blur);
      border: 1px solid var(--glass-border);
      border-radius: 24px;
      max-width: 600px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      z-index: 1;
    }
    
    .modal-header {
      padding: 2rem 2rem 1rem;
      border-bottom: 1px solid var(--glass-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .modal-header h3 {
      color: var(--color-primary);
      font-size: 1.5rem;
      font-weight: 700;
    }
    
    .modal-close {
      background: none;
      border: none;
      font-size: 2rem;
      color: var(--color-light);
      cursor: pointer;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.3s ease;
    }
    
    .modal-close:hover {
      background: var(--glass-hover);
    }
    
    .modal-body {
      padding: 2rem;
    }
    
    .booking-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .form-group label {
      font-weight: 600;
      color: var(--color-light);
      font-size: 0.95rem;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: 0.75rem 1rem;
      border: 1px solid var(--glass-border);
      border-radius: 12px;
      background: var(--glass-bg);
      color: var(--color-light);
      font-size: 1rem;
      transition: all 0.3s ease;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--color-primary);
      background: var(--glass-hover);
    }
    
    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 1rem;
    }
    
    .consent-checkbox {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      margin-top: 0.5rem;
    }
    
    .consent-checkbox input[type="checkbox"] {
      width: 18px;
      height: 18px;
      margin: 0;
      accent-color: var(--color-primary);
      cursor: pointer;
      flex-shrink: 0;
      margin-top: 0.2rem;
    }
    
    .consent-label {
      font-size: 0.9rem;
      line-height: 1.5;
      color: rgba(255, 255, 255, 0.9);
      cursor: pointer;
      margin: 0;
    }
    
    .pdpa-link {
      color: var(--color-primary);
      text-decoration: underline;
      transition: color 0.3s ease;
    }
    
    .pdpa-link:hover {
      color: var(--color-secondary);
    }
    
    .required-asterisk {
      color: var(--color-accent);
      font-weight: bold;
    }
    
    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: rgba(0, 122, 255, 0.3);
    }
    
    .btn-primary:disabled:hover {
      transform: none;
      box-shadow: none;
    }
    
    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .form-actions {
        flex-direction: column;
      }
      
      .modal-content {
        margin: 1rem;
        max-height: calc(100vh - 2rem);
      }
    }
  `;
  
  modal.appendChild(style);
  
  // Handle form submission
  const form = modal.querySelector('.booking-form');
  form.addEventListener('submit', handleBookingSubmission);
  
  // Handle consent checkbox validation
  const consentCheckbox = modal.querySelector('#pdpa-consent');
  const submitButton = modal.querySelector('#submit-booking');
  
  const validateForm = () => {
    const isFormValid = form.checkValidity() && consentCheckbox.checked;
    submitButton.disabled = !isFormValid;
  };
  
  // Validate on checkbox change
  consentCheckbox.addEventListener('change', validateForm);
  
  // Validate on input changes
  form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', validateForm);
    input.addEventListener('change', validateForm);
  });
  
  // Initial validation
  setTimeout(validateForm, 100);
  
  return modal;
}

window.closeBookingModal = function() {
  const modal = document.querySelector('.booking-modal');
  if (modal) {
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.9)';
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
};

function handleBookingSubmission(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  
  console.log('Booking submission:', data);
  
  // Show success message
  showSuccessMessage('Your test drive has been booked! We\'ll contact you shortly to confirm the details.');
  
  // Close modal
  closeBookingModal();
  
  // Track analytics
  if (window.gtag) {
    gtag('event', 'test_drive_booking_complete', {
      'model_name': data.model,
      'event_category': 'conversion'
    });
  }
}

function showChatFallback() {
  alert('Chat feature coming soon! Please call us at +60 3-8000 1234 for immediate assistance.');
}

function showSuccessMessage(message) {
  const notification = document.createElement('div');
  notification.className = 'success-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">✓</div>
      <div class="notification-message">${message}</div>
    </div>
  `;
  
  // Style the notification
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 2rem;
    background: var(--color-success);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    z-index: 10001;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: var(--shadow-lg);
    transform: translateX(400px);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  requestAnimationFrame(() => {
    notification.style.transform = 'translateX(0)';
  });
  
  // Auto remove
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// ========================================================================
// INITIALIZATION
// ========================================================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 MeisterCo Systems Initializing...');
  
  // Initialize core systems
  window.performanceMonitor = new PerformanceMonitor();
  window.animationEngine = new AnimationEngine();
  window.uiController = new UIController();
  window.loadingManager = new LoadingManager();
  
  console.log('✅ All systems operational - Ready to drive the future!');
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    // Pause expensive operations when tab is hidden
    console.log('Page hidden - optimizing performance');
  } else {
    // Resume operations when tab is visible
    console.log('Page visible - resuming full operations');
  }
});

// Error handling
window.addEventListener('error', function(e) {
  console.error('Global error caught:', e);
  
  // Track errors in analytics if available
  if (window.gtag) {
    gtag('event', 'exception', {
      'description': e.message,
      'fatal': false
    });
  }
});

// Performance monitoring
window.addEventListener('load', function() {
  setTimeout(() => {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Performance metrics:', {
      DOMContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
      Load: perfData.loadEventEnd - perfData.loadEventStart,
      Total: perfData.loadEventEnd - perfData.fetchStart
    });
  }, 0);
});