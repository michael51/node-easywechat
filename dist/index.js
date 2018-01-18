/*!
 * EasyWechat.js v1.3.5
 * (c) 2017-2018 Hpyer
 * Released under the MIT License.
 */
"use strict";function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}function t(e){return new Promise(function(t,n){function i(s,c){try{var o=e[c?"throw":"next"](s)}catch(e){return void n(e)}o.done?t(o.value):Promise.resolve(o.value).then(i,r)}function r(e){i(e,1)}i()})}var n=e(require("merge")),i=e(require("request")),r=e(require("body")),s=e(require("url")),c=e(require("qs")),o=e(require("fs")),a=e(require("path")),u=e(require("wechat-crypto")),l=require("xml2js");class d{constructor(e,t){this.$req=e,this.$res=t}getMethod(){return this.$req?this.$req.method:{}}getQuery(){return this.$req?s.parse(this.$req.url,!0).query:{}}_readBody(){return new Promise((e,t)=>{r(this.$req,(n,i)=>{n?t(n):e(i)})}).catch(e=>{console.log("app_server._readBody()",e)})}getBody(){return t(function*(){return this.$req?yield this._readBody():""}.call(this))}_initResponseOptions(e={}){return e.status=e.status||200,e.contentType=e.contentType||"text/html",e.headers=e.headers||{},e.headers["Content-Type"]=e.contentType,e}sendResponse(e,t={}){if(!this.$res)return!1;t=this._initResponseOptions(t),this.$res.writeHead(t.status,t.headers),this.$res.end(e)}}class p extends d{constructor(e){super(e.req,e.res),this.$ctx=e}sendResponse(e,t={}){if(!this.$ctx)return!1;t=this._initResponseOptions(t),this.$ctx.status=t.status;for(let e in t.headers)this.$ctx.set(e,t.headers[e]);this.$ctx.body=e}}class f extends d{constructor(e,t){super(e,t)}sendResponse(e,t={}){if(!this.$res)return!1;t=this._initResponseOptions(t),this.$res.status(t.status).set(t.headers).send(e)}}const h={appKey:"",appSecret:""};var g=null;class y{constructor(e={}){if(this.$config=n({},h,e),!this.$config.appKey)throw new Error("\u672a\u586b\u5199appKey");if(!this.$config.appSecret)throw new Error("\u672a\u586b\u5199appSecret");g=this,this.$plugins.forEach(e=>{this[e].init(this)})}setAppServerDefault(e,t){this.$config.app=new d(e,t)}setAppServerKoa2(e){this.$config.app=new p(e)}setAppServerExpress(e,t){this.$config.app=new f(e,t)}}y.prototype.requestGet=(e=>new Promise((t,n)=>{i({method:"GET",uri:e},function(e,i,r){if(e)n(e);else{try{r=JSON.parse(r)}catch(e){}t(r)}})})),y.prototype.requestFile=(e=>new Promise((t,n)=>{i({method:"GET",uri:e,encoding:"binary"},function(e,i,r){e?n(e):t(r)})})),y.prototype.requestPost=((e,t=null)=>new Promise((n,r)=>{i({method:"POST",uri:e,json:t},function(e,t,i){e?r(e):n(i)})})),y.prototype.buildApiUrl=(e=>t(function*(){let t=yield g.access_token.getToken();return e+"?access_token="+t}())),y.prototype.$plugins=[],y.registPlugin=((e,t)=>{y.prototype[e]=t,y.prototype.$plugins.push(e)});var m={EasyWechat:y,getInstance:()=>g};const _="https://open.weixin.qq.com/connect/oauth2/authorize",q="https://open.weixin.qq.com/connect/qrconnect",$="https://api.weixin.qq.com/sns/oauth2/access_token",b="https://api.weixin.qq.com/sns/userinfo";class k{constructor(){this.id="",this.nickname="",this.name="",this.avatar="",this.original={},this.token={}}}const w=function(e){},I=function(e=""){let t=m.getInstance();if(!t.$config.oauth)return"";if(!t.$config.oauth.scope)throw new Error("\u672a\u586b\u5199\u6388\u6743scope");if(!t.$config.oauth.redirect)throw new Error("\u672a\u586b\u5199\u6388\u6743\u56de\u8c03\u5730\u5740");let n=t.$config.oauth.redirect;if("http://"!=n.substr(0,7)&&"https://"!=n.substr(0,8))throw new Error("\u8bf7\u586b\u5199\u5b8c\u6574\u7684\u56de\u8c03\u5730\u5740\uff0c\u4ee5\u201chttp://\u201d\u6216\u201chttps://\u201d\u5f00\u5934");let i=_;"snsapi_login"==t.$config.oauth.scope&&(i=q);let r={appid:t.$config.appKey,redirect_uri:n,response_type:"code",scope:t.$config.oauth.scope};return e&&(r.state=e),i+"?"+c.stringify(r)+"#wechat_redirect"},P=function(e){return t(function*(){let t=yield E(e);return"snsapi_base"!=m.getInstance().$config.oauth.scope&&(t=yield T(t)),t}())},E=function(e){return t(function*(){let t=m.getInstance(),n={appid:t.$config.appKey,secret:t.$config.appSecret,code:e,grant_type:"authorization_code"},i=$+"?"+c.stringify(n),r=yield t.requestGet(i),s=new k;return s.id=r.openid,s.token=r,s}())},T=function(e){return t(function*(){let t={access_token:e.token.access_token,openid:e.id,lang:"zh_CN"},n=b+"?"+c.stringify(t),i=yield m.getInstance().requestGet(n);return i.errcode?(console.log("oauth.fetchUserInfo()",i),!1):(e.id=i.openid,e.nickname=i.nickname,e.name=i.nickname,e.avatar=i.headimgurl,e.original=i,e)}())};var U={init:function(e){},redirect:function(e=""){let t=m.getInstance();if(!t.$config.oauth)return"";if(!t.$config.oauth.scope)throw new Error("\u672a\u586b\u5199\u6388\u6743scope");if(!t.$config.oauth.redirect)throw new Error("\u672a\u586b\u5199\u6388\u6743\u56de\u8c03\u5730\u5740");let n=t.$config.oauth.redirect;if("http://"!=n.substr(0,7)&&"https://"!=n.substr(0,8))throw new Error("\u8bf7\u586b\u5199\u5b8c\u6574\u7684\u56de\u8c03\u5730\u5740\uff0c\u4ee5\u201chttp://\u201d\u6216\u201chttps://\u201d\u5f00\u5934");let i=_;"snsapi_login"==t.$config.oauth.scope&&(i=q);let r={appid:t.$config.appKey,redirect_uri:n,response_type:"code",scope:t.$config.oauth.scope};return e&&(r.state=e),i+"?"+c.stringify(r)+"#wechat_redirect"},user:function(e){return t(function*(){let t=yield E(e);return"snsapi_base"!=m.getInstance().$config.oauth.scope&&(t=yield T(t)),t}())}};const S=function(){return parseInt((new Date).getTime()/1e3)},A=function(e=16){let t="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",n="";for(let i=0;i<e;i++)n+=t.charAt(Math.floor(Math.random()*t.length));return n},v=function(e){if(!e)return e;if("object"!=typeof e)return e;let t=new Object;for(let n in e)t[n]=v(e[n]);return t},x=function(){let e=arguments;if(0==e.length)return null;let t=v(e[0]);if(1==e.length)return t;for(let n=1;n<e.length;n++)if(e[n]&&"object"==typeof e[n])for(let i in e[n])t[i]=e[n][i];return t},M=function(e){let t=require("crypto").createHash("sha1");return t.update(e),t.digest("hex")};class C{constructor(){this.$options={}}fetch(e){return null}contains(e){return!0}save(e,t=null,n=0){return!0}delete(e){return!0}}class j extends C{constructor(){super(),this.$datas={}}fetch(e){return!this.contains(e)||this.$datas[e].lifeTime>0&&this.$datas[e].lifeTime<S()?null:this.$datas[e].data}contains(e){return"object"==typeof this.$datas[e]}save(e,t=null,n=0){let i={data:t,lifeTime:n>0?n+S():0};return this.$datas[e]=i,!0}delete(e){return delete this.$datas[e],!0}}class N extends C{constructor(e){super();let t={path:"",dirMode:511,fileMode:438,ext:".cache"};this.$options=x(t,e),this.$options.path=a.resolve(this.$options.path);try{o.accessSync(this.$options.path,o.constants.R_OK&o.constants.W_OK)}catch(e){try{o.mkdirSync(this.$options.path,this.$options.dirMode)}catch(e){console.log("\u65e0\u6cd5\u521b\u5efa\u7f13\u5b58\u76ee\u5f55\uff1a"+this.$options.path,e)}}}getCacheFile(e){return this.$options.path+"/"+e+this.$options.ext}fetch(e){let t=null,n=this.getCacheFile(e);try{let e=JSON.parse(o.readFileSync(n,{encoding:"utf-8",flag:"r"}));t=e.lifeTime>0&&e.lifeTime<S()?null:e.data}catch(e){console.log("\u65e0\u6cd5\u8bfb\u53d6\u7f13\u5b58\u6587\u4ef6\uff1a"+n,e),t=null}return t}contains(e){let t=this.getCacheFile(e);try{o.accessSync(t,o.constants.R_OK&o.constants.W_OK)}catch(e){return!1}return!0}save(e,t=null,n=0){let i=this.getCacheFile(e);try{let e={data:t,lifeTime:n>0?n+S():0};o.writeFileSync(i,JSON.stringify(e),{mode:this.$options.fileMode,encoding:"utf-8",flag:"w"})}catch(e){return console.log("\u65e0\u6cd5\u5199\u5165\u7f13\u5b58\u6587\u4ef6\uff1a"+i,e),!1}return!0}delete(e){let t=this.getCacheFile(e);try{o.unlinkSync(t)}catch(e){return console.log("\u65e0\u6cd5\u5220\u9664\u7f13\u5b58\u6587\u4ef6\uff1a"+t,e),!1}return!0}}var R=Object.freeze({CacheInterface:C,MemoryCache:j,FileCache:N});const D=function(e){if(!e.$config.cache)switch(e.$config.cache_driver){case"file":e.$config.cache=new N(e.$config.cache_options);break;case"memory":default:e.$config.cache=new j}},K=function(e){e&&"function"==typeof e.fetch&&"function"==typeof e.contains&&"function"==typeof e.save&&"function"==typeof e.delete&&(m.getInstance().$config.cache=e)};var O={init:function(e){if(!e.$config.cache)switch(e.$config.cache_driver){case"file":e.$config.cache=new N(e.$config.cache_options);break;case"memory":default:e.$config.cache=new j}},setCache:function(e){e&&"function"==typeof e.fetch&&"function"==typeof e.contains&&"function"==typeof e.save&&"function"==typeof e.delete&&(m.getInstance().$config.cache=e)}};const W="https://api.weixin.qq.com/cgi-bin/token",F=function(e){e.$config.access_token_cache_key=e.$config.access_token_cache_key||"NODE_EASYWECHAT_ACCESS_TOKEN"},G=function(){return t(function*(){let e=m.getInstance(),t={appid:e.$config.appKey,secret:e.$config.appSecret,grant_type:"client_credential"},n=W+"?"+c.stringify(t);return yield e.requestGet(n)}())},Q=function(e=!1){return t(function*(){let t=m.getInstance(),n=t.$config.cache.fetch(t.$config.access_token_cache_key);if(e||!n){let e=yield G();H(e.access_token,e.expires_in),n=e.access_token}return n}())},H=function(e,t=7200){let n=m.getInstance();console.log("\u5199\u5165AccessToken: ",n.$config.access_token_cache_key,e,t),n.$config.cache.save(n.$config.access_token_cache_key,e,t)};var J={init:function(e){e.$config.access_token_cache_key=e.$config.access_token_cache_key||"NODE_EASYWECHAT_ACCESS_TOKEN"},getToken:function(e=!1){return t(function*(){let t=m.getInstance(),n=t.$config.cache.fetch(t.$config.access_token_cache_key);if(e||!n){let e=yield G();H(e.access_token,e.expires_in),n=e.access_token}return n}())},setToken:H};const L="https://api.weixin.qq.com/cgi-bin/ticket/getticket",z=function(e){e.$config.jssdk_cache_key=e.$config.jssdk_cache_key||"NODE_EASYWECHAT_JSSKD_TICKET"};var B="";const V=function(e){B=e},Y=function(){return t(function*(){let e=m.getInstance(),t={access_token:yield e.access_token.getToken(),type:"jsapi"},n=L+"?"+c.stringify(t);return yield e.requestGet(n)}())},X=function(e,n=!1,i=!0){return t(function*(){let t=m.getInstance(),r=t.$config.cache.fetch(t.$config.jssdk_cache_key);if(!r){let e=yield Y();console.log("\u5199\u5165JSSDK: ",t.$config.jssdk_cache_key,e.ticket,e.expires_in),t.$config.cache.save(t.$config.jssdk_cache_key,e.ticket,e.expires_in),r=e.ticket}let s=B,c=A(),o=S(),a=Z({jsapi_ticket:r,noncestr:c,timestamp:o,url:s}),u={debug:n,appId:t.$config.appKey,timestamp:o,nonceStr:c,signature:a,url:s,jsApiList:e};return B="",i?JSON.stringify(u):u}())},Z=function(e){let t="",n="";for(let i in e)t+=n+i+"="+e[i],n="&";return M(t)};var ee={init:function(e){e.$config.jssdk_cache_key=e.$config.jssdk_cache_key||"NODE_EASYWECHAT_JSSKD_TICKET"},setUrl:function(e){B=e},config:function(e,n=!1,i=!0){return t(function*(){let t=m.getInstance(),r=t.$config.cache.fetch(t.$config.jssdk_cache_key);if(!r){let e=yield Y();console.log("\u5199\u5165JSSDK: ",t.$config.jssdk_cache_key,e.ticket,e.expires_in),t.$config.cache.save(t.$config.jssdk_cache_key,e.ticket,e.expires_in),r=e.ticket}let s=B,c=A(),o=S(),a=Z({jsapi_ticket:r,noncestr:c,timestamp:o,url:s}),u={debug:n,appId:t.$config.appKey,timestamp:o,nonceStr:c,signature:a,url:s,jsApiList:e};return B="",i?JSON.stringify(u):u}())}};class te{constructor(e){this.dataParams={ToUserName:"",FromUserName:"",CreateTime:S(),MsgType:""},this.json=null,this.data="","object"==typeof e?this.json=e:this.data=e}setAttribute(e,t){this.dataParams[e]=t}formatData(){return"<xml>"+this._formatData(this.dataParams)+"</xml>"}_formatData(e){if("object"==typeof e){let t="";for(let n in e)t+=`<${n}>${this._formatData(e[n])}</${n}>`;return t}return"string"==typeof e?"<![CDATA["+e+"]]>":e}getData(){return this.json?JSON.stringify(this.json):(this.data||(this.data=this.formatData()),this.data)}}class ne extends te{constructor(e){super(""),this.dataParams={},this.dataParams.Encrypt=e.encrypt||"",this.dataParams.MsgSignature=e.sign||"",this.dataParams.TimeStamp=e.timestamp||S(),this.dataParams.Nonce=e.nonce||""}content(e){this.dataParams.Content=e}}class ie extends te{constructor(e){super(""),this.dataParams.MsgType="text",this.dataParams.Content=e.content||""}content(e){this.dataParams.Content=e}}class re extends te{constructor(e){super(""),this.dataParams.MsgType="image",this.dataParams.Image={MediaId:e.media_id||""}}mediaId(e){this.dataParams.Image.MediaId=e}}class se extends te{constructor(e){super(""),this.dataParams.MsgType="voice",this.dataParams.Voice={MediaId:e.media_id||""}}mediaId(e){this.dataParams.Voice.MediaId=e}}class ce extends te{constructor(e){super(""),this.dataParams.MsgType="video",this.dataParams.Video={MediaId:e.media_id||"",Title:e.title||"",Description:e.description||""}}mediaId(e){this.dataParams.Video.MediaId=e}title(e){this.dataParams.Video.Title=e}description(e){this.dataParams.Video.Description=e}}class oe extends te{constructor(e){super(""),this.dataParams.MsgType="music",this.dataParams.Music={MediaId:e.media_id||"",Title:e.title||"",Description:e.description||"",MusicUrl:e.music_url||"",HQMusicUrl:e.hq_music_url||"",ThumbMediaId:e.thumb_media_id||""}}mediaId(e){this.dataParams.Music.MediaId=e}title(e){this.dataParams.Music.Title=e}description(e){this.dataParams.Music.Description=e}musicUrl(e){this.dataParams.Music.MusicUrl=e}hqMusicurl(e){this.dataParams.Music.HQMusicUrl=e}thumbMediaId(e){this.dataParams.Music.ThumbMediaId=e}}class ae extends te{constructor(e){super(""),this.dataParams.MsgType="news",this.dataParams.ArticleCount=1,this.dataParams.Articles={item:{Title:e.title||"",Description:e.description||"",Url:e.url||"",PicUrl:e.image||""}}}title(e){this.dataParams.Articles.item.Title=e}description(e){this.dataParams.Articles.item.Description=e}url(e){this.dataParams.Articles.item.Url=e}picUrl(e){this.dataParams.Articles.item.PicUrl=e}}var ue=Object.freeze({Raw:te,Encrypt:ne,Text:ie,Image:re,Voice:se,Video:ce,Music:oe,News:ae});const le=function(e){de=function(){}};let de,pe;const fe=function(e){"function"!=typeof e&&(e=function(){}),de=e},he=function(){return t(function*(){let e=m.getInstance(),t=e.$config.app;if(!t)throw new Error("\u672a\u5728\u914d\u7f6e\u6587\u4ef6\u4e2d\u8bbe\u7f6e\u5e94\u7528\u670d\u52a1\u5668");let n=null;if(e.$config.aesKey&&(n=new u(e.$config.token,e.$config.aesKey,e.$config.appKey)),"GET"==t.getMethod()){let r=t.getQuery();if(!(r.signature&&r.echostr&&r.timestamp&&r.nonce))return void t.sendResponse("Hello node-easywechat");let s;if(n)s=n.getSignature(r.timestamp||"",r.nonce||"",r.encrypt||"");else{var i=[e.$config.token,r.timestamp||"",r.nonce||"",r.encrypt||""].sort();s=M(i.join(""))}s===r.signature?t.sendResponse(r.echostr):t.sendResponse("fail")}else{let e=yield t.getBody();if(pe=yield ge(e,n),de&&"function"==typeof de){let e=yield de(pe);if(!e||"string"==typeof e&&"SUCCESS"==e.toUpperCase())return void t.sendResponse("SUCCESS");let i=null;if((i="string"==typeof e?new ie({content:e}):e)&&"object"==typeof i){i.setAttribute("ToUserName",pe.FromUserName),i.setAttribute("FromUserName",pe.ToUserName);let e=i.getData();if(console.log("server.send().original",e),n&&pe._isEncrypt){e=n.encrypt(e);let t=S(),r=A(),s=n.getSignature(t,r,e);e=(i=new ne({encrypt:e,sign:s,timestamp:t,nonce:r})).getData(),console.log("server.send().encrypt",e)}t.sendResponse(e)}}}}())},ge=function(e,n=null){return t(function*(){return new Promise((i,r)=>{l.parseString(e,(e,s)=>t(function*(){if(e)r(e);else{let e;if(s&&s.xml){e={};for(let t in s.xml)e[t]=s.xml[t][0];if(e._isEncrypt=!1,e.Encrypt&&n){let t=n.decrypt(e.Encrypt);console.log("decrypted",t),(e=yield ge(t.message))._isEncrypt=!0}}i(e)}}()))}).catch(e=>{console.log("server.parseMessage()",e)})}())},ye=function(){return pe};var me={init:function(e){de=function(){}},setMessageHandler:function(e){"function"!=typeof e&&(e=function(){}),de=e},serve:function(){return t(function*(){let e=m.getInstance(),t=e.$config.app;if(!t)throw new Error("\u672a\u5728\u914d\u7f6e\u6587\u4ef6\u4e2d\u8bbe\u7f6e\u5e94\u7528\u670d\u52a1\u5668");let n=null;if(e.$config.aesKey&&(n=new u(e.$config.token,e.$config.aesKey,e.$config.appKey)),"GET"==t.getMethod()){let r=t.getQuery();if(!(r.signature&&r.echostr&&r.timestamp&&r.nonce))return void t.sendResponse("Hello node-easywechat");let s;if(n)s=n.getSignature(r.timestamp||"",r.nonce||"",r.encrypt||"");else{var i=[e.$config.token,r.timestamp||"",r.nonce||"",r.encrypt||""].sort();s=M(i.join(""))}s===r.signature?t.sendResponse(r.echostr):t.sendResponse("fail")}else{let e=yield t.getBody();if(pe=yield ge(e,n),de&&"function"==typeof de){let e=yield de(pe);if(!e||"string"==typeof e&&"SUCCESS"==e.toUpperCase())return void t.sendResponse("SUCCESS");let i=null;if((i="string"==typeof e?new ie({content:e}):e)&&"object"==typeof i){i.setAttribute("ToUserName",pe.FromUserName),i.setAttribute("FromUserName",pe.ToUserName);let e=i.getData();if(console.log("server.send().original",e),n&&pe._isEncrypt){e=n.encrypt(e);let t=S(),r=A(),s=n.getSignature(t,r,e);e=(i=new ne({encrypt:e,sign:s,timestamp:t,nonce:r})).getData(),console.log("server.send().encrypt",e)}t.sendResponse(e)}}}}())},getMessage:function(){return pe}};const _e="https://api.weixin.qq.com/cgi-bin/message/template/send",qe="https://api.weixin.qq.com/cgi-bin/template/get_industry",$e="https://api.weixin.qq.com/cgi-bin/template/api_set_industry",be="https://api.weixin.qq.com/cgi-bin/template/api_add_template",ke="https://api.weixin.qq.com/cgi-bin/template/get_all_private_template",we="https://api.weixin.qq.com/cgi-bin/template/del_private_template",Ie=function(e){Ee=new Pe};class Pe{constructor(){this.reset()}}Pe.prototype.reset=function(){this.touser="",this.template_id="",this.url="",this.miniprogram={},this.data=[]};let Ee=null;const Te=function(e){return Ee.touser=e,this},Ue=function(e){return Ee.template_id=e,this},Se=function(e){return Ee.url=e,this},Ae=function(e){return Ee.data=ve(e),this},ve=function(e){let t={};for(let n in e){let i=e[n];"object"==typeof i?void 0!==i.length?t[n]={value:i[0],color:i[1]}:t[n]=i:t[n]={value:i}}return t},xe=function(e=null){return t(function*(){if(e?e.data&&(e.data=ve(e.data)):e={},e=n({},Ee,e),Ee.reset(),!e.touser)throw new Error("\u7528\u6237openid\u4e3a\u7a7a");if(!e.template_id)throw new Error("\u6a21\u677fid\u4e3a\u7a7a");let t=m.getInstance(),i=yield t.buildApiUrl(_e);return yield t.requestPost(i,e)}())},Me=function(){return t(function*(){let e=m.getInstance(),t=yield e.buildApiUrl(qe);return yield e.requestPost(t)}())},Ce=function(e,n){return t(function*(){let t=m.getInstance(),i=yield t.buildApiUrl($e),r={industry_id1:e,industry_id2:n};return yield t.requestPost(i,r)}())},je=function(e){return t(function*(){let t=m.getInstance(),n=yield t.buildApiUrl(be),i={template_id_short:e};return yield t.requestPost(n,i)}())},Ne=function(){return t(function*(){let e=m.getInstance(),t=yield e.buildApiUrl(ke);return yield e.requestPost(t)}())},Re=function(e){return t(function*(){let t=m.getInstance(),n=yield t.buildApiUrl(we),i={template_id:e};return yield t.requestPost(n,i)}())};var De={init:function(e){Ee=new Pe},to:Te,withTo:Te,andTo:Te,receiver:Te,withReceiver:Te,andhReceiver:Te,uses:Ue,withUses:Ue,andUses:Ue,template:Ue,withTemplate:Ue,andTemplate:Ue,templateId:Ue,withTemplateId:Ue,andTemplateId:Ue,url:Se,withUrl:Se,andUrl:Se,link:Se,withLink:Se,andLink:Se,linkTo:Se,withLinkTo:Se,andLinkTo:Se,data:Ae,withData:Ae,andData:Ae,send:function(e=null){return t(function*(){if(e?e.data&&(e.data=ve(e.data)):e={},e=n({},Ee,e),Ee.reset(),!e.touser)throw new Error("\u7528\u6237openid\u4e3a\u7a7a");if(!e.template_id)throw new Error("\u6a21\u677fid\u4e3a\u7a7a");let t=m.getInstance(),i=yield t.buildApiUrl(_e);return yield t.requestPost(i,e)}())},getIndustry:function(){return t(function*(){let e=m.getInstance(),t=yield e.buildApiUrl(qe);return yield e.requestPost(t)}())},setIndustry:function(e,n){return t(function*(){let t=m.getInstance(),i=yield t.buildApiUrl($e),r={industry_id1:e,industry_id2:n};return yield t.requestPost(i,r)}())},addTemplate:function(e){return t(function*(){let t=m.getInstance(),n=yield t.buildApiUrl(be),i={template_id_short:e};return yield t.requestPost(n,i)}())},getPrivateTemplates:function(){return t(function*(){let e=m.getInstance(),t=yield e.buildApiUrl(ke);return yield e.requestPost(t)}())},deletePrivateTemplate:function(e){return t(function*(){let t=m.getInstance(),n=yield t.buildApiUrl(we),i={template_id:e};return yield t.requestPost(n,i)}())}};const Ke="https://api.weixin.qq.com/cgi-bin/qrcode/create",Oe="https://mp.weixin.qq.com/cgi-bin/showqrcode",We=function(e){},Fe=function(e,n=null){return t(function*(){((n=parseInt(n))<=0||n>604800)&&(n=604800);let t="";"string"==typeof e?(e={scene_str:e},t="QR_STR_SCENE"):(e={scene_id:e},t="QR_SCENE");let i={expire_seconds:n,action_name:t,action_info:{scene:e}},r=m.getInstance(),s=yield r.buildApiUrl(Ke);return yield r.requestPost(s,i)}())},Ge=function(e){return t(function*(){let t="";"string"==typeof e?(e={scene_str:e},t="QR_LIMIT_STR_SCENE"):(e={scene_id:e},t="QR_LIMIT_SCENE");let n={action_name:t,action_info:{scene:e}},i=m.getInstance(),r=yield i.buildApiUrl(Ke);return yield i.requestPost(r,n)}())},Qe=function(e){return t(function*(){let t=Oe+"?ticket="+e;return yield m.getInstance().requestFile(t)}())};var He={init:function(e){},temporary:function(e,n=null){return t(function*(){((n=parseInt(n))<=0||n>604800)&&(n=604800);let t="";"string"==typeof e?(e={scene_str:e},t="QR_STR_SCENE"):(e={scene_id:e},t="QR_SCENE");let i={expire_seconds:n,action_name:t,action_info:{scene:e}},r=m.getInstance(),s=yield r.buildApiUrl(Ke);return yield r.requestPost(s,i)}())},forever:function(e){return t(function*(){let t="";"string"==typeof e?(e={scene_str:e},t="QR_LIMIT_STR_SCENE"):(e={scene_id:e},t="QR_LIMIT_SCENE");let n={action_name:t,action_info:{scene:e}},i=m.getInstance(),r=yield i.buildApiUrl(Ke);return yield i.requestPost(r,n)}())},url:function(e){return t(function*(){let t=Oe+"?ticket="+e;return yield m.getInstance().requestFile(t)}())}};const Je="https://api.weixin.qq.com/cgi-bin/user/info",Le="https://api.weixin.qq.com/cgi-bin/user/info/batchget",ze="https://api.weixin.qq.com/cgi-bin/user/get",Be="https://api.weixin.qq.com/cgi-bin/user/info/updateremark",Ve="https://api.weixin.qq.com/cgi-bin/tags/members/getblacklist",Ye="https://api.weixin.qq.com/cgi-bin/tags/members/batchblacklist",Xe="https://api.weixin.qq.com/cgi-bin/tags/members/batchunblacklist";class Ze{constructor(){this.id="",this.nickname="",this.name="",this.avatar="",this.original={},this.token={}}}const et=function(e){},tt=function(e,n="zh_CN"){return t(function*(){let t=m.getInstance(),i=yield t.buildApiUrl(Je);i+="&openid="+e+"&lang="+n;let r=yield t.requestGet(i),s=new Ze;return s.id=r.openid,s.nickname=r.nickname,s.name=r.nickname,s.avatar=r.headimgurl,s.original=r,s}())},nt=function(e){return t(function*(){let t=m.getInstance(),n={user_list:e},i=yield t.buildApiUrl(Le);return yield t.requestPost(i,n)}())},it=function(e=null){return t(function*(){let t=m.getInstance(),n=yield t.buildApiUrl(ze);return e&&(n+="&next_openid="+e),yield t.requestGet(n)}())},rt=function(e,n){return t(function*(){let e=m.getInstance(),t=yield e.buildApiUrl(Be);return yield e.requestPost(t)}())},st=function(e){return t(function*(){let t=m.getInstance(),n={};e&&(n.begin_openid=e);let i=yield t.buildApiUrl(Ve);return yield t.requestPost(i,n)}())},ct=function(e){return t(function*(){let t=m.getInstance(),n={openid_list:e},i=yield t.buildApiUrl(Ye);return yield t.requestPost(i,n)}())},ot=function(e){return t(function*(){let t=m.getInstance(),n={openid_list:e},i=yield t.buildApiUrl(Xe);return yield t.requestPost(i,n)}())},at=function(e){return t(function*(){return yield ct([e])}())},ut=function(e){return t(function*(){return yield ot([e])}())};var lt={init:function(e){},get:function(e,n="zh_CN"){return t(function*(){let t=m.getInstance(),i=yield t.buildApiUrl(Je);i+="&openid="+e+"&lang="+n;let r=yield t.requestGet(i),s=new Ze;return s.id=r.openid,s.nickname=r.nickname,s.name=r.nickname,s.avatar=r.headimgurl,s.original=r,s}())},batchGet:function(e){return t(function*(){let t=m.getInstance(),n={user_list:e},i=yield t.buildApiUrl(Le);return yield t.requestPost(i,n)}())},lists:function(e=null){return t(function*(){let t=m.getInstance(),n=yield t.buildApiUrl(ze);return e&&(n+="&next_openid="+e),yield t.requestGet(n)}())},remark:function(e,n){return t(function*(){let e=m.getInstance(),t=yield e.buildApiUrl(Be);return yield e.requestPost(t)}())},blacklist:function(e){return t(function*(){let t=m.getInstance(),n={};e&&(n.begin_openid=e);let i=yield t.buildApiUrl(Ve);return yield t.requestPost(i,n)}())},batchBlock:ct,batchUnblock:ot,block:function(e){return t(function*(){return yield ct([e])}())},unblock:function(e){return t(function*(){return yield ot([e])}())}};const dt="https://api.weixin.qq.com/cgi-bin/menu/get",pt="https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info",ft="https://api.weixin.qq.com/cgi-bin/menu/create",ht="https://api.weixin.qq.com/cgi-bin/menu/delete",gt=function(e){},yt=function(){return t(function*(){let e=m.getInstance(),t=yield e.buildApiUrl(dt);return yield e.requestPost(t)}())},mt=function(){return t(function*(){let e=m.getInstance(),t=yield e.buildApiUrl(pt);return yield e.requestPost(t)}())},_t=function(e){return t(function*(){let t={button:e},n=m.getInstance(),i=yield n.buildApiUrl(ft);return yield n.requestPost(i,t)}())},qt=function(){return t(function*(){let e=m.getInstance(),t=yield e.buildApiUrl(ht);return yield e.requestPost(t)}())};var $t={init:function(e){},all:function(){return t(function*(){let e=m.getInstance(),t=yield e.buildApiUrl(dt);return yield e.requestPost(t)}())},current:function(){return t(function*(){let e=m.getInstance(),t=yield e.buildApiUrl(pt);return yield e.requestPost(t)}())},add:function(e){return t(function*(){let t={button:e},n=m.getInstance(),i=yield n.buildApiUrl(ft);return yield n.requestPost(i,t)}())},destroy:function(){return t(function*(){let e=m.getInstance(),t=yield e.buildApiUrl(ht);return yield e.requestPost(t)}())}};const bt="https://api.weixin.qq.com/cgi-bin/shorturl",kt=function(e){},wt=function(e){return t(function*(){let t={action:"long2short",long_url:e},n=m.getInstance(),i=yield n.buildApiUrl(bt);return yield n.requestPost(i,t)}())};var It={init:function(e){},shorten:function(e){return t(function*(){let t={action:"long2short",long_url:e},n=m.getInstance(),i=yield n.buildApiUrl(bt);return yield n.requestPost(i,t)}())}};m.EasyWechat.registPlugin("oauth",U),m.EasyWechat.registPlugin("cache",O),m.EasyWechat.registPlugin("access_token",J),m.EasyWechat.registPlugin("jssdk",ee),m.EasyWechat.registPlugin("server",me),m.EasyWechat.registPlugin("notice",De),m.EasyWechat.registPlugin("qrcode",He),m.EasyWechat.registPlugin("user",lt),m.EasyWechat.registPlugin("menu",$t),m.EasyWechat.registPlugin("url",It),m.EasyWechat.Cache={};for(let e in R)m.EasyWechat.Cache[e]=R[e];m.EasyWechat.Message={};for(let e in ue)m.EasyWechat.Message[e]=ue[e];var Pt=m.EasyWechat;module.exports=Pt;