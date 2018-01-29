<template>
    <div id="app">
         <header>
             <div class="content">
               <li class="display-box">
                  <div class="left">手机号码:</div>
                  <div class="right display-box-1">
                      <input type="tel" maxlength="11" placeholder="" readOnly="true" v-model="phone">
                  </div>
              </li>
               <li class="display-box">
                  <div class="left">服务密码:</div>
                  <div class="right display-box-1">
                      <input type="password" placeholder="请输入您的运营商服务密码" v-model="password">
                  </div>
              </li>
             </div>
         </header>
         <div class="info">
             <ul>
                 <li class="display">
                     <div class="left">移动用户:</div>
                     <div class="left">方法一：发送短信MMCZ到10086;</div>
                     <div class="left">方法二：手机拨打10086转人工服务查询；</div>
                     <div class="left">方法三：手机登录10086.cn，初始密码为您手机后6位，点“忘记密码”重新设置</div>
                 </li>
                 <li class="display">
                     <div class="left">联通用户:</div>
                     <div class="left">方法一：发送短信“MMCZ#6位新密码”至10010;</div>
                     <div class="left">方法二：手机拨打10010转人工服务查询；</div>
                     <div class="left">方法三：手机登录wap.10010.cn，初始密码为您手机后6位，点“忘记密码”重新设置。</div>
                 </li>
                 <li class="display">
                     <div class="left">电信用户:</div>
                     <div class="left">方法一：编辑“503#机主名称#身份证号码”发送至10001;</div>
                     <div class="left">方法二：手机拨打10000转人工服务查询；</div>
                     <div class="left">方法三：手机登录wapzt.189.cn，初始密码为您手机后6位，点“忘记密码”重新设置。</div>
                 </li>
             </ul>
         </div>
        <footer>
             <button class='btn' @click="formSubmit">验证</button>
        </footer>
    </div>

</template>
