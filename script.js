/* ============================================
   NAVBAR - Scroll Effect
   ============================================ */
(function () {
  var navbar = document.getElementById('navbar');
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');
  var backToTop = document.getElementById('backToTop');

  // Navbar scroll
  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top visibility
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  /* ============================================
     MOBILE MENU TOGGLE
     ============================================ */
  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu on link click
  var menuLinks = navMenu.querySelectorAll('a');
  for (var i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', function () {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  /* ============================================
     BACK TO TOP
     ============================================ */
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ============================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================ */
  var anchors = document.querySelectorAll('a[href^="#"]');
  for (var j = 0; j < anchors.length; j++) {
    anchors[j].addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = navbar.offsetHeight + 16;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  }

  /* ============================================
     ACTIVE NAV LINK ON SCROLL
     ============================================ */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  function updateActiveLink() {
    var scrollPos = window.scrollY + navbar.offsetHeight + 100;

    for (var k = 0; k < sections.length; k++) {
      var section = sections[k];
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        for (var l = 0; l < navLinks.length; l++) {
          navLinks[l].classList.remove('active-link');
          if (navLinks[l].getAttribute('href') === '#' + sectionId) {
            navLinks[l].classList.add('active-link');
          }
        }
      }
    }
  }

  window.addEventListener('scroll', updateActiveLink);

  /* ============================================
     FADE-IN ON SCROLL (Intersection Observer)
     ============================================ */
  var fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      for (var m = 0; m < entries.length; m++) {
        if (entries[m].isIntersecting) {
          entries[m].target.classList.add('visible');
          observer.unobserve(entries[m].target);
        }
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    for (var n = 0; n < fadeElements.length; n++) {
      observer.observe(fadeElements[n]);
    }
  } else {
    // Fallback for older browsers
    for (var o = 0; o < fadeElements.length; o++) {
      fadeElements[o].classList.add('visible');
    }
  }

  /* ============================================
     STAGGER ANIMATION FOR GRID ITEMS
     ============================================ */
  var grids = document.querySelectorAll('.cards-grid, .diferenciais-grid, .portfolio-grid');

  if ('IntersectionObserver' in window) {
    var gridObserver = new IntersectionObserver(function (entries) {
      for (var p = 0; p < entries.length; p++) {
        if (entries[p].isIntersecting) {
          var children = entries[p].target.querySelectorAll('.fade-in');
          for (var q = 0; q < children.length; q++) {
            (function (child, delay) {
              setTimeout(function () {
                child.classList.add('visible');
              }, delay);
            })(children[q], q * 100);
          }
          gridObserver.unobserve(entries[p].target);
        }
      }
    }, {
      threshold: 0.1
    });

    for (var r = 0; r < grids.length; r++) {
      gridObserver.observe(grids[r]);
    }
  }

  /* ============================================
     TYPING EFFECT FOR CODE WINDOW
     ============================================ */
  var codeLines = document.querySelectorAll('.code-line');
  if (codeLines.length > 0) {
    var codeObserver = new IntersectionObserver(function (entries) {
      for (var s = 0; s < entries.length; s++) {
        if (entries[s].isIntersecting) {
          var lines = entries[s].target.querySelectorAll('.code-line');
          for (var t = 0; t < lines.length; t++) {
            (function (line, delay) {
              line.style.opacity = '0';
              line.style.transform = 'translateX(-10px)';
              line.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              setTimeout(function () {
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
              }, delay);
            })(lines[t], t * 150 + 300);
          }
          codeObserver.unobserve(entries[s].target);
        }
      }
    }, { threshold: 0.3 });

    var codeBody = document.querySelector('.code-body');
    if (codeBody) {
      codeObserver.observe(codeBody);
    }
  }

  /* ============================================
     COUNTER ANIMATION FOR STATS
     ============================================ */
  function animateValue(el, start, end, duration, suffix) {
    var startTime = null;
    suffix = suffix || '';

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = Math.floor(eased * (end - start) + start) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  /* ============================================
     PREVENT FLASH ON LOAD
     ============================================ */
  window.addEventListener('load', function () {
    document.body.style.opacity = '1';
  });

})();
