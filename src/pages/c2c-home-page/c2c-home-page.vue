<template>
    <div class="c2c-home-page" v-cloak>
        <div class="borrow-money" @click="toBorrowMoney" v-if="isShowBorrowMoney"></div>
        <div class="borrow-money-list" @click="toBorrowMoneyList"></div>
    </div>
</template>
    