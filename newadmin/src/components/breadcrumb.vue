<template>
  <div class="breadcrumb">
    {{breadcrumb}}
  </div>
</template>

<script>
export default {
    computed:{
breadcrumb(){
    let res="";
    this.$route.matched.forEach(element => {
        res+=element.meta+"->"
    });
    console.log(res);
    
    return res;
}
    }
}
</script>

<style lang="less" scoped>
.breadcrumb {
    padding: 10px 0;
}
</style>