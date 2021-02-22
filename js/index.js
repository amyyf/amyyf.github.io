// Uses ES5 so polyfills aren't necessary

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
  let observer;

  let options = {
    rootMargin: '0px',
    threshold: 0.75
  };

  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(el);
}

window.addEventListener(
  'load',
  function (event) {
    const ids = ['#intro-one', '#intro-two', '#intro-three', '#intro-four', '#intro-five', '#intro-six', '#intro-seven', '#intro-eight'];
    const els = [];
    ids.forEach(function (id) {
      els.push(document.querySelector(id));
    });

    els.forEach(function (el) {
      hideElement(el);
      createObserver(el);
    });
    window.setTimeout(function () {
      document.querySelector('.intro').classList.add('js');
    }, 1000);
  },
  false
);
