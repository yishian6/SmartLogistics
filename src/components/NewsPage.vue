<template>
    <div class="container">
        <div>
            <div class="title">{{ newsInfo.title }}</div>
            <hr>
            <div class="infostyle">
                <span>发布时间: {{ newsInfo.publish_date }}&nbsp;&nbsp;</span>
                <span>&nbsp;&nbsp;来源: {{ newsInfo.source_org }}</span>
            </div>
            <div class="content">
                <!-- <span class="paragraph" v-for="(paragraph, index) in newsInfo.content" :key="index">{{ paragraph }}</span> -->
                {{ newsInfo.content }}
            </div>
            <hr>
        </div>
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

const getNewsRecommend = () => {
    getNewsRecommendAPI(reqInfo.id, reqInfo.newsType).then(res => {
        newsInfo.value = res.data.info[0]
        newsRecList.splice(0, newsRecList.length, res.data.recommend)
    }).catch(error => console.log(error))

}
onMounted(() => getNewsRecommend())
</script>

<style scoped>
.container {
    width: 80.26%;
    margin: 0 auto;
}

.title {
    color: #333333;
    font-weight: bold;
    font-size: 22px;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
}

hr {
    width: 80%;
    border: 1.5px solid #617dcc;
    /* 设置边框样式为实线，宽度为 1 像素，颜色为黑色 */

}

.infostyle {
    font-size: 12px;
    text-align: center;
}

.content {
    white-space: pre-line;
    font-family: 宋体, simsun;
    font-size: 18px;
    line-height: 2em;
    width: 70%;
    margin: 15px auto;

}

.paragraph {
    text-indent: 2em;
    /* line-height: 1.25em; */
}
</style>