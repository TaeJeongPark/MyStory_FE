<script>
  import $ from 'jquery';
  import axios from 'axios';
  import HeaderComponent from '@/components/NaviBarComponent.vue';
  // import store from "@/vuex/store";

  export default {
    name: 'GrowthProcessComponent',
    data : function(){
      return {
        characterCountSpace: 0,
        characterCount: 0,
      };
    },
    components: {
      HeaderComponent
    },
    methods: {
      cntCharacters(event) {
        this.characterCountSpace = event.target.value.length;
        const textWithoutSpaces = event.target.value.replace(/\s/g, '');
        this.characterCount = textWithoutSpaces.length;
      },
      chatGptSend() {
        console.log($('#content').val());

        const data = {
          sentence : $('#content').val(),
        }
        // Axios를 사용하여 데이터를 받아오는 비동기 요청
        this.$axios.post('content/correctSentence', data)
            // eslint-disable-next-line no-unused-vars
            .then(response => {
              // AI 첨삭 결과를 화면에 표시
              console.log(response.data);
              $('#result').val(response.data.result);
              $('#result').css('display', 'inline-block');
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
      },
      kakaoAlert() {
        alert('현재 카카오에서 서비스 개선을 위해 일시적으로 API를 제공하지 않고 있습니다. 이용에 불편을 드려 죄송합니다.');
      },
      getKakaoCloudToken() {
        const data = {
          "auth": {
            "identity": {
              "methods": [
                "application_credential"
              ],
              "application_credential": {
                "id": "2efcd808d49745a49ca8c977819fb700",
                "secret": "JxbYWTKH39C1gNfH9w_6f-cAWJRUm7-wyce3pbMWXiFoHj2KF6VdNeLe-smfRm9uUNaTbikxpvlOl1B2TPtEsA"
              }
            }
          }
        };

        // Axios를 사용하여 데이터를 받아오는 비동기 요청
        this.$axios.post('https://iam.kakaoi.io/identity/v3/auth/tokens', data)
            // eslint-disable-next-line no-unused-vars
            .then(response => {
              // 데이터를 성공적으로 받아왔을 때 다른 화면으로 이동
              this.$router.push('/homeComponent');
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
      },
      checkSpelling() {
        // 카카오 맞춤법 검사 API 호출
        const apiUrl = 'https://kapi.kakao.com/v1/language/translate';
        const apiKey = 'JxbYWTKH39C1gNfH9w_6f-cAWJRUm7-wyce3pbMWXiFoHj2KF6VdNeLe-smfRm9uUNaTbikxpvlOl1B2TPtEsA';

        axios({
          method: 'post',
          url: apiUrl,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `KakaoAK ${apiKey}`,
          },
          data: `query=${encodeURIComponent($('#content').val())}`,
        })
            .then(response => {
              // API 응답에서 맞춤법 검사 결과 추출
              const checkedText = response.data.translated_text;
              console.log(checkedText);

              // 맞춤법 검사 결과를 화면에 표시
              $('#result').val(checkedText);
              $('#result').display = 'inlineBlock';
            })
            .catch(error => {
              console.error('맞춤법 검사 도중 오류가 발생했습니다.', error);
            });
      },
    }
  }
</script>

<template>
  <body>
    <div id="header">
      <HeaderComponent/>
    </div>
    <div class="center">
      <div>
        <h1 class="title">당신의 성장 과정은 어땠나요?</h1>
      </div>
      <div style="float: right;">
        <span>공백 포함 {{ characterCountSpace }}자 / 공백 미포함 {{ characterCount }}자</span>
      </div>
      <div>
        <textarea class="input-box" type="text" placeholder="당신의 성장 과정을 적어 주세요" @keyup="cntCharacters" id="content"></textarea>
      </div>
      <div style="margin: 10px 0px">
        <table style="width: 100%">
          <tr>
            <td style="width: 20%;">
              <button class="btn-small" type="button" style="">이전</button>
            </td>
            <td style="width: 30%;" align="center">
              <button class="btn-long" type="button" @click="kakaoAlert">맞춤법 검사</button>
            </td>
            <td style="width: 30%;" align="center">
              <button class="btn-long" type="button" @click="chatGptSend">AI 첨삭</button>
            </td>
            <td style="width: 20%;" align="right">
              <button class="btn-small" type="button" style="">다음</button>
            </td>
          </tr>
        </table>
      </div>
      <div>
        <textarea class="input-box" style="margin-top: 5px; margin-bottom: 100px; background-color: lightgray; display: none;" type="text" readonly id="result"></textarea>
      </div>
    </div>
  </body>
</template>

<style scoped>
  body {
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

  .btn-small {
    width: 75px;
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

  .input-box {
    width: 100%;
    height: 500px;
    border-radius: 10px;
    background: #FFF;
    text-align: start;
    border: none;
    margin-left: 5px;
    padding: 10px 10px;
  }
</style>