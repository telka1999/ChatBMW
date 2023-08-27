<script setup>
import { ref, watchEffect } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {
  WrenchScrewdriverIcon,
  Bars3Icon,
  PlusIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/vue/24/outline'
import { RouterView, useRoute, RouterLink, useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
const { logout, getAccessTokenSilently, user } = useAuth0()
const route = useRoute()
const router = useRouter()
const sidebarOpen = ref(false)
const prompt = ref("")
let parmsId
let chats = ref([])
const navigation = [
  { id: "22", name: 'Jak zainstalować światła przeciwmgielne ? wersja USA' },
  { id: "23", name: 'BMW F10 520D ICMQL D019AB oraz D0157A co oznacza?' },
  { id: "23", name: 'Kodowanie licznika e38 750i 2001r.' },
  { id: "24", name: 'po wymianie na mask 2 w e90 nie działają przyciski od radia' },
  { id: "26", name: 'Prostownik, zasilacz do diagnostyki, programowania, kodowa.' },
  { id: "25", name: 'BMW e46 - Moduly FTM i BTM - aktywacja skladanych lusterek' },
]

const handleLogout = () => {
  logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  })
}

const fetchProtectedAPI = async () => {
  const token = await getAccessTokenSilently()
  const res = await fetch("/api/chat", {
    method: 'POST',
    redirect: 'follow',
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: user._rawValue.sub,
      title: prompt.value
    }),
  })
  const data = await res.json()
  if (data) {
    prompt.value = ""
    router.push({ path: String(data.chatId) })
  }
}

const redirectToChat = (id) => {
  router.push({ path: String(id) })
}

