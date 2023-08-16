<template>
  <div>
    <div class="search">
      <!-- 搜索条件 -->
      <el-row :gutter="20" class="queryInfo">
        <el-col :xs="8" :sm="6" :md="6" :lg="5" :xl="5">
          <el-input class="queryInfo-li-one" v-model="queryInfo.name" clearable size="large"
            placeholder="请输入岗位名称"></el-input>
        </el-col>
        <el-select v-model="queryInfo.company_type" placeholder="公司分类选择" clearable size="large">
          <el-option v-for="item in company_type" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="queryInfo.location" placeholder="地理位置选择" clearable size="large">
          <el-option v-for="item in location" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>

        <el-select v-model="queryInfo.main_business" placeholder="主要业务选择" clearable size="large">
          <el-option v-for="item in main_business" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2">
          <el-button type="primary" :plain="true" class="goodsindex-queryInfo-li-two"
            @click="getJobExploreList(queryInfo.name, queryInfo.company_type, queryInfo.location, queryInfo.main_business, pageSize, 1, 0)"
            size="large">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="job_two">
      <JobChat />
      <div v-for="item in jobList" :key="item.id" class="offers">
        <RouterLink :to="`/job/page/${item.id}`" target="_blank">
          <div class="first">
            <span class="job_name">{{ item.job_name }}</span>
            <span class="date_two">{{ item.publish_date }}</span>
            <a :href="item.company_address" class="company_name">{{ item.company_name }}</a>
          </div>
        </RouterLink>
        <div class="second">
          <span class="salary">{{ item.salary }}</span>
          <span class="recruit_conditions">{{ item.recruit_conditions }}</span>
          <span class="company_type">{{ item.company_type }}|{{ item.company_scale }}</span>
        </div>
        <div class="second">
          <span class="benefits">{{ item.benefits }}</span>
          <span class="main_business">{{ item.main_business }}</span>
        </div>

      </div>
      <div class="block_two">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
          :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="jobNum">
        </el-pagination>
      </div>
      <div style="width:600px;height:100px;"></div>
    </div>
    <div class="charts">
      <div style="width:600px;height:400px;">
        <div id="myChart" style="width:100%;height:278px;"></div>
      </div>
      <div style="width:600px;height:400px;">
        <div id="myChart4" style="width:100%;height:250px;float:left;"></div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { getJobListAPI, getJobExploreAPI, getJobCountAPI } from '@/apis/job'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import JobChat from './JobChat.vue'
import * as echarts from 'echarts';
// isExplore
const isExplore = ref(false)

// 岗位数量
const jobNum = ref(0)
// pageSize表示页面新闻数
const pageSize = ref(5)
const pageNum = ref(1)

// 搜索条件
const queryInfo = reactive({
  name: '',
  company_type: '',
  location: '',
  main_business: ''
})

// 高级搜索的选项
const company_type = reactive([
  {
    value: '民营',
    label: '民营'
  },
  {
    value: '合资',
    label: '合资'
  },
  {
    value: '外资（非欧美)',
    label: '外资（非欧美)'
  },
  {
    value: '外资（欧美）',
    label: '外资（欧美）'
  },
  {
    value: '国企',
    label: '国企'
  },
  {
    value: '已上市',
    label: '已上市'
  },
  {
    value: '创业公司',
    label: '创业公司'
  },
  {
    value: '外企代表处',
    label: '外企代表处'
  },
])
const location = reactive([
  {
    value: '南京·江宁区',
    label: '南京·江宁区'
  },
  {
    value: '南京',
    label: '南京'
  },
  {
    value: '南京·秦淮区',
    label: '南京·秦淮区'
  },
  {
    value: '南京·栖霞区',
    label: '南京·栖霞区'
  },
  {
    value: '南京·鼓楼区',
    label: '南京·鼓楼区'
  },
  {
    value: '南京·雨花台区',
    label: '南京·雨花台区'
  },
  {
    value: '南京·江北新区',
    label: '南京·江北新区'
  },
  {
    value: '南京·建邺区',
    label: '南京·建邺区'
  },
  {
    value: '南京·浦口区',
    label: '南京·浦口区'
  },
  {
    value: '南京·六合区',
    label: '南京·六合区'
  },
  {
    value: '南京·溧水区',
    label: '南京·溧水区'
  },
  {
    value: '南京·玄武区',
    label: '南京·玄武区'
  },
  {
    value: '其他',
    label: '其他'
  }
])
const main_business = reactive([
  {
    value: '交通/运输/物流',
    label: '交通/运输/物流'
  },
  {
    value: '机械/设备/重工',
    label: '机械/设备/重工'
  },
  {
    value: '互联网/电子商务',
    label: '互联网/电子商务'
  },
  {
    value: '新能源',
    label: '新能源'
  },
  {
    value: '仪器仪表/工业自动化',
    label: '仪器仪表/工业自动化'
  },
  {
    value: '计算机软件',
    label: '计算机软件'
  },
  {
    value: '贸易/进出口',
    label: '贸易/进出口'
  },
  {
    value: '制药/生物工程',
    label: '制药/生物工程'
  },
  {
    value: '汽车',
    label: '汽车'
  },
  {
    value: '医疗设备/器械',
    label: '医疗设备/器械'
  },
  {
    value: '电子技术/半导体/集成电路',
    label: '电子技术/半导体/集成电路'
  },
])
// 用来存放岗位数据
const jobList = reactive([])
// 岗位界面初始化
const getJobList = (size = 5, num = 1) => {
  getJobListAPI(size, num).then(res => {
    jobList.splice(0, jobList.length, ...res.data.rows)
    jobNum.value = res.data.total
  }).catch(error => console.log(error))
}

