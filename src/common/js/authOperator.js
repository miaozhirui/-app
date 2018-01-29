/**
 * [operatorAuth 运营商验证]
 */

import { utils } from 'kld';

export const operatorAuth= function(params,callback){
	    let promise = utils.fetch({
	        url: '/v2/user/collection/mobile/submit',
	        data: params,
	        api: true
	    });

	    promise.then(req => {
	        //验证状态
	        checkStatusCode(req,callback);
	    });
	}



function checkStatusCode(req,callback){

    switch(req.statusCode){
        case 200://弹出验证码
            handlevestData(req.data, callback);
            break;
        case 1010://已验证
        	  closeModal();
            if(callback) callback(req);
            break;
        case 210101: case 211101:
						closeModal();
            utils.tipInfo({content:'请输入正确的验证码哦!'});
            break;
        case 506027:
						closeModal();
            utils.tipInfo({content:'短信验证码超时，请点击下一步重新授权!'});
            break;
        case 506004: case 506021:
						closeModal();
            utils.tipInfo({content:'未能成功拉取登录需要的验证码，请重新尝试!'});
            break;
        case 4000:
				    closeModal();
            utils.tipInfo({content:'系统有点忙哦，请稍等片刻!'});
            break;
				case 506010:
						closeModal();
						utils.tipInfo({content:'密码输入不正确，请确认后重试！'});
						break;
        case 506102:
				case 208101:
				case 506018:
            // utils.tipInfo({content:req.message,callback:function(){
            //     //输入验证码
            // }});
						closeModal();
						utils.tipInfo({content:req.message});
            break;
        default:
						closeModal();
            utils.tipInfo({content:req.message});
            break;
    }
}

function handlevestData(req,callback){
    if(req.param.length==1){
        showPicCode1(req,callback);
    }else if(req.param.length==2){
        showPicCode2(req,callback);
    }else{
        utils.tipInfo({content:'需要填写身份证号和真实姓名登录!'});
    }
}

function showPicCode1(vestdata,callback){

    var confirmBox = document.createElement("div");
    confirmBox.className='phone-body';
    confirmBox.id="confirmBox";
    var afterText,picText;

    picText=`<div class="form-content">
                <img id="picCode" class="pic-code" src = "data:image/jpg;base64,${vestdata.param[0].value}" />
                <button type="button" id="smsPicRefresh" class="btn1">刷新</button>
             </div>`;
    afterText = `<h1 class="fs1">${vestdata.param[0].title}</h1>
                     <h2 class="fs2">${vestdata.param[0].hint}</h2>
                     ${vestdata.param[0].key=="pic_code" ? picText:''}
                     <div><input id="vestpiccode" type="text" value= "" class="inp-txt"/></div>
                     <div><button type="button" id="submitSmsCode" class="btn btn2">提交</button></div>`;

    confirmBox.innerHTML=afterText;

    document.body.appendChild(confirmBox);
    var submitSmsCode = document.getElementById("submitSmsCode");
    var smsPicRefresh = document.getElementById("smsPicRefresh");

    submitSmsCode.onclick=function(){

        var params;
        if(vestdata.param[0].key == "pic_code"){
            params = {
                "param":{
                    "pic_code":document.getElementById("vestpiccode").value
                },
                "hidden": vestdata.hidden,
                "method": vestdata.method
            }
        }else{
            var key = vestdata.param[0].key;
            var paramstr = '{"' + key + '":""}';
            var paramjson = JSON.parse(paramstr);
            paramjson[key] = document.getElementById("vestpiccode").value;
            params = {
                "param":paramjson,
                "hidden": vestdata.hidden,
                "method": vestdata.method
            }
        }
        closeModal();
        operatorAuth(params,callback);
    }
    // 刷新验证码
    if(smsPicRefresh){
        smsPicRefresh.onclick = function(){
            var refreshMsg = {
                "hidden": vestdata.hidden,
                "param": vestdata.param[0].refresh_param,
                "method": vestdata.param[0].refresh_method
            };
            let promise = utils.fetch({
                url: '/user/collection/mobile/refresh',
                data: refreshMsg,
                api: true
            });

            promise.then(req => {
               document.getElementById("picCode").src='data:image/jpg;base64,' + req.data;
            });
        }
    }
    var modelBox = document.createElement("div");
    modelBox.className="phone-modal";
	modelBox.id = "phoneModal";
    modelBox.onclick = closeModal;
    document.body.appendChild(modelBox);

}

function showPicCode2(vestdata,callback){
	debugger;
    if (vestdata.param[1].key == "pic_code") {
        var confirmBox = document.createElement("div");
        confirmBox.className='phone-body';
        confirmBox.id="confirmBox";
        var afterText = `<div id="phoneContent">
                            <h1 class="fs1">${vestdata.param[0].title}</h1>
                            <h2 class="fs2">${vestdata.param[0].hint}</h2>
                            <div class="form-content">
                                <img id="picCode" class="pic-code" src = "data:image/jpg;base64,${vestdata.param[0].value}" />
                            </div>
                            <div><input id="vestpiccode" type="text" value= "" class="inp-txt"/></div>
                        </div>
                        <div><button type="button" id="submitSmsCode" class="btn btn2">提交</button></div>
                        `;

        // var afterText =`<div id="phoneContent"><h1 class="fs1">${vestdata.param[1].title}</h1>
        //                     <h2 class="fs2">${vestdata.param[1].hint}</h2>
        //                     <div><img src = "data:image/jpg;base64,${vestdata.param[1].value}"></div>
        //                     <div><input id="vestpiccode" type="text" value= "" /></div>
        //                 </div>
        //     <div><button type="button" id="submitSmsCode">提交</button></div>`;

        var afterText2 = `<div>
                            <h1 class="fs1">${vestdata.param[0].title}</h1>
                            <h2 class="fs2">${vestdata.param[0].hint}</h2>
                            <div><input id="vestpiccode2" type="text" value= "" class="inp-txt"></div>
                        </div>`;
        confirmBox.innerHTML=afterText;

        document.body.appendChild(confirmBox);

        var phoneContent = document.getElementById("phoneContent");
        var submitSmsCode = document.getElementById("submitSmsCode");

        var step=1;
        var vestpiccodeVal='';
        submitSmsCode.onclick=function(){

            if(step==1){
                vestpiccodeVal=document.getElementById("vestpiccode").value;
                phoneContent.innerHTML = afterText2;
                step++;
            }else{
                var params = {
                    "param":{
                        "pic_code":vestpiccodeVal,
                        "message_code":document.getElementById("vestpiccode2").value
                    },
                    "hidden": vestdata.hidden,
                    "method": vestdata.method
                }
                closeModal();
                operatorAuth(params,callback);
            }


        }

        var modelBox = document.createElement("div");
        modelBox.className="phone-modal";
        modelBox.id = "phoneModal";
        modelBox.onclick = closeModal;
        document.body.appendChild(modelBox);
    }

}

function closeModal(){
	var obj1 = document.getElementById("confirmBox");
	var obj2 = document.getElementById("phoneModal");
	var body = document.body;
	if(obj1){

		body.removeChild(obj1);
	}
	if(obj2) {

		body.removeChild(obj2);

	}
}

export default {
	operatorAuth
}
