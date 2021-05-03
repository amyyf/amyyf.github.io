// Uses ES5 so polyfills aren't necessary.

function showElement(el) {
  el.style.opacity = '100%';
  el.querySelector('.intro__text').style.zIndex = '1';
}

function hideElement(el) {
  el.style.opacity = '0';
  el.querySelector('.intro__text').style.zIndex = '0';
}

function handleIntersect(entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      showElement(entry.target);
    } else {
      hideElement(entry.target);
    }
  });
}

function createObserver(el) {
  var observer;

  var options = {
    rootMargin: '0px',
    threshold: 0.65
  };

  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(el);
}

window.addEventListener(
  'load',
  function (event) {
    // Attach intersection observer to all intro text content.
    const ids = ['#intro-one', '#intro-two', '#intro-three', '#intro-four', '#intro-five', '#intro-six', '#intro-seven', '#intro-eight', '#intro-nine'];
    ids.forEach(function (id) {
      var el = document.querySelector(id);
      hideElement(el);
      createObserver(el);
    });

    // Show the scroll element.
    window.setTimeout(
      function() {
        var scrollEl = document.querySelector('.scroll-wrapper');
        showElement(scrollEl);
      },
      1000
    );

    // TODO: hide scroll element when we are at the bottom of the page
    // TODO: enable clicking to scroll snap on scroll element
  },
  false
);
