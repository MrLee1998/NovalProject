<template>
  <div class="category">
    <div class="category-title">{{title}}</div>
    <div class="category-item"> 
      <div class="category-item-list"  v-for="item in category" :key="item.bookCount">
        <span @click="goToList(item)">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Array,
      require: true
    },
    title: {
      type: String,
      require: true
    },
    type: {
      type: String,
      require: true
    }
  },
  data() {
    return {
    }
  },
  computed: {

  },
  methods: {
    goToList(item) {
      let type;
      if(this.title === '男生') {
        type = 'male'
      } else {
        type = 'female'
      }
      console.log(item);
      this.$store.commit('SetCategoryList',item);
      this.$router.push({
        name:'categorylist', 
        query: { 
          gender: type, 
          type: 'hot', 
          major: item.name,
          start: 0,
          limit: 20
        }
      })
    }
  },
  created() {

  },
};
</script>

<style lang="less" scoped>
.category-title{
		// border-left: 2px solid red;
    font-size: 16px;
    margin: 10px 0 20px 10px;
}
.category-item {
  display: flex;
  flex-wrap: wrap;
  margin-left: 40px;
  .category-item-list {
    width: 33%;
    line-height: 50px;
  }
}  
</style>