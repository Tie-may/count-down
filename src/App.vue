<template>
    <count-down :date="date" :output-format="format"></count-down>
</template>

<script setup lang="ts">
    import CountDown from "@/components/CountDown.vue";

    // 设置倒计时的目标时间，要求格式 "YYYY-MM-DD HH:mm:ss"
    const date = "2099-1-1 00:00:00";
    // 设置倒计时展示格式，格式转换文件在'@/assets文件下，完整格式和含义如下
    const format = "DD天HH时mm分ss秒SSS";
</script>

<style scoped>

</style>
