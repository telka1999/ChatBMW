<script setup>
import { useRoute } from 'vue-router';
import { watchEffect } from 'vue';
const route = useRoute()
const chatMessages = [
    { role: "person", message: "how to calulete 23% of 2000" },
    { role: "gpt", message: "To calculate 23% of 2000, you can use the following formula: Percentage amount = (Percentage / 100) * Number In this case, the percentage is 23 and the number is 2000. So the calculation would be: (23 / 100) * 2000 = 0.23 * 2000 = 460 So, 23% of 2000 is equal to 460." },
    { role: "person", message: "how to calculete 2000 plus 23%" },
    { role: "gpt", message: "To calculate 2000 plus 23%, you need to find 23% of 2000 and then add it to the original value. Step 1: Find 23% of 2000 Percentage amount = (Percentage / 100) * Number 23% of 2000 = (23 / 100) * 2000 = 0.23 * 2000 = 460 Step 2: Add the result from Step 1 to the original value (2000) 2000 + 460 = 2460 So, 2000 plus 23% is equal to 2460." }, { role: "person", message: "how to calculete 2000 plus 23%" },
    { role: "gpt", message: "To calculate 2000 plus 23%, you need to find 23% of 2000 and then add it to the original value. Step 1: Find 23% of 2000 Percentage amount = (Percentage / 100) * Number 23% of 2000 = (23 / 100) * 2000 = 0.23 * 2000 = 460 Step 2: Add the result from Step 1 to the original value (2000) 2000 + 460 = 2460 So, 2000 plus 23% is equal to 2460." }, { role: "person", message: "how to calculete 2000 plus 23%" },
    { role: "gpt", message: "To calculate 2000 plus 23%, you need to find 23% of 2000 and then add it to the original value. Step 1: Find 23% of 2000 Percentage amount = (Percentage / 100) * Number 23% of 2000 = (23 / 100) * 2000 = 0.23 * 2000 = 460 Step 2: Add the result from Step 1 to the original value (2000) 2000 + 460 = 2460 So, 2000 plus 23% is equal to 2460." }, { role: "person", message: "how to calculete 2000 plus 23%" },
    { role: "gpt", message: "To calculate 2000 plus 23%, you need to find 23% of 2000 and then add it to the original value. Step 1: Find 23% of 2000 Percentage amount = (Percentage / 100) * Number 23% of 2000 = (23 / 100) * 2000 = 0.23 * 2000 = 460 Step 2: Add the result from Step 1 to the original value (2000) 2000 + 460 = 2460 So, 2000 plus 23% is equal to 2460." }, { role: "person", message: "how to calculete 2000 plus 23%" },
    { role: "gpt", message: "To calculate 2000 plus 23%, you need to find 23% of 2000 and then add it to the original value. Step 1: Find 23% of 2000 Percentage amount = (Percentage / 100) * Number 23% of 2000 = (23 / 100) * 2000 = 0.23 * 2000 = 460 Step 2: Add the result from Step 1 to the original value (2000) 2000 + 460 = 2460 So, 2000 plus 23% is equal to 2460." }
]
watchEffect(() => {
    console.log(route.params.id);
})
</script>
<template>
    <div style="overflow: auto;">
        <div v-for="(message, i) of chatMessages" :key="i" :class="message.role === 'person' ? 'bg-white' : 'bg-gray-50'">
            <div class="max-w-4xl mx-auto px-8 py-6 flex gap-6">
                <img v-if="message.role === 'person'" class="inline-block h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="" />
                <img v-if="message.role === 'gpt'" class="inline-block h-10 w-10 rounded-full"
                    src="../assets/4140436_bmw_logo_icon.png" alt="">
                <div>{{ message.message }}</div>
            </div>
        </div>
    </div>
</template>