export const slider = () => {

  const swiper = new Swiper('.swiper', {
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    }
  });

}