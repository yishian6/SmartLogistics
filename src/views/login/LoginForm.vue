<template>
    <el-form ref="formRef" :model="loginUser" :rules="rules" class="loginForm sign-in-form">
        <h1 style="text-align: center;margin-bottom: 40px;">智邮万家</h1>
        <el-form-item prop="account">
            <el-input v-model="loginUser.account" placeholder="请输入用户名">
                <template #prefix>
                    <i class="iconfont icon-zhanghao"></i>
                </template></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input v-model="loginUser.password" type="password" placeholder="请输入密码" show-password>
                <template #prefix>
                    <i class="iconfont icon-mima1"></i>
                </template></el-input>
        </el-form-item>

        <el-form-item>
            <el-button @click="doLogin" type="primary" class="submit-btn">登录</el-button>
        </el-form-item>

        <!-- 找回密码 -->
        <div class="tiparea">
            <p>忘记密码？ <a>立即找回</a></p>
        </div>
    </el-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

const formRef = ref(null)
const router = useRouter()
const loginUser = reactive({
    account: 'admin',
    password: '123456'
})
const rules = {
    account: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 24, message: '密码长度要求6-14个字符', trigger: 'blur' }
    ]
}
// 触发登录方法
const doLogin = () => {
    // 调用实例方法
    formRef.value.validate((valid) => {
        // valid: 所有表单都通过校验  才为true
        // console.log(valid)
        // 以valid做为判断条件 如果通过校验才执行登录逻辑
        if (valid) {
            // await loginAPI({ account, password })
            // 1. 提示用户
            if (loginUser.account === 'admin' && loginUser.password === '123456') {
                ElMessage({ type: 'success', message: '登录成功' })
                // 2. 跳转首页
                router.replace({ path: '/index' })
            }
            else
                ElMessage({ type: 'error', message: '登录失败，账号或者密码输入错误！' })
        }
    })
}

</script>
<style scoped>
/* form */
.loginForm {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px 40px 20px 40px;
    border-radius: 5px;
    /* box-shadow: 0px 5px 10px #cccc; */
}

.el-form-item {
    margin-bottom: 25px;
}

.submit-btn {
    width: 100%;
    margin: 0 auto;
    border-radius: 49px;
}

.tiparea {
    text-align: right;
    font-size: 12px;
    color: #333;
}

.tiparea p a {
    color: #409eff;
}
</style>