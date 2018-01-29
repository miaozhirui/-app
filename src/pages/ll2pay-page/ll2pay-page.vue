<template>
    <div class="ll2pay-page" v-cloak>
        <p>正在前往支付页面...</p>
        <form action="https://wap.lianlianpay.com/payment.htm"  method="post" id="llpay">
            <input type="text" v-model="payData" name="req_data">
        </form>
    </div>
</template>
    