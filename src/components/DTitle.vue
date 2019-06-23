<template>
    <h4 class="components-containner-title" :style="{ fontSize: fontSize + 'px' }"><span></span>{{name}}</h4>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: ''
        },
        fontSize: {
            type: Number,
            default: 16
        }
    },
    data() {
        return {
            title: '标题'
        }
    },
    created() {
    },
    methods: {
        
    },
    computed: {
    }
}
</script>

<style lang='scss' scope>
.components-containner-title {
    font-size: 16px;
    color: #404040;
    font-weight: 600;
    text-align: left;
    display: flex;
    align-items: center;
    span {
        width: 3px;
        height: 15px;
        background: rgba(255,101,54,1);
        display: inline-block;
        margin-right: 8px;
    }
}
</style>