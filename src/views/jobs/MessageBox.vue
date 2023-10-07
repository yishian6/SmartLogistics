<template>
    <el-dialog v-model="dialogVisible" :lock-scroll="false" title="申请岗位" width="30%" draggable>
        <div style="display: flex; justify-content: space-around;">
            <i class="iconfont icon-yewushenqing" style="color:rgb(228, 143, 137);font-size: 70px;margin-left: 20px;"></i>
            <div style="margin-left: 40px;">
                <div style="font-size: 22px; color: rgb(220, 154, 113);">
                    <i v-show="sendMsg.sendIcon == 'c'" class="iconfont icon-chenggong"
                        style="color: green; font-size: 26px;"></i>
                    <i v-show="sendMsg.sendIcon == 'i'" class="iconfont icon-tishi1"
                        style="color: rgb(187, 176, 57); font-size: 26px;"></i>
                    &nbsp;{{ sendMsg.title }}
                </div><br>
                <span>{{ sendMsg.message }}</span>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                    查看申请
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const dialogVisible = ref(false)
const sendMsg = reactive({
    title: '',
    message: '',
    sendIcon: ''
})
const dialogVisibleChange = (status) => {
    if (status === 1) {
        sendMsg.title = '投递成功',
            sendMsg.message = '你的申请已经添加到申请列表中，可以点击查看申请进行查看',
            sendMsg.sendIcon = 'c'
    }
    else if (status === 2) {
        sendMsg.title = '投递失败',
            sendMsg.message = '你的申请已经数目已满，可以待申请结束再申请',
            sendMsg.sendIcon = 'i'
    }
    dialogVisible.value = true

}

defineExpose({ dialogVisibleChange })
</script>

<style scoped>
.dialog-footer {
    margin-right: 20px
}
</style>