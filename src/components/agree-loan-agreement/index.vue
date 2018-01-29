<template>
  <div class="agreement db bm">
        <span class="icon" @click="agree" :class="{selected: isAgree}"></span>
        <p>我同意<span @click="toWithholdingAgreement">《快乐达钞市》提现代扣协议</span></p>

        <div class="content" v-if="isShowAgreement">
            <!-- <div class="cancel" @click="cancelHandle"></div> -->

            <div class="top db br bm" @click="cancelHandle">
                <div class="cancel"></div>
            </div>

            <div v-html="agreement"></div>
        </div>
  </div>
</template>

<script>
    import index from './index.js';
    export default index;

    import './index.less';
</script>
