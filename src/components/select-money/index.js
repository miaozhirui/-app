import { utils } from 'kld';

export default {

    props: ['loanMoney', 'loanNumbers', 'currentNumber', 'termUnit','isStaging'],

    data: function(){

        return {

            selfLoanMoney: this.loanMoney,
            selfLoanNumbers: this.loanNumbers,
            selfCurrentNumber: this.currentNumber,
            maxLoanMoney:this.loanMoney
        }
    },

    methods: {

        deleteMoney() {

            if (this.isStaging) {

              if (this.selfLoanMoney<=1000) { //现金分期 1000-5000

                  utils.tipInfo({content:'达到最小提现额度！'});

                  return;

              } else {

                  this.selfLoanMoney = +this.selfLoanMoney - 100;
              }

            } else {

              if (this.selfLoanMoney<=600) { //现金分期 1000-5000

                  utils.tipInfo({content:'达到最小提现额度！'});

                  return;

              } else {

                  this.selfLoanMoney = +this.selfLoanMoney - 100;
              }

            }

            this.$emit('watchDataChange', this.groupData());

        },

        addMoney() {

          if (this.isStaging) {

            if (this.selfLoanMoney>=this.maxLoanMoney) {//现金分期 1000-5000

                utils.tipInfo({content:'达到最大提现额度！'})

                return;

            } else {
                this.selfLoanMoney = +this.selfLoanMoney + 100;

            }

          } else {

            if (this.selfLoanMoney>=this.maxLoanMoney){//现金分期 1000-5000

                utils.tipInfo({content:'达到最大提现额度！'})

                return;

            } else {

                this.selfLoanMoney = +this.selfLoanMoney + 100;

            }

          }

            this.$emit('watchDataChange', this.groupData());
        },

        selectDay(item) {

            this.selfLoanNumbers.forEach(item => {

                item.isSelected = false;
            })

            item.isSelected = true;

            this.selfCurrentNumber = item.num;

            this.$emit('watchDataChange', this.groupData());
        },
        groupData() {

            return {
                loanMoney: this.selfLoanMoney,
                currentNumber: this.selfCurrentNumber
            }
        }
    }
}
