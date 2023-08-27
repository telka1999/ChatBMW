<script setup>
import { useRoute } from 'vue-router';
import { ref, watchEffect, defineProps } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
const { getAccessTokenSilently, user } = useAuth0()
const { navigation } = defineProps({
    navigation
})
//console.log(navigation);
const route = useRoute()
let messages = ref([])
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
    messages.value = await res.json()
})
</script>

<template>
    <div style="overflow: auto;">
        <div v-for="(message, i) in messages" :key="i" :class="message.role === 'PERSON' ? 'bg-white' : 'bg-gray-50'">
            <div class="max-w-4xl mx-auto px-8 py-6 flex gap-6">
                <img v-if="message.role === 'PERSON'" class="inline-block h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="" />
                <img v-if="message.role === 'GPT'" class="inline-block h-10 w-10 rounded-full"
                    src="../assets/4140436_bmw_logo_icon.png" alt="">
                <div>{{ message.message }}</div>
            </div>
        </div>
    </div>
</template>