<template>
    <div class="c2c-my-orderlist" v-cloak>
        <div class="content-list" >
            <ul>
                <li class="list" v-for="item in loanList">
                    <div class="top">
                        <ul>
                           
                            <li class="db">
                                <div class="left db1">借条</div>
                                <div class="right db1 br">还款日: {{ item.termDate ? item.termDate  : '待确定' | date }}</div>
                            </li>


                            <!-- <li class="db">
                                <div class="left db1">还款金额</div>
                                <div class="right db1 br">￥{{ item.repayMoney | decimal }}</div>
                            </li> -->
                        </ul>
                    </div>
                    <div class="middle">
                        <ul>
                            <li class="db">
                                <div class="left db1">借款金额</div>
                                <div class="right db br">￥{{ item.lendMoney | decimal }}</div>
                            </li>
                            <li class="db">
                                <div class="left db1">使用天数</div>
                                <div class="right db br">{{ item.termNum }}</div>
                            </li>
                            <li class="db">
                                <div class="left db1">申请日期</div>
                                <div class="right db br">{{ item.lendTime | date }}</div>
                            </li>
                            <li class="db">
                                <div class="left db1">借款日期</div>
                                <div class="right db br">{{ item.arriveTime | date }}</div>
                            </li>
                           <!--  <li class="db">
                                <div class="left db1">逾期手续费</div>
                                <div class="right db br">￥{{ item.overdueFee | decimal }}</div>
                            </li> -->
                        </ul>
                    </div>
                    <div class="line"></div>
                    <div class="bottom db">
                        <div class="left db1">出借人: {{ getLendersName(item) }}</div>
                        <div class="right db1 bm br" 
                        :class="{overdue: item.overdueDays > 0 || item.status == 12 || item.status == 13, wait: item.status == 1 || item.status == 3}"
                        >   
                            {{ getLoanStatus(item) }} 
                            <span 

                            v-if="isShowSigBtn(item)"

                            :class="{haswrite: item.status == 17 || item.status == 6 || item.status == 16}" 

                            @click="toSignature(item)"

                            >{{ getSignatureText(item) }}</span>

                            <span class="give-money" v-if="isShowGiveMoneyBtn(item)" @click="clickGiveMoneyBtn(item)">还款</span>

                            
                        </div>
                    </div>
                </li>

            </ul>
        </div>

        <!-- 内容为空的时候 -->
        <div class="empty-content" v-if="loanList.length == 0">
            <div class="no-bill-logo"></div>
            <p>您还没有订单</p>
        </div>

               <!-- 提示 -->
        <div class="tips" v-if="isShowTip">
            <div class="top db">
                <div class="left db1">温馨提示</div>
                <div class="right db1 br">
                    <span class="close" @click="closeTip"></span>
                </div>
            </div>
            <p>如出现到期不还，将通过互联网仲裁方式强制执行！将会直接影响您的央行征信，影响买火车票飞机票不说，还会影响孩子升学！</p>
        </div>

        <!-- 刷新当前页面的按钮 -->
        <div class="refresh db bc bm fc" @click="refreshPage">
            <span class="icon"></span>
            <p>点击刷新</p>
        </div>
    </div>
</template>
    