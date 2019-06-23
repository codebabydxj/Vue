<template>
    <canvas class="qrcode-cont" :id="id"></canvas>
</template>

<script>
import QRCode from 'qrcode'
export default {
    props: {
        url: {
            type: String,
            default: ''
        },
        id: {
            type: String,
            default: 'qrcode-2'
        }
    },
    data() {
        return {
            title: '二维码生成'
        }
    },
    created() {
    },
    methods: {
        
    },
    mounted (){
        // console.log('进入页面22222')
        QRCode.toCanvas(document.getElementById(this.id), this.url, (error) => {
            if (error) {
                console.log(error)
            } else {
                console.log('success')
            }
        })
    },
}
</script>

<style lang='scss' scope>
.qrcode-cont {
    height: 138px !important;
    width: 138px !important;
    border: 1px solid #e2dede;
}
</style>