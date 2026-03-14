import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const authStatus = ref<boolean | null>(false)
  const userName = ref<string | null>(null)


  function checkAuthStatus() {
    const authStatusLocalstorage = localStorage.getItem('authStatus')
    if (authStatusLocalstorage && authStatusLocalstorage == 'true') {
        authStatus.value = true 
    }
    else{
        authStatus.value = false
    }
  }

  function changeLocalstorageAuthStatus(status: boolean) {
    localStorage.setItem('authStatus', status.toString())

    checkAuthStatus()
  }

  function checkUserName() {
    const userNameLocalstorage = localStorage.getItem('userName')
    if (userNameLocalstorage) {
        userName.value = userNameLocalstorage
    }
    else{
        userName.value = null
    }
  }

  function changeUserName(name: string | null) {
    if (name !== null) {
      localStorage.setItem('userName', name)
    } else {
      localStorage.removeItem('userName')
    }
    checkUserName()
  }


  if (import.meta.client) {
    checkAuthStatus()
    console.log('authStatus', authStatus.value)
  }

  return {
    authStatus,
    userName,

    changeLocalstorageAuthStatus,
    checkAuthStatus,
    checkUserName,
    changeUserName,
  }
})
