<template>
    <div class="ui_guide">
        <!-- v-show="!change" @click="changeL" 这个是用来实现图标和聊天框的切换的 -->
        <img src="@/assets/images/robot.png" alt="机器人" class="robot" v-show="!change" @click="changeL" />
        <div class="chat" v-show="change">
            <div class="title">
                <span><i class="iconfont icon-shezhi"></i></span>
                <span>岗位推荐<i class="iconfont icon-xiangxia"></i></span>
                <span><i class="iconfont icon-suoxiao" @click="changeL"></i></span>
            </div>
            <div>
                <ChatTips :sendTipMessage="sendTipMessage" />
                <ul class="text" v-scrollBottom>
                    <li v-for="(messageItem, index) in messageList" :key="index"
                        :class="[messageItem.type === 'sent' ? 't2' : 't1']">
                        <img src="@/assets/images/pika2.gif" alt="" v-show="messageItem.type !== 'sent'" />
                        <div class="txt" v-if="messageItem.content === '请输入您的岗位需求!' || messageItem.type === 'sent'">{{
                            messageItem.content }}</div>
                        <div class="txt" v-else-if="!messageItem.rec">{{ messageItem.content }}</div>
                        <div class="txt" v-else>
                            下面是推荐的岗位，请您参考！
                            <div v-for="item in messageItem.content" :key="item.id">
                                <RouterLink :to="`/job/page/${item.id}`" target="_blank">
                                    <div
                                        style="display: flex; flex-direction: column; margin-bottom: 10px; background-color: #f8f6f6;">
                                        <div style="display: flex; justify-content: space-between;">
                                            <span class="job_name">{{ item.job_name }}</span>
                                            <span class="salary">{{ item.salary }}</span>
                                        </div>
                                        <span class="company">{{ item.company_name }}</span>
                                    </div>
                                </RouterLink>
                            </div>
                        </div>
                        <img src="@/assets/images/duola2.jpg" alt="" v-show="messageItem.type === 'sent'" />
                    </li>
                </ul>
            </div>
            <div class="cont">
                <input type="text" placeholder="在这里输入文字" class="inp" v-model="message" @keydown.enter="sendMessage" />
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
import ChatTips from './ChatTips.vue';
const change = ref(false)

// 用来保存输入框输入的信息
const message = ref('')

// 保存每次聊调框的内容
const messageList = reactive([
    { type: 'received', content: '欢迎使用该服务，请输入您的岗位需求!' }
]);

const changeL = () => {
    change.value = !change.value
}

// 发送信息时调用的方法
const sendMessage = () => {
    if (message.value === '') {
        ElMessage({
            message: '输入内容不能为空!!!',
            type: 'warning',
        })
        return;
    }
    const sentMessage = { type: 'sent', content: message.value, rec: false };
    messageList.push(sentMessage);

    // 根据输入信息返回相应的输出信息
    if (message.value.includes('你好') || message.value.includes('您好')) {
        const receivedMessage = { type: 'received', content: '你好，我是岗位智能推荐服务，欢迎使用该服务！', rec: false };
        messageList.push(receivedMessage);
    }
    else if (message.value.includes('使用')) {
        const receivedMessage = { type: 'received', content: '请在聊天框输入你要查询的岗位信息包括岗位名称，薪水，地址，企业类型，例如南京市雨花台区的李先生，希望找到工资8000-10000的电子商务岗位，最好是外企！', rec: false };
        messageList.push(receivedMessage);
    }
    else if (message.value.includes('谢谢')) {
        const receivedMessage = { type: 'received', content: '不客气，欢迎下次使用！', rec: false };
        messageList.push(receivedMessage);
    }
    else
        getJobSmartRecAPI(message.value).then(res => {
            let receivedMessage;
            // 当没有查询到需求的时候返回这个信息
            if (Array.isArray(res.data)) {
                receivedMessage = { type: 'received', content: res.data, rec: true };
            }
            else {
                receivedMessage = { type: 'received', content: '抱歉没查到相关的岗位，请检查您的查询条件是求否正确!', rec: false };
            }
            messageList.push(receivedMessage);
        }).catch(error => console.log(error))

    message.value = '';
}

// 发送tips提示消息
const sendTipMessage = (sendVal, receivedVal) => {
    const sentMessage = { type: 'sent', content: sendVal, rec: false };
    messageList.push(sentMessage);
    const receivedMessage = { type: 'received', content: receivedVal, rec: false };
    messageList.push(receivedMessage);
}
</script>


<style scoped>
.ui_guide .chat {
    width: 348px;
    height: 510px;
    background-color: #f5f5f5;
    box-sizing: border-box;
    background-size: cover;
    border-radius: 10px;
    /* background-image: url("../5.png"); */
    resize: both;
    overflow: hidden;
    position: fixed;
    left: 10px;
    top: 26%;
    user-select: text;
}

.ui_guide .chat .title {
    width: 100%;
    height: 50px;
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
    font-size: 13px;
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
    font-size: 12px;
    color: #0058a6;
    margin-right: 3%;
}

/* .date_two {
    font-size: 10px;
    color: #999;

} */

.salary {
    font-size: 10px;
    color: #ff6000;
    margin-right: 3%;
}

.company {
    font-size: 12px;
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
    border-radius: 10px;
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
    border-radius: 10px;
    font-weight: bold;
    margin-left: 3px;
}

.ui_guide .chat .cont .send:hover {
    background-color: #02cb0b
}

.iconfont {
    font-size: 20px;
}

.robot {
    /* font-size: 34px; */
    width: 60px;
    height: 63px;
    /* color: rgb(43, 126, 154); */
    position: fixed;
    left: 0px;
    top: 55%;
}

.el-card__body {
    padding: 0px;
}
</style>