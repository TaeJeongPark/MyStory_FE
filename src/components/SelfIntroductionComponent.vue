<script>
  import $ from 'jquery';
  import axios from 'axios';
  import HeaderComponent from '@/components/NaviBarComponent.vue';
  import store from "@/vuex/store";

  export default {
    name: 'GrowthProcessComponent',
    data : function(){
      return {
        characterCountSpace: 0,
        characterCount: 0,
        pageCnt: 1,
        savePath: 'setGrowthData',
        growthData: store.getters.getGrowthData,
        reasonData: store.getters.getReasonData,
        meritFaultData: store.getters.getMeritFaultData,
        aspirationData: store.getters.getAspirationData,
        result: null,
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
        console.log($('#content' + this.pageCnt).val());

        const data = {
          sentence : ($('#content' + this.pageCnt).val()),
        }
        // Axios를 사용하여 데이터를 받아오는 비동기 요청
        this.$axios.post('content/correctSentence', data)
            .then(response => {
              // AI 첨삭 결과를 화면에 표시
              console.log(response.data);
              this.result = response.data.result;
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
              this.result = response.data.result;
            })
            .catch(error => {
              console.error('맞춤법 검사 도중 오류가 발생했습니다.', error);
            });
      },
      next() {
        // store에 저장
        store.commit(this.savePath, ($('#content' + this.pageCnt).val()));

        // 다음 항목으로 변경
        this.pageCnt++;
        this.result = false;

        // 페이지 제어
        this.pageControl();
      },
      back() {
        // 이전 항목으로 변경
        this.pageCnt--;

        // 페이지 제어
        this.pageControl();
      },
      pageControl() {
        if (this.pageCnt === 1) {
          this.savePath = 'setGrowthData';
          this.growthData = store.getters.getGrowthData;
        } else if (this.pageCnt === 2) {
          this.savePath = 'setReasonData';
          this.reasonData = store.getters.getReasonData;
        } else if (this.pageCnt === 3) {
          this.savePath = 'setMeritFaultData';
          this.meritFaultData = store.getters.getMeritFaultData;
        } else if (this.pageCnt === 4) {
          this.savePath = 'setAspirationData';
          this.aspirationData = store.getters.getAspirationData;
        } else if (this.pageCnt === 5) {
          this.$router.push('/result'); // 결과 페이지로 이동
        } else if (this.pageCnt === 0) {
          this.$router.push('/story');  // 이력서 페이지로 이동
        }

        this.result = false;

        this.characterCountSpace = 0;
        this.characterCount = 0;
      }
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
        <h1 v-if="this.pageCnt === 1" class="title" id="title">당신의 성장 과정은 어땠나요?</h1>
        <h1 v-if="this.pageCnt === 2" class="title" id="title">당신의 지원 동기는 무엇인가요?</h1>
        <h1 v-if="this.pageCnt === 3" class="title" id="title">당신 성격의 장단점은 무엇인가요?</h1>
        <h1 v-if="this.pageCnt === 4" class="title" id="title">당신의 입사 후 포부는 무엇인가요?</h1>
      </div>
      <div style="float: right;">
        <span>공백 포함 {{ characterCountSpace }}자 / 공백 미포함 {{ characterCount }}자</span>
      </div>
      <div>
        <textarea v-if="this.pageCnt === 1" v-model="growthData" class="input-box" type="text" placeholder="당신의 성장 과정을 적어 주세요" @keyup="cntCharacters" id="content1"></textarea>
        <textarea v-if="this.pageCnt === 2" v-model="reasonData" class="input-box" type="text" placeholder="당신의 지원 동기를 적어 주세요" @keyup="cntCharacters" id="content2"></textarea>
        <textarea v-if="this.pageCnt === 3" v-model="meritFaultData" class="input-box" type="text" placeholder="당신 성격의 장단점을 적어 주세요" @keyup="cntCharacters" id="content3"></textarea>
        <textarea v-if="this.pageCnt === 4" v-model="aspirationData" class="input-box" type="text" placeholder="당신의 입사 후 포부를 적어 주세요" @keyup="cntCharacters" id="content4"></textarea>
      </div>
      <div style="margin: 10px 0px">
        <table style="width: 100%">
          <tr>
            <td style="width: 20%;">
              <button class="btn-small" type="button" @click="back">이전</button>
            </td>
            <td style="width: 30%;" align="center">
              <button class="btn-long" type="button" @click="kakaoAlert">맞춤법 검사</button>
            </td>
            <td style="width: 30%;" align="center">
              <button class="btn-long" type="button" @click="chatGptSend">AI 첨삭</button>
            </td>
            <td style="width: 20%;" align="right">
              <button class="btn-small" type="button" @click="next">다음</button>
            </td>
          </tr>
        </table>
      </div>
      <div>
        <textarea v-if="this.result" class="input-box" style="margin-top: 5px; margin-bottom: 100px; background-color: lightgray;" type="text" readonly id="result"></textarea>
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