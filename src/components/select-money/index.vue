<template>
    <div class="money">
        <div class="desc">选择借款金额<span>{{ selfLoanMoney }}</span>元</div>
        <div class="action-area db">
            <div class="left db1 bm">
                <span class="icon" @click="deleteMoney"></span>
            </div>
            <div class="center bm">
                <div class="wrap">
                    <input type="number" v-model="selfLoanMoney" readonly="readonly">
                    <span class="line"></span>
                </div>
            </div>
            <div class="right db1 bm br">
                <span class="icon" @click="addMoney"></span>
            </div>
        </div>
        <div class="days">
            <div class="desc">选择借款{{termUnit}}数<span>{{ selfCurrentNumber }}</span>{{termUnit}}</div>
            <div class="action-area">
                <ul class="db">
                    <li class="db1"
                    :class="{selected: item.isSelected}"
                    v-for="item in loanNumbers"
                    @click="selectDay(item)"
                    >{{item.num}}{{termUnit}}</li>

                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import index from './index.js';
    export default index;

    import './index.less';
</script>
