<script>
  import HeaderComponent from '@/components/NaviBarComponent.vue';
  import axios from "axios";
  import store from "@/vuex/store";

  export default {
    name: 'HomeComponent',
    data : function(){
      return {
        storyList : [],
        index : 1,
        page : 0,
        size : 30,
      };
    },
    mounted() {
      axios.get(`content/list?id=${store.state.userId}&page=${this.page}&size=${this.size}`)
          .then(res => {
            console.log(res);
            if(res.data.msg === "Success") {
              console.log("스토리 목록 조회 성공");
              this.storyList = res.data.result;
              this.page++;
            } else {
              console.log("스토리 목록 조회 실패");
            }
          })
          .catch(err => {
            console.log(err);
            console.log("스토리 목록 조회 실패");
          })
    },
    components: {
      HeaderComponent
    },
    methods: {
      goDetail(id) {
        this.$router.push({name: `result`, query: {id: id}});
      },
      paging() {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if(scrollTop + clientHeight >= scrollHeight) {
          axios.get(`content/list?id=${store.state.userId}&page=${this.page}&size=${this.size}`)
              .then(res => {
                console.log(res);
                if(res.data.msg === "Success") {
                  console.log("스토리 목록 조회 성공");
                  this.storyList = this.storyList.concat(res.data.result);
                  this.page++;
                } else {
                  console.log("스토리 목록 조회 실패");
                }
              })
              .catch(err => {
                console.log(err);
                console.log("스토리 목록 조회 실패");
              })
        }
      }
    },
  }
</script>

<template>
  <body>
    <div id="header">
      <HeaderComponent/>
    </div>
    <div>
      <h1 class="center title">나의 이야기 리스트</h1>
    </div>
    <div id="board-list">
      <div class="container">
        <table class="board-table">
          <thead>
          <tr>
            <th scope="col" class="th-num">번호</th>
            <th scope="col" class="th-title">제목</th>
            <th scope="col" class="th-date">등록일</th>
            <th scope="col" class="th-date">수정일</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(story, index) in storyList" :key="index">
            <td>{{ index + 1 }}</td>
            <th>
              <button type="button" @click="goDetail(story.id)">{{ story.title }}</button>
            </th>
            <td>{{ story.regTime }}</td>
            <td>{{ story.updateTime }}</td>
          </tr>
          </tbody>
        </table>
        <button type="button" class="btn-long center" style="margin-top: 50px; margin-bottom: 50px" @click="paging">더보기</button>
      </div>
    </div>
  </body>
</template>

<style scoped>
  * {
    font-family: Pretendard;
    background-color: black;
  }

  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }

  .title {
    font-size: 50px;
    font-weight: bold;
    text-align: center;
    color: white;
    margin-top: 100px;
    margin-bottom: 50px;
  }

  .btn-long {
    width: 120px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #06F;
    border-radius: 10px;
    border: none;
    color: #FFF;
    text-align: center;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  .page-title h3 {
    font-size: 28px;
    color: #333333;
    font-weight: 400;
    text-align: center;
  }

  #board-search .search-window .search-wrap input {
    height: 40px;
    width: 100%;
    font-size: 14px;
    padding: 7px 14px;
    border: 1px solid #ccc;
  }

  #board-search .search-window .search-wrap input:focus {
    border-color: #333;
    outline: 0;
    border-width: 1px;
  }

  .board-table {
    font-size: 13px;
    width: 100%;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  .board-table button {
    color: white;
    display: inline-block;
    line-height: 1.4;
    word-break: break-all;
    vertical-align: middle;
    border: none;
  }

  .board-table th {
    text-align: center;
  }

  .board-table .th-num {
    width: 100px;
    text-align: center;
  }

  .board-table .th-date {
    width: 200px;
  }

  .board-table th, .board-table td {
    padding: 14px 0;
  }

  .board-table tbody td {
    border-top: 1px solid #e7e7e7;
    text-align: center;
  }

  .board-table tbody th {
    padding-left: 28px;
    padding-right: 14px;
    border-top: 1px solid #e7e7e7;
    text-align: left;
  }

  .board-table tbody th p{
    display: none;
  }

  /* reset */

  * {
    color: white;
    list-style: none;
    text-decoration: none;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .container {
    width: 1100px;
    margin: 0 auto;
  }
</style>