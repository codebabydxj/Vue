<template>
    <div class="program-list">
        <div class="flex-row project-name">
            <h4>{{itemData.programName}}</h4>
            <span class="project-status" v-if="itemData.status == 0">待查看</span>
            <span class="project-status" v-if="itemData.status == 1">待确认</span>
            <span class="project-status" v-if="itemData.status == 2">已确认</span>
            <span class="project-status gray" v-if="itemData.status == 3">未采用</span>
            <span class="project-status" v-if="itemData.status == 4 || itemData.status == 5">有异议</span>
        </div>
        <div class="program-box-cont flex-row">
            <div class="program-cont-left">
                <div class="flex-start mt20">
                    <label>提交时间</label>
                    <span>{{itemData.createTime | moment}}</span>
                </div>
                <div class="flex-start mt20">
                    <label>项目总价</label>
                    <span>{{itemData.price | ExtenSion}} 元</span>
                </div>
                <div class="flex-start mt20">
                    <label>项目周期</label>
                    <span>{{itemData.workload}}
                        <span v-if="itemData.workloadUnit == 0">天</span>
                        <span v-if="itemData.workloadUnit == 1">周</span>
                        <span v-if="itemData.workloadUnit == 2">个月</span>
                    </span>
                </div>
            </div>
            <div class="program-cont-right">
                <img :src="itemData.avatar"/>
                <span>{{itemData.nickName}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ConsultantList',
    props: {
        itemData: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            title: '文档信息'
        }
    },
    created() {
        // console.log(this.$store.state.user, '------------')
    },
    methods: {
        
    },
    // 将数字转换成货币格式过滤器
    filters:{
        ExtenSion(value) {
            if (value && value != null) {
                value = String(value);
                var left = value.split('.')[0], right = value.split('.')[1];
                // right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
                var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
                // return (Number(value) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
                return (Number(value) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('');
            } else if (value === 0) { // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
                return '0.00';
            } else {
                return '';
            }
        }
    },
    computed: {
    }
}
</script>

<style lang='scss'>
.program-list {
    .project-name {
        h4 {
            line-height: 22px;
            font-size: 16px;
            color: #404040;
            font-weight: 600;
        }
        .project-status {
            display: inline-block;
            width: 100px;
            height: 24px;
            line-height: 24px;
            border-radius:15px;
            background:#FF705F;
            color: #FFFFFF;
            font-size: 14px;
            &.gray {
                background: #D9D9D9;
            }
        }
    }
    .program-box-cont {
        .program-cont-left {
            p, span{
                font-size: 14px;
                color: #666666;
            }
            label {
                width: 57px;
                display: inline-block;
                margin-right: 20px;
                font-size: 14px;
                color: #333333;
            }
        }
        .program-cont-right {
            display: flex;
            align-items: flex-end;
            line-height: 42px;
            img {
                width: 42px;
                height: 42px;
                border-radius: 50%;
                margin-right: 10px;
            }
            span {
                font-size: 18px;
                color: #333333;
                margin-right: 10px;
            }
        }
    }
    
    .flex-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .flex-start {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        text-align: left;
        line-height: 20px;
    }
}
</style>