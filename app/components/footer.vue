<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="container footer__container">
        <div class="footer__grid">
          <div class="footer__col">
            <h3 class="footer__heading">О магазине</h3>
            <ul class="footer__list">
              <li><NuxtLink to="/about" class="footer__link">О нас</NuxtLink></li>
              <li><NuxtLink to="/contacts" class="footer__link">Контакты</NuxtLink></li>
              <li><NuxtLink to="/feedback" class="footer__link">Обратная связь</NuxtLink></li>
              <li><NuxtLink to="/offer" class="footer__link">Оферта</NuxtLink></li>
              <li><NuxtLink to="/privacy" class="footer__link">Политика конфиденциальности</NuxtLink></li>
              <li><NuxtLink to="/blog" class="footer__link">Блог</NuxtLink></li>
            </ul>
          </div>
          <div class="footer__col">
            <h3 class="footer__heading">Помощь</h3>
            <ul class="footer__list">
              <li><NuxtLink to="/faq" class="footer__link">FAQ</NuxtLink></li>
              <li><NuxtLink to="/order-status" class="footer__link">Где мой заказ?</NuxtLink></li>
              <li><NuxtLink to="/delivery" class="footer__link">Доставка и оплата</NuxtLink></li>
              <li><NuxtLink to="/returns" class="footer__link">Обмен и возврат</NuxtLink></li>
              <li><NuxtLink to="/loyalty" class="footer__link">Программа привилегий</NuxtLink></li>
              <li><NuxtLink to="/authenticity" class="footer__link">Оригинальность товара</NuxtLink></li>
              <li><NuxtLink to="/size-guide" class="footer__link">Подобрать размер</NuxtLink></li>
              <li><NuxtLink to="/care" class="footer__link">Уход за обувью</NuxtLink></li>
            </ul>
          </div>
          <div class="footer__col">
            <h3 class="footer__heading">Бренды</h3>
            <ul class="footer__list">
              <li><NuxtLink to="/brands/new-balance" class="footer__link">New Balance</NuxtLink></li>
              <li><NuxtLink to="/brands/nike" class="footer__link">Nike</NuxtLink></li>
              <li><NuxtLink to="/brands/vans" class="footer__link">Vans</NuxtLink></li>
              <li><NuxtLink to="/brands/puma" class="footer__link">Puma</NuxtLink></li>
              <li><NuxtLink to="/brands/salomon" class="footer__link">Salomon</NuxtLink></li>
              <li><NuxtLink to="/brands/the-north-face" class="footer__link">The North Face</NuxtLink></li>
              <li><NuxtLink to="/brands/adidas" class="footer__link">adidas</NuxtLink></li>
              <li><NuxtLink to="/brands/hugo" class="footer__link">HUGO</NuxtLink></li>
              <li><NuxtLink to="/brands/eastpak" class="footer__link">Eastpak</NuxtLink></li>
              <li><NuxtLink to="/brands" class="footer__link">Все бренды</NuxtLink></li>
            </ul>
          </div>
          <div class="footer__col">
            <h3 class="footer__heading">Магазин</h3>
            <ul class="footer__list">
              <li><NuxtLink to="/catalog/new" class="footer__link">Новая коллекция</NuxtLink></li>
              <li><NuxtLink to="/catalog/kids" class="footer__link">Детская обувь</NuxtLink></li>
              <li><NuxtLink to="/catalog/hiker" class="footer__link">Hiker</NuxtLink></li>
              <li><NuxtLink to="/catalog/sneakers" class="footer__link">Кроссовки</NuxtLink></li>
              <li><NuxtLink to="/catalog/shoes" class="footer__link">Кеды</NuxtLink></li>
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
                <NuxtLink to="/privacy" class="footer__consent-link">политики конфиденциальности</NuxtLink>
                и
                <NuxtLink to="/offer" class="footer__consent-link">оферты</NuxtLink>.
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
