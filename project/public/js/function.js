"use strict";

//表示領域に入ったら背景に円を追加

var pfTarget = document.querySelector('.portfolio-title--circle');
var hasFired = false;
window.addEventListener('scroll', function () {
  if (hasFired) return;
  var rect = pfTarget.getBoundingClientRect();
  var triggerPoint = 100; // 表示領域に入ってから100px

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
  entries.forEach(function (entry) {
    var el = entry.target;
    var once = el.dataset.once === "true";
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
var observer = new IntersectionObserver(observeAnimations, {
  root: null,
  rootMargin: "0px 0px -10% 0px",
  threshold: 0
});
document.querySelectorAll(".animItem").forEach(function (el) {
  observer.observe(el);
});
"use strict";

var topButton = document.querySelector('.returnToTop');
window.addEventListener('scroll', function () {
  var scrollAmount = window.scrollY;
  var pageHeight = document.body.scrollHeight;
  var windowHeight = window.innerHeight;
  var threshold = 2200; // 3スクロール分の目安（スマホ基準）

  // ページが十分長ければ、スクロール量に応じてボタン表示
  if (pageHeight > windowHeight * 1.5) {
    topButton.classList.toggle('show', scrollAmount > threshold);
  } else {
    topButton.classList.remove('show'); // ページ短いなら非表示
  }
});
"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var menuBtn = document.getElementById('sideMenu-btn');
  var bgOverlay = document.getElementById('bgOverlay');
  var navCircle = document.querySelector('.navCircle');
  var gNav = document.querySelector('.gNav');
  var menuItems = document.querySelectorAll('.menu-item');
  var menuLinks = document.querySelectorAll('.menu-item a[href^="#"]');

  // 閉じる処理を関数化
  function closeMenu(callback) {
    menuItems.forEach(function (item) {
      return item.classList.remove('animate');
    });
    gNav.classList.add('hide');
    setTimeout(function () {
      navCircle.classList.remove('active');
    }, 400);
    setTimeout(function () {
      bgOverlay.classList.remove('active');
      menuBtn.classList.remove('active');
      gNav.classList.remove('hide');
      gNav.classList.remove('open');
      if (typeof callback === 'function') callback(); // ← スクロール処理などを後で呼べる
    }, 600);
  }

  // メニューボタンの開閉
  menuBtn.addEventListener('click', function () {
    var isOpen = gNav.classList.contains('open');
    if (!isOpen) {
      menuBtn.classList.add('active');
      gNav.classList.add('open');
      gNav.classList.remove('hide');
      bgOverlay.classList.add('active');
      navCircle.classList.add('active');
      menuItems.forEach(function (item, i) {
        setTimeout(function () {
          return item.classList.add('animate');
        }, 300 + i * 100);
      });
    } else {
      closeMenu();
    }
  });

  // ページ内リンククリック時の処理
  menuLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = link.getAttribute('href').slice(1);
      var targetElement = document.getElementById(targetId);
      closeMenu(function () {
        targetElement === null || targetElement === void 0 || targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
  });
});
"use strict";

// document.addEventListener('DOMContentLoaded', () => { const textElement = document.querySelector('.text'); textElement.addEventListener('animationend', (event) => { if (event.animationName === 'zoomInBounce') { textElement.style.animation = 'bounce 0.5s ease-out'; } }); });

document.addEventListener('DOMContentLoaded', function () {
  var textElement = document.querySelector('.text');
  textElement.addEventListener('animationend', function (event) {
    if (event.animationName === 'zoomIn') {
      vibrateEffect(textElement, 5, 10);
    }
  });
});
function vibrateEffect(element, times, distance) {
  if (times <= 0) return;
  element.animate([{
    transform: "translateY(0)"
  }, {
    transform: "translateY(".concat(distance, "px)")
  }, {
    transform: "translateY(0)"
  }, {
    transform: "translateY(-".concat(distance, "px)")
  }, {
    transform: "translateY(0)"
  }], {
    duration: 100,
    easing: 'ease-in-out',
    iterations: 1,
    fill: 'forwards'
  }).onfinish = function () {
    vibrateEffect(element, times - 1, distance / 2);
  };
}
"use strict";

document.addEventListener('DOMContentLoaded', function () {
  new VenoBox({
    selector: '.venobox',
    // 対象となるセレクタを指定
    //autoplay: false,         // 動画の自動再生
    // bgcolor:'#FFF',         // アイテムの背景色（境界線がある場合は境界線の色にも影響します）
    // border:'0px',           // モーダルウィンドウの境界線の太さ
    // customClass:false,      // オーバーレイ部分に追加CSSを適用する時は'.hoge'を設定
    //-fitView: true,          // 画像拡大時にブラウザより大きくしたい時はfalse
    //focusItem: false,        // ポップアップを閉じた後に現在の項目にフォーカスを当てる
    infinigall: true,
    // ギャラリーの無限ループ
    //maxWidth: '100%',        // 最大幅を指定したい時に使用
    //navigation: true,        // ナビゲーション矢印を表示
    //navKeyboard: true,       // キーボードのキーによるナビゲーションを有効にする
    //navTouch: true,          // スワイプタッチ/ドラッグを有効にする
    //navSpeed: 300,           // ギャラリー遷移速度(ms)
    numeration: true // 現在のギャラリーのナビゲーション番号と合計アイテム数を表示
    //overlayClose: true,       // false→[×]の閉じるボタンのみを有効に
    //overlayColor: 'rgba(255,255,255,0.85)'   //オーバーレイの背景色
    //popup: false,            // リロード時のpopup（要設定）
    //ratio: '16x9',           //iframe とビデオに適用されるアスペクト比(後述)
    //share: false,            // 画像や動画の共有ボタン
    //shareStyle: 'bar',        // 共有ボタンのスタイル（後述）
    //spinColor: '#d2d2d2',       // プリローダーの色
    //spinner: 'bounce',           // 利用可能なプリローダータイプ(後述)
    //titleattr: 'title',        // titleと分けたい時は'data-title'等に変える（後述）
    //titlePosition: 'top',      // タイトルの位置. 'top' or 'bottom'
    //titleStyle: 'bar',        // タイトルのスタイル（後述）
    //toolsBackground: '#1C1C1C',  // UI の背景色 (タイトルと共有ボタン)
    //toolsColor: '#d2d2d2',       // UI の色 (タイトル、共有ボタン、ギャラリー ナビゲーション)
    //initialScale: 0.9,       // ブラウザに対する比率。画像が大きすぎる時は0.5等に変更
    //transitionSpeed:200       // ライトボックスの開閉速度（ms）
  });
});

/* =============================================

// リロード時のpopupとして使う場合は下記のように設定すること

■ html
<a href="images/sample.jpg" class="venobox" id="my-link" style="display:none;">ポップアップを表示</a>

■ Javascript
$(document).ready(function() {
  $('.venobox').venobox();

  // ページロード時に指定されたリンクをトリガー
  $('#my-link').venobox().trigger('click');
});

============================================= */
/*

//iframe とビデオに適用されるアスペクト比
利用可能: '1x1'| '4x3'| '16x9'| '21x9'|'full'

============================================= */
/*
共有ボタン、タイトルのスタイル
Available: 'block' | 'pill' | 'transparent' | 'bar'

============================================= */
/*

// 利用可能なプリローダータイプ
Available: 'plane' | 'chase' | 'bounce' | 'wave' | 'pulse' | 'flow' | 'swing' | 'circle' | 'circle-fade' | 'grid' | 'fold | 'wander'

============================================= */
/*
titleattr:'data-title' とした時の使い方

■ HTML
<a href="images/sample.jpg" class="venobox" title="SEO用のタイトル" data-mytitle="ポップアップ用のタイトル">リンク1</a>

■ Javascript
$(document).ready(function() {
  $('.venobox').venobox({
    titleattr: 'data-mytitle' // VenoBoxはこの属性からタイトルを取得
  });
});
============================================= */