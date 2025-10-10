document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('sideMenu-btn');
  const bgOverlay = document.getElementById('bgOverlay');
  const navCircle = document.querySelector('.navCircle');
  const gNav = document.querySelector('.gNav');
  const menuItems = document.querySelectorAll('.menu-item');
  const menuLinks = document.querySelectorAll('.menu-item a[href^="#"]');

  // 閉じる処理を関数化
  function closeMenu(callback) {
    menuItems.forEach(item => item.classList.remove('animate'));
    gNav.classList.add('hide');

    setTimeout(() => {
      navCircle.classList.remove('active');
    }, 400);

    setTimeout(() => {
      bgOverlay.classList.remove('active');
      menuBtn.classList.remove('active');
      gNav.classList.remove('hide');
      gNav.classList.remove('open');

      if (typeof callback === 'function') callback(); // ← スクロール処理などを後で呼べる
    }, 600);
  }

  // メニューボタンの開閉
  menuBtn.addEventListener('click', () => {
    const isOpen = gNav.classList.contains('open');

    if (!isOpen) {
      menuBtn.classList.add('active');
      gNav.classList.add('open');
      gNav.classList.remove('hide');

      bgOverlay.classList.add('active');
      navCircle.classList.add('active');

      menuItems.forEach((item, i) => {
        setTimeout(() => item.classList.add('animate'), 300 + i * 100);
      });
    } else {
      closeMenu();
    }
  });

  // ページ内リンククリック時の処理
  menuLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const targetId = link.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);

      closeMenu(() => {
        targetElement?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
  });
});