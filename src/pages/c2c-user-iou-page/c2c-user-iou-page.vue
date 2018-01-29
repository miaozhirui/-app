<template>
    <div class="c2c-user-iou-page" v-cloak>
        <div class="iou-content">
            <p class="title">借条</p>
            <!-- <p>借款人: {{ iouInfo.userName }}</p> -->
            <!-- <p>身份证号: {{ iouInfo.userIdNum }}</p> -->
           <!--  <div class="content">
                于<span>2017</span>年<span> 12 </span>月<span> 13 </span>日向出借人xxx借款人民币2000元（大写：贰仟元整），支付方式为：银行转账。借款期限为<span>7</span>天，定于 ：<span>2017</span>年<span>12</span>月<span>20</span>日归还本息人民币2000元。若不能按本借条约定日归还全款，本人自愿支付每日60元的违约金，直至全额还款为止。并自愿承担所产生的一切法律责任。
            </div> -->
            <div class="content">
                借款人: <span>{{ iouInfo.userName }}</span>(身份证号: <span>{{ iouInfo.userIdNum }}</span>)，为<span>{{ iouInfo.transferUse }}</span>用途,于<span>{{ iouInfo.lendTime | date("YYYY年MM月DD日") }}</span>向出借人:<span>{{ iouInfo.loanerName }}</span>,(身份证号:<span>{{ iouInfo.loanerIdNum }}</span>)借款人民币<span>{{ iouInfo.lendMoney }}</span>元（大写：{{ iouInfo.lendMoney | number2chinese }}），支付方式为：<span>{{ iouInfo.payWay }}</span>。借款期限为<span>{{ iouInfo.termNum }}</span>天，定于: <span>{{ iouInfo.repayTime |date("YYYY年MM月DD日") }}</span>归还本息人民币<span>{{ iouInfo.lendMoney }}</span>元（大写：{{ iouInfo.lendMoney | number2chinese }}）。若不能按本借条约定日归还全款，本人自愿承担所产生的一切法律责任，立此为据。
            </div>

            <!-- <p>出借人姓名：{{ iouInfo.loanerName }}</p> -->
            <!-- <p>出借人身份证：{{ iouInfo.loanerIdNum }}</p> -->
        </div>
        
        <!-- 用户签字区域 -->
        <div class="user-write-signature" :class="{'show-view': popupView}">
            <div class="write-name"></div>
            <p>请在上面白板签字</p>
            <p class="tips">注意：请尽量书写端正，以免借条审核不通过被打回重新签</p>
            <div class="footer db">

                <button class="left db1" @click="clearSig">清除</button>
                <button class="middle db1" @click="cancelSig">取消</button>
                <button class="right db1" @click="confirmSig">确认</button>
               
            </div>
        </div>
         <div class="footer db">
              <button class="middle db1" @click="clickCancel">取消</button>
              <button class="right db1" @click="clickConfirm">签字</button>
        </div>
    </div>
</template>
    