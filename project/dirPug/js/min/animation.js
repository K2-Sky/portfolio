//表示領域に入ったら背景に円を追加

const pfTarget = document.querySelector('.portfolio-title--circle');
let hasFired = false;

window.addEventListener('scroll', () => {
  if (hasFired) return;

  const rect = pfTarget.getBoundingClientRect();
  const triggerPoint = 100; // 表示領域に入ってから100px

  if (rect.top < window.innerHeight - triggerPoint) {
    pfTarget.dataset.bg = 'expanded';
    hasFired = true; // 一度だけ発火
  }
});




// 画面をスクロールしたら動かしたい場合

// JavaScript
// const targets = document.querySelectorAll('.scrollAnime-inOut .contents-block');

// const observer = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     if (entry.intersectionRatio > 0.9) {
//       entry.target.classList.add('visible'); // ある程度入ってきたら表示
//     } else if (entry.intersectionRatio < 0.4) {
//       entry.target.classList.remove('visible'); // ほとんど見えなくなったら非表示
//     }
//   });
// }, {
//   threshold: [0, 0.4, 0.9, 1], // 段階的に検知
// });

// targets.forEach(target => observer.observe(target));



// ---------------------------------
// 汎用 スクロールでactiveオンオフ


function observeAnimations(entries, observer) {
  entries.forEach(entry => {
    const el = entry.target;
    const once = el.dataset.once === "true";

    if (entry.isIntersecting) {
      el.classList.add("active");

      if (once) {
        observer.unobserve(el);
      }
    } else {
      if (!once) {
        el.classList.remove("active");
      }
    }
  });
}

const observer = new IntersectionObserver(observeAnimations, {
  root: null,
  rootMargin: "0px 0px -10% 0px",
  threshold: 0
});

document.querySelectorAll(".animItem").forEach(el => {
  observer.observe(el);
});

