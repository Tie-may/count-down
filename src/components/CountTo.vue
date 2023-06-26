<script setup lang="ts">
    import {computed, ref, watch} from "vue";

    const props = defineProps({
        num: {
            type: Number,
            required: true,
        },
        transitionTime: {
            type: String,
            default: '500ms',
        }
    });

    const count = ref(props.num); // 当前数字
    const translate = computed(() => (-(100 / 11) * count.value) + '%'); // 根据当前数据计算每次平移的距离
    const animateTime = ref(props.transitionTime); // 过渡需要的时间
    const timer = ref<null | number>(null); // 节流timer

    const countChange = () => {
        count.value = props.num;
        animateTime.value = props.transitionTime;
        // if (count.value > 10) { // count值为9再增加时平滑过渡
        //     count.value = 0;
        //     animateTime.value = '0ms';
        //     setTimeout(() => {
        //         countChange()
        //     }, 0);
        // }
    }

    watch(props, () => {
        if (!timer.value) { // 节流，使过渡更顺滑
            countChange();
            timer.value = setTimeout(() => {
                timer.value = null;
            }, 17);
        }
    });
</script>

<template>
    <div>
        <p class="count">
            <span class="count-content">01234567890</span>
        </p>
    </div>
</template>

<style scoped>
    .count {
        position: relative;
        width: 30px;
        height: 40px;
        border: 2px solid #7fda91;
        border-radius: 4px;
        list-style: none;
        overflow: hidden;
    }

    .count-content {
        position: absolute;
        top: 27%;
        left: 50%;
        transform: translate(-50%, v-bind(translate));
        transition: transform v-bind(animateTime) ease-in-out;
        font-size: 20px;
        writing-mode: vertical-rl;
        text-orientation: upright;
        letter-spacing: 17px;
    }
</style>