<template>
    <div class="account">
        <div class="form-warp">
            <div class="fs-30 text-center">管理系统</div>
            <a-form :model='accountForm' :rules="formRules" ref="ruleForm" v-bind="layout" @finish="handleFinish">
                <a-form-item name="username">
                    <label>用户名</label>
                    <!-- :value 监听的表单域不满足自动监听的条件，可以通过 :value 方式关联表单域 -->
                    <a-input v-model:value="accountForm.username" type='text' autocomplete='off' />
                </a-form-item>
                <a-form-item name="password">
                    <label>密码</label>
                    <a-input v-model:value="accountForm.password" type='password' autocomplete='off' />
                </a-form-item>
                <a-form-item name="passwords">
                    <label>确认密码</label>
                    <a-input v-model:value="accountForm.passwords" type='password' autocomplete='off' />
                </a-form-item>
                <a-form-item name="code">
                    <label>验证码</label>
                    <a-row :gutter='10'>
                        <a-col :span='14'>
                            <a-input v-model:value="accountForm.code" type='text' maxLength='6' />
                        </a-col>
                        <a-col :span='10'>
                            <a-button type="primary" @click='getCode' :loading='buttom_loading'
                                :disabled='button_disabled' block>
                                {{buttom_text}} </a-button>
                        </a-col>
                    </a-row>
                </a-form-item>
                <!-- <a-form-item>
                    <Captcha></Captcha>
                </a-form-item> -->
                <a-form-item>
                    <a-button type="primary" html-type='submit' block> 登 录 </a-button>
                </a-form-item>
            </a-form>
            <div class="text-center">
                <a class="color-white">忘记密码</a>|
                <a class="color-white">注册</a>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
    //  导入验证类的方法
    //  按需导入
    import {
        checkPhone,
        checkPassword as checkPass
    } from '@/utils/verification.ts';
    //  全部导入
    // import * as veri from '../../utils/verification'
    import {
        message
    } from 'ant-design-vue';

    import {
        defineComponent,
        onMounted,
        reactive,
        toRefs,
        ref
    } from 'vue';
    // import Captcha from '@/components/Captcha/index.vue';
    export default defineComponent({
        name: 'regster',
        components: {
            // Captcha
        },
        setup(props) {
            let checkUsername = async (rule:any, value:string, callback:any):Promise<void>=> {
                if (!value) {
                    return Promise.reject('请 输 入 用 户 名');
                } else if (!checkPhone(value)) {
                    return Promise.reject('请 输 入 11 位 数 字 的 手 机 号');
                } else {
                    return Promise.resolve();
                }
            };
            let checkPassword = async (rule:any, value:string, callback:any):Promise<void> => {
                if (!value) {
                    return Promise.reject('请 输 入 密 码');
                } else if (!checkPass(value)) {
                    return Promise.reject('请 输 入 密 码 为 字 母 + 数 字 + 特殊符号');
                } else {
                    return Promise.resolve();
                }
            };

            let checkPasswords = async (rule:any, value:string, callback:any):Promise<void> => {
                const password = formConfig.accountForm.password;
                if (!value) {
                    return Promise.reject('请 输 入 确 认 密 码');
                } else if (password !== value) {
                    return Promise.reject('两 次 密 码 不 一 致');
                } else {
                    return Promise.resolve();
                }
            };

            const formConfig = reactive({
                layout: {
                    wrapperCol: {
                        span: 24
                    },
                },
                accountForm: {
                    username: '',
                    password: '',
                    passwords: '',
                    code: ''

                },
                formRules: {
                    username: [{
                        validator: checkUsername,
                        // message: '请输入用户名',
                        trigger: 'change'
                    }],
                    password: [{
                        validator: checkPassword,
                        // message: '请输入密码',
                        trigger: 'change'
                    }],
                    passwords: [{
                        validator: checkPasswords,
                        // required: true,
                        // message: '请 输 入 确 认 密 码',
                        trigger: 'change'
                    }],
                    code: [{
                        required: true,
                        message: '请 输 入 验 证 码',
                        trigger: 'blur'
                    }],
                },
            })
            const dataItem = reactive({
                // 获取验证码按钮
                buttom_text: '获取验证码',
                buttom_loading: false,
                button_disabled: false,
                sec: 60,
                // 定时器
                timer: null,
            })
            const form = toRefs(formConfig);
            const data = toRefs(dataItem);

            // 表单提交完成
            const handleFinish = (value:any):void => {
                console.log('mtreasure', value);
            }

            //获取验证码按钮
            const getCode = () => {
                if (!formConfig.accountForm.username) {
                    message.error({
                        content: '用户名不能为空'
                    });
                }
                // 优先判断定时器是否存在，存在则先清除后再开启
                dataItem.timer && clearInterval(Number(dataItem.timer));

                dataItem.timer = <any> setInterval(() => {
                    const s = dataItem.sec--;
                    dataItem.buttom_text = `${s}秒`;
                    if (s <= 0) {
                        clearInterval(Number(dataItem.timer));
                        dataItem.buttom_text = '重新获取';
                    }
                }, 1000)
            }

            return {
                ...form,
                ...data,
                handleFinish,
                getCode
            };
        },
    });
</script>
<style lang="scss">
    @import './style.scss';
</style>