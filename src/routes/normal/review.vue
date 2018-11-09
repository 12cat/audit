<template>
  <div>
    <!-- 列表查询部分 -->
    <el-card class="box-card">
      <el-form ref="form" size="small" label-width="110px">
        <el-col :span="9">
          <el-form-item label="发布日期：">
            <el-date-picker v-model="date1" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="ID：">
            <el-input v-model="id" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="" label-width="20px">
            <el-button size="small" @click="success" type="primary">查询</el-button>
            <el-button size="small" @click="error">重置</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="审核日期：">
            <el-date-picker v-model="date2" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="内容：">
            <el-input v-model="content" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="" label-width="20px"></el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="用户ID：">
            <el-input v-model="userId" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="状态：">
            <el-input v-model="status" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="" label-width="20px"></el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="操作人：">
            <el-input v-model="operator" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="业务渠道：">
            <el-input v-model="channel" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="" label-width="20px"></el-form-item>
        </el-col>
      </el-form>
    </el-card>
    <!-- 数据列表部分 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="small" class="right" @click="submit" type="primary" v-loading.fullscreen.lock="loading">查询</el-button>
        <template>
          <el-radio class="right" v-model="radio" label="1">全部驳回</el-radio>
          <el-radio class="right" v-model="radio" label="2">全部通过</el-radio>
        </template>
      </div>
      <div class="table-box">
        <el-table :data="tableData">
          <el-table-column prop="productId" label="商品id"></el-table-column>
          <el-table-column  prop="title" label="商品标题"></el-table-column>
          <el-table-column  prop="suId" label="suId"></el-table-column>
          <el-table-column  prop="priceStr" label="商品价格"></el-table-column>
          <el-table-column label="卖点">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.salePoint" placement="bottom">
                <span v-text="scope.row.salePoint.substring(0, 5)"></span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="alert(scope.$index, scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-pagination @size-change="updateTable" @current-change="updateTable" :current-page.sync="param.pageIndex" :page-sizes="[10, 20, 30]" :page-size.sync="param.pageSize" layout="sizes, total, prev, pager, next" :total="total"></el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio: '1',
      loading: false,
      param: {
        pageIndex: 2,
        pageSize: 10,
        supplierID: '130047'
      },
      total: 123,
      date1: ['2018-11-11', '2018-11-12'],
      id: '10011110000',
      date2: [],
      content: '',
      userId: '',
      status: '',
      operator: '',
      channel: '',
      tableData: []
    }
  },
  mounted () {
    this.updateTable()
  },
  methods: {
    submit () {
      this.updateTable()
    },
    success () {
      // this.$message.warning('这是一条警告提示')
      this.$message.success('这是一条成功提示')
    },
    error () {
      this.$message.error('这是一条错误提示')
    },
    updateTable () {
      this.loading = true
      this.$service.review.getData(this.param).then(res => {
        this.tableData = res.data.data.productList
        this.total = res.data.data.pageCount * res.data.data.pageSize
        this.loading = false
      })
    },
    alert (i, e) {
      this.$alert(`第 ${i} 条数据，${e.title}`, '标题123', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message.success(e.title)
        }
      })
    }
  }
}
</script>

<style>

</style>
