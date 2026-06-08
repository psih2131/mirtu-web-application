import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useInfoStore = defineStore('info', () => {
    
    const telegramLinkFooter = ref<string>('https://t.me/mirtu_kz');
    const whatsappLinkFooter = ref<string>('https://wa.me/77777777777');
    const instagramLinkFooter = ref<string>('https://www.instagram.com/mirtu_kz');

    const supportEmail = ref<string>('mirtu.kz@gmail.com');
    const supportTelegramLink = ref<string>('https://t.me/mirtu_kz');
    const supportWhatsappLink = ref<string>('https://wa.me/77777777777');

    const footerCopyright = ref<string>('© mirtu.kz — официальный интернет-сайт');




    return {
       telegramLinkFooter,
       whatsappLinkFooter,
       instagramLinkFooter,
       supportEmail,
       supportTelegramLink,
       supportWhatsappLink,
       footerCopyright
    }
})