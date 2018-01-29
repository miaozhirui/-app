<template>
    <div id="identity-submit">

          <div class="content-pic">
            <!-- 上传身份证正面 -->
            <div class="top-identity">
              <div class="top">
                  <img class="handinBox" id="myCanvas" src="./images/identityphoto.png" tSrc="false">
                  <!-- <img class="left icon" src="" alt="" id="handinuploadImg"> -->
                  <div class="photo-info">
                       注意事项：
                       <p>1.身份证上所有信息清晰</p>
                       <p>2.照片需免冠，建议未化妆，</p>
                       <p>手持证件五官清晰可见</p>
                       <p>3.支持jpg、jpeg、gif格式照片</p>
                 </div>
              </div>
            <div class="center">
              <p>点击上传手持身份证</p>
              <!-- <canvas id="myCanvas"></canvas> -->
              <input id="handinupload" class="photoupload" type="file" accept="image/*;capture=camera">
            </div>
          </div>

           <div class="middle">
             <!-- 上传身份证正面 -->
             <div class="left">
                  <img class="frontBox" id="frontBox" src="./images/identityz.png" tSrc="false">

                  <div class="bottom box">上传身份证正面
                    <input id="frontupload" class="photoupload" type="file" accept="image/*;capture=camera">
                  </div>
            </div>
              <!-- 上传身份证反面 -->
            <div class="right">
               <img class="reverseBox" id="reverseBox" src="./images/identityf.png" tSrc="false">

               <div class="bottom box">上传身份证反面
                 <input id="reverseupload" class="photoupload" type="file" accept="image/*;capture=camera">
               </div>
           </div>
        </div>
      </div>

         <div class="item-layout">
             <ul>
                 <li class="db">
                     <div class="left">真实姓名:</div>
                     <div class="db1 right bm">
                         <input type="text" placeholder="请输入您的真实姓名" v-model="realName">
                     </div>
                 </li>
                 <li  class="db">
                     <div class="left">身份证号:</div>
                     <div class="db1 right bm">
                       <input type="text" placeholder="请输入您的的身份证号" v-model="identityNum" maxlength="18">
                     </div>
                 </li>
                  <li class="db">
                     <div class="left">身份证地址:</div>
                     <div class="db1 right bm">
                         <input type="text" placeholder="请输入您的身份证地址" v-model="identityAddress" >
                     </div>
                 </li>
                  <li class="db">
                     <div class="left">银行卡号:</div>
                     <div class="db1 right bm">
                         <input type="text" placeholder="请输入银行卡号(实际到账卡号)" v-model="bankNumber">
                     </div>
                 </li>
                 <li class="db">
                     <div class="left">银行开户行:</div>
                     <div class="db1 right bm">
                         <input type="text" placeholder="例子:招商银行" v-model="cardName">
                     </div>
                 </li>
             </ul>
         </div>
        <footer>
             <button class='btn' @click="btnSubmit">立即提交</button>
        </footer>
    </div>

</template>
