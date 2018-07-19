<template>
  <div class="pos">
    <el-row class="content">
      <el-col class="order-list" :span="8">
        <el-tabs type="card" v-model="defaultLable" stretch>
          <el-tab-pane label="点餐" name="first">
            <el-table :data="tableData" style="width: 100%;text-align:left;" height="400">
              <el-table-column  prop="index" label="序号" width="50"></el-table-column>
              <el-table-column  prop="goodsName" label="商品" width="150"></el-table-column>
              <el-table-column  prop="count" label="数量" width="50"></el-table-column>
              <el-table-column  prop="price" label="金额" width="100"></el-table-column>
              <el-table-column  prop="action" label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="reduceGoods(scope.row)">删除</el-button>
                  <el-button type="text" size="small" @click="addGoods(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="total_cal">
              数量：<span>{{allNum}}</span>
              总价：<span>{{allMoney}}</span>
            </div>
              <div class="divBtn">
                <el-button type="warning">挂单</el-button>
                <el-button type="danger" @click="deleteAll">删除</el-button>
                <el-button type="success" @click="checkout">结账</el-button>
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
            <li v-for="good in goodsData" :key="good.id" @click="addGoods(good)">
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
                  <li v-for="good in goodsType[0]" :key="good.goodsId" @click="addGoods(good)">
                    <img :src="good.goodsImg" alt="">
                    <p>{{good.goodsName}}</p>
                    <span>￥{{good.price}}</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="小吃" name="second">
              <div class="goods-content clearfix">
                <ul>
                  <li v-for="good in goodsType[1]" :key="good.goodsId" @click="addGoods(good)">
                    <img :src="good.goodsImg" alt="">
                    <p>{{good.goodsName}}</p>
                    <span>￥{{good.price}}</span>
                  </li>
                </ul>
              </div></el-tab-pane>
            <el-tab-pane label="饮料" name="third">
              <div class="goods-content clearfix">
                <ul>
                  <li v-for="good in goodsType[2]" :key="good.goodsId" @click="addGoods(good)">
                    <img :src="good.goodsImg" alt="">
                    <p>{{good.goodsName}}</p>
                    <span>￥{{good.price}}</span>
                  </li>
                </ul>
              </div></el-tab-pane>
            <el-tab-pane label="套餐" name="forth">
              <div class="goods-content clearfix">
                <ul>
                  <li v-for="good in goodsType[3]" :key="good.goodsId" @click="addGoods(good)">
                    <img :src="good.goodsImg" alt="">
                    <p>{{good.goodsName}}</p>
                    <span>￥{{good.price}}</span>
                  </li>
                </ul>
              </div></el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type='text/ecmascript-6'>
import axios from "axios";
export default {
  name: "pos",
  created() {
    axios.get("http://jspang.com/DemoApi/oftenGoods.php").then(
      response => {
        this.goodsData = response.data;
      },
      error => {
        console.log(error);
      }
    );

    axios.get("http://jspang.com/DemoApi/typeGoods.php").then(
      response => {
        this.goodsType[0] = response.data[0];
        this.goodsType[1] = response.data[1];
        this.goodsType[2] = response.data[2];
        this.goodsType[3] = response.data[3];
      },
      error => {
        console.log(error);
      }
    );
  },
  data() {
    return {
      title: "It's a pos web",
      defaultLable: "first",
      defaultGoodsLable: "first",
      tableData: [],
      goodsData: [],
      goodsType: [],
      allNum: 0,
      allMoney: 0
    };
  },
  methods: {
    addGoods: function(goods) {
      //判断当前商品列表是否已添加该商品
      let isExact = false;
      this.tableData.forEach(val => {
        if (goods.goodsId == val.goodsId) {
          isExact = true;
        }
      });

      if (isExact) {
        let arr = this.tableData.filter(val => {
          return val.goodsId == goods.goodsId;
        });
        arr[0].count++;
      } else {
        let newSelectGood = {
          goodsName: goods.goodsName,
          goodsId: goods.goodsId,
          price: goods.price,
          count: 1
        };
        this.tableData.push(newSelectGood);
      }
      this.getAll();
    },
    reduceGoods:function(goods) {
      if(goods.count > 1) {
        goods.count -= 1;
      }else {
        //只剩下一份
        this.tableData = this.tableData.filter(val=>val.goodsId != goods.goodsId)
      }
      this.getAll();
    },
    getAll: function() {
      //计算总数及总价
      let numArr = [];
      if(!this.tableData.length){
        this.allNum= 0;
        this.allMoney = 0;
        return;
      }
      this.tableData.forEach(val => {
        numArr.push(val.count);
      });
      this.allNum = numArr.reduce((previous, current, index, array) => {
        return previous + current;
      });
      this.allMoney = 0;
      this.tableData.forEach(val => {
        this.allMoney += parseInt(val.count * val.price);
      });
    },
    deleteAll:function() {
      this.tableData = [];
      this.getAll();
    },
    checkout(){
      if(this.allNum) {
        this.deleteAll();
        // this.$message({
        //   message:'succ',
        //   type:'success'
        // });
        this.$message.success('succ');
      }else {
        this.$message.error('暂无账单可结');
      }
    },
  }
};
</script>

<style scoped type='text/css'>
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.clearfix {
  /* 触发 hasLayout */
  zoom: 1;
}
.goods-content::-webkit-scrollbar {
  width: 10px;
  height: 6px;
  background-color: rgb(230, 235, 228);
}

/*定义滚动条轨道 内阴影+圆角*/
.goods-content::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px #e41fb9b2;
  border-radius: 10px;
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
.goods-content::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgb(229, 186, 220);
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
  margin-top: 20px;
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
  transition: all 0.3s;
  cursor: pointer;
}
.goods-list li:hover {
  background-color: rgb(240, 247, 246);
  box-shadow: 0 0 10px 1px #2f90eb;
  transform: translateY(-3px);
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
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  list-style-type: none;
  box-sizing: border-box;
  background: #fff;
  transition: all 0.3s;
}
.goods-content ul li:hover {
  background-color: hsl(0, 0%, 100%);
  box-shadow: 0px 0px 10px 1px #888888;
  cursor: pointer;
  transform: translateY(-3px);
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
.total_cal {
  margin: 5px;
  text-align: right;
  border-bottom: 1px solid #ccc;
  line-height: 1.5;
}
.total_cal span {
  margin-right: 30px;
  font-weight: bold;
  color:#2f90eb;
}
.total_cal span:nth-of-type(2) {
  color: #c31;
}
</style>