<template>
  <div class="book-rank-container">
    <Nav></Nav>
    <div class="book-rank-list">
      <ul class="book-rank-detail">
        <h3>男生</h3>
        <li class="book-rank-item" v-for="(rank) in rankCategories.male" :key="rank._id" v-show="!rank.collapse">
          <img :src="rank.cover" alt="" />
          <span @click="golist(rank)">{{rank.title}}</span>
        </li>
        <li @click="ShowmaleCollapse" class="book-rank-item book-rank-others">
          <span>其他排行</span>
        </li>
      </ul>
      <ul class="book-rank-detail">
        <h3>女生</h3>
        <li class="book-rank-item" v-for="(rank) in rankCategories.female" :key="rank._id" v-show="!rank.collapse">
          <img :src="rank.cover" alt="" />
          <span @click="golist(rank)">{{rank.title}}</span>
        </li>
        <li @click="ShowfemaleCollapse" class="book-rank-item book-rank-others">
          <span>其他排行</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Nav from "../components/nav";
import { getRankCategory } from "../utils/apiConfig";
import util from '../utils/util'

export default {
  components: {
    Nav,
  },
  data() {
    return {
      rankCategories: {},
      ismaleCollapse: false,
      isfemaleCollapse: false,
      num: 7
    };
  },
  deactivated() {
    this.$store.commit('setShowList', true);
  },
  computed: {
  },
  created() {
    getRankCategory()
      .then((res) => {
        console.log(res);
        res.data.male.forEach(rank=>{
					rank.cover = util.staticPath + rank.cover;
				})
				res.data.female.forEach(rank=>{
					rank.cover = util.staticPath + rank.cover;
				})
        this.rankCategories = res.data
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    ShowmaleCollapse() {
      // this.ismaleCollapse = !this.ismaleCollapse;
      this.rankCategories.male.forEach((res) => {
        res.collapse = !res.collapse
      })
    },
    ShowfemaleCollapse() {
      this.rankCategories.female.forEach((res) => {
        res.collapse = !res.collapse
      })
    },
    golist(list) {
      // console.log(list);
			this.$store.commit('SetRankList',list)
      this.$router.push({name:'ranklist',params:{rankid:list._id}})
    }
  },
};
</script>

<style lang="less">
.book-rank-container {
  height: 91.6vh;
  // overflow: hidden;
  .book-rank-list {
    overflow-y: scroll;
    height: 100%;
    padding-bottom: 45px;
    .book-rank-detail {
      padding: 10px;
      margin-bottom: 20px;
      h3 {
        font-size: 16px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ebeef5;
      }
      .book-rank-item {
        // border-bottom: 1px solid #ebeef5;
        margin: 10px;
        display: flex;
        padding-bottom: 20px;
        span {
          padding: 10px 0 10px 50px;
          font-size: 16px;
          line-height: 16px;
          color: #555;
         
        }
        img {
          width: 26px;
          height: 26px;
        }
      }
    }
  }
}
</style>