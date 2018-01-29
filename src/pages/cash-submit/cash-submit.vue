<template>
    <div id="app">
        <div class="content">
            <div class="desc">必填信息</div>
            <div class="list">
                <ul>
                    <li class="db">
                        <div class="left db1 bm">身份验证</div>
                        <div class="right db1 br bm">
                          <input @click="btnIdentity" readOnly="true" type="button" value="" id="idenVerify">
                          </input>
                        </div>
                    </li>
                    <li class="db">
                        <div class="left db1 bm">运营商验证</div>
                        <div class="right db1 br bm">
                        <input @click="btnOperator" readOnly="true" type="button" value="" id="operatorVerify">
                        </input>
                      </div>
                    </li>
                    <li class="db">
                        <div class="left db1 bm">紧急联系人</div>
                        <div class="right db1 br bm">
                        <input @click="btnContact" readOnly="true" type="button" value="" id="contactVerify">
                        </input>
                      </div>
                    </li>
                    <li class="db">
                        <!-- <div class="left db1 bm">更多信息</div> -->
                        <div class="left db1 bm">地址信息</div>
                        <div class="right db1 br bm">
                        <input @click="btnMoreInfo" readOnly="true" type="button" value="" id="moreInfoVerify">
                        </input>
                      </div>
                    </li>
                    <!-- <li class="db">
                        <div class="left db1 bm">芝麻分验证</div>
                        <div class="right db1 br bm">
                        <input @click="btnSesame" readOnly="true" type="button" value="" id="sesameVerify">
                        </input>
                      </div>
                    </li> -->

                </ul>
            </div>
        </div>
        <div class="footer">
            <button class="btn" @click="toApplyCash" id = "cordovaDevice">立即申请</button>
        </div>


        <!-- showScrollBox -->
     <!--  <div class="showDialog">
        <x-dialog v-model="showGpsBox" class="dialog">
          <img src="" alt="" class="icon">
          <div class="content">
            <p>当你关闭此消息时，我们可能会发</p>
            <p>起定位请求，请选择允许！以免因</p>
            <p>定位失败导致无法通过哦~</p>
          </div>
          <div class="showDialogClose">
              <button class="btnDialog" @click="getGPS" >是</button>
          </div>
        </x-dialog>
      </div> -->

    </div>
</template>
