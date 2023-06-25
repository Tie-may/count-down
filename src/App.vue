<template>
    <count-down :date="date" output-format="DD天HH时mm分ss秒SSS" @callback="finish"></count-down>
</template>

<script setup lang="ts">
    import CountDown from "@/components/CountDown.vue";

    // 要求格式 "YYYY-MM-DD HH:mm:ss"
    const date = "2099-1-1 00:00:00";
    const finish = () => {
        console.log('回调执行');
    }
</script>

<style scoped>

</style>
