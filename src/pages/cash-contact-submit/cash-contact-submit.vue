<template>
    <div class="contact-submit">
          <div class="content">
             <ul>
               <li class="display">
                   <div class="tilte">紧急联系人1</div>
               </li>
               <li class="display-box">
                   <div class="left">关系</div>
                   <div class="right display-box-1">
                       <!-- <div class="btnSelect">请选择</div> -->
                       <!-- <div class="icon"></div> -->
                       <!-- <button type="text" id="showRelDialog" class="btnSelect" @click="showDialog">请选择</button> -->
                       <input type="text" id="contact-one" name="" class="btnSelect"
                       placeholder="请选择"  v-model="relationName">
                       <div class="quote-pickers">
                        <popup-picker
                          :title="请选择"
                          :data="relationList"
                          :columns="1"
                          cancelText="取消"
                          confirmText="完成"
                          v-model="relationTitle"
                          ref="picker">
                       </popup-picker>
                      </div>
                   </div>
               </li>
                 <li class="display-box">
                     <div class="left">姓名:</div>
                     <div class="right display-box-1">
                         <input type="text" placeholder="请输入姓名" v-model="name" >
                     </div>
                 </li>
                 <li  class="display-box">
                     <div class="left">手机号码:</div>
                     <div class="right display-box-1">
                         <input type="text" placeholder="请输入手机号码" v-model="phoneNumber">
                     </div>
                 </li>
                </ul>
                <ul>
                 <li class="display">
                     <div class="tilte">紧急联系人2</div>
                 </li>
                 <li class="display-box">
                     <div class="left">关系</div>
                     <div class="right display-box">
                         <input type="text" id="contact-two" name="" class="btnSelect"
                         placeholder="请选择"  v-model="relationName2">
                          <div class="quote-pickers">
                           <popup-picker
                             :title="请选择"
                             :data="relationList2"
                             :columns="1"
                             cancelText="取消"
                             confirmText="完成"
                             v-model="relationTitle2"
                             ref="picker2">
                          </popup-picker>
                         </div>

                     </div>
                 </li>
                   <li class="display-box">
                       <div class="left">姓名:</div>
                       <div class="right display-box-1">
                           <input type="text" placeholder="请输入姓名" v-model="name2" >
                       </div>
                   </li>
                   <li  class="display-box">
                       <div class="left">手机号码:</div>
                       <div class="right display-box-1">
                           <input type="text" placeholder="请输入手机号码" v-model="phoneNumber2" >
                       </div>
                   </li>
                 </ul>
       <!--           <ul>
                   <li class="display">
                       <div class="tilte">紧急联系人3</div>
                   </li>
                   <li class="display-box">
                       <div class="left">关系</div>
                       <div class="right display-box">
                           <input type="text" id="contact-three" name="" class="btnSelect"
                           placeholder="请选择"  v-model="relationName3">
                           <div class="quote-pickers">
                            <popup-picker
                              :data="relationList3"
                              :columns="1"
                              cancelText="取消"
                              confirmText="完成"
                              v-model="relationTitle3"
                              ref="picker3">
                           </popup-picker>
                          </div>
                       </div>
                   </li>
                     <li class="display-box">
                         <div class="left">姓名:</div>
                         <div class="right display-box-1">
                             <input type="text" placeholder="请输入姓名" v-model="name3">
                         </div>
                     </li>
                     <li  class="display-box">
                         <div class="left">手机号码:</div>
                         <div class="right display-box-1">
                             <input type="text" placeholder="请输入手机号码" v-model="phoneNumber3">
                         </div>
                     </li>
                  </ul> -->
                </div>

            <div class="contact-btn">
              <button class='btn' @click="btnSubmit">立即提交</button>
            </div>

          <!--底部弹框 begin-->
          <!-- <div class="dialog-bottom" id="dialog-relation" v-model="show">
              <ul>
                <li class="dialog-li">请选择</li>
                <li class="dialog-li">配偶</li>
                <li class="dialog-li">父母</li>
                <li class="dialog-li">兄弟姐妹女</li>
                <li class="dialog-li">朋友</li>
              </ul>
              <button class="dialog-cancle" @click="btnCancle">取消</button>
          </div> -->
        <!--底部弹框 end-->
  </div>

</template>
