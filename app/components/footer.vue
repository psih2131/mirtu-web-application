<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="container footer__container">
        <div class="footer__grid">
          <div class="footer__col">
            <h3 class="footer__heading">О магазине</h3>
            <ul class="footer__list">
              <li><a href="#" class="footer__link">О нас</a></li>
              <li><a href="#" class="footer__link">Контакты</a></li>
              <li><a href="#" class="footer__link">Обратная связь</a></li>
              <li><a href="#" class="footer__link">Оферта</a></li>
              <li><a href="#" class="footer__link">Политика конфиденциальности</a></li>
              <li><a href="#" class="footer__link">Блог</a></li>
            </ul>
          </div>
          <div class="footer__col">
            <h3 class="footer__heading">Помощь</h3>
            <ul class="footer__list">
              <li><a href="#" class="footer__link">FAQ</a></li>
              <li><a href="#" class="footer__link">Где мой заказ?</a></li>
              <li><a href="#" class="footer__link">Доставка и оплата</a></li>
              <li><a href="#" class="footer__link">Обмен и возврат</a></li>
              <li><a href="#" class="footer__link">Программа привилегий</a></li>
              <li><a href="#" class="footer__link">Оригинальность товара</a></li>
              <li><a href="#" class="footer__link">Подобрать размер</a></li>
              <li><a href="#" class="footer__link">Уход за обувью</a></li>
            </ul>
          </div>
          <div class="footer__col">
            <h3 class="footer__heading">Бренды</h3>
            <ul class="footer__list">
              <li><a href="#" class="footer__link">New Balance</a></li>
              <li><a href="#" class="footer__link">Nike</a></li>
              <li><a href="#" class="footer__link">Vans</a></li>
              <li><a href="#" class="footer__link">Puma</a></li>
              <li><a href="#" class="footer__link">Salomon</a></li>
              <li><a href="#" class="footer__link">The North Face</a></li>
              <li><a href="#" class="footer__link">adidas</a></li>
              <li><a href="#" class="footer__link">HUGO</a></li>
              <li><a href="#" class="footer__link">Eastpak</a></li>
              <li><a href="#" class="footer__link">Все бренды</a></li>
            </ul>
          </div>
          <div class="footer__col">
            <h3 class="footer__heading">Магазин</h3>
            <ul class="footer__list">
              <li><a href="#" class="footer__link">Новая коллекция</a></li>
              <li><a href="#" class="footer__link">Детская обувь</a></li>
              <li><a href="#" class="footer__link">Hiker</a></li>
              <li><a href="#" class="footer__link">Кроссовки</a></li>
              <li><a href="#" class="footer__link">Кеды</a></li>
            </ul>
          </div>
          <div class="footer__col footer__col--contacts">
            <div class="footer__phones">
              <a href="tel:+77770733070" class="footer__phone">+7 (777) 073-30-70</a>
              <a href="tel:+77770733077" class="footer__phone">+7 (777) 073-30-77</a>
            </div>
            <p class="footer__hours">Ежедневно с 10:00 до 20:00</p>
            <div class="footer__emails">
              <a href="mailto:info@mirtu.kz" class="footer__email">info@mirtu.kz</a>
              <span class="footer__email-label">Почта для предложений</span>
              <a href="mailto:hello@mirtu.kz" class="footer__email">hello@mirtu.kz</a>
              <span class="footer__email-label">Поддержка покупателей</span>
            </div>
          </div>
          <div class="footer__col footer__col--newsletter">
            <p class="footer__newsletter-title">
              Узнавайте первыми о новинках и акциях — подпишитесь на нашу рассылку
            </p>
            <form class="footer__form" @submit.prevent="">
              <input
                type="email"
                class="footer__input"
                placeholder="Ваш e-mail"
                aria-label="E-mail для рассылки"
              >
              <button type="submit" class="footer__submit">
                Подписаться
              </button>
            </form>
            <label class="footer__consent">
              <input type="checkbox" class="footer__checkbox" required>
              <span class="footer__consent-text">
                Я даю согласие на обработку моих персональных данных в соответствии с условиями
                <a href="#" class="footer__consent-link">политики конфиденциальности</a>
                и
                <a href="#" class="footer__consent-link">оферты</a>.
              </span>
            </label>
            <div class="footer__payments">
              <img :src="visaImg" alt="Visa" class="footer__payment-img" width="48" height="32">
              <img :src="mastercardImg" alt="Mastercard" class="footer__payment-img" width="48" height="32">
              <img :src="mirImg" alt="Мир" class="footer__payment-img" width="48" height="32">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="container footer__container">
        <div class="footer__bottom-inner">

            <p class="footer__copyright">© mirtu.kz — официальный интернет-сайт</p>
            <p class="footer__credits">Разработка и дизайн: Roman Kuzmych</p>

        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import visaImg from '~/assets/images/payment/visa.png'
import mastercardImg from '~/assets/images/payment/mastercard.png'
import mirImg from '~/assets/images/payment/mir.png'
</script>
