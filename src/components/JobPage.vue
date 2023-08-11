<template>
    <div class="monitor">
        <!-- <div>
            <Layout />
        </div> -->
        <!--推荐列表-->
        <div class="main">
            <el-row class="center">{{ jobInfo.job_name }}</el-row>
            <el-row :gutter="20" class="monitor-header">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
                    <el-row class="monitor-cart-box-two" :gutter="20">
                        <el-col :span="24">
                            <div class="monitor-cart-name">
                                <div class="monitor-cart-name-left">
                                    <div class="monitor-cart-name-left-icon">
                                    </div>
                                    岗位详情
                                </div>
                            </div>
                        </el-col>
                        <el-row class="jobInfo">
                            <el-table :data="jobRecTableList" :cell-style="cellStyle" style="width: 100%;">
                                <el-table-column prop="key" label="" width="300">
                                </el-table-column>
                                <el-table-column prop="value" label="" width="550">
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </el-row>
                </el-col>
            </el-row>

            <el-row :gutter="20" class="monitor-header">
                <el-col>
                    <el-row class="monitor-cart-box" :gutter="0">
                        <el-col :span="24" :gutter="0" style="height: 60px;">
                            <div class="monitor-cart-name">
                                <div class="monitor-cart-name-left">
                                    <div class="monitor-cart-name-left-icon">
                                    </div>
                                    相似岗位
                                </div>
                            </div>
                        </el-col>
                        <el-row class="recommend">
                            <el-col v-for="item in jobRecList" :key="item.id" class="reccol">
                                <el-card class="offers">
                                    <RouterLink :to="`/job/page/${item.id}`">
                                        <div class="infosty">
                                            <div>
                                                <span class="job_name">{{ item.job_name }}</span>
                                                <span class="date_two">{{ item.publish_date }}</span>
                                            </div>
                                            <a :href="item.company_address" class="company_name">{{ item.company_name }}</a>
                                        </div>
                                    </RouterLink>
                                    <RouterLink :to="`/job/page/${item.id}`">
                                        <div class="infosty">
                                            <div>
                                                <span class="salary">{{ item.salary }}</span>
                                                <span class="recruit_conditions">{{ item.recruit_conditions }}</span>
                                            </div>
                                            <span class="company_type">{{ item.company_type }}|{{ item.company_scale
                                            }}</span>
                                        </div>
                                    </RouterLink>
                                    <div class="infosty">
                                        <span class="benefits">{{ item.benefits }}</span>
                                        <span class="main_business">{{ item.main_business }}</span>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-row>
                </el-col>
            </el-row>
            <div class="bottom"></div>
        </div>
    </div>
</template>

<script setup>
import { getJobRecommendAPI } from '@/apis/job'
import { useRoute } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
const route = useRoute()
// 请求的信息
const reqInfo = reactive({
    id: route.params.id,
})
// 用来存放该新闻的信息
const jobInfo = ref({})
// 推荐新闻的信息
const jobRecList = reactive([])
const jobRecTableList = reactive([])
const addJObRecList = () => {
    jobRecTableList.push(
        {
            key: "发布日期",
            value: jobInfo.value.publish_date
        },
        {
            key: "公司名称",
            value: jobInfo.value.company_name
        },
        {
            key: "公司规模",
            value: jobInfo.value.company_scale
        },
        {
            key: "招聘要求",
            value: jobInfo.value.recruit_conditions
        },
        {
            key: "主要业务",
            value: jobInfo.value.main_business
        },
        {
            key: "薪资水平",
            value: jobInfo.value.salary
        },
        {
            key: "福利待遇",
            value: jobInfo.value.benefits
        },
        {
            key: "工作地址",
            value: jobInfo.value.location
        },
    )
}

const cellStyle = ({ row, column }) => {
    if (column.property === 'value') {
        switch (row.value) {
            case '有效':
                return {
                    color: 'green',
                }
            case '无效':
                return {
                    color: 'red',
                }
        }
    }
}

const getJobRecommend = () => {
    getJobRecommendAPI(reqInfo.id).then(res => {
        jobInfo.value = res.data.info[0]
        jobRecList.splice(0, jobRecList.length, ...res.data.recommend)
        addJObRecList()
    }).catch(error => console.log(error))

}
onMounted(() => getJobRecommend())
</script>

<style scoped>
.monitor {
    background: #F5F7F9;
    padding: 25px;
    width: 100%;
    min-height: 100%;
}

.main {
    width: 80.26%;
    margin: 0 auto;
}

.center {
    font-size: 24px;
    margin-top: 2%;
    margin-bottom: 2%;
    display: flex;
    justify-content: center;
}

.monitor-header {
    border: 1px solid #E6E6E6;
    background: #ffffff;
    border-radius: 5px;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: left;
}

.jobInfo {
    margin-bottom: 2%;
    margin-right: 5%;
    margin-left: 10%;
}

.monitor-cart-name {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #E6E6E6;
    display: flex;
    justify-content: left;
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

.reccol {
    margin-bottom: 10px;
}

.offers {
    /* margin-bottom: 10px; */
    overflow: hidden;
    background-color: #fff;
    transition: all 0.5s;
    margin-left: 4%;
    margin-bottom: 10px;
    width: 90%;

}

.infosty {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
}

.job_name {
    max-width: 280px;
    font-size: 16px;
    color: #0058a6;
}

.date_two {
    font-size: 14px;
    color: #999;
    margin-left: 8px;
}

.company_name {
    font-size: 16px;
    color: #0058a6;
}

.salary {
    font-size: 16px;
    color: #ff6000;
    margin-right: 16px;
}

.recruit_conditions {
    max-width: 600px;
    font-size: 14px;
    color: #666;
}

.company_type {
    font-size: 14px;
    color: #666;
    margin-right: 0;
}

.benefits {
    font-size: 12px;
    color: #999;
    width: 80%;
    /* 禁止文本换行 */
    white-space: nowrap;
    /* 隐藏超出容器的内容 */
    overflow: hidden;
    /* 超出容器时显示省略号 */
    text-overflow: ellipsis;
}

.main_business {
    font-size: 14px;
    color: #999;
}
</style>