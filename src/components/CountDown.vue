<script setup lang="ts">
    import outputFormatTime from '@/assets/outputFormat';
    import {computed, onMounted, ref} from 'vue';
    import dayjs from 'dayjs';
    import CountTo from "@/components/CountTo.vue";

    const props = defineProps({
        date: {
            type: String,
            required: true,
        },
        outputFormat: {
            type: String,
            default: 'HH:mm:ss', // 显示格式 DD:HH:mm:ss:SSS，可自定义如 mm:ss
        },
    });

    // region 倒计时相关
    const endTime = dayjs(props.date, "YYYY-MM-DD HH:mm:ss");// 结束时间
    const remainTime = ref(0); // 剩余时间，单位毫秒
    const output = computed(() => outputFormatTime(props.outputFormat as string, remainTime.value).format); // 根据格式输出的倒计时

    // 倒计时计算
    const tickTime = () => {
        requestAnimationFrame(() => {
            const now = dayjs();
            const remain = endTime.diff(now); // 计算时间差异，单位毫秒
            if (remain > 0) {
                remainTime.value = remain; // 更新剩余时间
                tickTime();
            } else {
                remainTime.value = 0;
            }
        })
    }
    // endregion 倒计时相关

    // region 数字滚动
    const countData = computed(() => {
        const result = [];
        const items = output.value.split('');
        items.forEach((item, idx) => {
            const isNum = !isNaN(parseFloat(item));
            const hasMillisecond = (props.outputFormat as string).endsWith('SSS');
            result.push({
                value: isNum ? parseInt(item) : item,
                isNum,
                time: hasMillisecond && idx >= items.length - 3 ? '100ms' : '500ms', // 毫秒的过渡时间更快
            })
        })
        return result;
    })
    // endregion 数字滚动

    onMounted(() => {
        tickTime();
    })
</script>

<template>
    <div class="wrapper">
        <p>距离2099年还有：</p>
        <div v-for="(item,idx) of countData" :key="idx">
            <count-to v-if="item.isNum" :num="item.value" :transitionTime="item.time"
                      style="margin-left: 3px;"></count-to>
            <p v-else>{{ item.value }}</p>
        </div>
    </div>
    <div class="wrapper">
        距离2099年还有：{{ output }}
    </div>
</template>

<style scoped>
    .wrapper {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 50px;
        font-size: 34px;
        text-align: center;
        user-select: none;
    }
</style>