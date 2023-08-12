<template>
    <div class="container">
        <div class="button">
            <!-- :class这边是用来实现将选中的标题更改颜色 -->
            <span @click="show('logistics')" :class="index === 1 ? 'active' : ''" class="titleone">乡村振兴</span>
            <span class="center">|</span>
            <span @click="show('LastMile')" :class="index === 2 ? 'active' : ''" class="titletwo">最后一公里</span>
        </div>
        <div class="search_two">
            <!-- 搜索条件 -->
            <el-row :gutter="20" class="queryInfo">
                <el-col :xs="9" :sm="7" :md="7" :lg="7" :xl="7">
                    <el-input class="queryInfo-li-one" v-model="queryInfo.title" clearable placeholder="请输入新闻名称"></el-input>
                </el-col>
                <el-select v-model="queryInfo.source_org" placeholder="新闻来源选择" clearable>
                    <el-option v-for="item in (newsType === 'LastMile' ? sourceOrgL : sourceOrgR)" :key="item.value"
                        :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2">
                    <el-button type="primary" :plain="true" class="queryInfo-li-two"
                        @click="getNewsExploreList(newsType, queryInfo.title, queryInfo.source_org, pageSize, 1, 0)">搜索</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
    <div class="one">
        <div class="news" style="user-select: text;">
            <el-table :data="newsList" style="width: 1000px; margin: 0 auto;cursor: pointer;">
                <el-table-column prop="title" width="850">
                    <template v-slot="item">
                        <router-link :to="`/news/page/${item.row.id}/${newsType}`" target="_blank">{{ item.row.title
                        }}</router-link>
                    </template>
                    <!-- <div style="float: right; margin-top: 20px; height: 100px" class="popup" @mouseenter="showPopup()"
                        @mouseleave="hidePopup()">
                        <transition name="fade">
                            <div v-if="isPopupVisible" class="popup-content">
                                {{ item.context }}
                            </div>
                        </transition>
                    </div> -->
                </el-table-column>
                <el-table-column prop="publish_date">
                </el-table-column>

            </el-table>
        </div>
        <div class="bolck">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
                :page-sizes="[8, 16, 32, 50, 80]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="newsNum">
            </el-pagination>
        </div>

    </div>
</template>


<script setup>
import { getNewInfoAPI, getNewExploreAPI } from '@/apis/news';
import { reactive, onMounted, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
// 用来选择点击了那种新闻
let index = ref(1)
// 用来标记当前是index接口还是explore接口
const isExplore = ref(false)
const newsType = computed(() => index.value === 2 ? 'LastMile' : 'logistics')
//新闻总数
const newsNum = ref(0)
// pageSize表示页面新闻数
const pageSize = ref(8)
const pageNum = ref(1)

// 搜索条件
const queryInfo = reactive({
    title: '',
    source_org: ''
})
// 高级搜索的选项
// 这是最后一公里的搜索提示消息
const sourceOrgL = reactive([
    {
        value: '央视网',
        label: '央视网'
    },
    {
        value: '人民日报',
        label: '人民日报'
    },
    {
        value: '新华网',
        label: '新华网'
    },
    {
        value: '经济日报',
        label: '经济日报'
    },
    {
        value: '新华社',
        label: '新华社'
    },
    {
        value: '农民日报',
        label: '农民日报'
    },
    {
        value: '经济参考报',
        label: '经济参考报'
    },
    {
        value: '人民网',
        label: '人民网'
    },
    {
        value: '羊城晚报',
        label: '羊城晚报'
    },
    {
        value: '中国网',
        label: '中国网'
    },
    {
        value: '光明日报',
        label: '光明日报'
    },
    {
        value: '科技日报',
        label: '科技日报'
    },
    {
        value: '央广网',
        label: '央广网'
    }
])
// 这是乡村振兴的搜索提示消息
const sourceOrgR = reactive([
    {
        value: '江苏省乡村振兴局',
        label: '江苏省乡村振兴局'
    },
    {
        value: '新华网',
        label: '新华网'
    },
    {
        value: '新华社',
        label: '新华社'
    },
    {
        value: '新江苏中国江苏网',
        label: '新江苏中国江苏网'
    },
    {
        value: '人民日报',
        label: '人民日报'
    },
    {
        value: '新华日报',
        label: '新华日报'
    },
    {
        value: '交汇点',
        label: '交汇点'
    },
    {
        value: '人民网',
        label: '人民网'
    },
    {
        value: '农民日报',
        label: '农民日报'
    },
    {
        value: '吉启轩',
        label: '吉启轩'
    },
    {
        value: '国家乡村振兴局',
        label: '国家乡村振兴局'
    },
    {
        value: '局机关党委',
        label: '局机关党委'
    }
])


// 当页面号改变时调用下面的方法
const handleCurrentChange = (page) => {
    pageNum.value = page;
    if (!isExplore.value)
        getNewsList(newsType.value, pageSize.value, page)
    else
        getNewsExploreList(newsType.value, queryInfo.title, queryInfo.source_org, pageSize.value, page)
}
const handleSizeChange = (size) => {
    pageSize.value = size;
    if (!isExplore.value)
        getNewsList(newsType.value, size, pageNum.value)
    else
        getNewsExploreList(newsType.value, queryInfo.title, queryInfo.source_org, size, pageNum.value)
}

// 获取新闻数据，初始化页面
const newsList = reactive([])
const getNewsList = (value, pageSize = 8, pageNum = 1) => {
    getNewInfoAPI(value, pageSize, pageNum).then(res => {
        newsList.splice(0, newsList.length, ...res.data.rows)
        newsNum.value = res.data.newsNum
    }).catch(error => console.log(error))
}

// 进行新闻的高级查询  flag在这里是用来判断该搜索是点击按钮时，还是下面的页码
const getNewsExploreList = (type, tilte = '', sourceOrg = '', pageSize = 8, pageNum = 1, flag = 1) => {
    getNewExploreAPI(type, tilte, sourceOrg, pageSize, pageNum).then(res => {
        newsList.splice(0, newsList.length, ...res.data.rows)
        newsNum.value = res.data.newsNum
        isExplore.value = true
        if (flag === 0)
            exploreMsg()
    }).catch(error => console.log(error))
}
onMounted(() => getNewsList('logistics'))

// 用于切换不同新闻的时候调用的
const show = (value) => {
    pageNum.value = 1   // 将页面切换回一号页面
    getNewsList(value, pageSize.value, pageNum.value)  // 重新加载新闻
    index.value = value === 'LastMile' ? 2 : 1
}

// 实现当搜索成功时候弹出提示框
const exploreMsg = async () => {
    pageNum.value = 1   // 将页面切换回一号页面
    ElMessage({         // 弹出提示搜索结果消息
        showClose: true,
        message: '搜索成功',
        type: 'success',
    })
}
// const isPopupVisible = ref(false);

// const showPopup = () => {
//     isPopupVisible.value = true;
// };

// const hidePopup = () => {
//     isPopupVisible.value = false;
// }

</script>
<style scoped>
.container {
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
}

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


.bolck {
    margin-top: 100px;
    /* margin-left: 600px; */
    display: flex;
    justify-content: space-around;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>