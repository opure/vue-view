const btns = {
  delete: (h, params, vm) => {
    return h('Poptip', {
      props: {
        confirm: true,
        title: '你确定要删除吗?'
      },
      on: {
        'on-ok': () => {
          vm.$emit('on-delete', params)
          vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
        }
      }
    }, [
      h('Button', {
        props: {
          type: 'text',
          ghost: true
        }
      }, [
        h('Icon', {
          props: {
            type: 'md-trash',
            size: 18,
            color: '#000000'
          }
        })
      ])
    ])
  },
  enter: (h, params, vm) => {
    return h('Poptip', {
      props: {
        width: 1000,
        height: 1000,
        transfer: true,
        content: '',
        placement: 'left'
      },
      on: {
        'click': () => {
          alert('aa')
          console.log(this)
          vm.$emit('on-enter', params)
        }
      }
    }, [
      h('Button', {
        props: {
          type: 'text',
          ghost: true
        }
      }, [
        h('Icon', {
          props: {
            type: 'md-arrow-round-forward',
            size: 18,
            color: '#000000'
          }
        })
      ])
    ])
  },
  enter1: (h, params, vm) => {
    return h('Button', {
      props: {
        type: 'text',
        ghost: true
      },
      on: {
        'click': () => {
          vm.$emit('on-enter', params)
        }
      }
    }, [
      h('Icon', {
        props: {
          type: 'md-arrow-round-forward',
          size: 18,
          color: 'blue'
        }
      })
    ])
  }
}

export default btns
