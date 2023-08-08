<template>
    <LayoutTop />
    <LayoutHeader />
    <!-- <LayoutBody /> -->
    <RouterView :key="router.currentRoute.value.fullPath" />
</template>

<script setup>
import LayoutTop from './LayoutTop.vue';
import LayoutHeader from './LayoutHeader.vue'
import router from '@/router/index';
// import LayoutBody from './LayoutBody.vue'
</script>