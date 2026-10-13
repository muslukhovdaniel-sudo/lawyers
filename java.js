document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeToggleBtn = document.getElementById('theme-toggle');

  // Функция обновления иконки/текста кнопки темы
  const updateButtonText = (isWhite) => {
    if (themeToggleBtn) {
      themeToggleBtn.textContent = isWhite ? '☀️' : '🌙';
    }
  };

  // 1. Проверяем сохраненную тему при загрузке любой страницы
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'white') {
    body.classList.add('white-theme');
    updateButtonText(true);
  } else {
    body.classList.remove('white-theme');
    updateButtonText(false);
  }

  // 2. Слушатель клика для кнопки темы
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      body.classList.toggle('white-theme');
      const isWhite = body.classList.contains('white-theme');
      
      localStorage.setItem('theme', isWhite ? 'white' : 'dark');
      updateButtonText(isWhite);
    });
  }

  // ==========================================
  // 3. УМНЫЙ СЛАЙДЕР С ОТМЕНОЙ АВТОПРОКРУТКИ ПРИ КЛИКЕ
  // ==========================================
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator-item');

  if (slider && slides.length > 0) {
    let slideIndex = 0;

    // Главная функция обновления слайдера и точек
    function updateSlider() {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[slideIndex].classList.add('active');

      indicators.forEach(ind => ind.classList.remove('active'));
      if (indicators[slideIndex]) {
        indicators[slideIndex].classList.add('active');
      }
    }

    // Запускаем автопрокрутку и сохраняем её ID в переменную autoPlay
    let autoPlay = setInterval(() => {
      slideIndex = (slideIndex + 1) % slides.length;
      updateSlider();
    }, 5000);

    // Функция полной и окончательной остановки автопрокрутки
    function stopAutoPlay() {
      if (autoPlay) {
        clearInterval(autoPlay); // Очищаем таймер setInterval
        autoPlay = null;        // Обнуляем переменную, чтобы функция больше не срабатывала
      }
    }

    // Обработчик кнопки «Назад»
    const prevButton = document.querySelector('.perv-btn');
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        stopAutoPlay(); // Нажали на стрелку — навсегда выключаем автопрокрутку!
        if (slideIndex > 0) {
          slideIndex--;
        } else {
          slideIndex = slides.length - 1;
        }
        updateSlider();
      });
    }

    // Обработчик кнопки «Вперед»
    const nextButton = document.querySelector('.next-btn');
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        stopAutoPlay(); // Нажали на стрелку — навсегда выключаем автопрокрутку!
        if (slideIndex < slides.length - 1) {
          slideIndex++;
        } else {
          slideIndex = 0;
        }
        updateSlider();
      });
    }

    // Клик по точкам-индикаторам внизу
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        stopAutoPlay(); // Кликнули на точку — тоже навсегда выключаем автопрокрутку!
        slideIndex = index;
        updateSlider();
      });
    });
  }
});