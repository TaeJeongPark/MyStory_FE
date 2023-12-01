<script>
  import store from "@/vuex/store";

  export default {
    name: 'NaviBarComponent',
    computed: {
      store() {
        return store
      }
    }
  }
</script>

<template>
  <header>
    <nav v-if="store.state.userId" id="nav2">
      <a href="/home"><img class="logo" src="../../public/logo.svg" alt="로고" style="margin-bottom: 400px"></a>
      <ul>
        <li><a href="/story">새 스토리 만들기</a></li>
        <li><a href="/login">로그아웃</a></li>
        <li><a href="#">회원탈퇴</a></li>
      </ul>
    </nav>
    <nav v-if="!store.state.userId" id="nav2">
      <a href="/story"><img class="logo" src="../../public/logo.svg" alt="로고" style="margin-bottom: 400px"></a>
    </nav>
  </header>
</template>

<style scoped>
  * {
    font-family: Pretendard;
    padding: 0;
    margin: 0;
  }

  ul, ol {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: #fff;
    font-size: 15px;
  }

  nav {
    width: 100%;
    overflow: hidden;
    height: 80px;
    background-color: #282828;
    //margin: 50px auto;
  }

  #nav2>a {
    display: block; /* a태그는 글자성격 = inline */
    float: left;
    font-size: 30px;
    font-weight: 900;
    line-height: 80px;
    //padding: 0 30px;
  }

  #nav2>ul {
    float: right;
  }

  #nav2>ul li {
    float: left;
    padding: 0 30px;
    line-height: 80px;
    margin-right: 30px;
  }

  .logo {
    width: 120px;
    height: 80px;
    margin-left: 50px;
  }
</style>