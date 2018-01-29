<template>
    <div id="moreinfo-submit">
         <div class="info">
              <ul>
                  <li class="display-box">
                     <div class="tilte">公司地址信息</div>
                   </li>
         
                   <li class="display-box">
                       <div class="left">公司地址</div>
                       <div class="right display-box-1">
                           <input type="text" name=""class="btnSelect"
                           placeholder="请选择"  v-model="companyCityName">
                           <div class="quote-pickers">
                            <popup-picker
                              :title="请选择"
                              :data="quoteCityList"
                              :columns="3"
                              cancelText="取消"
                              confirmText="完成"
                              v-model="cityName"
                              ref="picker3">
                           </popup-picker>
                          </div>
                       </div>
                   </li>
                   <li class="display-box">
                       <div class="left">详细信息</div>
                       <div class="right display-box-1">
                           <input type="text" placeholder="请输入您的公司地址" v-model="compAddrDetail">
                       </div>
                   </li>
  
                </ul>
                <ul>
                  <li class="display-box">
                      <div class="tilte">居住地址</div>
                  </li>
                  <li class="display-box">
                      <div class="left">居住地址</div>
                      <div class="right display-box-1">
                          <input type="text" name=""class="btnSelect"
                          placeholder="请选择"  v-model="liveAddrTitle">
                          <div class="quote-pickers">
                           <popup-picker
                             :title="请选择"
                             :data="liveAddrList"
                             :columns="3"
                             cancelText="取消"
                             confirmText="完成"
                             v-model="liveAddrName"
                             ref="liveAddr">
                          </popup-picker>
                         </div>
                      </div>
                  </li>
                  <li class="display-box">
                      <div class="left">详细地址</div>
                      <div class="right display-box-1">
                          <input type="text" placeholder="请输入您居住的详细地址" v-model="liveAddrDetail">
                      </div>
                  </li>
                </ul>

         </div>
        <footer>
             <button class='btn' @click="btnSubmit">立即提交</button>
        </footer>

    </div>

</template>
