<template>
    <div class="account">
        <div class="form-warp">
            <div class="fs-30 text-center">管理系统</div>
            <a-form name='custom-validation' ref="ruleForm" v-bind="layout">
                <a-form-item>
                    <label>用户名</label>
                    <a-input type='text' autocomplete='off' />
                </a-form-item>
                <a-form-item>
                    <label>密码</label>
                    <a-input type='password' autocomplete='off' />
                </a-form-item>
                <a-form-item>
                    <div id="captcha-dom" class="nc-container"></div>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type='submit' block> 登 录 </a-button>
                </a-form-item>
            </a-form>
            <div class="text-center">
                <a class="color-white">忘记密码</a>|
                <a class="color-white">注册</a>
                {{aa}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent,reactive, ref, toRefs } from 'vue';
    export default defineComponent({
        name: "Home",
        setup(props) {

            // 可申明多个 data 容器
            // 类型声明
            const formConfig = reactive<any>({
                layout: {
                    // labelCol: {
                    //     span: 10
                    // },
                    wrapperCol: {
                        span: 24
                    },
                },
                aa:"10"
            })
           
            // toRefs:将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的ref
            const data = toRefs(formConfig);

            return {
                ...data,
            };
        },
    });
</script>
<style lang="scss">
    @import './style.scss';
</style>