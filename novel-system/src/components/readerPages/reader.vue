<template>
  <div class="reader-container">
    <readercontent :bookContent="chapterContent" :title="Title"></readercontent>
  </div>
</template>

<script>
import readercontent from "./readerContent";
import util from '../../utils/util'
import {
  getChapter,
  getBookChapter,
  getBookSources,
} from "../../utils/apiConfig";

export default {
  components: {
    readercontent,
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
      console.log(this.$route.params.bookid);
      console.log(this.$store.state.SourceId);
      let localShelf = util.getLocalData('myfollowbook')?util.getLocalData('myfollowbook'):{},
      sourceId=localShelf[this.$route.params.bookid]&&localShelf[this.$route.params.bookid].source?localShelf[this.$route.params.bookid].source : this.$store.state.SourceId;
      console.log(sourceId);
      getChapter(sourceId).then((res) => {
        console.log(res.data.chapters);
        this.chapters = res.data.chapters;
        this.currentChapter =
          localShelf &&
          localShelf[this.$route.params.bookid] &&
          localShelf[this.$route.params.bookid].lastChapter
            ? localShelf[this.$route.params.bookid].lastChapter
            : 0;
        this.getChapterContent();
      });
    },
    getChapterContent() {
      let lastChapter = this.currentChapter > this.chapters.length - 1 ? this.chapters.length - 1 :this.currentChapter;
      getBookChapter(encodeURIComponent(this.chapters[lastChapter].link)).then(res => {
        console.log(res);
        this.chapterContent = res.data.chapter
				this.Title = this.chapters[this.currentChapter].title
      });
    },
    getSources() {
      getBookSources({ view: "summary", book: this.$route.params.bookid }).then(
        (res) => {
          this.sources = res.data;
        }
      );
    },
    changeSource() {
      this.getChapters();
      this.ismenushow = false;
    },
  },
};
</script>

<style>
</style>