// 进行新闻的高级查询
const getJobExploreList = (name = '', type = '', location = '', mainBusiness = '', pageSize = 8, pageNum = 1, flag = 1) => {
  getJobExploreAPI(name, type, location, mainBusiness, pageSize, pageNum).then(res => {
    jobList.splice(0, jobList.length, ...res.data.rows)
    jobNum.value = res.data.jobNum
    isExplore.value = true
    if (flag === 0)
      exploreMsg()
  }).catch(error => console.log(error))
}

// 当页面号改变时调用下面的方法
const handleCurrentChange = (page) => {
  pageNum.value = page;
  if (isExplore.value)
    getJobExploreList(queryInfo.name, queryInfo.company_type, queryInfo.location, queryInfo.main_business, pageSize.value, page)
  else
    getJobList(pageSize.value, page)

}
// 当页面的大小改变时调用
const handleSizeChange = (size) => {
  pageSize.value = size;
  if (isExplore.value)
    getJobExploreList(queryInfo.name, queryInfo.company_type, queryInfo.location, queryInfo.main_business, size, pageNum.value)
  else
    getJobList(size, pageNum.value)
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

//实现图表
const getJobCount = () => {
  getJobCountAPI().then(res => {
    // console.log(res, "getJobCount")
    const salaryList = res.data.salary_count
    const areaList = res.data.area_count
    let dataArray = []
    Object.keys(salaryList).forEach((item) => {
      const obj = {
        value: salaryList[item],
        name: item
      }
      dataArray.push(obj)
    })
    console.log(dataArray)
    // 销毁现有的图表实例
    const existingChart = echarts.getInstanceByDom(document.getElementById('myChart'));
    if (existingChart) {
      existingChart.dispose();
    }
    const chartDom = document.getElementById('myChart');
    const myChart = echarts.init(chartDom);
    const option = {
      title: {
        text: '薪酬',
        left: 'left'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        bottom: 0,
      },
      series: [
        {
          name: '薪酬范围',
          type: 'pie',
          radius: ['70%', '90%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: dataArray
        }
      ]
    };

    option && myChart.setOption(option);

    const existingChart4 = echarts.getInstanceByDom(document.getElementById('myChart4'));
    if (existingChart4) {
      existingChart4.dispose();
    }
    const myChart4 = echarts.init(document.getElementById('myChart4'))
    myChart4.setOption({
      title: {
        text: '地域'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        y: 'top',
      },
      xAxis: {
        data: areaList[0],
        axisLabel: {
          interval: 0,//代表显示所有x轴标签显示
          rotate: 45, //代表逆时针旋转45度
        }
      },
      yAxis: {},
      series: [{
        name: '地域',
        type: 'bar',
        data: areaList[1],

      }],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    })


  }).catch(error => console.log(error))
}

onMounted(() => {
  getJobList()
  getJobCount()
})
</script>


<style scoped>
.search {
  /* margin-left: 220px; */
  margin-top: 50px;
}

.queryInfo {
  margin-left: 220px;
}

.queryInfo-li-one {
  width: 100%;
  height: auto;
  margin-left: 45%
}

.offers {
  margin-bottom: 8px;
  /* position: relative; */
  overflow: hidden;
  padding: 16px 32px 16px 38px;
  background-color: #fff;
  transition: all 0.5s;
  margin-left: 6.8%;
  margin-top: 50px;
  width: 700px;

}

.el-input__inner {
  border-radius: 10px;
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
  float: right;
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
  float: right;
}

.benefits {
  font-size: 12px;
  color: #999;
  display: inline-block;
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
  float: right;
}

.first {
  margin-bottom: 10px;
}

.second {
  margin-bottom: 10px;
}

.block_two {
  margin-left: 50%;
  float: left;
  margin-bottom: 100px;
  margin-top: 10px;
}

.el-input {
  width: 50%;
  display: inline-block;
}

.el-input__inner {
  width: 100%;
  display: inline-block;
}

.el-button {
  display: inline-block;
}

.charts {
  float: right;
  margin-right: 2.2%;
  margin-top: 150px;
}

.job_two {
  margin-bottom: 100px;
  margin-top: 15px;
  margin-left: 20px;
  width: 41.25%;
  height: 400px;
  float: left;
  background-color: white;
  border-radius: 20px;
  user-select: text;
}

body {
  background-color: #fff;
}
</style>