<template>
    <div class="c2c-user-look-signature fullscreen" v-cloak>
    <img :src="sigImg" alt="">
    <p class="tips">友情提示：借条由第三方公司e签宝托管，具有法律效力！逾期不还将会提交至广州市仲裁委员会进行仲裁！</p>
    <button @click="toBack">返回</button>
   <!--  <div id="viewerContainer">
      <div id="viewer" class="pdfViewer"></div>
    </div> -->

  <!--   <div id="loadingBar">
      <div class="progress"></div>
    </div>
 -->
<!--     <div id="errorWrapper" hidden="true">
      <div id="errorMessageLeft">
        <span id="errorMessage"></span>
        <button id="errorShowMore">
          More Information
        </button>
        <button id="errorShowLess">
          Less Information
        </button>
      </div>
      <div id="errorMessageRight">
        <button id="errorClose">
          Close
        </button>
      </div>
      <div class="clearBoth"></div>
      <textarea id="errorMoreInfo" hidden="true" readonly="readonly"></textarea>
    </div>

    <footer>
      <button class="toolbarButton pageUp" title="Previous Page" id="previous"></button>
      <button class="toolbarButton pageDown" title="Next Page" id="next"></button>

      <input type="number" id="pageNumber" class="toolbarField pageNumber" value="1" size="4" min="1">

      <button class="toolbarButton zoomOut" title="Zoom Out" id="zoomOut"></button>
      <button class="toolbarButton zoomIn" title="Zoom In" id="zoomIn"></button>
    </footer> -->
    </div>
</template>
    