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
            @click="getJobExploreList(queryInfo.name, queryInfo.company_type, queryInfo.location, queryInfo.main_business, pageSize, pageNum)"
            size="large">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="job_two">
      <div v-for="item in jobList" :key="item.id" class="offers">
        <RouterLink :to="`/job/page/${item.id}`">
          <div class="first">
            <span class="job_name">{{ item.job_name }}</span>
            <span class="date_two">{{ item.publish_date }}</span>
            <a :href="item.company_address" class="company_name">{{ item.company_name }}</a>
          </div>
          <div class="second">
            <span class="salary">{{ item.salary }}</span>
            <span class="recruit_conditions">{{ item.recruit_conditions }}</span>
            <span class="company_type">{{ item.company_type }}|{{ item.company_scale }}</span>
          </div>
        </RouterLink>
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
    <!-- <div class="charts">
      <div style="width:600px;height:400px;">
        <div id="myChart" style="width:100%;height:278px;"></div>
      </div>
      <div style="width:600px;height:400px;">
        <div id="myChart4" style="width:100%;height:250px;float:left;"></div>
      </div>
    </div> -->
  </div>
</template>
<!-- <script>
export default {
  data() {
    return {

      currentPage: 1,
      pagesize: 5,
      input: "",
      myChart: '',
      opinionData2: [
        { value: 1, name: '3000以下', itemStyle: '#009999' },
        { value: 2, name: '3000-8000', itemStyle: '#1FC48D' },
        { value: 3, name: '8000-12000', itemStyle: '#6DC8EC' },
        { value: 3, name: '12000-15000', itemStyle: '#3F8FFF' },
        { value: 3, name: '15000-20000', itemStyle: '#ff6666' },
        { value: 3, name: '20000以上', itemStyle: '#ffcc00' }
      ],
      myChart4: '',
      opinion: ['上海', '苏州', '南京', '蚌埠', '南通', '合肥'],
      opinionData: [
        { value: 220, itemStyle: '#1ab394' },
        { value: 180, itemStyle: '#009999' },
        { value: 800, itemStyle: '#19CAAD' },
        { value: 600, itemStyle: '#8CC7B5' },
        { value: 570, itemStyle: '#A0EEE1' },
        { value: 310, itemStyle: '#BEE7E9' },
      ]

    }
  },
  mounted: function () {
    this.drawLine()
  },
  methods: {
    currentChange(val) {
      this.currentPage = val;
    },
    drawLine() {
      this.myChart = this.$echarts.init(document.getElementById('myChart'))
      this.myChart.setOption({
        title: {
          text: '薪酬', // 主标题
          subtext: '', // 副标题
          x: 'left' // x轴方向对齐方式
        },
        grid: { containLabel: true },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {d}%'
        },

        color: ['red', '#1FC48D', '#6DC8EC', '#3F8FFF', '#ff6666', '#ffcc00'],

        legend: {
          orient: 'vertical',
          icon: 'circle',
          align: 'left',
          x: 'right',
          y: 'bottom',
          data: ['3000以下', '3000-8000', '8000-12000', '12000-15000', '15000-20000', '20000以上']
        },
        series: [
          {
            name: '薪酬',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            center: ['40%', '50%'],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              color: function (params) {
                // 自定义颜色
                var colorList = ['#009999', '#1FC48D', '#6DC8EC', '#3F8FFF', '#ff6666', '#ffcc00']
                return colorList[params.dataIndex]
              }
            },
            data: this.opinionData2
          }
        ]
      })
      this.myChart4 = this.$echarts.init(document.getElementById('myChart4'))
      this.myChart4.setOption({
        title: {
          text: '地域'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          y: 'top',
        },
        xAxis: {
          data: this.opinion
        },
        yAxis: {},
        series: [{
          name: '地域',
          type: 'bar',
          data: this.opinionData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            color: function (params) {
              // 自定义颜色
              var colorList = ['#1ab394', '#009999', '#19CAAD', '#8CC7B5', '#A0EEE1', '#BEE7E9',]
              return colorList[params.dataIndex]
            }
          }
        }]
      })
    }
  }
}
</script> -->

<script setup>
import { getJobListAPI, getJobExploreAPI } from '@/apis/job'
import { reactive, ref, onMounted } from 'vue'

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
const getJobExploreList = (name = '', type = '', location = '', mainBusiness = '', pageSize = 8, pageNum = 1) => {
  getJobExploreAPI(name, type, location, mainBusiness, pageSize, pageNum).then(res => {
    jobList.splice(0, jobList.length, ...res.data.rows)
    jobNum.value = res.data.jobNum
    isExplore.value = true
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
const handleSizeChange = (size) => {
  pageSize.value = size;
  if (isExplore.value)
    getJobExploreList(queryInfo.name, queryInfo.company_type, queryInfo.location, queryInfo.main_business, size, pageNum.value)
  else
    getJobList(size, pageNum.value)
}
onMounted(() => getJobList())
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
  position: relative;
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
  margin-right: 3.2%;
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
}

body {
  background-color: #fff;
}
</style>