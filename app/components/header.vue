<template>
  <header class="header">
    <div class="container">
      <div class="header__top">
        <NuxtLink @click="mobMenyOpen = false" to="/" class="header__logo">
          <img
            src="@/assets/images/img/header-logo.png"
            alt=""
            class="header__logo-img"
          />

          <img
            src="@/assets/images/img/logo-mob.png"
            alt=""
            class="header__logo-img-mob"
          />
        </NuxtLink>

        <headerSearch />

        <div class="header__phone" v-if="dataContacts?.phone_contact">
          <a
            :href="`tel:${dataContacts.phone_contact}`"
            class="header__phone-value"
            v-html="dataContacts.phone_contact.replace(/\s/g, '')"
          ></a>
          <p class="header__phone-hour-work">Ежедневно с 10:00 до 21:00</p>
        </div>

        <div class="header__store-controls-row">
          <div
            class="header__store-control-element header-store-control header-store-control--cart header-store-control--cart-wrap"
            role="button"
            aria-label="Открыть корзину"
            tabindex="0"
            @click="openCart"
            @keydown.enter="openCart"
          >
            <span
              v-if="store.cartItemsCount > 0"
              class="header__cart-badge"
              aria-hidden="true"
              >{{
                store.cartItemsCount > 99 ? "99+" : store.cartItemsCount
              }}</span
            >
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_18_239)">
                <path
                  d="M7.875 19.25C8.35825 19.25 8.75 18.8582 8.75 18.375C8.75 17.8918 8.35825 17.5 7.875 17.5C7.39175 17.5 7 17.8918 7 18.375C7 18.8582 7.39175 19.25 7.875 19.25Z"
                  stroke="#2E3A59"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.5 19.25C17.9832 19.25 18.375 18.8582 18.375 18.375C18.375 17.8918 17.9832 17.5 17.5 17.5C17.0168 17.5 16.625 17.8918 16.625 18.375C16.625 18.8582 17.0168 19.25 17.5 19.25Z"
                  stroke="#2E3A59"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M0.875 0.875H4.375L6.72 12.5913C6.80001 12.9941 7.01917 13.356 7.3391 13.6135C7.65904 13.8711 8.05936 14.0079 8.47 14H16.975C17.3856 14.0079 17.786 13.8711 18.1059 13.6135C18.4258 13.356 18.645 12.9941 18.725 12.5913L20.125 5.25H5.25"
                  stroke="#2E3A59"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_18_239">
                  <rect width="21" height="21" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <HeaderFavoritesButton @click="mobMenyOpen = false" />

          <div class="header-user-auth" v-if="authStatus === true">
            <NuxtLink to="/user" class="header-user-auth__link" @click="mobMenyOpen = false">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"
                  fill="#2E3A59"
                />
                <path
                  d="M6.34315 16.3431C4.84285 17.8434 4 19.8783 4 22H6C6 20.4087 6.63214 18.8826 7.75736 17.7574C8.88258 16.6321 10.4087 16 12 16C13.5913 16 15.1174 16.6321 16.2426 17.7574C17.3679 18.8826 18 20.4087 18 22H20C20 19.8783 19.1571 17.8434 17.6569 16.3431C16.1566 14.8429 14.1217 14 12 14C9.87827 14 7.84344 14.8429 6.34315 16.3431Z"
                  fill="#2E3A59"
                />
              </svg>
              <span class="header-user-auth__name" v-if="userName">{{
                userName
              }}</span>
            </NuxtLink>
          </div>

          <div
            v-else
            class="header__store-control-element header-store-control"
            role="button"
            aria-label="Войти"
            tabindex="0"
            @click="openAuthModal"
            @keydown.enter="openAuthModal"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"
                fill="#2E3A59"
              />
              <path
                d="M6.34315 16.3431C4.84285 17.8434 4 19.8783 4 22H6C6 20.4087 6.63214 18.8826 7.75736 17.7574C8.88258 16.6321 10.4087 16 12 16C13.5913 16 15.1174 16.6321 16.2426 17.7574C17.3679 18.8826 18 20.4087 18 22H20C20 19.8783 19.1571 17.8434 17.6569 16.3431C16.1566 14.8429 14.1217 14 12 14C9.87827 14 7.84344 14.8429 6.34315 16.3431Z"
                fill="#2E3A59"
              />
            </svg>
          </div>

          <div class="header__menu burger-menu" 
          @click="mobMenyOpen = !mobMenyOpen"
          :class="{ 'burger-menu--active': mobMenyOpen }">
            <span class="burger-menu__line"></span>
            <span class="burger-menu__line"></span>
          </div>
        </div>
      </div>
      <div class="header__down">
        <NuxtLink class="header__all-cat" 
        @click="mobMenyOpen = false">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.4 4H5.46C4.65366 4 4 4.65366 4 5.46V9.4C4 10.2063 4.65366 10.86 5.46 10.86H9.4C10.2063 10.86 10.86 10.2063 10.86 9.4V5.46C10.86 4.65366 10.2063 4 9.4 4Z"
              stroke="#1C1C1E"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.54 4H14.6C13.7937 4 13.14 4.65366 13.14 5.46V9.4C13.14 10.2063 13.7937 10.86 14.6 10.86H18.54C19.3463 10.86 20 10.2063 20 9.4V5.46C20 4.65366 19.3463 4 18.54 4Z"
              stroke="#1C1C1E"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.4 13.14H5.46C4.65366 13.14 4 13.7937 4 14.6V18.54C4 19.3463 4.65366 20 5.46 20H9.4C10.2063 20 10.86 19.3463 10.86 18.54V14.6C10.86 13.7937 10.2063 13.14 9.4 13.14Z"
              stroke="#1C1C1E"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.54 13.14H14.6C13.7937 13.14 13.14 13.7937 13.14 14.6V18.54C13.14 19.3463 13.7937 20 14.6 20H18.54C19.3463 20 20 19.3463 20 18.54V14.6C20 13.7937 19.3463 13.14 18.54 13.14Z"
              stroke="#1C1C1E"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <!-- <span class="header__all-cat-text">Все категории</span> -->
        </NuxtLink>

        <nav class="header__nav">
          <ul class="header__nav-list">
            <li class="header__nav-element">
              <NuxtLink
                to="/"
                @click="mobMenyOpen = false"
                class="header__nav-link"
              >
                <span class="header__nav-link-text">Главная</span>
              </NuxtLink>
            </li>
            <li
              class="header__nav-element"
              v-for="value in allAvaliableCategories"
              :key="value.id"
            >
              <NuxtLink
                :to="`/products/categories/${value.id}`"
                @click="mobMenyOpen = false"
                class="header__nav-link"
              >
                <span class="header__nav-link-text">{{ value.name_ru }}</span>
                <span
                  v-if="value.count"
                  class="header__nav-link-count"
                  >{{ value.count }}</span
                >
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>

  <div class="header__mob-meny mob-meny" 
  :class="{ 'mob-meny--active': mobMenyOpen }">
    <div class="container">
      <div class="mob-meny__top">
        <headerSearch />
     
      <nav class="mob-meny__nav">
        <ul class="mob-meny__list">
          <li class="mob-meny__element">
            <NuxtLink to="/" class="mob-meny__link" @click="mobMenyOpen = false">
              Главная
            </NuxtLink>
          </li>
          <!-- <li class="mob-meny__element">
            <NuxtLink to="/products" class="mob-meny__link" @click="mobMenyOpen = false">
              Все категории
            </NuxtLink>
          </li> -->
          <li
            class="mob-meny__element"
            v-for="value in allAvaliableCategories"
            :key="value.id"
          >
            <NuxtLink
              :to="`/products/categories/${value.id}`"
              class="mob-meny__link"
              @click="mobMenyOpen = false"
            >
              {{ value.name_ru }}
              <span class="mob-meny__link-count">({{ value.count }})</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>

      <div class="mob-meny__footer">
        <div class="mob-meny__contacts">
        <div class="mob-meny__phone" v-if="dataContacts?.phone_contact">
          <a
            :href="`tel:${dataContacts.phone_contact}`"
            class="mob-meny__phone-link"
            v-html="dataContacts.phone_contact.replace(/\s/g, '')"
          ></a>
          <p class="mob-meny__phone-hour-work">Ежедневно с 10:00 до 21:00</p>
        </div>
        <div class="mob-meny__email" v-if="dataContacts?.email_contact">
          <a
            :href="`mailto:${dataContacts.email_contact}`"
            class="mob-meny__email-link"
            v-html="dataContacts.email_contact.replace(/\s/g, '')"
          ></a>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//IMPORTS
import { ref } from "vue";
import headerSearch from "@/components/fields/headerSearch.vue";
import useAllFiltrsData from "@/composables/allFiltrsData";
import { storeToRefs } from "pinia";
import { useCounterStore } from "@/stores/counter";
import { useModalStore } from "@/stores/modal";
import { useUserStore } from "@/stores/user";

//PROPS
const props = defineProps({
  dataContacts: {
    type: Object,
    required: true,
  },
});


//DATA

const mobMenyOpen = ref(false);

const allAvaliableCategories = ref([]);

//All avaliable categories from server for header nav
const { allFiltrsData } = await useAllFiltrsData();
allAvaliableCategories.value = allFiltrsData.value?.filters?.categories ?? [];

console.log(allAvaliableCategories.value);

const store = useCounterStore();

const modalStore = useModalStore();

const userStore = useUserStore();

const { authStatus, userName } = storeToRefs(userStore);



//METHODS

//open cart script
function openCart() {
  store.openCart();
}

//open auth modal script
function openAuthModal() {
  modalStore.openModal("auth");
}

//HOOKS
onMounted(() => {
  userStore.checkAuthStatus();
  userStore.checkUserName();
});


</script>
