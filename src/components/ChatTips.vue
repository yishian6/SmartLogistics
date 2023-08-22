<template>
    <i class="iconfont icon-tishi" v-show="isShow" @click="change"></i>
    <div class="guess-want" v-show="!isShow">
        <i class="iconfont icon-xiangzuojiantou" style="display: flex; align-items: center;" @click="change"></i>
        <div class="subtitle">猜你想问</div>
        <div>
            <el-table :data="tips" style="border-radius: 10px;" @row-click="handleRowClick">
                <el-table-column prop="name" width="120px">
                </el-table-column>
                <el-table-column width="30px">
                    <i class="iconfont icon-xiangyoujiantou"></i>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
const tips = reactive([
    { name: '如何使用' },
    { name: '注意事项' },
    { name: '问题反馈' }
])

const isShow = ref(true)

const change = () => {
    isShow.value = !isShow.value
}

const props = defineProps({ sendTipMessage: Function })

const handleRowClick = (row) => {
    // console.log(row.name)
    let receivedVal;
    if (row.name === '如何使用')
        receivedVal = '请在聊天框输入你要查询的岗位信息包括岗位名称，薪水，地址，企业类型，例如南京市雨花台区的李先生，希望找到工资8000-10000的电子商务岗位，最好是外企'
    else if (row.name === '注意事项')
        receivedVal = '岗位名称请包括市，和区，例如南京市秦淮区，岗位信息至少输入一个，否则无推荐岗位'
    else
        receivedVal = '请点击联系我们的界面，按照上面的联系方式进行反馈，欢迎您的反聩！'
    props.sendTipMessage(row.name, receivedVal)
}
</script>

<style scoped>
.guess-want {
    width: 200px;
    text-align: center;
    /* border: 1px solid rgb(225, 223, 223); */
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    /* font-family: '黑体'; */
    position: fixed;
    top: 45%;
    left: 1%;
}

.subtitle {
    writing-mode: vertical-rl;
    text-orientation: upright;
    font-size: 22px;
    margin-right: 5px;
    color: rgb(194, 192, 199);
    /* font-weight: 600; */
}

.iconfont {
    font-size: 18px;
    color: rgb(166, 166, 166);
}

.icon-tishi {
    position: fixed;
    top: 51%;
}
</style>