<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
              :total="tableParameter.total"
              :pageNumber="tableParameter.pageNumber"
              @on-search="search"
              @on-enter="enter"
              @on-change-page='changePage'/>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getTableData } from '@/api/data'
import { getTimeFormat } from '@/libs/util'

export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: '站点', key: 'site', width: 100 },
        {
          title: 'asin',
          key: 'asin',
          sortable: true,
          render: (h, params) => {
            var _this = this
            return h('div', [
              h('a', {
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: function () {
                    var url = params.row.reviewUrl
                    window.open(_this.generateUrl(params.row.site) + url)
                  }
                }
              }, params.row.asin)

            ])
          }
        },
        { title: '评论标题', key: 'title', sortable: true, tooltip: true },
        { title: '评论内容', key: 'content', tooltip: true },
        { title: '评论人', key: 'customerName', tooltip: true, width: 200 },
        { title: '星级', key: 'star', sortable: true, width: 100 },
        { title: '点赞数', key: 'helpfulCount', ellipsis: true },
        { title: '评论时间', key: 'reviewTime' },
        {
          title: '系统留评',
          key: 'isSystem',
          render: (h, params) => {
            return h('div', params.row.isSystem == 'YES' ? '是' : '否')
          }
        }
      ],
      tableData: [],
      tableParameter: {
        total: 0,
        pageNumber: 1,
        limit: 20,
        webSite: 'US',
        asin: ''
      }
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    changePage (index) {
      this.tableParameter.pageNumber = index
      this.getReviewData(this.tableParameter)
    },
    enter (param) {
      console.log(param)
    },
    getReviewData (param) {
      getTableData(param).then(res => {
        this.tableData = res.data.rows
        this.tableParameter.total = res.data.total
      })
    },
    search (sites, asin) {
      this.tableParameter.webSite = sites.join(',')
      this.tableParameter.asin = asin
      this.getReviewData(this.tableParameter)
      this.tableParameter.pageNumber = 1
    },
    generateUrl (site) {
      switch (site) {
        case 'US':
          return 'https://www.amazon.com'
        case 'DE':
          return 'https://www.amazon.de'
        case 'IT':
          return 'https://www.amazon.it'
        case 'FR':
          return 'https://www.amazon.fr'
        case 'UK':
          return 'https://www.amazon.co.uk'
        case 'CA':
          return 'https://www.amazon.ca'
        default:
          return 'https://www.amazon.com'
      }
    }
  },
  mounted () {
    this.getReviewData()
  }
}
</script>

<style>

</style>
