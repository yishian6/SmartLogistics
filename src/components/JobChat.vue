<template>
    <div class="ui_guide">
        <!-- v-show="!change" @click="changeL" 这个是用来实现图标和聊天框的切换的 -->
        <i class="iconfont icon-jiqiren1" v-show="!change" @click="changeL"></i>
        <div class="chat" v-show="change">
            <div class="title">
                <span><i class="iconfont icon-shezhi"></i></span>
                <span>岗位推荐<i class="iconfont icon-xiangxia"></i></span>
                <span><i class="iconfont icon-suoxiao" @click="changeL"></i></span>
            </div>
            <ul class="text" ref="msgBox">
                <li v-for="(messageItem, index) in messageList" :key="index"
                    :class="[messageItem.type === 'sent' ? 't2' : 't1']">
                    <img src="@/assets/images/pika2.gif" alt="" v-show="messageItem.type !== 'sent'" />
                    <div class="txt" v-if="messageItem.content === '请输入您的岗位需求!' || messageItem.type === 'sent'">{{
                        messageItem.content }}</div>
                    <div class="txt" v-else>
                        下面是推荐的岗位，请您参考！
                        <el-card v-for="item in messageItem.content" :key="item.id">
                            <RouterLink :to="`/job/page/${item.id}`" target="_blank">
                                <div>
                                    <span class="job_name">{{ item.job_name }}</span>
                                    <span class="salary">{{ item.salary }}</span>
                                    <span class="location">{{ item.location }}</span>
                                    <span class="date_two">{{ item.publish_date }}</span>
                                </div>
                            </RouterLink>
                        </el-card>
                    </div>
                    <img src="@/assets/images/duola2.jpg" alt="" v-show="messageItem.type === 'sent'" />

                </li>
            </ul>
            <div class="cont">
                <input type="text" placeholder="在这里输入文字" class="inp" v-model="message" />
                <input type="button" value="发送" @click="sendMessage" class="send">
            </div>
        </div>
    </div>
</template>


<script setup>
import { getJobSmartRecAPI } from '@/apis/job';
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
// 用来控制图标和聊天框的切换
const change = ref(false)

// 用来保存输入框输入的信息
const message = ref('')
const msgBox = ref('')
// 保存每次聊调框的内容
const messageList = reactive([
    { type: 'received', content: '请输入您的岗位需求!' }
]);

const changeL = () => {
    change.value = !change.value
}
const sendMessage = () => {
    if (message.value === '') {
        ElMessage({
            message: '输入内容不能为空!!!',
            type: 'warning',
        })
        return;
    }

    const sentMessage = { type: 'sent', content: message.value };
    messageList.push(sentMessage);
    scrollMsgBottom();

    getJobSmartRecAPI(message.value).then(res => {
        const receivedMessage = { type: 'received', content: res.data };
        messageList.push(receivedMessage);
        scrollMsgBottom();
    }).catch(error => console.log(error))

    message.value = '';
}
const scrollMsgBottom = () => {
    msgBox.value.scrollTop = msgBox.value.scrollHeight;
}

document.onkeydown = function () {
    var e = window.event || arguments.callee.caller.arguments[0]   //  arguments.callee.caller.arguments[0]也相当于window.event的值
    e.keyCode === 13 && sendMessage();
}
</script>


<style scoped>
.ui_guide .chat {
    width: 348px;
    height: 510px;
    background-color: #f5f5f5;
    box-sizing: border-box;
    background-size: cover;
    border-radius: 20px;
    /* background-image: url("../5.png"); */
    resize: both;
    overflow: hidden;
    position: fixed;
    left: 10px;
    top: 27.5%;
}

.ui_guide .chat .title {
    width: 100%;
    height: 56px;
    line-height: 56px;
    text-align: center;
    font-size: 18px;
    background-color: #c2c0c7;
    color: #f9f9f9;
    display: flex;
    justify-content: space-around;
}

.ui_guide .chat .text {
    width: 100%;
    height: 410px;
    padding: 0 12px 10px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    margin-top: 0px
}

.ui_guide .chat .text::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}

.ui_guide .chat .text::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    background: #7b889c;
}

.ui_guide .chat .text::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
    border-radius: 5px;
    background: #d9dde4;
}

.ui_guide .chat .text li {
    /* width: 90%; */
    margin-top: 15px;
    box-sizing: border-box;
    list-style-type: none
}

.ui_guide .chat .text li img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.ui_guide .chat .text .txt {
    min-height: 40px;
    font-size: 15px;
    line-height: 24px;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 6px;
    border: 1px solid #d8d8d8;
    color: #333;
}

.ui_guide .chat .text .t1 {
    display: flex;
    justify-content: left;
}

.ui_guide .chat .text .t2 {
    display: flex;
    justify-content: right;
}

.ui_guide .chat .text .t1 img {
    margin-right: 10px;
}

.ui_guide .chat .text .t2 img {
    margin-left: 10px;
}

.ui_guide .chat .text .t2 img:hover {
    transform: rotate(666turn);
    transition-duration: 59s;
    transition-property: all;
    transition-timing-function: cubic-bezier(.34, 0, .84, 1);
    transition-delay: 1s;
}

.ui_guide .chat .text .t1 .txt {
    margin-right: 30px;
    background-color: #fff;
}

.ui_guide .chat .text .t2 .txt {
    margin-left: 30px;
    background-color: #98e855;
}

.job_name {
    font-size: 14px;
    color: #0058a6;
    margin-right: 3%;
}

.date_two {
    font-size: 10px;
    color: #999;

}

.salary {
    font-size: 12px;
    color: #ff6000;
    margin-right: 3%;
}

.location {
    font-size: 14px;
    color: #0058a6;
    margin-right: 3%;
}

.ui_guide .chat .cont {
    width: 100%;
    height: 52px;
    z-index: 10;
    background-color: #ebebeb;
    box-sizing: border-box;
    box-shadow: 0 -2px 5px #d8d8d8;
    margin-top: 3px
}

.ui_guide .chat .cont .inp {
    width: 80%;
    height: 36px;
    margin: 0;
    padding: 5px 10px;
    padding-left: 15px;
    border: 1px solid #d8d8d8;
    color: #333;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 18px;
    margin-left: 5px;
    margin-top: 1%;
}

.ui_guide .chat .cont .inp::-webkit-input-placeholder {
    color: #999;
}

.ui_guide .chat .cont .inp::-moz-placeholder {
    color: #999;
}

.ui_guide .chat .cont .inp::-ms-input-placeholder {
    color: #999;
}

.ui_guide .chat .cont .send {
    width: 15%;
    height: 33px;
    line-height: 3px;
    text-align: center;
    color: #3b3a3f;
    background-color: #cccccc;
    border: 0;
    border-radius: 20px;
    font-weight: bold;
    margin-left: 3px;
}

.ui_guide .chat .cont .send:hover {
    background-color: #02cb0b
}

.iconfont {
    font-size: 20px;
}

.icon-jiqiren1 {
    font-size: 32px;
    color: rgb(43, 126, 154);
    position: fixed;
    left: 0px;
    top: 60%;
}

.el-card__body {
    padding: 0px;
}
</style>