<script>
  import axios from "axios";
  import store from "@/vuex/store";

  export default {
    name: 'App',
    data : function(){
      return {
        kakaoKey: "cce23cbb01041c3fab7a8525efd6af0e",
      };
    },
    methods: {
      kakaoLogin() {
        // console.log(window.Kakao);
        window.Kakao.Auth.login({
          success: this.GetMe,
        });
      },
      GetMe(){
        window.Kakao.API.request({
          url:'/v2/user/me',
          success : res => {
            const id = res.id;

            axios.post(`login/kakao`,{
              userId : id,
              accessToken : window.Kakao.Auth.getAccessToken(),
            })
                .then(res => {
                  console.log(res);
                  if(res.data.msg === "Success") {
                    console.log("로그인 성공");
                    store.commit('setUserId', id);
                    this.$router.push('/home');
                  } else {
                    console.log("로그인 실패");
                    alert("로그인에 실패했습니다.\n다시 시도해주세요.");
                  }
                })
                .catch(err => {
                  console.log(err);
                  console.log("로그인 실패");
                })
          },
          fail : error => {
            // this.$router.push("/errorPage");
            console.log(error);
          }
        })
      }
    }
  }
</script>

<template>
  <body class="default-margin">
  <img src="../../public/logo.svg" alt="로고" style="margin-bottom: 15%">
  <h1 class="title center">당신의 이야기를 들려주세요</h1>
  <button class="btn center" type="button" style="width: auto; height: auto" @click="kakaoLogin">
    <img src="../../public/login/btn_kakao_login.svg" alt="카카오 로그인">
  </button>
  <button class="btn center" type="button" style="width: auto; height: auto">
    <img src="../../public/login/btn_non_member.svg" alt="비회원" @click="this.$router.push('/story')">
  </button>
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
</style>