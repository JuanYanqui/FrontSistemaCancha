var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    
    centerSlide: 'true',
    fade: 'true',
   
    pagination: {
      el: ".swiper-pagination",
      
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints:{
        0: {
            slidesPerView: 1,
        },
       0: {
            slidesPerView: 2,
        },
       0: {
            slidesPerView: 3,
        },
    },
  });