<script setup lang="ts">
    import outputFormatTime from '@/assets/outputFormat';
    import {computed, onMounted, ref} from 'vue';
    import dayjs from 'dayjs';

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

    const emit = defineEmits(['callback']);

    const endTime = dayjs(props.date, "YYYY-MM-DD HH:mm:ss");// 结束时间
    const remainTime = ref(0); // 剩余时间，单位毫秒
    const output = computed(() => outputFormatTime(props.outputFormat as string, remainTime.value).format);

    // 倒计时
    const tickTime = () => {
        requestAnimationFrame(() => {
            const now = dayjs();
            const remain = endTime.diff(now);
            if (remain > 0) {
                remainTime.value = remain; // 更新剩余时间
                tickTime();
            } else {
                emit('callback'); // 触发回调
                remainTime.value = 0;
            }
        })
    }

    onMounted(() => {
        tickTime();
    })
</script>

<template>
    <div style="margin-top: 300px;font-size: 34px;text-align: center;">
        距离2099年还有：{{ output }}
    </div>
</template>

<style scoped>

</style>