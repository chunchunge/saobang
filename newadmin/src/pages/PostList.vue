<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <!-- :data 就是我们的文章数组 -->

      <!-- label 就是表头
      width就是列宽度-->
      <el-table-column label="id" width="60">
        <template slot-scope="scope">
          <!-- scope 就是传进来的整个数据数组
        row 是行的意思,其实就是这个数组的每个元素
        name/date 之类就是我们这个元素当中的数据
        比如我们写文章表格的时候
          有 title cover-->
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="缩略图" width="200">
        <template slot-scope="scope">
          <img :src="$fixImgUrl(scope.row.cover[0].url)" alt class="thumbnail" />
        </template>
      </el-table-column>

      <el-table-column label="标题" width="500">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="作者" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.user.nickname || '未命名' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- current-change 是页码变更时会触发的事件,我们需要监听并调用一个函数 -->
    <!-- page-sizes 是决定可以有什么选项给用户选择,每页有多少数据 -->
    <!-- layout 下面的 sizes 是决定我们显示这个页面数据条数选择起的选项 -->
    <el-pagination
      layout="total, sizes, prev, pager, next"
      :page-sizes="[2, 5, 10, 20]"
      :total="100"
      @current-change="changePage"
      @size-change="changeSize"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 10
    };
  },
  mounted() {
    this.getPostList();
  },
  methods: {
    // 这两个是 饿了么 ui 创建的函数
    handleEdit(index, row) {
      console.log(row);
      // 这里可以通过 row.id 获取到文章的 id
      // 我们只需要跳转的时候带上参数即可
      this.$router.push({
        path: "/editpost",
        query: {
          id: row.id
        }
      });
    },

    getPostList() {
      this.$axios({
        url: "/post",
        method: "get",
        params: {
          pageIndex: this.pageIndex,
          // 这里要传入 pageSize 来决定我们每页获取多少条数据
          pageSize: this.pageSize
        }
      }).then(res => {
        const { data } = res.data;
        console.log(data);
        this.tableData = data;
      });
    },

    changePage(val) {
      // 1.改变当前页码 pageIndex,
      // 2.这个事件会传递一个参数,就是点击了的页码
      this.pageIndex = val;
      // 3.重新获取列表数据
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
};
</script>

<style lang="less" scoped>
.thumbnail {
  width: 200px;
  height: 120px;
  object-fit: cover;
}
</style>