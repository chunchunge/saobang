<template>
<div class="main">
  <h3>首页/发布新闻</h3>
   <el-row type="flex" justify="center" align="middle" class="wrapper">
    <el-form ref="form" label-width="60px">
      <el-form-item label="标题" class="title">
        <el-input ></el-input>
      </el-form-item>
    </el-form>
  </el-row>
</div>
 
</template>

<script>
export default {};
</script>
<style lang="less" scoped>
  .main{
    margin-left: 0;
    position: absolute;
    top:100px;
    left:0;

  }
</style>