watchEffect(async () => {
  parmsId = route.params.id
  const id = user.value.sub
  const token = await getAccessTokenSilently()
  const res = await fetch(`/api/chat/${id}`, {
    method: 'GET',
    redirect: 'follow',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  chats.value = await res.json()
})
</script>
<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-40 md:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
          enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
          leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-white">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button type="button"
                    class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                <div class="flex flex-shrink-0 items-center px-2">
                  <RouterLink to="/"
                    class="cursor-pointer flex items-center gap-2 border rounded-lg w-full px-2 py-3 hover:border-gray-300 hover:bg-gray-50">
                    <PlusIcon class="h-5" />
                    <div>New chat</div>
                  </RouterLink>
                </div>
                <nav class="mt-5 space-y-1 px-2">
                  <div @click="redirectToChat(item.id)" v-for="(item, i) in chats" :key="i"
                    :class="[item.id == parmsId ? 'bg-gray-100 text-gray-900 font-medium' : 'cursor-pointer text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group flex items-center px-2 py-3 text-base rounded-md']">
                    <component :is="WrenchScrewdriverIcon"
                      :class="[item.id == parmsId ? 'text-gray-600' : 'text-gray-400 group-hover:text-gray-500', 'mr-4 flex-shrink-0 h-5 w-5']"
                      aria-hidden="true" />
                    <p class="truncate">{{ item.title }}</p>
                  </div>
                </nav>
              </div>
              <div class="flex flex-shrink-0 border-t border-gray-200 p-2">
                <div class="cursor-pointer w-full group block flex-shrink-0 p-2 rounded-lg hover:bg-gray-50">
                  <Menu as="div" class="w-full">
                    <transition enter-active-class="transition ease-out duration-100"
                      enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                      leave-active-class="transition ease-in duration-75"
                      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                      <MenuItems style="width: 304px;"
                        class="absolute left-2 bottom-20 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div class="py-1">
                          <MenuItem v-slot="{ active }" @click="handleLogout">
                          <div
                            :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'cursor-pointer px-4 py-2 flex gap-2 items-center']">
                            <ArrowRightOnRectangleIcon class="h-5" />Log
                            out
                          </div>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </transition>
                    <MenuButton class="cursor-pointer group block w-full flex-shrink-0 rounded-lg p-2 hover:bg-gray-50">
                      <div class="flex items-center">
                        <div>
                          <img class="inline-block h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="" />
                        </div>
                        <div class="ml-3">
                          <p class="truncate text-gray-700 group-hover:text-gray-900">telka199909@gmail.com</p>
                        </div>
                      </div>
                    </MenuButton>
                  </Menu>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
    <div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <div class="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
        <div class="py-4">
          <div class="flex flex-shrink-0 items-center px-2">
            <RouterLink to="/"
              class="cursor-pointer flex items-center gap-2 border rounded-lg w-full px-2 py-3 hover:border-gray-300 hover:bg-gray-50">
              <PlusIcon class="h-4" />
              <div class="text-sm">New chat</div>
            </RouterLink>
          </div>
        </div>
        <div class="flex flex-1 flex-col overflow-y-auto py-4 border-t">
          <nav class="flex-1 space-y-1 bg-white px-2">
            <div @click="redirectToChat(item.id)" v-for="(item, i) in chats" :key="i"
              :class="[item.id == parmsId ? 'bg-gray-100 text-gray-900 font-medium' : 'cursor-pointer text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group flex items-center px-2 py-3 text-sm rounded-md']">
              <component :is="WrenchScrewdriverIcon"
                :class="[item.id == parmsId ? 'text-gray-600' : 'text-gray-400 group-hover:text-gray-500', 'mr-3 flex-shrink-0 h-4 w-4']"
                aria-hidden="true" />
              <p class="truncate">{{ item.title }}</p>
            </div>
          </nav>
        </div>
        <div class="flex flex-shrink-0 border-t border-gray-200 p-2">
          <Menu as="div" class="w-full">
            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute left-2 bottom-16 z-10 mt-2 w-60 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                  <MenuItem v-slot="{ active }" @click="handleLogout">
                  <div
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'px-4 py-2 flex gap-2 items-center text-sm cursor-pointer']">
                    <ArrowRightOnRectangleIcon class="h-4" />Log
                    out
                  </div>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
            <MenuButton class="cursor-pointer group block w-full flex-shrink-0 rounded-lg p-2 hover:bg-gray-50">
              <div class="flex items-center">
                <div>
                  <img class="inline-block h-9 w-9 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="" />
                </div>
                <div class="ml-3">
                  <p class="text-sm truncate text-gray-700 group-hover:text-gray-900">telka199909@gmail.com</p>
                </div>
              </div>
            </MenuButton>
          </Menu>
        </div>
      </div>
    </div>
    <div class="flex flex-1 flex-col md:pl-64">
      <div class="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
        <button type="button"
          class="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <main class="h-screen flex flex-col justify-between">
        <RouterView :navigation="navigation" />
        <div v-if="!route.params.id" class="h-full flex flex-col justify-between items-center">
          <div class="mt-20">
            <h1 class="text-4xl font-semibold text-gray-300">Chat<span class="text-blue-300">BMW</span></h1>
          </div>
          <div class="w-full mb-6">
            <div class="px-8 grid grid-cols-2 gap-3 max-w-4xl mx-auto">
              <div
                class="relative flex items-center text-sm border p-4 rounded-lg shadow text-gray-500 hover:text-gray-900 cursor-pointer">
                <p class="truncate mr-4">Jak zainstalować światła przeciwmgielne ? wersja USA</p>
                <PaperAirplaneIcon class="h-4 cursor-pointer absolute right-4" />
              </div>
              <div
                class="relative flex items-center text-sm border p-4 rounded-lg shadow text-gray-500 hover:text-gray-900 cursor-pointer">
                <p class="truncate mr-4">Jak zainstalować światła przeciwmgielne ? wersja USA</p>
                <PaperAirplaneIcon class="h-4 cursor-pointer absolute right-4" />
              </div>
              <div
                class="relative flex items-center text-sm border p-4 rounded-lg shadow text-gray-500 hover:text-gray-900 cursor-pointer">
                <p class="truncate mr-4">Jak zainstalować światła przeciwmgielne ? wersja USA</p>
                <PaperAirplaneIcon class="h-4 cursor-pointer absolute right-4" />
              </div>
              <div
                class="relative flex items-center text-sm border p-4 rounded-lg shadow text-gray-500 hover:text-gray-900 cursor-pointer">
                <p class="truncate mr-4">Jak zainstalować światła przeciwmgielne ? wersja USA</p>
                <PaperAirplaneIcon class="h-4 cursor-pointer absolute right-4" />
              </div>
            </div>
          </div>
        </div>
        <div class="w-full" :class="route.params.id ? 'border-t' : ''">
          <div class="max-w-4xl mx-auto px-8 pb-8" :class="route.params.id ? 'pt-8' : ''">
            <form @submit.prevent="fetchProtectedAPI" class="border rounded-lg px-6 py-4 flex items-center">
              <input v-model="prompt" placeholder="Send a message"
                class="m-0 w-full resize-none border-0 bg-transparent p-0 pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pr-12 pl-3 md:pl-0"
                style="max-height: 200px; height: 24px; overflow-y: hidden;" tabindex="0" name="prompt" id="prompt"
                rows="1" />
              <button type="submit">
                <PaperAirplaneIcon class="h-6 cursor-pointer text-gray-500 hover:text-gray-900" />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>