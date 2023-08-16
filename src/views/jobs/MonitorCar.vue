<template>
    <div class="list" :style="{ borderColor: color }">
        <div class="list-name">
            {{ name }}
        </div>
        <div class="list-number" :style="{ background: color }">
            <div class="list-number-left">
                <i class='iconfont' :class="icon"></i>
            </div>
            <div class="list-number-right">
                <count-to :startVal='0' :endVal='number' :duration='3000'></count-to>
            </div>
        </div>
    </div>
</template>

<script setup>
import CountTo from '@/components/vue-count-to/vue-countTo.vue'//引入数字滚动器
defineProps({
    name: String,
    number: Number,
    color: String,
    icon: String
})
</script>


<style scoped>
.list {
    width: 45%;
    height: auto;
    background: #ffffff;
    border-radius: 10px;
    border: 1px solid #F141AF;
    box-sizing: border-box;
    overflow: hidden;
    /* margin-bottom: 20px; */
}

.list-name {
    width: 100%;
    height: 42px;
    /* border-bottom: 1px solid #E8EAEC; */
    padding: 0 15px;
    line-height: 42px;
    color: #5C5C5C;

}

.list-number {
    width: 100%;
    height: 68px;
    padding-left: 15px;
    padding-right: 15px;
    color: #515a6e;
    font-size: 30px;
    line-height: 68px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.list-number-left {
    width: 80px;
    height: 50px;
    /* background: burlywood; */
    border-radius: 5px;
    /* text-align: center; */
    line-height: 50px;
}

.iconfont {
    font-size: 28px;
    font-weight: bold;
}

.list-number-right {
    width: 60%;
    height: 50px;
    line-height: 50px;
    font-size: 30px;
    text-align: right;
    color: #ffffff;
}
</style>