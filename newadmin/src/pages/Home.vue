<template>
  <el-container class="wrapper">
    <el-aside width="200px">
      <div class="logo">黑马头条</div>
      <el-menu>
        <el-menu-item index="2" @click="jump('/postlist')">
          <i class="el-icon-menu"></i>
          <span slot="title">文章列表</span>
        </el-menu-item>

        <el-menu-item index="4" @click="jump('/editpost')">
          <i class="el-icon-setting"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <img class="avatar" v-if="user.head_img" :src="$axios.defaults.baseURL + user.head_img" alt />
        <img class="avatar" v-else src="../assets/01.gif" alt />
        <span class="nickname">{{user.nickname}}</span>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user"))
    };
  },
  methods:{
    jump(path){
      if(path !=this.$route.path){
        this.$router.push(path);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: skyblue;
  color: #fff;
  text-align: center;
  line-height: 200px;
  .logo {
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: #000;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .avatar {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
  }
  .nickname {
    font-weight: bold;
  }
}
</style>