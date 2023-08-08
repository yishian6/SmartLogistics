<template>
    <div class="container">
        <div class="button">
            <span @click="show('logistics')" :class="index === 1 ? 'active' : ''" class="titleone">乡村振兴</span>
            <span class="center">|</span>
            <span @click="show('LastMile')" :class="index === 2 ? 'active' : ''" class="titletwo">最后一公里</span>
        </div>
        <div class="search_two">
            <el-input placeholder="请输入内容" v-model="input" width="200px">
            </el-input>
            <el-button type="primary" @click="onSubmit">搜索</el-button>

        </div>
    </div>
    <div class="one">
        <div class="news">
            <el-table :data="newsList" style="width: 1000px; margin: 0 auto;">
                <el-table-column prop="title" width="850">
                    <!-- <template #default="scope">
                        <a :href="scope.row.address" target="_blank">{{ scope.row.name }}</a>
                    </template> -->
                </el-table-column>

                <el-table-column prop="publish_date">
                </el-table-column>
            </el-table>
        </div>
        <div class="bolck">
            <el-pagination background layout="prev, pager, next" @current-change="currentChange" :total="50" class="mt-4" />
        </div>

    </div>
</template>


<script setup>
import { getNewInfoAPI } from '@/apis/news';
import { reactive, onMounted, ref } from 'vue'

// const newsReqInfo = reactive({
//     // 控制切换按钮后按钮改变样式
//     index: 1,
//     // 控制点击按钮后子组件显示，再次点击隐藏
//     isShow: true,
//     currentPage: 1,
//     currentPageTwo: 1,
//     pagesize: 5,
// })
let index = ref(1)

const currentChange = (val) => {
    this.currentPage = val;
}

// 获取新闻数据
const newsList = reactive([])
const getNewsList = (value) => {
    getNewInfoAPI(value).then(res => newsList.splice(0, newsList.length, ...res.data)).catch(error => console.log(error))
}
onMounted(() => getNewsList('logistics'))
console.log(newsList)
const show = (value) => {
    getNewsList(value)
    index.value = value === 'LastMile' ? 2 : 1
}
</script>
<style scoped>
a {
    text-decoration: none;
    color: black;
    font: 400;

}

.el-table {
    margin-left: 8%;
}

.bolck {
    margin-top: 100px;
    margin-left: 600px;
}

.center {
    font-size: 22px;
    color: rgb(187, 187, 202);
    margin-left: 20px;
    margin-right: 20px;
}

span.titleone {
    font-size: 22px;
    color: rgb(187, 187, 202);
}

span.titletwo {
    font-size: 22px;
    color: rgb(187, 187, 202);
}

span.titleone.active {
    font-size: 22px;
    color: black;
    cursor: pointer;
}

span.titletwo.active {
    font-size: 22px;
    color: black;
    cursor: pointer;
}

div.button {
    margin-left: 10%;
    margin-top: 30px;
    display: inline-block;
}

div.search_two {
    display: flex;
    margin-top: 40px;
    margin-right: 10%;
}

.el-table .el-table__cell {
    padding: 16px 0;
}

.container {
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
}
</style>