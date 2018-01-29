<template>
    <div class="item-layout">
        <ul>
            <li class="db">
                <div class="left db1">一次性开户费</div>
                <div class="right db1 br">{{ loanInfo.openAccountFee }}元</div>
            </li>
            <li class="db">
                <div class="left db1">利息</div>
                <div class="right db1 br">{{ loanInfo.interest | decimal}}元</div>
            </li>
            <li class="db">
                <div class="left db1">服务费</div>
                <div class="right db1 br">{{ loanInfo.serviceFee+loanInfo.dataFee+loanInfo.payFee | decimal}}元</div>
            </li>
            <li class="db">
                <div class="left db1">到账金额</div>
                <div class="right db1 br">{{ loanInfo.payMoney | decimal}}元</div>
            </li>
            <li class="db">
                <div class="left db1">到账银行卡</div>
                <div class="right db1 br">{{ loanInfo.bankName }}({{ loanInfo.bankCard }})</div>
                <div class="quote-pickers">
                 <popup-picker
                   :title="请选择"
                   :data="bankList"
                   :columns="1"
                   cancelText="取消"
                   confirmText="完成"
                   v-model="bankName"
                   ref="picker">
                </popup-picker>
               </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import index from './index.js';
    export default index;

    import './index.less';
</script>
