const topButton = document.querySelector('.returnToTop');

window.addEventListener('scroll', () => {
  const scrollAmount = window.scrollY;
  const pageHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  const threshold = 2200; // 3スクロール分の目安（スマホ基準）

  // ページが十分長ければ、スクロール量に応じてボタン表示
  if (pageHeight > windowHeight * 1.5) {
    topButton.classList.toggle('show', scrollAmount > threshold);
  } else {
    topButton.classList.remove('show'); // ページ短いなら非表示
  }
});
