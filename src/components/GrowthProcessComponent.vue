<script>
  import HeaderComponent from '@/components/NaviBarComponent.vue';

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
        <h1 class="title">당신의 성장 과정은 어땠나요?</h1>
      </div>
      <div style="float: right;">
        <span>공백 포함 {{ characterCountSpace }}자 / 공백 미포함 {{ characterCount }}자</span>
      </div>
      <div>
        <textarea class="input-box" type="text" placeholder="당신의 성장 과정을 적어 주세요" @keyup="cntCharacters"></textarea>
      </div>
      <div style="margin: 10px 0px">
        <table style="width: 100%">
          <tr>
            <td style="width: 20%;">
              <button class="btn-small" type="button" style="">이전</button>
            </td>
            <td style="width: 30%;" align="center">
              <button class="btn-long" type="button" style="">맞춤법 검사</button>
            </td>
            <td style="width: 30%;" align="center">
              <button class="btn-long" type="button" style="">AI 첨삭</button>
            </td>
            <td style="width: 20%;" align="right">
              <button class="btn-small" type="button" style="">다음</button>
            </td>
          </tr>
        </table>
      </div>
      <div>
        <textarea class="input-box" style="margin-top: 5px; background-color: lightgray; display: none" type="text" readonly></textarea>
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