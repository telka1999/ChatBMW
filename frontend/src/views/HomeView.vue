<script setup>
import { ref, watchEffect, nextTick } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {
  ChatBubbleLeftIcon,
  TrashIcon,
  Bars3Icon,
  PlusIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  ArrowRightOnRectangleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/vue/24/outline'
import { RouterView, useRoute, RouterLink, useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
const { logout, getAccessTokenSilently, user } = useAuth0()
const preperdQuestions = [
  { question: "Recommend a dish to impress a date who's a picky eater" },
  { question: "Show me a code snippet of a website's sticky header" },
  { question: "Compare marketing strategies for sunglasses for Gen Z and Millennials" },
  { question: "Make up a story about Sharky, a tooth-brushing shark superhero" }]
const route = useRoute()
const router = useRouter()
const sidebarOpen = ref(false)
const prompt = ref("")
const open = ref(false)
const currentChat = ref(null)
const loading = ref(false)
let parmsId
let chats = ref([])

const handleLogout = () => {
  logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  })
}

const creatingChat = async (preperd) => {
  if (!loading.value) {
    loading.value = true
    try {
      const token = await getAccessTokenSilently()
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/chat`, {
        method: 'POST',
        redirect: 'follow',
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._rawValue.sub,
          title: preperd ? preperd : prompt.value
        }),
      })
      const data = await res.json()
      if (data) {
        loading.value = false
        sidebarOpen.value = false
        prompt.value = ""
        router.push({ path: String(data.chatId) })
      }
    } catch (error) {
      loading.value = false
      console.log(error.message);
    }
  }
}

const redirectToChat = (id) => {
  sidebarOpen.value = false
  router.push({ path: String(id) })
}

const deleteChat = async () => {
  const token = await getAccessTokenSilently()
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/chat`, {
    method: 'DELETE',
    redirect: 'follow',
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: currentChat.value.id,
    }),
  })
  const data = await res.json()
  if (data) {
    sidebarOpen.value = false
    open.value = false
    router.push({ path: "/" })
  }
}

const openPopupDeleteFromSidebar = () => {
  sidebarOpen.value = false
  open.value = true
}

