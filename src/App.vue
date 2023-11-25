<template>
  <div id="app">
    <router-link to="/main">main</router-link>
    <router-link to="/info">info</router-link>
    <!-- convert -->
    <!-- <a href="#/main" class="">main</a> -->
    <router-view></router-view>
  </div>
  <body class="default-margin">
  <img src="../public/logo.svg" alt="로고" style="margin-bottom: 400px">
  <main class="form-signin w-100 m-auto">
    <form>
      <h1 class="title center typing text">당신의 이야기를 들려주세요</h1>
      <button class="btn center" type="button" style="width: auto; height: auto">
        <img src="../public/login/btn_kakao_login.svg" alt="카카오 로그인" onclick="loginKakao">
      </button>
      <button class="btn center" type="button" style="width: auto; height: auto">
        <img src="../public/login/btn_non_member.svg" alt="비회원" onclick="">
      </button>
    </form>
  </main>
  </body>
</template>

<script>
export default {
  name: 'App',
  methods: {
    loginKakao() {
      // Axios를 사용하여 데이터를 받아오는 비동기 요청
      this.$axios.get('https://api.example.com/data')
          // eslint-disable-next-line no-unused-vars
          .then(response => {
            // 데이터를 성공적으로 받아왔을 때 다른 화면으로 이동
            this.$router.push('/homeComponent');
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }
  }
}
</script>

<style>
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
  margin-bottom: 50px;
}

.default-margin {
  margin: 50px;
  background-color: black;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.bd-mode-toggle .dropdown-menu .active .bi {
  display: block !important;
}
</style>
