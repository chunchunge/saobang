<template>
  <el-row type="flex" justify="center" align="middle" class="wrapper">
    <!-- type=flex 使用 flex 布局
        justify 对齐方式 
        align 相当于 align-items 但是不是 center 而是 middle
    这是饿了么决定的-->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="手机号">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login">登陆</el-button>
        <el-button @click="clearForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    clearForm() {
      this.form = {
        username: "",
        password: ""
      };
    },
    login() {
      // 输入框不能为空否则跳出函数
      if (!this.form.username || !this.form.password) {
        this.$message.error("请输入手机号和密码");
        return;
      }
      this.$axios({
        url: "/login",
        method: "post",
        data: this.form
      }).then(res => {
        console.log(res.data);
        // 如果登陆成功,需要将数据存在 localStorage 里面
        if (res.data.message == "登录成功") {
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
           this.$router.push('/');
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.wrapper {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
}
</style>