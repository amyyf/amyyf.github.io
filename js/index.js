// Uses ES5 so polyfills aren't necessary.

// Visually shows the element.
// Intro text elements need the inner element's z-index to change.
// TODO: maybe use toggling and split up opacity and z-index to target separate elements.
function showElement(el, innerEl, zIndex = '1') {
  el.style.opacity = '100%';
  if (innerEl) {
    innerEl.style.zIndex = zIndex;
  } else {
    el.style.zIndex = zIndex;
  }
}

// Visually hides the element.
function hideElement(el, innerEl) {
  el.style.opacity = '0';
  if (innerEl) {
    innerEl.style.zIndex = '0';
  } else {
    el.style.zIndex = '0';
  }
}

// Handles showing/hiding of intro text elements when they scroll into view.
function handleIntroIntersect(entries) {
  entries.forEach(function (entry) {
    const innerEl = entry.target.querySelector('.intro__text')
    if (entry.isIntersecting) {
      showElement(entry.target, innerEl);
    } else {
      hideElement(entry.target, innerEl);
    }
  });
}

// Handle scroll on click.
function handleScrollClick(e) {
  const ids = ['intro-one', 'intro-two', 'intro-three', 'intro-four', 'intro-five', 'intro-six', 'intro-seven', 'intro-eight'];
  ids.forEach(function(id) {
    const el = document.getElementById(id);
    // If an element is currently visible
    if ('1' === el.style.opacity) {
      const index = ids.indexOf(el.id); // current element index
      const nextEl = document.getElementById(ids[index + 1]); // grab next el by current index + 1
      nextEl.scrollIntoView();
    }
  });
}

// Handles showing/hiding of scroll element,
// including initial display and hiding when at bottom of page.
function handleBottomIntersect(entries) {
  const scrollEl = document.querySelector('.scroll-wrapper');
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      hideElement(scrollEl);
      scrollEl.removeEventListener('click', handleScrollClick);
    } else {
      // Using a timeout for a slightly delayed load compared to intro text.
      window.setTimeout(
        function () {
          showElement(scrollEl, null, '2');
          scrollEl.addEventListener('click', handleScrollClick);
        },
        1000
      );
    }
  });
}

// Handles intersection observer creation.
function createObserver(el, callback) {
  var observer;

  var options = {
    rootMargin: '0px',
    threshold: 0.65
  };

  observer = new IntersectionObserver(callback, options);
  observer.observe(el);
}

// Handle all functionality after the window has loaded.
window.addEventListener(
  'load',
  function (event) {
    // Attach intersection observer to all intro text content.
    const ids = ['#intro-one', '#intro-two', '#intro-three', '#intro-four', '#intro-five', '#intro-six', '#intro-seven', '#intro-eight'];
    ids.forEach(function (id) {
      var el = document.querySelector(id);
      hideElement(el);
      createObserver(el, handleIntroIntersect);
    });

    // Attach intersection observer to scroll element.
    const pixelEl = document.querySelector('#bottom-of-page');
    createObserver(pixelEl, handleBottomIntersect);

    // TODO: enable clicking to scroll snap on scroll element
  },
  false
);
