<template>
  <div
    class="reader-container"
    @touchstart="checkStart"
    @touchmove="checkmove"
    @touchend="oprationAction"
  >
    <readercontent :bookContent="chapterContent" :Title="Title"></readercontent>
    <!-- <readermenu @prev="chapterUp" @next="chapterDown" :isMenuShow="ismenushow" :Now="currentChapter+1" :Total="Total"></readermenu> -->
  </div>
</template>

<script>
import readercontent from "./readerContent";
// import readermenu from './readerMenu'
// import util from "../../utils/util";
import {
  getChapter,
  getBookChapter,
  getBookSources,
} from "../../utils/apiConfig";

export default {
  components: {
    readercontent,
    // readermenu
  },
  data() {
    return {
      ismenushow: false,
      ismove: false,
      chapters: {},
      currentChapter: 0,
      chapterContent: {},
      sources: {},
      Title: "",
      Total: 0,
      startX: [],
      X: 0,
    };
  },
  created() {
    this.getChapters();
    this.getSources();
  },
  methods: {
    getChapters() {
      console.log(this.$store.state.BookInfo._id);
      let sourceId = this.$store.state.SourceId;
      getChapter(sourceId).then((res) => {
        console.log(res.data);
        this.chapters = res.data.chapters;
        this.currentChapter = 0
        this.getChapterContent();
      });
    },
    getChapterContent() {
      let lastChapter = 
        this.currentChapter > this.chapters.length - 1
          ? this.chapters.length - 1
          : this.currentChapter;
      let link = this.chapters[lastChapter].link;
      getBookChapter(encodeURIComponent(link))
        .then((res) => {
          console.log(res);
          this.chapterContent = res.data.chapter;
          this.Title = res.data.chapter.title
          // this.chapters[this.currentChapter].title;
          this.Total = this.chapters.length - 1;

          let view = document.getElementById("reader-page-view");
          let screenHeight = document.body.clientHeight;
          console.log(view.scrollHeight);
          view.scrollTop = 0;
          let sum = 0;
          do {
            sum += screenHeight;
          } while (view.scrollHeight < sum);
          view.style.height = sum + "px";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSources() {
      getBookSources({ view: "summary", book: this.$route.params.bookid }).then(
        (res) => {
          this.sources = res.data;
          // console.log(res.data);
        }
      );
    },
    changeSource() {
      this.getChapters();
      this.ismenushow = false;
    },
    checkStart(el) {
      this.ismove = false;
      this.startX = el.changedTouches[0].pageX;
    },
    checkmove(el) {
      this.ismove = true;
      let moveEndX = el.changedTouches[0].pageX;
      this.X = moveEndX - this.startX;
    },

    //触摸屏幕事件
    oprationAction(el) {
      let view = document.getElementById("reader-page-view");
      let screenHeight = document.body.clientHeight;
      let screenWidth = document.body.clientWidth;
      let Wside = screenWidth / 3;
      let Hside = screenHeight / 3;
      // console.log(view.scrollHeight);
      // console.log('页面的高度:'+view.clientHeight);
      if (!this.ismove) {
        let touchPointX = el.changedTouches[0].pageX;
        let touchPointY = el.changedTouches[0].pageY;
        if (
          touchPointX > 0 &&
          touchPointX < Wside &&
          this.ismenushow == false
        ) {
          this.ismenushow = false;
          view.scrollTop -= screenHeight;
        } else if (
          touchPointX > Wside &&
          touchPointX < screenWidth - Wside &&
          touchPointY > Hside &&
          touchPointY < screenHeight - Hside
        ) {
          this.ismenushow = !this.ismenushow;
        } else if (
          touchPointX < screenWidth &&
          touchPointX > screenWidth - Wside &&
          this.ismenushow == false
        ) {
          this.ismenushow = false;
          if (view.scrollHeight == view.scrollTop + screenHeight) {
            this.currentChapter++;
          }
          view.scrollTop += screenHeight;
        }
      } else {
        if (this.X > 0) {
          el.preventDefault();
          view.scrollTop -= screenHeight;
        } else {
          el.preventDefault();
          if (view.scrollHeight == view.scrollTop + screenHeight) {
            this.currentChapter++;
          }
          view.scrollTop += screenHeight;
        }
      }
    },
    goChapter(num){
			this.currentChapter = num;
			this.$store.commit('ChangeDetail')
			this.ismenushow = false;
		},
		chapterUp(){
			if(this.currentChapter == 0){
				return
			}
			this.currentChapter -= 1;
		},
		chapterDown(){
			if(this.currentChapter >= this.chapters.length - 1){
				this.currentChapter = this.chapters.length - 1;
				return
			}
			this.currentChapter += 1;
		}
  },
};
</script>

<style>
.reader-container {
  overflow-y:scroll;
  height: 100%;
}
</style>