watchEffect(async () => {
  parmsId = route.params.id
  const id = user.value.sub
  const token = await getAccessTokenSilently()
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/chat/${id}`, {
    method: 'GET',
    redirect: 'follow',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  chats.value = await res.json()
  const openedChat = chats.value.find((chat) => {
    return chat.id === Number(parmsId)
  })
  currentChat.value = openedChat
})
</script>
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform w-full overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">Delete chat?</DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">This will delete <span class="font-semibold text-gray-900">{{
                        currentChat?.title
                      }}</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="deleteChat()">Delete</button>
                <button type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="open = false" ref="cancelButtonRef">Cancel</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
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
            <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-gray-900">
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
              <div class="h-0 flex-1 overflow-y-auto py-5 pb-4">
                <div class="flex flex-shrink-0 items-center px-2 mb-4">
                  <RouterLink @click="sidebarOpen = false" to="/"
                    class="cursor-pointer flex items-center gap-2 border border-gray-700 text-white rounded-lg w-full px-2 py-3 hover:border-gray-600 hover:bg-gray-800">
                    <PlusIcon class="h-5" />
                    <div>New chat</div>
                  </RouterLink>
                </div>
                <nav class="py-4 border-t border-gray-700 px-2">
                  <div @click="redirectToChat(item.id)" v-for="(item, i) in chats" :key="i"
                    :class="[item.id == parmsId ? 'bg-gray-800 text-white font-medium' : 'cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white', 'group flex items-center px-2 py-3 text-base rounded-md']">
                    <div class="flex items-center truncate">
                      <component :is="ChatBubbleLeftIcon"
                        :class="[item.id == parmsId ? 'text-white' : 'text-gray-300 group-hover:text-white', 'mr-4 flex-shrink-0 h-6 w-6']"
                        aria-hidden="true" />
                      <p style="width: 230px;" class="truncate">{{ item.title }}</p>
                    </div>
                    <TrashIcon @click="open = true" v-if="item.id == parmsId" class="h-5 cursor-pointer" />
                  </div>
                </nav>
              </div>
              <div class="flex flex-shrink-0 border-t border-gray-700 p-2">
                <div class="cursor-pointer w-full block flex-shrink-0 p-2 rounded-lg hover:bg-gray-800">
                  <Menu as="div" class="w-full">
                    <transition enter-active-class="transition ease-out duration-100"
                      enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                      leave-active-class="transition ease-in duration-75"
                      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                      <MenuItems style="width: 304px;"
                        class="absolute left-2 bottom-20 z-10 mt-2 origin-top-right rounded-md bg-gray-950 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div class="py-1">
                          <MenuItem v-slot="{ active }" @click="handleLogout">
                          <div
                            :class="[active ? 'bg-gray-800 text-white' : 'text-gray-300', 'cursor-pointer px-4 py-3 flex gap-2 items-center']">
                            <ArrowRightOnRectangleIcon class="h-5" />Log
                            out
                          </div>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </transition>
                    <MenuButton class="cursor-pointer block w-full flex-shrink-0 rounded-lg p-2 hover:bg-gray-800">
                      <div class="flex items-center">
                        <div>
                          <img class="inline-block h-10 w-10 rounded-full" :src="user.picture" alt="" />
                        </div>
                        <div class="ml-3">
                          <p class="truncate text-white">{{ user.email }}</p>
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
      <div class="flex min-h-0 flex-1 flex-col border-r border-gray-900 bg-gray-900">
        <div class="py-4">
          <div class="flex flex-shrink-0 items-center px-2">
            <RouterLink to="/"
              class="cursor-pointer text-white flex items-center gap-2 border border-gray-700 rounded-lg w-full px-2 py-3 hover:border-gray-600 hover:bg-gray-800">
              <PlusIcon class="h-4" />
              <div class="text-sm">New chat</div>
            </RouterLink>
          </div>
        </div>
        <div class="flex flex-1 flex-col overflow-y-auto py-4 border-t border-gray-700">
          <nav class="flex-1 space-y-1 bg-gray-900 px-2">
            <div @click="redirectToChat(item.id)" v-for="(item, i) in chats" :key="i"
              :class="[item.id == parmsId ? 'bg-gray-800 text-white font-medium' : 'cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white', 'group flex items-center px-2 py-3 text-sm rounded-md']">
              <div class="flex items-center truncate">
                <component :is="ChatBubbleLeftIcon"
                  :class="[item.id == parmsId ? 'text-white' : 'text-gray-300 group-hover:text-white', 'mr-3 flex-shrink-0 h-5 w-5']"
                  aria-hidden="true" />
                <p style="width: 180px;" class="truncate">{{ item.title }}</p>
              </div>
              <TrashIcon @click="openPopupDeleteFromSidebar()" v-if="item.id == parmsId" class="h-4 cursor-pointer" />
            </div>
          </nav>
        </div>
        <div class="flex flex-shrink-0 border-t border-gray-700 p-2">
          <Menu as="div" class="w-full">
            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute left-2 bottom-16 z-10 mt-2 w-60 origin-top-right rounded-md bg-gray-950 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                  <MenuItem v-slot="{ active }" @click="handleLogout">
                  <div
                    :class="[active ? 'bg-gray-800 text-white' : 'text-gray-300', 'px-4 py-3 flex gap-2 items-center text-sm cursor-pointer']">
                    <ArrowRightOnRectangleIcon class="h-4" />Log
                    out
                  </div>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
            <MenuButton class="cursor-pointer group block w-full flex-shrink-0 rounded-lg p-2 hover:bg-gray-800">
              <div class="flex items-center">
                <div>
                  <img class="inline-block h-9 w-9 rounded-full" :src="user.picture" alt="" />
                </div>
                <div class="ml-3">
                  <p class="text-sm truncate text-white ">{{ user.email }}</p>
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
        <RouterView :sidebarOpen="sidebarOpen" />
        <div v-if="!route.params.id" class="h-full flex flex-col justify-between items-center">
          <div class="mt-20">
            <h1 class="text-4xl font-semibold text-gray-300">Chat<span class="text-blue-300">GPT</span></h1>
          </div>
          <div class="w-full mb-6">
            <div class="px-8 grid grid-cols-2 gap-3 max-w-4xl mx-auto">
              <div v-for="(question, i) in preperdQuestions" :key="i" @click="creatingChat(question.question)"
                class="relative flex items-center text-sm border p-4 rounded-lg shadow text-gray-500 hover:text-gray-900 cursor-pointer">
                <p class="truncate mr-4">{{ question.question }}</p>
                <PaperAirplaneIcon class="h-4 cursor-pointer absolute right-4" />
              </div>
            </div>
          </div>
        </div>
        <div v-if="!route.params.id" class="w-full">
          <div class="max-w-4xl mx-auto px-8 pb-8">
            <form @submit.prevent="creatingChat()" class="border rounded-lg px-6 py-4 flex items-center">
              <input v-model="prompt" placeholder="Send a message"
                class="m-0 w-full resize-none border-0 bg-transparent p-0 pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pr-12 pl-3 md:pl-0"
                style="max-height: 200px; height: 24px; overflow-y: hidden;" tabindex="0" name="prompt" id="prompt"
                rows="1" />
              <button type="submit">
                <svg v-if="loading" class="w-6 h-6 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"></path>
                </svg>
                <PaperAirplaneIcon v-if="!loading" class="h-6 cursor-pointer text-gray-500 hover:text-gray-900" />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>