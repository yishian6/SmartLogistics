<template>
    <el-form ref="formRef" :model="registerUser" :rules="rules" label-position="right" label-width="80px"
        class="registerForm sign-up-form">
        <h2 class="title" style="text-align: center;">注册</h2>
        <el-form-item label="用户名" prop="account">
            <el-input v-model="registerUser.account" placeholder="请输入用户名">
                <template #prefix>
                    <i class="iconfont icon-zhanghao"></i>
                </template></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="registerUser.password" type="password" placeholder="请输入密码" show-password>
                <template #prefix>
                    <i class="iconfont icon-mima1"></i>
                </template></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="registerUser.checkPass" type="password" placeholder="请输入密码" show-password>
                <template #prefix>
                    <i class="iconfont icon-mima1"></i>
                </template></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerUser.email" placeholder="请输入邮箱">
                <template #prefix>
                    <i class="iconfont icon-youxiang"></i>
                </template></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="doRegister" type="primary" class="submit-btn">注册</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import router from '@/router';
const registerUser = reactive({
    account: '',
    password: '',
    checkPass: '',
    email: '',
})

const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请重新输入密码'))
    } else if (value !== registerUser.password) {
        callback(new Error("您输入的密码不匹配"))
    } else {
        callback()
    }
}
// 定义规则
const rules = {
    account: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 24, message: '密码长度要求6-14个字符', trigger: 'blur' }
    ],
    checkPass: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 24, message: '密码长度要求6-14个字符', trigger: 'blur' },
        { validator: validatePass, trigger: 'blur' }
    ],
    email: [
        {
            required: true,
            message: '邮箱不能为空！',
            trigger: 'blur'
        },
        {
            type: "email",
            required: true,
            message: '邮箱格式错误，请正确填写',
            trigger: 'blur'
        }

    ]
}

const formRef = ref(null)

// 触发注册方法
const doRegister = () => {
    // 调用实例方法
    formRef.value.validate((valid) => {
        if (valid) {
            ElMessage({ type: 'success', message: '注册成功' })
            router.push('/index')
        }
        else
            ElMessage({ type: 'error', message: '注册失败,请填写注册信息' })
    })
}
</script>

<style scoped>
/* form */
.registerForm {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px 40px 20px 40px;
    border-radius: 10px;
    box-shadow: 0px 5px 10px #cccc;
    /* width: 400px; */
}

.el-form-item {
    margin-bottom: 25px;
}

.submit-btn {
    width: 100%;
    margin: 0 auto;
    border-radius: 49px;
    margin-right: 60px;
}
</style>