<template>
    <div class="header">
        <div class="container">
            <div class="header__top">
            <NuxtLink to="" class="header__logo">
                <img src="@/assets/images/img/header-logo.png" alt="" class="header__logo-img">
            </NuxtLink>

            <headerSearch />

            <div class="header__phone">
                <a href="" class="header__phone-value">+7(777) 073-30-70</a>
                <p class="header__phone-hour-work">Ежедневно с 10:00 до 21:00</p>
            </div>

            <div class="header__store-controls-row">
                <div class="header__store-control-element header-store-control">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_18_239)">
                    <path d="M7.875 19.25C8.35825 19.25 8.75 18.8582 8.75 18.375C8.75 17.8918 8.35825 17.5 7.875 17.5C7.39175 17.5 7 17.8918 7 18.375C7 18.8582 7.39175 19.25 7.875 19.25Z" stroke="#2E3A59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17.5 19.25C17.9832 19.25 18.375 18.8582 18.375 18.375C18.375 17.8918 17.9832 17.5 17.5 17.5C17.0168 17.5 16.625 17.8918 16.625 18.375C16.625 18.8582 17.0168 19.25 17.5 19.25Z" stroke="#2E3A59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M0.875 0.875H4.375L6.72 12.5913C6.80001 12.9941 7.01917 13.356 7.3391 13.6135C7.65904 13.8711 8.05936 14.0079 8.47 14H16.975C17.3856 14.0079 17.786 13.8711 18.1059 13.6135C18.4258 13.356 18.645 12.9941 18.725 12.5913L20.125 5.25H5.25" stroke="#2E3A59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_18_239">
                    <rect width="21" height="21" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                </div>

                <div class="header__store-control-element header-store-control">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 21.875C11.8281 21.2792 11.0688 20.6594 10.2656 20H10.2552C7.42709 17.6875 4.22188 15.0708 2.80625 11.9354C2.34117 10.9372 2.0947 9.85118 2.08332 8.75001C2.08022 7.23906 2.68622 5.79062 3.76439 4.73206C4.84255 3.6735 6.30186 3.09417 7.8125 3.12501C9.04233 3.12695 10.2457 3.48239 11.2792 4.14897C11.7333 4.44373 12.1442 4.80028 12.5 5.20834C12.8578 4.80188 13.2688 4.44554 13.7219 4.14897C14.7549 3.48226 15.958 3.1268 17.1875 3.12501C18.6981 3.09417 20.1575 3.6735 21.2356 4.73206C22.3138 5.79062 22.9198 7.23906 22.9167 8.75001C22.9061 9.85294 22.6596 10.9408 22.1938 11.9406C20.7781 15.0761 17.574 17.6917 14.7458 20L14.7354 20.0083C13.9313 20.6636 13.1729 21.2833 12.501 21.8833L12.5 21.875ZM7.8125 5.20834C6.8422 5.1962 5.90633 5.56756 5.20834 6.24168C4.53582 6.90227 4.15996 7.80735 4.16658 8.75001C4.17847 9.55262 4.36024 10.3436 4.7 11.0708C5.36824 12.4237 6.26991 13.648 7.36355 14.6875C8.39584 15.7292 9.58334 16.7375 10.6104 17.5854C10.8948 17.8198 11.1844 18.0563 11.474 18.2927L11.6563 18.4417C11.9344 18.6688 12.2219 18.9042 12.5 19.1354L12.5135 19.1229L12.5198 19.1177H12.526L12.5354 19.1104H12.5406H12.5458L12.5646 19.0948L12.6073 19.0604L12.6146 19.0542L12.626 19.0458H12.6323L12.6417 19.0375L13.3333 18.4698L13.5146 18.3208C13.8073 18.0823 14.0969 17.8458 14.3813 17.6115C15.4083 16.7636 16.5969 15.7563 17.6292 14.7094C18.723 13.6704 19.6247 12.4464 20.2927 11.0938C20.6386 10.3602 20.823 9.56095 20.8334 8.75001C20.8377 7.81026 20.462 6.90865 19.7917 6.25001C19.095 5.57284 18.159 5.19843 17.1875 5.20834C16.002 5.19827 14.8687 5.69519 14.0729 6.57397L12.5 8.38647L10.9271 6.57397C10.1313 5.69519 8.998 5.19827 7.8125 5.20834Z" fill="#2E3A59"/>
                    </svg>
                </div>

                <div class="header__store-control-element header-store-control">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z" fill="#2E3A59"/>
                    <path d="M6.34315 16.3431C4.84285 17.8434 4 19.8783 4 22H6C6 20.4087 6.63214 18.8826 7.75736 17.7574C8.88258 16.6321 10.4087 16 12 16C13.5913 16 15.1174 16.6321 16.2426 17.7574C17.3679 18.8826 18 20.4087 18 22H20C20 19.8783 19.1571 17.8434 17.6569 16.3431C16.1566 14.8429 14.1217 14 12 14C9.87827 14 7.84344 14.8429 6.34315 16.3431Z" fill="#2E3A59"/>
                    </svg>

                </div>
            </div>

        </div>
        <div class="header__down">
            <NuxtLink to="" class="header__all-cat">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.4 4H5.46C4.65366 4 4 4.65366 4 5.46V9.4C4 10.2063 4.65366 10.86 5.46 10.86H9.4C10.2063 10.86 10.86 10.2063 10.86 9.4V5.46C10.86 4.65366 10.2063 4 9.4 4Z" stroke="#1C1C1E" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.54 4H14.6C13.7937 4 13.14 4.65366 13.14 5.46V9.4C13.14 10.2063 13.7937 10.86 14.6 10.86H18.54C19.3463 10.86 20 10.2063 20 9.4V5.46C20 4.65366 19.3463 4 18.54 4Z" stroke="#1C1C1E" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.4 13.14H5.46C4.65366 13.14 4 13.7937 4 14.6V18.54C4 19.3463 4.65366 20 5.46 20H9.4C10.2063 20 10.86 19.3463 10.86 18.54V14.6C10.86 13.7937 10.2063 13.14 9.4 13.14Z" stroke="#1C1C1E" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.54 13.14H14.6C13.7937 13.14 13.14 13.7937 13.14 14.6V18.54C13.14 19.3463 13.7937 20 14.6 20H18.54C19.3463 20 20 19.3463 20 18.54V14.6C20 13.7937 19.3463 13.14 18.54 13.14Z" stroke="#1C1C1E" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="header__all-cat-text">Все категории</span>
            </NuxtLink>

            <nav class="header__nav">
                <ul class="header__nav-list">
                    <li class="header__nav-element">
                        <NuxtLink class="header__nav-link">Кросовки</NuxtLink>
                    </li>
                    <li class="header__nav-element">
                        <NuxtLink class="header__nav-link">Кеды</NuxtLink>
                    </li>
                    <li class="header__nav-element">
                        <NuxtLink class="header__nav-link">Ботинки</NuxtLink>
                    </li>
                    <li class="header__nav-element">
                        <NuxtLink class="header__nav-link">Беговые</NuxtLink>
                    </li>
                    <li class="header__nav-element">
                        <NuxtLink class="header__nav-link">Туристические</NuxtLink>
                    </li>
                    <li class="header__nav-element">
                        <NuxtLink class="header__nav-link">Скейтбординг</NuxtLink>
                    </li>
                    <li class="header__nav-element">
                        <NuxtLink class="header__nav-link">Баскетбол</NuxtLink>
                    </li>
                    <li class="header__nav-element">
                        <NuxtLink class="header__nav-link">Для лета</NuxtLink>
                    </li>
                    
                    <li class="header__nav-element">
                        <NuxtLink class="header__nav-link">Новинки</NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>
        </div>
        
    </div>
</template>

<script setup>
    import headerSearch from '@/components/fields/headerSearch.vue'
</script>