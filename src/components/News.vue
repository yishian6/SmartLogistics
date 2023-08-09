<template>
    <div class="container">
        <div class="button">
            <!-- :class这边是用来实现将选中的标题更改颜色 -->
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
                    <div class="trigger-area" @mouseenter="showPopup" @mouseleave="hidePopup">
                        {{ row.content }}
                    </div>
                </el-table-column>

                <el-table-column prop="publish_date">
                </el-table-column>
            </el-table>
        </div>
        <div class="bolck">
            <!-- <el-pagination background layout="prev, pager, next" @current-change="currentChange" :total="total"
                class="mt-4" /> -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
                :page-sizes="[8, 16, 32, 50, 80]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="index === 1 ? ruralNum : lastMileNum">
            </el-pagination>
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
// 用来选择点击了
let index = ref(1)
//新闻总数
const lastMileNum = ref(0)
const ruralNum = ref(0)
// pageSize表示页面新闻数
const pageSize = ref(8)
const pageNum = ref(1)

const handleCurrentChange = (page) => {
    pageNum.value = page;
    getNewsList(index.value === 2 ? 'LastMile' : 'logistics', pageSize.value, page)
    console.log(newsList)
}
const handleSizeChange = (size) => {
    pageSize.value = size;
}

// 获取新闻数据
const newsList = reactive([])
const getNewsList = (value, pageSize = 8, pageNum = 1) => {
    getNewInfoAPI(value, pageSize, pageNum).then(res => {
        newsList.splice(0, newsList.length, ...res.data.rows)
        lastMileNum.value = res.data.lastMileNum
        ruralNum.value = res.data.ruralNum
    }).catch(error => console.log(error))
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

.bolck {
    margin-top: 100px;
    /* margin-left: 600px; */
    display: flex;
    justify-content: space-around;
}
</style>