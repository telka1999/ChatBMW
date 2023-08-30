<script setup>
import { useRoute } from 'vue-router';
import { ref, watchEffect, nextTick } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import {
    PaperAirplaneIcon,
} from '@heroicons/vue/24/outline'
const props = defineProps({
    sidebarOpen: { require: false }
})
const sidebar = ref(props.sidebarOpen)
const { getAccessTokenSilently, user } = useAuth0()
const route = useRoute()
let messages = ref([])
const prompt = ref("")
const loading = ref(false)
const scrollableDiv = ref(null);

const scrollToBottom = () => {
    if (scrollableDiv.value) {
        scrollableDiv.value.scrollTop = scrollableDiv.value.scrollHeight;
    }
};

const creatingMessage = async () => {
    if (!loading.value) {
        loading.value = true
        try {
            messages.value.push({ message: prompt.value, answer: "" })
            const id = route.params.id
            const token = await getAccessTokenSilently()
            const res = await fetch("/api/message", {
                method: 'POST',
                redirect: 'follow',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user._rawValue.sub,
                    chatId: id,
                    message: prompt.value
                }),
            })
            const data = await res.json()
            if (data) {
                const findMessageWithoutAnswer = messages.value.filter((message) => {
                    return message.answer !== ""
                })
                messages.value = findMessageWithoutAnswer
                messages.value.push(data)
                scrollToBottom()
                sidebar.value = false
                prompt.value = ""
                loading.value = false
            }
        } catch (error) {
            loading.value = false
            console.log(error.message);
        }
    }
}

watchEffect(async () => {
    const id = route.params.id
    const token = await getAccessTokenSilently()
    const res = await fetch(`/api/message/${id}`, {
        method: 'GET',
        redirect: 'follow',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    const data = await res.json()
    messages.value = data
    await nextTick()
    scrollToBottom()
})
</script>

<template>
    <div ref="scrollableDiv" style="overflow: auto;">
        <div v-for="(message, i) in messages" :key="i">
            <div>
                <div class="max-w-4xl mx-auto px-8 py-6 flex gap-6">
                    <img class="inline-block h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="" />
                    <div>{{ message.message }}</div>
                </div>
                <div class="bg-gray-50">
                    <div class="max-w-4xl mx-auto px-8 py-6 flex gap-6">
                        <img class="inline-block h-10 w-10 rounded-full" src="../assets/4140436_bmw_logo_icon.png" alt="">
                        <div>{{ message.answer ? message.answer : "Loading . . ." }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="route.params.id" class="w-full border-t">
        <div class="max-w-4xl mx-auto px-8 py-8">
            <form @submit.prevent="creatingMessage" class="border rounded-lg px-6 py-4 flex items-center">
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
</template>