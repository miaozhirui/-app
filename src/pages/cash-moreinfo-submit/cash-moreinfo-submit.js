import { utils,relationship,validate } from 'kld';
import PopupPicker from 'vux/popup-picker';
import { iosProvinces } from 'common/js/area';
import { yearmonthList } from 'common/js/date'
import { message } from 'common/js/message';
import storage from 'good-storage';

const page = {
    components: {
      PopupPicker,
      // datetime,
      relationship,
      validate
      // Picker
    },
    data() {
        return {
        //工作信息
            //公司名称
            companyName: '',
            //公司地址
            quoteCityList: iosProvinces,
            cityName: [],
            companyCityName: '',
            //公司详细信息
            compAddrDetail: '',
            //公司座机
            compPhoneNum: '',
            // 何时入职
            yearmonthList: yearmonthList,
            workDate: '',
            dateWork: [],
            //所任职位
            worklevelList: [
              {'value': '1', 'name': '员工', 'parent': '0'},
              {'value': '2', 'name': '基层管理人员', 'parent': '0'},
              {'value': '3', 'name': '中层管理人员或同级', 'parent': '0'},
              {'value': '4', 'name': '高层管理人员或同级', 'parent': '0'},
              {'value': '5', 'name': '自雇人士－私营或个体', 'parent': '0'}
            ],
            worklevelName: [],
            worklevelTitle: '',
            worklevelType: 0,
            //单位性质
            compNatureList: [
              {'value': '1', 'name': '国企机关', 'parent': '0'},
              {'value': '2', 'name': '事业单位', 'parent': '0'},
              {'value': '3', 'name': '国有企业', 'parent': '0'},
              {'value': '4', 'name': '外资或合资', 'parent': '0'},
              {'value': '5', 'name': '私营企业', 'parent': '0'},
              {'value': '6', 'name': '其他', 'parent': '0'}
            ],
            compNatureName: [],
            compNatureTitle: '',
            compNatureType: 0,
            //学历情况
            educationList: [
              {'value': '1', 'name': '中专、高中及以下', 'parent': '0'},
              {'value': '2', 'name': '大专', 'parent': '0'},
              {'value': '3', 'name': '本科', 'parent': '0'},
              {'value': '4', 'name': '研究生及以上', 'parent': '0'},
              {'value': '5', 'name': '其他', 'parent': '0'}
            ],
            educationName: [],
            educationTitle: '',
            educationType: 0,

          //居住信息
             liveAddrDetail: '',
             //居住地址
             liveAddrList: iosProvinces,
             liveAddrName: [],
             liveAddrTitle: '',
             //何时在此居住
             yearmonthList: yearmonthList,
             dateLive: [],
             liveDate: '',

          //生活信息
            //婚姻状况
            merriageList: [
              {'value': '1', 'name': '未婚', 'parent': '0'},
              {'value': '2', 'name': '已婚-无子女', 'parent': '0'},
              {'value': '3', 'name': '已婚-有子女', 'parent': '0'},
              {'value': '4', 'name': '离异', 'parent': '0'},
              {'value': '5', 'name': '丧偶', 'parent': '0'}
            ],
            merriageName: [],
            merriageTitle: '',
            merriageType: 0,
            //配偶身份
            spouseList: [
              {'value': '1', 'name': '上班族', 'parent': '0'},
              {'value': '2', 'name': '全职太太（或先生)', 'parent': '0'},
            ],
            spouseName: [],
            spouseTitle: '',
            spouseType: 0,
            showSpouseDisplay: true,
            //户口信息
            householdList: [
              {'value': '1', 'name': '有本地户口', 'parent': '0'},
              {'value': '2', 'name': '无本地户口', 'parent': '0'},
            ],
            householdName: [],
            householdTitle: '',
            householdType: 0,
            productId:4,

            moreInfoVerify: false

        }
    },
    created() {

      // this.productId = utils.getParams('productId')
      this.productId = storage.get('productId');
      this.moreInfoVerify = utils.getParams('moreInfoVerify')

      if(this.moreInfoVerify == 'true') {

        this.getInfomation();
      }

    },

    methods: {

        getInfomation() {

          let promise = utils.fetch({

            url: '/v2/cashloan/queryUserInfo',
            data: {
              cashId : "null" ,
              merchantId : "18fd13cc9aa611e6afb66c92bf314c17",
               productType : this.productId,
               type : 4,
               userId : "46673d60a1f0417bb4085f6ea421ec48"
            },
            api: true
          })

          promise.then(data => {
            if(data.statusCode == 8015) {

              //返回值
              var result = data.data

              //公司地址
              if(result.workInfo) {

                var workAddrInfo = result.workInfo;

                this.companyName = workAddrInfo.workName;
                var pcdCompany = workAddrInfo.workAddr;
                this.companyCityName = pcdCompany.province + ' ' + pcdCompany.city
                + ' ' + pcdCompany.district;

                this.compAddrDetail = workAddrInfo.specificAddr;
                this.compPhoneNum = workAddrInfo.companyPhone;
                this.workDate = workAddrInfo.liveTime;

                //公司 单位性质
                this.compNatureTitle = relationship.getCompNatrueType(workAddrInfo.companyType);
                this.compNatureType = workAddrInfo.companyType;

                this.worklevelTitle = relationship.getWorklevelType(workAddrInfo.profession);
                this.worklevelType = workAddrInfo.profession;

                this.educationTitle = relationship.geteEducationType(workAddrInfo.education);
                this.educationType = workAddrInfo.education;

              }

              //居住地址
              if(result.residentInfo) {

                var residentInfo = result.residentInfo;
                var pcdLive = residentInfo.liveAddr;
                this.liveAddrTitle = pcdLive.province + ' ' + pcdLive.city
                + ' ' + pcdLive.district;

                this.liveAddrDetail = residentInfo.specificAddr;
                this.liveDate = residentInfo.liveTime;

              }


              //生活信息
              var lifeInfo = result.lifeInfo;
              this.householdTitle = relationship.getHouseholdType(lifeInfo.household);
              this.householdType = lifeInfo.household;

              this.merriageTitle = relationship.getMerriageType(lifeInfo.merriage);
              this.merriageType = lifeInfo.merriage;

              this.spouseTitle = relationship.getSpouseType(lifeInfo.spouse);
              this.spouseType = lifeInfo.spouse;

              if (this.merriageType == 1 || this.merriageType == 4 || this.merriageType == 5) {

                this.showSpouseDisplay = false;
                this.spouseType = 0
              } else {
                this.showSpouseDisplay = true;
              }

            }
          })
        },

        checkValidate() {
          // if (!validate.isEmpty(this.companyName)) {
          //     utils.tipInfo({
          //         content: message.companyName.empty
          //     })
          //     return;
          // }
          if (!validate.isEmpty(this.companyCityName)) {
              utils.tipInfo({
                  content: message.companyAddres1.empty
              })
              return;
          }
          if (!validate.isEmpty(this.compAddrDetail)) {
              utils.tipInfo({
                  content: message.companyAddres2.empty
              })
              return;
          }
          // if (!validate.isEmpty(this.compPhoneNum)) {
          //     utils.tipInfo({
          //         content: message.companyPhone.empty
          //     })
          //     return;
          // }
          // if (!/([0-9]{3,4}-)?[0-9]{7,8}/.test(this.compPhoneNum)) {
          //     utils.tipInfo({
          //         content: message.companyPhone.error
          //     })
          //     return;
          // }
          // if (!validate.isEmpty(this.compNatureTitle)) {
          //     utils.tipInfo({
          //         content: message.companyType.empty
          //     })
          //     return;
          // }
          // if (!validate.isEmpty(this.workDate)) {
          //     utils.tipInfo({
          //         content: message.companyLiveTime.empty
          //     })
          //     return;
          // }
          // if (!validate.isEmpty(this.worklevelTitle)) {
          //     utils.tipInfo({
          //         content: message.companyJobPost.empty
          //     })
          //     return;
          // }
          // if (!validate.isEmpty(this.educationTitle)) {
          //     utils.tipInfo({
          //         content: message.education.empty
          //     })
          //     return;
          // }
          if (!validate.isEmpty(this.liveAddrTitle)) {
              utils.tipInfo({
                  content: message.resideAddres1.empty
              })
              return;
          }
          if (!validate.isEmpty(this.liveAddrDetail)) {
              utils.tipInfo({
                  content: message.resideAddres2.empty
              })
              return;
          }
          // if (!validate.isEmpty(this.liveDate)) {
          //     utils.tipInfo({
          //         content: message.resideLiveTime.empty
          //     })
          //     return;
          // }
          // if (!validate.isEmpty(this.merriageTitle)) {
          //     utils.tipInfo({
          //         content: message.marriage.empty
          //     })
          //     return;
          // }

          // if (this.merriageType == 2 || this.merriageType == 3) {
          //   if (!validate.isEmpty(this.spouseTitle)) {
          //       utils.tipInfo({
          //           content: message.spouse.empty
          //       })
          //       return;
          //   }
          // }

          // if (!validate.isEmpty(this.householdTitle)) {
          //     utils.tipInfo({
          //         content: message.registered.empty
          //     })
          //     return;
          // }
          return true;
        },

        btnSubmit() {

          if(this.checkValidate()) {

            var pcdCompany = this.companyCityName.split(" ");
            var pcdLive = this.liveAddrTitle.split(" ");

            let promise = utils.fetch({

              url: '/v2/cashloan/submitDetailInfo',
              data: {
                  "cashId": "null",
                  "userId": "46673d60a1f0417bb4085f6ea421ec48",
                  "merchantId": "18fd13cc9aa611e6afb66c92bf314c17",
                  "quota": 0,
                  "workInfo": {
                      "workName": this.companyName,
                      "workAddr": {
                          "province": pcdCompany[0],
                          "city": pcdCompany[1],
                          "district": pcdCompany[2]
                      },
                      "companyPhone": this.compPhoneNum,
                      "specificAddr": this.compAddrDetail,
                      "companyType": this.compNatureType,
                      "liveTime": this.workDate,
                      "profession": this.worklevelType,
                      "education": this.educationType
                  },
                  "residentInfo": {
                      "liveAddr": {
                          "province": pcdLive[0],
                          "city": pcdLive[1],
                          "district": pcdLive[2]
                      },
                      "specificAddr": this.liveAddrDetail,
                      "liveTime": this.liveDate
                  },
                  "lifeInfo": {
                      "household": this.householdType,
                      "spouse": this.spouseType,
                      "merriage": this.merriageType
                  },
                  "gps": {
                      "longitude": "",
                      "latitude": ""
                  },
                  "houseHoldAddress": null,
                  "productType": 4
              },
              api: true
            })

            promise.then(data => {
              if(data.statusCode == 200) {
                utils.tipInfo({
                  content: data.message
                })
                utils.go('cash-submit', {
                    productId: this.productId
                })
              }
            })
          }
        }

    },

    watch: {

      //公司地址
      cityName(val,oldVal) {
        let cityTitle = this.$refs.picker3&&this.$refs.picker3.getNameValues();
        this.companyCityName = cityTitle
      },
      // 居住地址
      liveAddrName(val,oldVal) {
        let liveAddrTitle = this.$refs.liveAddr&&this.$refs.liveAddr.getNameValues();
        this.liveAddrTitle = liveAddrTitle
      },
      //入职日期
      dateWork(val, oldVal) {
        this.workDate = val[0].replace('年','-') + val[1].replace('月','');
      },
      //居住日期
      dateLive(val, oldVal) {
        this.liveDate = val[0].replace('年','-') + val[1].replace('月','');
      },
      //单位性质
      compNatureName(val,oldVal) {
        let compNatureTitle = this.$refs.picker&&this.$refs.picker.getNameValues();
        this.compNatureTitle = compNatureTitle
        this.compNatureType =  parseInt(val[0]);
      },
      //所任职位
      worklevelName(val,oldVal) {
        let worklevelTitle = this.$refs.worklevel&&this.$refs.worklevel.getNameValues();
        this.worklevelTitle = worklevelTitle
        this.worklevelType =  parseInt(val[0]);
      },
      //学历情况
      educationName(val,oldVal) {
        let educationTitle = this.$refs.education&&this.$refs.education.getNameValues();
        this.educationTitle = educationTitle
        this.educationType =  parseInt(val[0]);
      },

      //婚姻状况
      merriageName(val,oldVal) {
        let merriageTitle = this.$refs.merriage&&this.$refs.merriage.getNameValues();
        this.merriageTitle = merriageTitle
        this.merriageType =  parseInt(val[0]);
        if (this.merriageType == 1 || this.merriageType == 4 || this.merriageType == 5) {
          this.showSpouseDisplay = false;
          this.spouseType = 0
        } else {
          this.showSpouseDisplay = true;
        }
      },
      //配偶身份
      spouseName(val,oldVal) {
        let spouseTitle = this.$refs.spouse&&this.$refs.spouse.getNameValues();
        this.spouseTitle = spouseTitle
        this.spouseType = parseInt(val[0]);
      },
      //户口信息
      householdName(val,oldVal) {
        let householdTitle = this.$refs.household&&this.$refs.household.getNameValues();
        this.householdTitle = householdTitle
        this.householdType = parseInt(val[0]);
      }

    }
}
