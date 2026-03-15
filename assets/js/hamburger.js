function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const navBox = document.querySelector('.nav_box');
  if (!hamburger || !navBox) return;

  // 既存のイベントリセット（cloneNode）
  hamburger.replaceWith(hamburger.cloneNode(true));
  navBox.replaceWith(navBox.cloneNode(true));

  const newHamburger = document.querySelector('.hamburger');
  const newNavBox = document.querySelector('.nav_box');

  // ハンバーガー開閉
  newHamburger.addEventListener('click', () => {
    newNavBox.classList.toggle('active');
  });

  // ナビリンククリック
  document.querySelectorAll('.nav_box a').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      const isPageAnchor = href.startsWith('#'); // ページ内リンクか判定
      const targetId = isPageAnchor ? href.slice(1) : null;
      const target = targetId ? document.getElementById(targetId) : null;

      // ハンバーガーはクリックしたら必ず閉じる
      newNavBox.classList.remove('active');

      if (isPageAnchor && target) {
        // ページ内リンクの場合はスムーズスクロール
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // 外部ページリンクの場合は e.preventDefault しないので通常遷移
    });
  });
}

// fetch 後に呼ぶ
fetch('header.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('header').innerHTML = html;
    initHamburger(); // DOM 挿入後に初期化
  });
