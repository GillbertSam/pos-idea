<template>
    <div class="leftNav">
        <ul ref="tabUl">
            <li class="noTab"><img src="../../assets/logo.png" alt=""></li>
            <li class="on"><i class="icon iconfont">&#xe602;</i><p>收银</p></li>
            <li><i class="icon iconfont">&#xe603;</i><p>店铺</p></li>
            <li><i class="icon iconfont">&#xe600;</i><p>商品</p></li>
            <li><i class="icon iconfont">&#xe604;</i><p>会员</p></li>
            <li><i class="icon iconfont">&#xe605;</i><p>统计</p></li>
        </ul>
    </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    data () {
      return {

      }
    },
    mounted(){
        this.changeTab();
    },
    methods:{
        changeTab:function() {
            $('li').not('.noTab').on('click',function(){
                $(this).addClass('on').siblings().removeClass('on');
            })
        }
    }
  }
</script>

<style scoped type='text/css'>
    .leftNav {
        float: left;
        width: 5%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
    .leftNav ul {
        background-color: #0085FF;
        color: #fff;
        width: 100%;
        height: 100%;
    }
    .leftNav ul li{
        list-style-type: none;
        border-bottom: 1px dashed #ccc;
        padding: 10px;
        box-sizing: border-box;
        font-size: 14px;
        cursor: pointer;
    }
    .leftNav ul li:first-child{
        background-color: #fff;
        padding: 5px;
    }
    .leftNav ul li.on {
        background-color: #fff;
        color: #0085FF;
    }
    .leftNav ul li.on i {
        color: #0085FF;
    }
    .iconfont {
        font-size: 24px;
    }
    img {
        width: 70%;
        margin: 0;
        padding: 0;
    }
</style>