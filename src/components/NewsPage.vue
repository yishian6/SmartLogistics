<template>
    <div class="containers">
        <div class="title">{{ newsInfo.title }}</div>
        <div class="infostyle">
            <span>发布时间: {{ newsInfo.publish_date }}&nbsp;&nbsp;</span>
            <span>&nbsp;&nbsp;来源: {{ newsInfo.source_org }}</span>
        </div>
        <div class="content">
            <p class="paragraph" v-for="(paragraph, index) in newsContentList" :key="index">{{ paragraph }}</p>
        </div>
        <div class="monitor">
            <el-row :gutter="20" class="monitor-header">
                <el-col>
                    <el-row class="monitor-cart-box" :gutter="20">
                        <el-col :span="24">
                            <div class="monitor-cart-name">
                                <div class="monitor-cart-name-left">
                                    <div class="monitor-cart-name-left-icon">
                                    </div>
                                    相似新闻
                                </div>
                            </div>
                        </el-col>
                        <el-row class="recommend">
                            <el-card v-for="news in newsRecList" :key="news.id" class="itemList">
                                <el-row type="flex" justify="space-between">
                                    <el-col class="rectitle" :span="21.4">
                                        <RouterLink :to="`/news/page/${news.id}/${reqInfo.newsType}`">{{ news.title }}
                                        </RouterLink>
                                    </el-col>
                                    <el-col class="publish_date" :span="2.6">{{ news.publish_date }}</el-col>
                                </el-row>
                            </el-card>
                        </el-row>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <div class="bottom"></div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
import { getNewsRecommendAPI } from '@/apis/news'
const route = useRoute()
// 请求的信息
const reqInfo = reactive({
    id: route.params.id,
    newsType: route.params.newsType
})
// 用来存放该新闻的信息
const newsInfo = ref({})
// 推荐新闻的信息
const newsRecList = reactive([])
// 用来保存新闻的正文
const newsContentList = reactive([])

const getNewsRecommend = () => {
    getNewsRecommendAPI(reqInfo.id, reqInfo.newsType).then(res => {
        newsInfo.value = res.data.info[0]
        newsRecList.splice(0, newsRecList.length, ...res.data.recommend)
        newsContentList.splice(0, newsContentList.length, ...newsInfo.value.content.split('\n'))
    }).catch(error => console.log(error))

}
onMounted(() => {
    getNewsRecommend()
})
</script>

<style scoped>
.containers {
    background: #ffffff;
    width: 80.26%;
    margin: 0 auto;
}

.title {
    color: #333333;
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 2.5px solid rgb(223, 173, 175)
}

.infostyle {
    font-size: 14px;
    text-align: center;
    margin-top: 5px;
}

.content {
    white-space: pre-line;
    font-family: 宋体, simsun;
    font-size: 16px;
    line-height: 2em;
    width: 75%;
    margin: 15px auto;

}

.paragraph {
    text-indent: 2em;
    line-height: 1.75em;
}

/* 推荐部分 */
/* .monitor {
    width: 90%;
    margin: 0 auto;
} */

.monitor-header {
    /* border: 1px solid #E6E6E6; */
    background: #ffffff;
    border-radius: 5px;
    width: 100%;
    margin-top: 20px;
}

.monitor-cart-box {
    /* background: chocolate; */
    width: 100%;
    height: 400px;
    padding: 10px 15px 0;
    /* border: 1px solid #E6E6E6; */
    background: #ffffff;
    border-radius: 5px;
    margin-bottom: 40px;
    margin-left: 20px;
}

.monitor-cart-name {
    width: 100%;
    height: 50px;
    /* background: yellow; */
    margin-bottom: 20px;
    border-bottom: 1px solid #E6E6E6;
}

.monitor-cart-name-left {
    width: 160px;
    height: 100%;
    /* background: blueviolet; */
    line-height: 42px;
    color: #5C5C5C;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
}

.monitor-cart-name-left-icon {
    width: 30px;
    height: 30px;
    background: #F7EEFF;
    border-radius: 2px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
}

.monitor-cart-name-left-icon-s {
    width: 20px;
    height: 20px;
    color: blueviolet;
    fill: currentColor;
}

.itemList {
    margin-bottom: 1%;
    width: 100%;
    height: 60px;
}

.rectitle {
    font-size: 16px;
}

/* .monitor-cart-box {
    margin-left: -20px;
    margin-right: -20px;
} */
.bottom {
    width: 100%;
    height: 30px;
}
</style>