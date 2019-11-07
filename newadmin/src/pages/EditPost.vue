<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>

    <!-- 富文本框的配置
        v-model 是我们的富文本内容
        editorToolbar 使我们的工具栏配置 
        useCustomImageHandler= 是一个布尔值,
        如果为true 就可以自定义上传图片的方法
        定义完了这个,我们就可以监听一个事件
        image-added然后调用一个函数进行图片的上传
    发送 ajax 请求-->
    <el-form-item label="内容">
      <vue-editor
        :useCustomImageHandler="true"
        @image-added="imgUpload"
        v-model="form.content"
        :editorToolbar="customToolbar"
      ></vue-editor>
    </el-form-item>

    <el-form-item label="栏目">
      <el-checkbox-group v-model="form.categories">
        <!-- 我们不仅仅需要一个中文
                我们的分类其实是有 名字 name, id
                我们的 lable 应该是我们分类的 id
        而将分类的名字作为内容渲染出来 使用 {{.name}}-->
        <!-- <el-checkbox label="id">name</el-checkbox> -->
        <!-- 我们需要使用 ajax 获取分类数据然后 遍历渲染出这些选项 -->
        <el-checkbox
          v-for="(item, index) in categoryList"
          :key="index"
          :label="item.id"
        >{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="封面">
      <!-- 这个组件直接将我们上传图片的工作接管
            action 使我们上传图片的接口路径
            on-remove 当我们删除一个图片的时候会触发 
            headers 使我们要带上请求时验证的 token
            这里在模板当中是没有办法直接获取我们的 localStorage 的
      需要现在 data 当中定义这个 token 这里在赋值-->
      <!-- api其实需要的是 [{id:1},{id:2}] -->
      <el-upload
        :file-list="form.cover"
        :action="$axios.defaults.baseURL + '/upload/'"
        list-type="picture-card"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :headers="{Authorization:token}"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-form-item>

    <el-form-item label="类型">
      <el-radio-group v-model="form.type">
        <el-radio :label="1">文章</el-radio>
        <el-radio :label="2">视频</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// 导入富文本框插件
import { VueEditor } from "vue2-editor";
export default {
  // 注册富文本框组件
  components: {
    VueEditor
  },
  data() {
    return {
      // 获取传递进来的文章id
      postId: this.$route.query.id,

      token: localStorage.getItem("token"),
      form: {
        // 我们对于新建文章这里应该是空值,
        // 但是如果是编辑文章
        // 就应该用 ajax 获取文章数据来填写这些内容
        title: "",
        // 这里是编辑的时候,用户选中的分类
        categories: [],
        type: 1,
        content: "<h1>没有内容</h1>",
        cover: []
      },
      // 所有的分类选项
      // 是页面一加载就会全部显示出来,只是给用户去选择,不一定全部会用上的
      categoryList: [],
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"]
      ]
    };
  },
  mounted() {
    // 一进来就获取分类数据渲染多选框
    this.$axios({
      url: "/category",
      method: "get"
    }).then(res => {
      const { data } = res.data;
      // 这里我们的数据带有关注和头条分类,但是这两个分类并不需要我们手动设置
      // 我们需要过滤掉这两个分类
      const newCategoryList = [];
      data.forEach(element => {
        if (element.id != 0 && element.id != 999) {
          newCategoryList.push(element);
        }
      });
      this.categoryList = newCategoryList;
    });

    // 如果能够拿到 this.postId 证明我们是在编辑文章,
    // 我已应该使用 ajax 获取文章数据
    if (this.postId) {
      this.$axios({
        url: "/post/" + this.postId,
        method: "get"
      }).then(res => {
        const { data } = res.data;
        console.log(data);
        // 处理我们的 categories 数据
        // 将 [{id:1}] 改成 [1]
        let newCategoryList = [];
        data.categories.forEach(element => {
          newCategoryList.push(element.id);
        });
        data.categories = newCategoryList;

        data.cover.forEach((element, index) => {
          // 其中 element.url 是不完整的图片地址
          element.url = this.$fixImgUrl(element.url);
          element.uid = index;
        });

        // 如果是历史遗留数据, 带有 div 标签
        // 富文本框不能接受,就要使用 正则表达式来替换 div 为 p
        data.content = data.content.replace(/div/g, "p");

        this.form = data;
      });
    }
  },
  methods: {
    onSubmit() {
      // 这里是提交的函数,但是我们现在还没有完整的数据,所以只是打印一下数据确认我们的操作
      // 转换 form.categories 成 api 文档需要的格式
      const newArr = [];
      this.form.categories.forEach(element => {
        newArr.push({
          id: element
        });
      });
      this.form.categories = newArr;

      console.log(this.form);

      // 如果我们有 postId 就应该是修改文章如果没有就应该是发布文章

      // 现在要直接发送 ajax 请求发布文章
      this.$axios({
        url: this.postId ? "/post_update/" + this.postId : "/post",
        method: "post",
        data: this.form
      }).then(res => {
        const { data } = res.data;
        console.log(data);
      });
    },
    // 这里是富文本框添加图片触发的函数
    imgUpload(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      // file 使我们要上传的文件
      // Editor 是我们正在使用的编辑器
      // cursorLocation 这是子组件获取到的当前光标位置
      // restUploader 这是当你处理完了所有数据,应该重置这个上传的组件

      var formData = new FormData();
      // 根据api文档配置属性名
      formData.append("file", file);
      // 这个数据就可以直接作为data 发送 ajax 请求

      this.$axios({
        url: "/upload",
        method: "POST",
        data: formData
      })
        .then(res => {
          console.log(res);

          const { data } = res.data;
          // 我们想要的图片地址就在 data.url

          let url = this.$axios.defaults.baseURL + data.url; // Get url from response

          // 这是是将我们传到服务器,返回一个地址的图片放入编辑器当中
          // Editor 编辑器
          // insertEmbed 插入
          // cursorLocation 光标位置
          // url 使我们在上面传输完图片获取的地址
          Editor.insertEmbed(cursorLocation, "image", url);
          // 有一个必须要做的就是重置上传组件
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleRemove() {
      // 处理封面图插件,删除图片时的函数
      console.log("删除了图片");
    },
    handleSuccess(res) {
      // this.form.cover.push(res.data.id)
      // 这里不仅能拿到 id 还能拿到 uid 还能拿到我们的 url
      // 直接就可以把它构造成最终 api 需要的格式,
      // 无需等到最终推送的时候再做
      this.form.cover.push({
        id: res.data.id,
        url: this.$axios.defaults.baseURL + res.data.url
      });

      console.log(this.form);
    }
  }
};
</script>

<style>
</style>