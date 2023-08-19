<script setup>
</script>

<template>
  <div class="flex h-screen">
    <div class="relative flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="absolute top-12 flex items-center gap-1">
        <h1 class="font-semibold text-xl">Chat<span class="text-blue-600">BMW</span></h1>
        <img class="h-6" src="../assets/4140436_bmw_logo_icon.png" alt="">
      </div>
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div class="flex justify-center">
          <h1 class="mt-6 text-4xl font-bold tracking-tight text-gray-900">Get Started</h1>
        </div>
        <div class="mt-8">
          <div class="mt-6 flex gap-4">
            <button type="button"
              class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-16 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Log
              in</button>
            <button type="button"
              class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-16 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Sign
              up</button>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img class="absolute inset-0 h-full w-full object-cover" src="../assets/pexels-jay-pizzle-3849554.jpg" alt="" />
    </div>
  </div>
</template>
