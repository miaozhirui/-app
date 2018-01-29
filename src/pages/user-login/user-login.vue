<template>
    <div class="user-login fullscreen" v-cloak>
        <!-- <div class="logo"></div> -->
        <div class="user-action">
            <div class="phone layout db bm">
                <input type="tel" placeholder="手机号码" v-model="phone">
            </div>
            <div class="code layout db">
                <div class="left db1 bm">
                    <input type="tel" placeholder="验证码" v-model="code">
                </div>
                <div class="right db1 bm">
                    <ValidateCode
                    class="custom-code"
                    :phone="phone"
                    ></ValidateCode>
                </div>
            </div>
        
        </div>
        <div class="footer">
            <div class="agreement db">
                <div class="left">
                    <span class="icon"
                    :class="{selected: isAgree}"
                    @click="toAgree"
                    ></span>我同意
                </div>
                <div class="right" @click="clickAgreeBtn">
                    <p>《用户注册协议》</p>
                    <!-- <p>《快乐达钞市个人借款协议》</p> -->
                </div>
            </div>

            <button class="btn mgt" @click="toLogin">认证登录</button>
        </div>

        <div class="register-agreement" v-if="isShowAgreeContent">
            <div class="top db br bm" @click="closeAgreement">
                <div class="close-icon"></div>
            </div>
            <div class="content" v-html="agreeContent"></div>
        </div>
        
    </div>
</template>
