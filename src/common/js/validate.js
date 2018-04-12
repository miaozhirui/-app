//验证类
export default {

    isPhone(str) {

        return /^1[3|4|5|6|7|8][0-9]\d{8}$/.test(this.deleteSpace(str));
    },

    isNumber(str) {

        return /^\d+$/.test(this.deleteSpace(str));
    },

    isEmpty(str) {
        return /^.+$/.test(this.deleteSpace(str));
    },

    isBankCard(str) {

        str = this.deleteSpace(str);

        let num = /^\d*$/;
        let strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
        if (str.length < 16 || str.length > 19) {
            return false; //位数
        } else if (!num.exec(str)) {
            return false; //数字
        } else if (strBin.indexOf(str.substring(0, 2)) == -1) {
            return false; //前6位校验
        } else {
            let lastNum = str.substr(str.length - 1, 1); //取出最后一位（与luhm进行比较）
            let first15Num = str.substr(0, str.length - 1); //前15或18位
            let newArr = new Array();
            for (let i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
                newArr.push(first15Num.substr(i, 1));
            }
            let arrJiShu = new Array(); //奇数位*2的积 <9
            let arrJiShu2 = new Array(); //奇数位*2的积 >9
            let arrOuShu = new Array(); //偶数位数组
            for (let j = 0; j < newArr.length; j++) {
                if ((j + 1) % 2 == 1) { //奇数位
                    if (parseInt(newArr[j]) * 2 < 9)
                        arrJiShu.push(parseInt(newArr[j]) * 2);
                    else
                        arrJiShu2.push(parseInt(newArr[j]) * 2);
                } else //偶数位
                    arrOuShu.push(newArr[j]);
            }
            let jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
            let jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
            for (let h = 0; h < arrJiShu2.length; h++) {
                jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
                jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
            }
            let sumJiShu = 0; //奇数位*2 < 9 的数组之和
            let sumOuShu = 0; //偶数位数组之和
            let sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
            let sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
            let sumTotal = 0;
            for (let m = 0; m < arrJiShu.length; m++) {
                sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
            }
            for (let n = 0; n < arrOuShu.length; n++) {
                sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
            }
            for (let p = 0; p < jishu_child1.length; p++) {
                sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
                sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
            }
            //计算总和
            sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
            //计算Luhm值
            let k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
            let luhm = 10 - k;
            if (lastNum == luhm) {
                return true;
            }
        }
        return false;
    },

    deleteSpace(str) {

        return str.replace(/\s/g, '');
    },

    isIdentityNum(str) {

      let rule = /^(^[1-9][0-9]{7}((0[0-9])|(1[0-2]))(([0|1|2][0-9])|3[0-1])[0-9]{3}$)|(^[1-9][0-9]{5}[1-9][0-9]{3}((0[0-9])|(1[0-2]))(([0|1|2][0-9])|3[0-1])(([0-9]{4})|[0-9]{3}[Xx])$)$/
      return rule.test(this.deleteSpace(str));

    }
}
