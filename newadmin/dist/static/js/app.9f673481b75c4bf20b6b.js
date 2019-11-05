webpackJsonp([1],{"5vB8":function(t,e){},N700:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("7+uW"),o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var r=a("VU/8")({name:"App"},o,!1,function(t){a("hFVZ")},null,null).exports,s=a("/ocq"),i={computed:{breadcrumb:function(){var t="";return this.$route.matched.forEach(function(e){t+=e.meta+"->"}),console.log(t),t}}},l={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"breadcrumb"},[this._v("\n  "+this._s(this.breadcrumb)+"\n")])},staticRenderFns:[]};var c={components:{breadcrumb:a("VU/8")(i,l,!1,function(t){a("N700")},"data-v-703a28c2",null).exports},data:function(){return{user:JSON.parse(localStorage.getItem("user"))}},methods:{jump:function(t){t!=this.$route.path&&this.$router.push(t)}}},u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-container",{staticClass:"wrapper"},[n("el-aside",{attrs:{width:"200px"}},[n("div",{staticClass:"logo"},[t._v("黑马头条")]),t._v(" "),n("el-menu",[n("el-menu-item",{attrs:{index:"2"},on:{click:function(e){return t.jump("/postlist")}}},[n("i",{staticClass:"el-icon-menu"}),t._v(" "),n("span",{attrs:{slot:"title"},slot:"title"},[t._v("文章列表")])]),t._v(" "),n("el-menu-item",{attrs:{index:"4"},on:{click:function(e){return t.jump("/editpost")}}},[n("i",{staticClass:"el-icon-setting"}),t._v(" "),n("span",{attrs:{slot:"title"},slot:"title"},[t._v("发布文章")])])],1)],1),t._v(" "),n("el-container",[n("el-header",[t.user.head_img?n("img",{staticClass:"avatar",attrs:{src:t.$axios.defaults.baseURL+t.user.head_img,alt:""}}):n("img",{staticClass:"avatar",attrs:{src:a("YA0R"),alt:""}}),t._v(" "),n("span",{staticClass:"nickname"},[t._v(t._s(t.user.nickname))])]),t._v(" "),n("el-main",[n("breadcrumb"),t._v(" "),n("router-view")],1)],1)],1)},staticRenderFns:[]};var m=a("VU/8")(c,u,!1,function(t){a("5vB8")},"data-v-d23f3900",null).exports,f=a("mvHQ"),d=a.n(f),p={data:function(){return{form:{username:"",password:""}}},methods:{clearForm:function(){this.form={username:"",password:""}},login:function(){var t=this;this.form.username&&this.form.password?this.$axios({url:"/login",method:"post",data:this.form}).then(function(e){console.log(e.data),"登录成功"==e.data.message&&(localStorage.setItem("token",e.data.data.token),localStorage.setItem("user",d()(e.data.data.user)),t.$router.push("/"))}):this.$message.error("请输入手机号和密码")}}},h={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"wrapper",attrs:{type:"flex",justify:"center",align:"middle"}},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"手机号"}},[a("el-input",{model:{value:t.form.username,callback:function(e){t.$set(t.form,"username",e)},expression:"form.username"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"密码"}},[a("el-input",{attrs:{type:"password"},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.login}},[t._v("登陆")]),t._v(" "),a("el-button",{on:{click:t.clearForm}},[t._v("重置")])],1)],1)],1)},staticRenderFns:[]};var v=a("VU/8")(p,h,!1,function(t){a("wAeK")},"data-v-eae22e76",null).exports,g={data:function(){return{tableData:[],pageIndex:1,pageSize:6}},mounted:function(){this.getPostList()},methods:{handleEdit:function(t,e){console.log(t,e)},handleDelete:function(t,e){console.log(t,e)},getPostList:function(){var t=this;this.$axios({url:"/post",method:"get",params:{pageIndex:this.pageIndex,pageSize:this.pageSize}}).then(function(e){var a=e.data.data;console.log(a),t.tableData=a})},changePage:function(t){this.pageIndex=t,this.getPostList()},changeSize:function(t){this.pageSize=t,this.getPostList()}}},_={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData}},[a("el-table-column",{attrs:{label:"id",width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.row.id))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"缩略图",width:"200"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticClass:"thumbnail",attrs:{src:t.row.cover[0].url,alt:""}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"标题",width:"500"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("i",{staticClass:"el-icon-time"}),t._v(" "),a("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.row.title))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"作者",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.row.user.nickname||"未命名"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.handleEdit(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return t.handleDelete(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("el-pagination",{attrs:{layout:"total, sizes, prev, pager, next","page-sizes":[2,5,10,20],total:100},on:{"current-change":t.changePage,"size-change":t.changeSize}})],1)},staticRenderFns:[]};var b=a("VU/8")(g,_,!1,function(t){a("zThP")},"data-v-3f5fd38e",null).exports,x={data:function(){return{form:{title:"",categories:[],type:1},categoryList:[]}},mounted:function(){var t=this;this.$axios({url:"/category",method:"get"}).then(function(e){var a=e.data.data;t.categoryList=a})},methods:{onSubmit:function(){console.log(this.form)}}},y={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"标题"}},[a("el-input",{model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"栏目"}},[a("el-checkbox-group",{model:{value:t.form.categories,callback:function(e){t.$set(t.form,"categories",e)},expression:"form.categories"}},t._l(t.categoryList,function(e,n){return a("el-checkbox",{key:n,attrs:{label:e.id}},[t._v("\n        "+t._s(e.name)+"\n      ")])}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"类型"}},[a("el-radio",{attrs:{label:"1"},model:{value:t.form.type,callback:function(e){t.$set(t.form,"type",e)},expression:"form.type"}},[t._v("文章")]),t._v(" "),a("el-radio",{attrs:{label:"2"},model:{value:t.form.type,callback:function(e){t.$set(t.form,"type",e)},expression:"form.type"}},[t._v("视频")])],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("提交")])],1)],1)},staticRenderFns:[]};var w=a("VU/8")(x,y,!1,function(t){a("xuoz")},"data-v-ae7cf9e8",null).exports;n.default.use(s.a);var k=new s.a({routes:[{path:"/",name:"homePage",component:m,meta:"首页",children:[{path:"postlist",name:"postlistPage",component:b,meta:"文章列表"},{path:"editpost",name:"editPostPage",component:w,meta:"编辑文章"}]},{path:"/login",name:"loginPage",component:v}]}),$=a("mtWM"),S=a.n($),z=a("zL8q"),P=a.n(z);a("tvR6");n.default.prototype.$axios=S.a,S.a.defaults.baseURL="http://127.0.0.1:3000",k.beforeEach(function(t,e,a){"/login"!=t.path?localStorage.getItem("token")?a():k.push("/login"):a()}),n.default.config.productionTip=!1,n.default.use(P.a),new n.default({el:"#app",router:k,components:{App:r},template:"<App/>"})},YA0R:function(t,e,a){t.exports=a.p+"static/img/01.6848fe3.gif"},hFVZ:function(t,e){},tvR6:function(t,e){},wAeK:function(t,e){},xuoz:function(t,e){},zThP:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.9f673481b75c4bf20b6b.js.map