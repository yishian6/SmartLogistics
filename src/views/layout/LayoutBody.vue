<template>
    <div class="index">
        <div class="all">
            <!-- 轮播图（未加连接） -->
            <el-carousel height="400px">
                <el-carousel-item v-for="item in imgArray" :key="item">
                    <a :href="item.href" target="_blank"><img :src="item.url" class="rightImg"></a>
                </el-carousel-item>
            </el-carousel>
            <div class="job">
                <p class="title">岗位招聘</p>
                <span>
                    <RouterLink to="/job" class="more">More</RouterLink>
                </span>
                <div class="design" v-for="item in indexInfo.job" :key="item.id">
                    <span class="showtext">
                        <RouterLink :to="`/job/page/${item.id}`" class="small">&nbsp;>&nbsp;{{ item.job_name }}</RouterLink>
                    </span>
                    <span class="date">{{ item.publish_date }}</span>
                </div>
            </div>
            <div class="news_one">
                <p class="title">乡村振兴</p>
                <span>
                    <RouterLink to="/news" class="more">More</RouterLink>
                </span>
                <div class="design" v-for="item in indexInfo.newsR" :key="item.id">
                    <span class="showtext">
                        <RouterLink :to="`/news/page/${item.id}/${newsType.rural}`" class="small">&nbsp;>&nbsp;{{ item.title
                        }}</RouterLink>
                    </span>
                    <span class="date">{{ item.publish_date }}</span>
                </div>
            </div>
            <div class="news_two">
                <p class="title">最后一公里</p>
                <span>
                    <RouterLink to="/news" class="more">More</RouterLink>
                </span>
                <div class="design" v-for="item in indexInfo.newsL" :key="item.id">
                    <span class="showtext">
                        <RouterLink :to="`/news/page/${item.id}/${newsType.last}`" class="small">&nbsp;>&nbsp;{{ item.title
                        }}</RouterLink>
                    </span>
                    <span class="date">{{ item.publish_date }}</span>
                </div>
            </div>
        </div>
        <div class="bottom">
            <span class="bottom_img"><a href="https://www.njupt.edu.cn" target="_blank"><img
                        src="@/assets/images/Bottom_one.png" alt="南京邮电大学" width="300px" height="70px"></a></span>
            <span class="bottom_img"><a href="http://www.spb.gov.cn/" target="_blank"><img
                        src="@/assets/images/Bottom_two.png" alt="国家邮政局" width="300px" height="70px"></a></span>
            <span class="bottom_img"><a href="http://simp.njupt.edu.cn/" target="_blank"><img
                        src="@/assets/images/Bottom_three.png" alt="南京邮电大学现代邮政学院" width="300px" height="70px"></a></span>
            <span class="bottom_img"><a href="http://cnxczx.net/" target="_blank"><img
                        src="@/assets/images/Bottom_forth.png" alt="乡村振兴网" width="300px" height="70px"></a></span>
        </div>
    </div>
</template>
<script setup>
import img1 from '@/assets/images/1.png';
import img2 from '@/assets/images/2.png';
import img3 from '@/assets/images/3.png';

import { reactive, onMounted } from 'vue'
import { getIndexInfoAPI } from '@/apis/layout';
const imgArray = reactive([
    { url: img1, href: "http://www.gov.cn/zhengce/2021-08/23/content_5632881.htm" },
    { url: img2, href: "http://www.gov.cn/zhengce/2021-02/21/content_5588098.htm" },
    { url: img3, href: "http://www.gov.cn/xinwen/2022-03/21/content_5680152.htm" }
])
// // 判断鼠标是移入
// let isHovered = ref(false)

// 用来保存页面展示的数据的
// const indexInfo = ref(null)
const newsType = reactive({
    last: 'LastMile',
    rural: 'Rural'
})
const indexInfo = reactive({
    job: '',
    newsL: '',
    newsR: ''
})
const getIndexInfo = getIndexInfoAPI().then(res => {
    indexInfo.job = res.data.job,
        indexInfo.newsL = res.data.newsL,
        indexInfo.newsR = res.data.newsR
}).catch(error => console.log(error))

onMounted(() => getIndexInfo)
</script>

<style scoped> .all {
     background-color: white;
 }

 .el-carousel {
     width: 41.25%;
     height: 400px;
     margin-left: 8.25%;
     float: left;
     background-color: gainsboro;
     padding: auto;
     margin-top: 40px;
     border-radius: 20px;
     box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);

 }

 .rightImg {
     width: 100%;
     height: 400px;
 }

 .title {
     font-size: 22px;
     color: #081562;
     margin-top: 10px;
     margin-left: 20px;
     padding-top: 5px;
     display: inline-block;
 }

 .job {
     margin-top: 40px;
     margin-left: 20px;
     width: 41.25%;
     height: 400px;
     float: left;
     background-color: white;
     border-radius: 20px;
     box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
 }

 .design {
     display: flex;
     justify-content: space-between;
 }

 .news_one {
     width: 41.25%;
     height: 410px;
     float: left;
     margin-left: 8.25%;
     margin-bottom: 100px;
     background-color: white;
     margin-top: 20px;
     border-radius: 20px;
     box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
 }

 .news_two {
     width: 41.25%;
     height: 410px;
     margin-top: 20px;
     float: left;
     margin-left: 20px;
     background-color: white;
     border-radius: 20px;
     box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
 }

 a {
     text-decoration: none;
     color: black;
     font-size: 16px;
     font: 400;
 }

 .showtext {
     width: 80%;
     /* 禁止文本换行 */
     white-space: nowrap;
     /* 隐藏超出容器的内容 */
     overflow: hidden;
     /* 超出容器时显示省略号 */
     text-overflow: ellipsis;
     margin-top: 20px;
 }

 /* 实现当鼠标放在a标签上，showtext对应得标签上 字体颜色改变 */
 .showtext:hover a {
     color: orange;

 }

 .showtext:hover {
     cursor: pointer;
 }

 .more {
     float: right;
     color: rgb(187, 187, 187);
     margin-right: 20px;
     margin-top: 10px;
 }

 .date {
     margin-right: 10px;
     padding-right: 0px;
     font-size: 16px;
     font: 400;
     margin-top: 20px;
 }

 .bottom {
     margin-left: 10.3%;
     width: 80.26%;
     display: flex;
     justify-content: space-around;
 }

 img {
     image-rendering: -moz-crisp-edges;
     image-rendering: -o-crisp-edges;
     image-rendering: -webkit-optimize-contrast;
     image-rendering: crisp-edges;
     -ms-interpolation-mode: nearest-neighbor;
 }
</style>