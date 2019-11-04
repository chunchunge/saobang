<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="类型">
      <el-checkbox-group v-model="form.categories">
        <el-checkbox 
        v-for="(item,index) in categoryList" :key="index"
        :label="item.id">
          {{item.name}}
        </el-checkbox>
        </el-checkbox-group>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        categories:[]
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
  }
};
</script>
<style lang="less" scoped>
</style>