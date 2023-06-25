<template>
    <count-down :date="date" @callback="finish"></count-down>
</template>

<script setup lang="ts">
    import CountDown from "@/components/CountDown.vue";
    import {ref} from "vue";

    // 要求格式 "YYYY-MM-DD HH:mm:ss"
    const date = ref("2099-1-1 00:00:00");
    const finish = () => {
        console.log('回调执行');
    }

</script>

<style scoped>

</style>
