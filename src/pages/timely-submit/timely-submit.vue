<template>
    <div class="timely-submit fullscreen">
        
        <!-- 借款用途 -->
        <div class="purpose db">
            <div class="left db1 bm">借款用途</div>
            <div class="right db1 br bm" :class="{default: moneyPurpose == '请选择'}" @click="selectPurpose">{{ moneyPurpose }} <span class="icon-arrow"></span></div>
        </div>

        <!-- 可申请的钱是固定的 -->
        <div class="db static" v-if="isShowStaticMoney">
             <div class="left db1 bm">借款金额</div>
             <div class="right db1 br bm"><span>{{ amount }}</span>元</div>
        </div>

        <!-- 可申请的周期是固定的 -->
        <div class=" db static static-cycle" v-if="isShowStaticCycle">
            <div class="left db1 bm">借款{{termUnit}}数</div>
            <div class="right db1 br bm"><span>{{curCycle}}</span>{{termUnit}}</div>
         </div>

        <!-- 动态的填写钱 -->
        <div class="money" v-if="isShowDynamicMoney">
            <div class="desc">请填写借款金额<span> ({{quotaMin}}元 — {{quotaMax}}元)</span></div>
            <div class="action-area db bc">
                <div class="center bm">
                    <div class="wrap">
                        <input type="number" v-model="amount" >
                        <span class="line"></span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 动态的填写周期 -->
        <div class="days" v-if="isShowDynamicCycle">
            <div class="desc">请选择借款{{termUnit}}数</div>
            <div class="action-area">
                <ul class="db bc">
                    <li v-for="(item, index) in cycleList" :key="index" :class="{selected:item==curCycle}" @click="selectCycle(item)">{{ item + termUnit }}</li>

                </ul>
            </div>
        </div>

        <footer>
            <button class="btn" @click="step">下一步</button>
        </footer>

        <actionsheet 
        v-model="show3" 
        :menus="menus3" 
        cancel-text="取消"
        @on-click-menu="click" 
        show-cancel
        ></actionsheet>
    </div>
</template>
