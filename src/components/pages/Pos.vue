<template>
  <div class="pos">
    <el-row class="content">
      <el-col class="order-list" :span="8">
        <el-tabs type="card" v-model="defaultLable" stretch>
          <el-tab-pane label="点餐" name="first">
            <el-table :data="tableData" style="width: 100%;text-align:left;" height="500">
              <el-table-column  prop="index" label="序号" width="50"></el-table-column>
              <el-table-column  prop="goodsName" label="商品" width="150"></el-table-column>
              <el-table-column  prop="price" label="数量" width="50"></el-table-column>
              <el-table-column  prop="count" label="金额" width="100"></el-table-column>
              <el-table-column  prop="action" label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" size="small">删除</el-button>
                  <el-button type="text" size="small">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
              <div class="divBtn">
                <el-button type="warning">挂单</el-button>
                <el-button type="danger">删除</el-button>
                <el-button type="success">结账</el-button>
              </div>
          </el-tab-pane>
          <el-tab-pane label="挂单" name="second">挂单</el-tab-pane>
          <el-tab-pane label="外卖" name="third">外卖</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col class="product-list" :span="16">
        <h2>商品列表</h2>
        <div class="goods-container">
          <ul class="goods-list clearfix">
            <li v-for="good in goodsData" :key="good.id">
              <span>{{good.goodsName}}</span>
              <span>￥{{good.price}}</span>
            </li>
          </ul>
        </div>
        <div class="goods-type">
          <el-tabs v-model="defaultGoodsLable" type="card" stretch>
            <el-tab-pane label="汉堡" name="first">
              <div class="goods-content clearfix">
                <ul>
                  <li v-for="good in goodsType" :key="good.goodsId">
                    <img :src="good.goodsImg" alt="">
                    <p>{{good.goodsName}}</p>
                    <span>￥{{good.price}}</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="小吃" name="second">小吃</el-tab-pane>
            <el-tab-pane label="饮料" name="third">饮料</el-tab-pane>
            <el-tab-pane label="套餐" name="forth">套餐</el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type='text/ecmascript-6'>
import axios from 'axios'
export default {
  name: "pos",
  data() {
    return {
      title: "It's a pos web",
      defaultLable: "first",
      defaultGoodsLable: "first",
      tableData:[
        {
          index:1,
          goodsName: '可口可乐',
          price: 8,
          count:1
        }, {
          index:2,
          goodsName: '香辣鸡腿堡',
          price: 15,
          count:1
        }, {
          index:3,
          goodsName: '爱心薯条',
          price: 8,
          count:1
        }, {
          index:4,
          goodsName: '甜筒',
          price: 8,
          count:1
        },{
          index:5,
          goodsName: '可口可乐',
          price: 8,
          count:1
        }, {
          index:6,
          goodsName: '香辣鸡腿堡',
          price: 15,
          count:1
        }, {
          index:7,
          goodsName: '可口可乐',
          price: 8,
          count:1
        }, {
          index:8,
          goodsName: '香辣鸡腿堡',
          price: 15,
          count:1
        }, 
      ],
      goodsData:[
        {
              goodsId:1,
              goodsName:'香辣鸡腿堡',
              price:18
          }, {
              goodsId:2,
              goodsName:'田园鸡腿堡',
              price:15
          }, {
              goodsId:3,
              goodsName:'和风汉堡',
              price:15
          }, {
              goodsId:4,
              goodsName:'快乐全家桶',
              price:80
          }, {
              goodsId:5,
              goodsName:'脆皮炸鸡腿',
              price:10
          }, {
              goodsId:6,
              goodsName:'魔法鸡块',
              price:20
          }, {
              goodsId:7,
              goodsName:'可乐大杯',
              price:10
          }, {
              goodsId:8,
              goodsName:'雪顶咖啡',
              price:18
          }, {
              goodsId:9,
              goodsName:'大块鸡米花',
              price:15
          }, {
              goodsId:20,
              goodsName:'香脆鸡柳',
              price:17
          }
      ],
      goodsType:[
        {
              goodsId:1,
              goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos001.jpg",
              goodsName:'香辣鸡腿堡',
              price:18
          }, {
              goodsId:2,
              goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg",
              goodsName:'田园鸡腿堡',
              price:15
          }, {
              goodsId:3,
              goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos004.jpg",
              goodsName:'和风汉堡',
              price:15
          }, {
              goodsId:4,
               goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg",
              goodsName:'快乐全家桶',
              price:80
          }, {
              goodsId:5,
               goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg",
              goodsName:'脆皮炸鸡腿',
              price:10
          }, {
              goodsId:6,
               goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos004.jpg",
              goodsName:'魔法鸡块',
              price:20
          }, {
              goodsId:7,
               goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos001.jpg",
              goodsName:'可乐大杯',
              price:10
          }, {
              goodsId:8,
               goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg",
              goodsName:'雪顶咖啡',
              price:18
          }, {
              goodsId:9,
               goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg",
              goodsName:'大块鸡米花',
              price:15
          }, {
              goodsId:20,
               goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg",
              goodsName:'香脆鸡柳',
              price:17
          }
      ]
    };
  }
};
</script>

<style scoped type='text/css'>
.clearfix:after{
  content: "020"; 
  display: block; 
  height: 0; 
  clear: both; 
  visibility: hidden;  
  }

.clearfix {
  /* 触发 hasLayout */ 
  zoom: 1; 
  }
.pos,
.content {
  height: 100%;
}
.content > div {
  height: 100%;
}
.order-list {
  background: #fff;
}
.product-list {
  background: #f9fafc;
  overflow-y: scroll;
}
.goods-container {
  border-bottom: 2px solid #b1adad;
}
.product-list h2 {
  font-size: 24px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #c2bcbc;
}
.divBtn {
  margin-top:20px;
}
.goods-list {
  list-style-type: none;
  margin: 20px;
}
.goods-list li {
  float: left;
  border: 1px solid #e4c;
  padding: 10px;
  margin: 10px;
  transition: all .3s;
}
.goods-list li:hover {
  background-color: rgb(240, 247, 246);
  box-shadow: 0 0 10px 1px #2f90eb;
  transform:translateY(-3px);
}
.goods-list li span:last-child {
  color: #4dbebe;
}
.goods-content {
  background-color: hsl(0, 31%, 93%);
  overflow: scroll;
}
.goods-content ul li {
  float: left;
  width: 30%;
  border:1px solid #ccc;
  margin: 10px;
  padding: 10px;
  list-style-type: none;
  box-sizing: border-box;
  background: #fff;
  transition: all .3s;
}
.goods-content ul li:hover {
  background-color: hsl(0, 0%, 100%);
  box-shadow: 0px 0px 10px 1px #888888;
  transform:translateY(-3px)
}
.goods-content ul li img {
  width: 30%;
  height: auto;
  float: left;
}
.goods-content ul li p {
  margin: 5px;
}
.goods-content ul span {
  margin: 2px;
  display: inline-block;
  color: #4dbebe;
}
</style>