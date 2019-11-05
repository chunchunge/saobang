<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="栏目">
      <el-checkbox-group v-model="form.categories">
        <el-checkbox
          v-for="(item,index) in categoryList"
          :key="index"
          :label="item.id"
        >{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <vue-editor
        v-model="form.content"
        :useCustomImageHandler="true"
        @image-added="imgUpload"
        :editorToolbar="customToolbar"
      ></vue-editor>
    </el-form-item>
      <el-form-item label="封面">
      <!-- 这个组件直接将我们上传图片的工作接管
            action 使我们上传图片的接口路径
            on-remove 当我们删除一个图片的时候会触发 
            headers 使我们要带上请求时验证的 token
            这里在模板当中是没有办法直接获取我们的 localStorage 的
      需要现在 data 当中定义这个 token 这里在赋值-->
      <el-upload
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
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  data() {
    return {
        // 获取传递进来的文章id
            postId: this.$route.query.id,
      token: localStorage.getItem("token"),
      form: {
        title: "",
        categories: [],
        type: 1,
        content: "<h1>没有内容</h1>",
        cover: []
      },
      categoryList: [],
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"]
      ]
    };
  },
  mounted() {
    // 获取所有数据
    this.$axios({
      url: "/category",
      method: "get"
    }).then(res => {
      const { data } = res.data;
      // 这里我们需要过滤掉关注和头条
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
                url: '/post/'+ this.postId,
                method: 'get'
            }).then(res=>{
                const {data} = res.data;
                console.log(data);
                // 处理我们的 categories 数据
                // 将 [{id:1}] 改成 [1]
                let newCategoryList = [];
                data.categories.forEach(element => {
                    newCategoryList.push(element.id)
                });
                data.categories = newCategoryList;

                this.form = data;
                
            })
        }
  },
  methods: {
    onSubmit() {
      // 这里是提交的函数,但是我们现在还没有完整的数据,所以只是打印一下数据确认我们的操作
      const newArr = [];
      this.form.categories.forEach(element => {
        newArr.push({
          id: element
        });
      });
      this.form.categories = newArr;
      const newArrCover = [];
      this.form.cover.forEach(element => {
        newArrCover.push({
          id: element
        });
      });
      this.form.cover = newArrCover;
      console.log(this.form);
    },
    // 这里是富文本框添加图片触发的函数
    imgUpload(file, Editor, cursorLocation, resetUploader) {
      // file 使我们要上传的文件
      // Editor 是我们正在使用的编辑器
      // cursorLocation 这是子组件获取到的当前光标位置
      // restUploader 这是当你处理完了所有数据,应该重置这个上传的组件
      var formData = new FormData();
      formData.append("file", file);

      this.$axios({
        url: "/upload",
        method: "POST",
        data: formData
      })
        .then(res => {
          console.log(res);
          const { data } = res.data;
          let url = this.$axios.defaults.baseURL + data.url;
          // url 使我们在上面传输完图片获取的地址
          Editor.insertEmbed(cursorLocation, "image", url);
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
      this.form.cover.push(res.data.id);
      console.log(this.form);
       // 现在要直接发送 ajax 请求发布文章
            this.$axios({
                url: '/post',
                method: 'post',
                data: this.form
            }).then(res=>{
                const {data} = res.data;
                console.log(data);
                
            })
    }
  }
};
</script>
<style lang="less" scoped>
</style>