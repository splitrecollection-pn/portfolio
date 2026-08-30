document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("work-modal");
  const closeButton = document.querySelector(".work-modal__close");
  const overlay = document.querySelector(".work-modal__overlay");

  const title = document.getElementById("modal-title");
  const url = document.getElementById("modal-url");
  const category = document.getElementById("modal-category");
  const image = document.getElementById("modal-image");
  const overview = document.getElementById("modal-overview");
  const period = document.getElementById("modal-period");
  const purpose = document.getElementById("modal-purpose");
  const scope = document.getElementById("modal-scope");
  const tools = document.getElementById("modal-tools");
  const detailImage = document.getElementById("modal-detail-image");


  // JSONを読み込む
  fetch("works.json")
    .then(response => response.json())
    .then(works => {

      const triggers = document.querySelectorAll(".work-modal-trigger");

      triggers.forEach(trigger => {

        trigger.addEventListener("click", () => {

          const workId = trigger.dataset.workId;

          const work = works.find(item => item.id === workId);

          if (!work) return;


          // データをモーダルに入れる
          title.textContent = work.title;

          url.href = work.url;
          url.textContent = work.url;

          category.textContent = work.category;

          image.src = work.image;
          image.alt = work.title;

          overview.textContent = work.overview;
          period.textContent = work.period;
          purpose.textContent = work.purpose;
          scope.textContent = work.scope;
          tools.textContent = work.tools;
          
          if (work.detailImage) {
            detailImage.src = work.detailImage;
            detailImage.alt = work.title;
            detailImage.style.display = "block";
        } else {
            detailImage.style.display = "none";
        }


          // モーダルを表示
          modal.classList.add("is-open");
          modal.setAttribute("aria-hidden", "false");

          document.body.classList.add("modal-open");

        });

      });

    })
    .catch(error => {
      console.error("作品データの読み込みに失敗しました:", error);
    });


  // 閉じる
  function closeModal() {

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

  }


  closeButton.addEventListener("click", closeModal);

  overlay.addEventListener("click", closeModal);


  // ESCキーでも閉じる
  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closeModal();
    }

  });

});