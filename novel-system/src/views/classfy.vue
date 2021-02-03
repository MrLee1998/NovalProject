<template>
  <div class="classfy">
    <Nav></Nav>
    <maleCategory
      :category="categorylist.male"
      :title="'男生'"
    ></maleCategory>

    <maleCategory
      :category="categorylist.female"
      :title="'女生'"
    ></maleCategory>

  </div>
</template>

<script>
import Nav from "../components/nav";
import maleCategory from "../components/category/Category";
import { getCategories } from "../utils/apiConfig";

export default {
  components: {
    Nav,
    maleCategory,
  },
  data() {
    return {
      categorylist: {},
    };
  },
  created() {
    getCategories()
      .then((res) => {
        console.log(res);
        this.categorylist = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
</style>