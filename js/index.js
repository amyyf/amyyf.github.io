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

// Handle scroll to next element on click.
function handleScrollClick(e) {
  const ids = ['intro-one', 'intro-two', 'intro-three', 'intro-four', 'intro-five', 'intro-six', 'intro-seven', 'intro-eight', 'intro-nine'];
  // Create a new array of the intro elements.
  const introElements = new Array(ids.length).fill(null).map(function(el, i) {
    return document.getElementById(ids[i]);
  })
  const eventY = e.pageY;
  let nextEl;

  // First, check if an element is currently visible.
  introElements.forEach(function(el, i) {
    if ('1' === el.style.opacity) {
      nextEl = introElements[i + 1]; // grab next el by current index + 1
    }
  });

  // If we didn't have a visible element, find the next element that should become visible.
  if (!nextEl) {
    let foundNext = false;
    introElements.forEach(function(el, i) {
      const elOffsetY = el.offsetTop;
      if (!foundNext && elOffsetY > eventY) { // the first offset greater than the event click Y will be next el + 1
        foundNext = true;
        nextEl = introElements[i - 1]; // the next el will be on the page but hidden, so don't skip it
      }
    })
  }

  // Finally, scroll to the next element!
  nextEl.scrollIntoView();
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
    const ids = ['#intro-one', '#intro-two', '#intro-three', '#intro-four', '#intro-five', '#intro-six', '#intro-seven', '#intro-eight', '#intro-nine'];
    ids.forEach(function (id) {
      var el = document.querySelector(id);
      hideElement(el);
      createObserver(el, handleIntroIntersect);
    });

    // Attach intersection observer to scroll element.
    const pixelEl = document.querySelector('#bottom-of-page');
    createObserver(pixelEl, handleBottomIntersect);
  },
  false
);
