import PopupPicker from 'vux/popup-picker';


export default {

    components: {

      PopupPicker

    },

    props: ["loanInfo","bankList","onChangeCardId"],

    data: function(){

        return {

            bankName: this.bankName,
            bankTitle: this.bankTitle
        }
    },


    watch: {

      bankName(val,oldVal) {

        let bankTitle = this.$refs.picker&&this.$refs.picker.getNameValues();
        this.bankTitle = bankTitle

        var basic = this.bankTitle.substr(0, this.bankTitle.length - 1);
        this.loanInfo.bankName = basic.split('(')[0]
        this.loanInfo.bankCard = basic.split('(')[1]

        this.$emit('onChangeCardId', {cardId: val[0]}); //记录银行cardId

      }
    }

}
