(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var burger = document.querySelector('.burger');
  var mobileNav = document.querySelector('.nav-mobile');

  var menuOpen = false;

  function setMenuOpen(open) {
    menuOpen = open;
    mobileNav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    updateHeaderState();
  }

  function updateHeaderState() {
    var scrolled = window.scrollY > 24;
    header.classList.toggle('is-scrolled', scrolled || menuOpen);
  }

  if (burger && mobileNav && header) {
    burger.addEventListener('click', function () {
      setMenuOpen(!menuOpen);
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuOpen(false);
      });
    });

    window.addEventListener('scroll', updateHeaderState, { passive: true });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 940 && menuOpen) {
        setMenuOpen(false);
      }
    });

    updateHeaderState();
  }

  // Scroll reveal: elements start visible; if IntersectionObserver is
  // available they are hidden and faded in as they enter the viewport.
  var revealNodes = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));

  if (revealNodes.length && 'IntersectionObserver' in window) {
    revealNodes.forEach(function (node, i) {
      node.classList.add('is-hidden');
      node.style.transitionDelay = (i % 4) * 70 + 'ms';
    });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.remove('is-hidden');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    revealNodes.forEach(function (node) {
      io.observe(node);
    });

    setTimeout(function () {
      revealNodes.forEach(function (node) {
        node.classList.remove('is-hidden');
      });
    }, 2500);
  }
})();
