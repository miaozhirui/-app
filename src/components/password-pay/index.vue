<template>
    <div class="password-pay" v-if="isShowPassword">
        <div class="password-action-area">

            <div class="top db">
                <div class="left bm" @click="cancel">
                    <span class="icon"></span>
                </div>
                <div class="right db1 bc">输入密码<span>(6位数字密码)</span></div>
            </div>
            <div class="middle bc">


                <ul class="db" @click="clickUl">
                    <li class="bc bm" v-for="item in blackhotLength">
                        <div class="dot" v-if="item <= blackhot.length"></div>
                    </li>
                </ul>
            </div>
            <div class="bottom">
                <p @click="forgetPassword">忘记密码?</p>
            </div>
            <input type="number" class="tem-password" v-model="password">
        </div>
    </div>
</template>
<script>
    import index from './index.js';
    export default index;

    import './index.less';
</script>
