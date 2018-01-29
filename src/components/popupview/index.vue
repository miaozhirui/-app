<template>
    <div class="user-write-signature" :class="{'show-view': show}">
        <div class="write-name"></div>
        <p>请在上面白板签字</p>
        <div class="footer db">
            <button class="middle db1" @click="cancelSig">取消</button>
            <button class="right db1" @click="confirmSig">确认</button>
        </div>
    </div>
</template>

<script>
    import index from './index.js';
    export default index;

    import './index.less';
</script>