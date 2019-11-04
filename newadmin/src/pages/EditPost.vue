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
            <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        categories:[],
        type:1
      },
      categoryList:[]
    };
  },
  mounted(){
    // 获取所有数据
    this.$axios({
      url:'/category',
      method:'get'
    }).then(res=>{
      const {data} =res.data;
      this.categoryList=data;
    })
  },
    methods: {
        onSubmit() {
            // 这里是提交的函数,但是我们现在还没有完整的数据,所以只是打印一下数据确认我们的操作
            console.log(this.form);
            
        }
    }
};
</script>
<style lang="less" scoped>
</style>