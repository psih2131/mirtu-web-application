<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="container footer__container">
        <div class="footer__grid">

          <div class="footer__nav-row">

          

          <!-- <div class="footer__col">
            <h3 class="footer__heading">О магазине</h3>
            <ul class="footer__list">
              <li><a href="#" class="footer__link">О нас</a></li>
              <li><a href="#" class="footer__link">Контакты</a></li>
              <li><a href="#" class="footer__link">Обратная связь</a></li>
              <li><a href="#" class="footer__link">Оферта</a></li>
              <li><NuxtLink to="/supports/private-policy" class="footer__link">Политика конфиденциальности</NuxtLink></li>
              <li><a href="#" class="footer__link">Блог</a></li>
            </ul>
          </div> -->

          <div class="footer__col">
            <h3 class="footer__heading">Помощь</h3>
            <ul class="footer__list">
              <li><NuxtLink to="/supports/return-order" class="footer__link">Обмен и возврат</NuxtLink></li>
              <li><NuxtLink to="/supports/private-policy" class="footer__link">Политика конфиденциальности</NuxtLink></li>
            </ul>
          </div>

          <div class="footer__col">
            <h3 class="footer__heading">Категории</h3>
            <ul class="footer__list">
              <li v-for="cat in allAvaliableCategories" :key="cat.id">
                <NuxtLink :to="`/products/categories/${cat.id}`" class="footer__link">{{ cat.name_ru }}</NuxtLink>
              </li>
            </ul>
          </div>

          <!-- <div class="footer__col">
            <h3 class="footer__heading">Магазин</h3>
            <ul class="footer__list">
              <li><a href="#" class="footer__link">Новая коллекция</a></li>
              <li><a href="#" class="footer__link">Детская обувь</a></li>
              <li><a href="#" class="footer__link">Hiker</a></li>
              <li><a href="#" class="footer__link">Кроссовки</a></li>
              <li><a href="#" class="footer__link">Кеды</a></li>
            </ul>
          </div> -->
        </div>

        <div class="footer__row-contacts">


          <div class="footer__col footer__col--contacts">
            <div class="footer__phones">
              <a v-if="dataContacts?.phone_contact" :href="`tel:${dataContacts.phone_contact}`" class="footer__phone" v-html="dataContacts.phone_contact.replace(/\s/g, '')"></a>
            </div>
            <p class="footer__hours">Ежедневно с 10:00 до 20:00</p>

            <div class="footer__emails" v-if="dataContacts?.email_contact">
              <a :href="`mailto:${dataContacts.email_contact}`" class="footer__email" v-html="dataContacts.email_contact.replace(/\s/g, '')"></a>
              <span class="footer__email-label">Почта для предложений</span>
              
            </div>

            <div class="footer__socials">
              <a 
              v-if="infoStore?.telegramLinkFooter"
               :href="infoStore.telegramLinkFooter" class="footer__social-link">
                <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1836_3508)">
                <path d="M12 0C18.6274 0 24 5.14873 24 11.5C24 17.8513 18.6274 23 12 23C5.37258 23 0 17.8513 0 11.5C0 5.14873 5.37258 0 12 0ZM16.9062 6.92285C16.4549 6.93051 15.7619 7.16199 12.4297 8.49023C11.2624 8.95554 8.92943 9.91848 5.43164 11.3789C4.86399 11.5953 4.56632 11.8067 4.53906 12.0137C4.48705 12.4113 5.08444 12.5354 5.83594 12.7695C6.44858 12.9604 7.27269 13.1835 7.70117 13.1924C8.08983 13.2004 8.52402 13.0466 9.00293 12.7314C12.2712 10.6172 13.9585 9.54843 14.0645 9.52539C14.1392 9.50915 14.2424 9.48916 14.3125 9.54883C14.3827 9.60859 14.3756 9.72159 14.3682 9.75195C14.3079 9.99527 11.2431 12.6674 11.0625 12.8467C10.3873 13.5188 9.61894 13.9305 10.8037 14.6787C11.8287 15.3261 12.4254 15.739 13.4814 16.4023C14.1564 16.8263 14.6859 17.329 15.3828 17.2676C15.7034 17.2392 16.035 16.9504 16.2031 16.0889C16.6006 14.0523 17.3818 9.63994 17.5625 7.82129C17.5783 7.66197 17.558 7.45767 17.542 7.36816C17.526 7.27866 17.4925 7.15104 17.3711 7.05664C17.2273 6.94498 17.0055 6.92118 16.9062 6.92285Z" fill="#1DA0FE"/>
                </g>
                <defs>
                <clipPath id="clip0_1836_3508">
                <rect width="24" height="23" fill="white"/>
                </clipPath>
                </defs>
                </svg>

              </a>
              <a 
              v-if="infoStore?.whatsappLinkFooter"
              :href="infoStore.whatsappLinkFooter" class="footer__social-link">
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.1257 3.2655C17.1082 1.248 14.3212 0 11.2425 0C5.08575 0 0.09375 4.99125 0.09375 11.1487C0.09375 13.1977 0.6465 15.117 1.61025 16.767L1.58175 16.7145L0 22.491L5.90925 20.9407C7.4475 21.795 9.28275 22.2975 11.2357 22.2975H11.2402C17.397 22.2952 22.3867 17.3033 22.3867 11.1465C22.3867 8.06925 21.1402 5.28375 19.125 3.26625L19.1257 3.2655ZM11.2402 20.4142H11.2365C9.49725 20.4142 7.869 19.9342 6.47925 19.0995L6.52125 19.1227L6.183 18.9225L2.67675 19.8427L3.612 16.4235L3.3915 16.0732C2.50275 14.6767 1.97475 12.975 1.97475 11.1495C1.97475 6.033 6.123 1.88475 11.2395 1.88475C16.356 1.88475 20.5042 6.033 20.5042 11.1495C20.5042 16.266 16.3575 20.4142 11.2402 20.4142ZM16.3222 13.476C16.044 13.3365 14.6745 12.6637 14.4195 12.57C14.1637 12.477 13.9777 12.4312 13.7917 12.7102C13.6072 12.9885 13.0732 13.6155 12.9105 13.8015C12.7485 13.9882 12.585 14.0107 12.3067 13.872C11.4442 13.5225 10.7032 13.0567 10.059 12.483L10.0665 12.4897C9.46725 11.9347 8.9535 11.2995 8.53875 10.599L8.51775 10.56C8.35575 10.2817 8.5005 10.131 8.63925 9.99225C8.7645 9.86775 8.91825 9.66675 9.057 9.50475C9.1665 9.3705 9.26025 9.21675 9.3315 9.05175L9.336 9.039C9.36825 8.97375 9.387 8.898 9.387 8.817C9.387 8.71875 9.35925 8.62725 9.31125 8.54925L9.31275 8.5515C9.24225 8.412 8.68575 7.041 8.454 6.483C8.2275 5.94 7.99725 6.01425 7.827 6.00525C7.665 5.99775 7.479 5.99625 7.293 5.99625C6.99675 6.00375 6.7335 6.13725 6.552 6.3435L6.55125 6.345C5.94975 6.91575 5.57625 7.7205 5.57625 8.61225C5.57625 8.63175 5.57625 8.652 5.577 8.6715V8.6685C5.67525 9.76875 6.08775 10.7565 6.72225 11.5612L6.71325 11.55C7.91625 13.3343 9.51975 14.7615 11.4015 15.723L11.472 15.7552C11.883 15.9412 12.4095 16.14 12.948 16.3102L13.0597 16.341C13.3912 16.446 13.773 16.5067 14.169 16.5067C14.3962 16.5067 14.6197 16.4865 14.8357 16.4482L14.8125 16.4512C15.6142 16.284 16.2795 15.8002 16.6852 15.1395L16.692 15.1267C16.8157 14.8522 16.8877 14.532 16.8877 14.1953C16.8877 14.0565 16.8757 13.9207 16.8525 13.7887L16.8547 13.803C16.7857 13.6867 16.5997 13.6177 16.3207 13.4775L16.3222 13.476Z" fill="#7CE27C"/>
                </svg>

              </a>
            </div>

          </div>
          <div class="footer__col footer__col--newsletter">
            <!-- <p class="footer__newsletter-title">
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
            </label> -->
            <div class="footer__payments">
              <img :src="visaImg" alt="Visa" class="footer__payment-img" width="48" height="32">
              <img :src="mastercardImg" alt="Mastercard" class="footer__payment-img" width="48" height="32">
              <!-- <img :src="mirImg" alt="Мир" class="footer__payment-img" width="48" height="32"> -->
            </div>
          </div>

          </div>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="container footer__container">
        <div class="footer__bottom-inner">

            <p
             v-if="infoStore?.footerCopyright"
             class="footer__copyright" v-html="infoStore?.footerCopyright"></p>
            <p class="footer__credits">Разработка и дизайн: <a class="footer__credits-link" href="https://t.me/roman_dev_space" target="_blank">Roman Kuzmych</a></p>

        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import visaImg from '~/assets/images/payment/visa.png'
import mastercardImg from '~/assets/images/payment/mastercard.png'
// import mirImg from '~/assets/images/payment/mir.png'
import { ref } from 'vue'
import useAllFiltrsData from '@/composables/allFiltrsData'
import { useInfoStore } from '@/stores/info'

const infoStore = useInfoStore()

const props = defineProps({
  dataContacts: {
    type: Object,
    required: true,
  },
})

const allAvaliableCategories = ref([])
const { allFiltrsData } = await useAllFiltrsData()
allAvaliableCategories.value = allFiltrsData.value?.filters?.categories ?? []
</script>
