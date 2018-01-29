<template>
    <div class="c2c-generate-iou fullscreen" v-cloak>
        
        <div class="write-area">
                <ul> 
                    <li class="bm">
                        <input type="text" placeholder="请输入姓名" v-model="username">
                    </li>
                    <li class="bm">
                        <input type="text" placeholder="请输入手机号" v-model="userPhone">
                    </li>
                    <li class="bm">
                        <input type="text" placeholder="请输入身份证" v-model="userId">
                    </li>
                    <li class="bm">
                        <input type="text" placeholder="请输入银行卡号" v-model="userCard">
                    </li>
                    <li class="bm">
                        <input type="text" placeholder="银行名称，例子:上海市招商银行天钥桥路支行" v-model="userCardName">
                    </li>
                </ul>
                <div class="footer">
                    <button @click="generateIou">生成借条</button>
                </div> 
        </div>
        <!-- 欠条 -->
        <div class="iou" v-if="isShowIou">
            <p>借款人: {{ username }}</p>
            <p>身份证号: {{ userId }}</p>
            <div class="content">
                于<span>{{ startYear }}</span>年<span> {{ startMonth }} </span>月<span> {{ startDay }} </span>日向出借人周晓依借款人民币2000元（大写：贰仟元整），支付方式为：银行转账。借款期限为<span>{{ cycle }}</span>天，定于 ：<span>{{ endYear }}</span>年<span>{{ endMonth }}</span>月<span>{{ endDay }}</span>日归还本息人民币2000元。若不能按本借条约定日归还全款，本人自愿支付每日60元的违约金，直至全额还款为止。并自愿承担所产生的一切法律责任。
            </div>

            <p>出借人姓名：周晓依</p>
            <p>出借人身份证：31011319890826322X</p>

           
        </div>
         <div class="footer" v-if="isShowSignatureBtn">
                <button @click="clickToSignature">点击签名</button>
        </div>

        <div class="write-name" v-if="isShowWriteName">
            <p>请签名</p>
            <div class="name signature"></div>
            <div class="footer">
                <button @click="confirmSignature">确定</button>
                <button class="cancel" @click="cancelSignature">取消</button>
            </div>
        </div>

        <div class="footer" v-if="isShowSubmitBtn">
            <button @click="submit">提交</button>
        </div>
        
        <!-- 欠条 -->
        <img src="" id="qiantiao" alt="">
        <!-- 签名 -->
        <img src="" id="qianming" alt="">
        <div class="merge-image" v-if="isShowMergeImage">
            <div class="img-wrap">
                <p>签名成功</p>
                <img src="" id="merge" alt="" >
                <div class="close-icon" @click="closeMergeImage"></div>
            </div>
        </div>
        
    </div>
</template>
    