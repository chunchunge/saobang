<template>
<div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="id"
        width="60">
        <template slot-scope="scope">
        <!-- scope 就是传进来的整个数据数组
        row 是行的意思,其实就是这个数组的每个元素
        name/date 之类就是我们这个元素当中的数据
        比如我们写文章表格的时候
        有 title cover -->
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
      </el-table-column>
      <el-table-column
        label="缩略图"
        width="200">
        <template slot-scope="scope">
          <img :src="scope.row.cover[0].url" class="thumbnail" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="标题"
        width="500">
         <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{scope.row.title}}</span>
      </template>
      </el-table-column>
        <el-table-column
      label="作者"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.user.nickname || '未命名' }}</span>
      </template>
    </el-table-column>
     <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
     <el-pagination
    layout="total, sizes, prev, pager, next"
    :page-sizes="[2, 5, 10, 20]"
    :total="100"
     @current-change="changePage"
     @size-change="changeSize">
  </el-pagination>
    </div>
</template>

<script>
export default {
 data() {
        return {
         tableData:[],
         pageIndex:1,
         pageSize: 6
        }
      },
      mounted(){
       this.getPostList();
      },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      getPostList(){
         this.$axios({
          url:'/post',
          method:'get',
          params:{
             pageIndex:this.pageIndex,
              // 这里要传入 pageSize 来决定我们每页获取多少条数据
              pageSize: this.pageSize
          }
         
        }).then(res=>{
          const {data}=res.data;
          console.log(data);
          this.tableData=data;
          
        })
      },
      changePage(val){
          this.pageIndex=val;
          this.getPostList();
      },
      changeSize(val) {
        // 这个事件也像是页码变更事件一样,
        // 会传入一个参数,就是用户选择了的每页数据条数
        // 1.修改每页条数数据
        this.pageSize = val;
        // 2.重新获取数据
        this.getPostList();
      }
    }
}
</script>
<style lang="less" scoped>
.thumbnail {
    width: 200px;
    height: 120px;
    object-fit: cover;
}
</style>