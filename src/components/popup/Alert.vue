<template>
    <div class="popup-container" :class="{'popup-showing active': state == 1, 'popup-showing popup-hidden': state==2}">
        <div class="popup" :class="[theme]">
            
            <div class="main">
                <div class="popup-head" v-if="title">
                    <div class="pupup-title" v-html="title"></div>
                </div>

                <div class="popup-body" v-html="content"></div>
            </div>
            
            <div class="popup-buttons db">
                <button class="db1" @click="onOk">{{ okText }}</button>
            </div>
        </div>
    </div>
</template>
<script>
    import './popup.less';

    import mixin from './mixin';

    const backdrop_fadein_duration = 100;

    const extend = (from, to) => {

        for(let key in from) {

            to[key] = from[key];
        }

        return to;
    }

    export default {

        mixins: [mixin],

        data() {

            return {

                effect: 'default',//default, scale, slide
                title: '',
                content: '填写内容区域',
                okText: '确定',
                theme: 'default',
                state: 0 //0:hidden, 1:showing, 2:active
            }
        },

        methods: {

            show(options) {
                
                extend(options, this);

                let backdrop = document.querySelector('[backdrop]');

                setTimeout(() => {

                    backdrop.classList.add('visible');
                    backdrop.classList.add('active');
                }, backdrop_fadein_duration)

                this.state = 1;

                this.promise = new Promise((resolve, reject) => {

                    this.$on('ConfirmOkEvent', () => {

                        this.hide();
                        resolve(true);
                    })

                    // this.$on('ConfirmCancelEvent', () => {

                    //     this.hide();
                    //     resolve(false);
                    // })
                })

                return this.promise;
            },

            onOk() {

                this.$emit('ConfirmOkEvent');
            },

            // onCancel() {

            //     this.$emit('ConfirmCancelEvent');
            // }
        }
    }


</script>









