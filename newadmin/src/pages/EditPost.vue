<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="栏目">
      <el-checkbox-group v-model="form.categories">
        <el-checkbox 
        v-for="(item,index) in categoryList" :key="index"
        :label="item.id">
          {{item.name}}
        </el-checkbox>
        </el-checkbox-group>
    </el-form-item>
    <el-form-item label="类型">
            <el-radio v-model="form.type" label="1">文章</el-radio>
            <el-radio v-model="form.type" label="2">视频</el-radio>
        </el-form-item>
         <el-form-item>
            <vue-editor 
            v-model="form.content"
            :useCustomImageHandler="true"
            @image-added="imgUpload"
            :editorToolbar="customToolbar"
            ></vue-editor>
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
      form: {
        title: "",
        categories:[],
        type:"",
         content: '<h1>没有内容</h1>'
      },
      categoryList:[],
       customToolbar: [["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], ["image", "code-block"]]
        }
    
  },
  mounted(){
    // 获取所有数据
    this.$axios({
      url:'/category',
      method:'get'
    }).then(res=>{
      const {data} =res.data;
      // 这里我们需要过滤掉关注和头条
      const newCategoryList=[];
      data.forEach(element=>{
        if(element.id !=0 && element.id !=999){
          newCategoryList.push(element);
        }
      })
      this.categoryList=newCategoryList;
    })
  },
    methods: {
        onSubmit() {
            // 这里是提交的函数,但是我们现在还没有完整的数据,所以只是打印一下数据确认我们的操作
           const newArr=[];
           this.form.categories.forEach(element => {
             newArr.push({
               id:element
             })
           });
           this.form.categories=newArr;
               console.log(this.form);
        },
         // 这里是富文本框添加图片触发的函数
        imgUpload() {
            console.log('添加了图片');
        }
    }
};
</script>
<style lang="less" scoped>
</style>