<template>
  <div>
    <div class="search">
      <el-input placeholder="请输入内容" v-model="input" width="200px">
      </el-input>
      <el-button type="primary" @click="onSubmit">搜索</el-button>

    </div>
    <div class="job_two">
      <div v-for="item in jobList" :key="item.id" class="offers">
        <a href="#" target="_blank">
          <div class="first">
            <a href="#" class="job_name">{{ item.job_name }}</a>
            <span class="date_two">{{ item.publish_date }}</span>
            <a :href="item.company_address" class="company_name">{{ item.company_name }}</a>
          </div>
          <div class="second">
            <span class="salary">{{ item.salary }}</span>
            <span class="job_description">{{ item.recruit_conditions }}</span>
            <span class="company_type">{{ item.company_type }}|{{ item.company_scale }}</span>
          </div>
          <div class="second">
            <span class="treatment">{{ item.benefits }}</span>
            <span class="main_business">{{ item.main_business }}</span>
          </div>
        </a>
      </div>
      <div class="block_two">
        <el-pagination layout=" pager" @current-change="currentChange" :total="50">
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
import { getJobListAPI } from '@/apis/job'
import { reactive, onMounted } from 'vue'

// 用来存放岗位数据
const jobList = reactive([])
const getJobList = getJobListAPI(5, 1).then(res => jobList.splice(0, jobList.length, ...res.data.rows)).catch(error => console.log(error))

onMounted(() => getJobList)

</script>


<style>
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

.job_description {
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

.treatment {
  font-size: 12px;
  color: #999;
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

.search {
  width: 41.25%;
  height: 40px;
  margin-left: 220px;
  margin-top: 50px;
}

.charts {
  float: right;
  margin-right: 3.2%;
  margin-top: 150px;
}

.job_two {
  margin-bottom: 100px;
  margin-top: 40px;
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