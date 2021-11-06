let satate = {
    cards: [],
    slider: [],
  };
  
  $(document).ready(() => {
    $.get("https://picsum.photos/v2/list?page=1&limit=9", function (data) {
      satate = { ...satate, cards: [...data] };
      renderPhotos(satate.cards);
    });
  
    $.get("https://picsum.photos/v2/list?page=2&limit=5", function (data) {
      satate = { ...satate, slider: [...data] };
      renderSlider(satate.slider);
    });
  });
  
  const renderPhotos = (photos) => {
    const imgRow = $(".image-set");
    imgRow.empty();
    for (let image of photos) {
      const store = Store.get();
      let card = $("<div></div>").addClass("card col-4 p-1 position-relative");
      let img = $("<img/>").attr("src", image.download_url).css({ width: "100%" });
      let a = $("<a></a>").attr("href", image.download_url).attr("data-lightbox", img);
      renderBadge(store?.length);
  
      //creating favorities button
      let favBtn = $("<button></button>")
        .addClass("fav-btn")
        .click(() => {
          Store.set(image.id);
          renderPhotos(photos);
        });
  
      let icon = $("<i></i>").addClass("far fa-heart");
  
      if (store?.filter((e) => e === image.id)[0]) {
        icon.addClass("fas");
      }
      favBtn.append(icon);
      card.append(favBtn);
  
      a.append(img);
      card.append(a);
      imgRow.append(card);
    }
  };
  
  const renderBadge = (num) => {
    $(".badge").text(num);
  };
  
  const renderSlider = (photos) => {
    const slider = $(".variable");
    for (let img of photos) {
      let div = $("<div></div>");
  
      //creating image
      let image = $("<img/>").attr("src", img.download_url);
  
      //append elements
      div.append(image);
      slider.append(div);
    }
  
    $(".variable").slick({
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
    });
  };
  
  class Store {
    static get = () => {
      const str = localStorage.getItem("cards");
      return str ? JSON.parse(str) : [];
    };
  
    static set = (id) => {
      if (this.get()?.filter((e) => e === id)[0]) {
        localStorage.setItem("cards", JSON.stringify([...this.get()?.filter((e) => e !== id)]));
      } else {
        localStorage.setItem("cards", JSON.stringify([...this.get(), id]));
      }
    };
  }