/* ТСЖ «Адмирала Ушакова, 65» — поведение страницы */
(function () {
  'use strict';

  var nav = document.getElementById('mainNav');
  var toTop = document.querySelector('.to-top');
  var menu = document.getElementById('navMenu');

  // Тень у меню и кнопка «наверх» после прокрутки
  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 10);
    toTop.classList.toggle('is-visible', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // На телефоне закрываем меню после выбора пункта
  menu.addEventListener('click', function (e) {
    if (e.target.closest('.nav-link') && menu.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });

  // Плавное появление блоков при прокрутке
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { observer.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Текущий год в подвале
  document.getElementById('year').textContent = new Date().getFullYear();

  // Новости из MAX: импорт будет добавлен позднее.
  // Точки подключения: #news-list (data-source), #news-card-template, #news-empty.
})();
