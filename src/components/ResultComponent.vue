<script>
  import HeaderComponent from '@/components/NaviBarComponent.vue';
  import html2canvas from 'html2canvas';
  import jsPDF from 'jspdf';
  import _ from 'lodash';
  import $ from "jquery";

  const getNowDate = () => {
    /* 파일 이름 설정 : (default) 현재 시간 기준 */
    const now = new Date();
    return `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}`;

  }

  /* 용지 별 규격(mm) */
  const paperStandardSize = {
    a1: [594, 841],
    a2: [420, 594],
    a3: [297, 420],
    a4: [210, 297],
    a5: [148, 210],
    a6: [105, 148],
    b1: [788, 1091],
    b2: [788, 545],
    b3: [545, 394],
    b4: [394, 272],
    b5: [272, 197],
    b6: [197, 136],
  };

  class initOptions {
    _canvasOptions = {
      fileName: '',
      allowTaint: true,
      useCORS: true,
      logging: true,
      height: 0,
      width: 0,
      scale: 1.3,
      dpi: 600,
      scrollX: 0,
      scrollY: 0,
      fileExtension: "pdf",
      margin: 30,
    }

    constructor(canvasOptions) {
      this.canvasOptions = _.merge(this._canvasOptions, canvasOptions);
    }

    get canvasOptions() {
      return this._canvasOptions;
    }

    set canvasOptions(value) {
      this._canvasOptions = _.merge(this._canvasOptions, value);
    }
  }

  export default {
    name: 'StoryComponent',
    data: function () {
      return {
        classList: [],
        tableRows: [], // 테이블의 행을 저장할 배열
        nextId: 1, // 다음 행에 할당될 ID
        propTitle: 'mypdf',
      };
    },
    components: {
      HeaderComponent
    },
    methods: {
      makePDF() {

        $('#header').css('display', 'none');
        $('#btn-save').css('display', 'none');

        const element = 'body';
        const letterSize = 'a4';
        const pageDirection = 'p';
        const options = {
          fileName: '이력서',
          allowTaint: true,
          useCORS: true,
          logging: true,
          height: 0,
          width: 0,
          scale: 1,
          dpi: 600,
          scrollX: 0,
          scrollY: 0,
          fileExtension: "pdf",
          margin: 100,
          quality: 1,
          pagebreak: { mode: 'avoid-all', before: '#page2el' },
        };

        /* export 할 element Id 미지정 시 return */
        if (element === null || element === undefined) {
          return console.log("DOM ID를 입력해 주세요.");
        }

        /* export 할 element Id 명 */
        const elementDOM = document.querySelector(element);

        /*  기본 옵션  */
        let editedOption = new initOptions(options);

        /* 선택한 element Id의 가로 세로 폭 (캡쳐 이미지 사이즈 지정) */
        editedOption.canvasOptions.height = elementDOM.scrollHeight + editedOption.canvasOptions.margin;
        editedOption.canvasOptions.width = elementDOM.scrollWidth + editedOption.canvasOptions.margin;

        switch (pageDirection.toLowerCase()) {
          case "l":
            if (paperStandardSize[letterSize][0] > paperStandardSize[letterSize][1]) {
              editedOption.imgWidth = paperStandardSize[letterSize][0];
              editedOption.imgHeight = paperStandardSize[letterSize][1];
            } else {
              editedOption.imgWidth = paperStandardSize[letterSize][1];
              editedOption.imgHeight = paperStandardSize[letterSize][0];
            }
            break;
          case "p" :
            if (paperStandardSize[letterSize][0] < paperStandardSize[letterSize][1]) {
              editedOption.imgWidth = paperStandardSize[letterSize][0];
              editedOption.imgHeight = paperStandardSize[letterSize][1];
            } else {
              editedOption.imgWidth = paperStandardSize[letterSize][1];
              editedOption.imgHeight = paperStandardSize[letterSize][0];
            }
            break;
          default:
            return console.log("용지 방향을 가로(l), 세로(p)로 구분해주세요. ")
        }

        const exportSnapshot = ({canvas, fileName, type, replaceValue = ''}) => {
          let a = document.createElement('a');
          a.href = canvas.toDataURL(type).replace(type, replaceValue);
          a.download = fileName;
          a.click();
        }

        /* 클라이언트의 성격에 따라 pdf, png 파일을 구분하여 받는 분기문 (기본은 pdf)  */
        switch (editedOption.canvasOptions.fileExtension) {
          case "jpg" :
          case "jpeg":
            html2canvas(elementDOM, editedOption.canvasOptions).then(canvas => {

              const fileName = `${editedOption.canvasOptions.fileName}Jpeg_Export.jpeg`
              const type = "image/jpeg"
              const replaceValue = "image/octet-stream"
              exportSnapshot({canvas, fileName, type, replaceValue})
            });
            break;
          case "png":
            html2canvas(elementDOM, editedOption.canvasOptions).then(canvas => {
              const fileName = `${editedOption.canvasOptions.fileName}PNG_Export.png`
              const type = "image/png"
              exportSnapshot({canvas, fileName, type})
            });
            break;
          default:
            html2canvas(elementDOM, editedOption.canvasOptions).then(canvas => {
              const imgData = canvas.toDataURL('image/png');
              let imageWidth = canvas.width / (canvas.width / editedOption.imgWidth);
              let imageHeight = (editedOption.imgWidth * canvas.height) / canvas.width;

              const pdf = new jsPDF(pageDirection.toLowerCase(), 'mm', paperStandardSize[letterSize]);

              // 첫페이지 출력 (imgData,    확장자 ,  시작x,   시작y,  폭,     높이)
              pdf.addImage(imgData, 'PNG', 0, 0, imageWidth, imageHeight);

              let heightLeft = imageHeight - editedOption.imgHeight;

              while (heightLeft >= 0) {
                let position = heightLeft - imageHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imageWidth, imageHeight);
                heightLeft -= editedOption.imgHeight;
              }
              // 파일 저장
              pdf.save(`${editedOption.canvasOptions.fileName}_${getNowDate()}.pdf`);
            });
            break;
        }
        $('#header').css('display', 'inline-block');
        $('#btn-save').css('display', 'inline-block');
      },
    }
  }
</script>

<template>
  <body>
    <div id="header">
      <HeaderComponent/>
    </div>
    <div style="width: 100%; "></div>
    <div class="block center" style="margin-top: 100px;" id="export-container">
      <div style="">
        <img src="../../public/story/img_image.svg" alt="사진" style="display: inline-block">
        <table class="default-info-table">
          <tr>
            <td style="width: 100px">생년월일</td>
            <td style="width: 300px">1999.11.28</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>inhatc@gmail.com</td>
          </tr>
          <tr>
            <td>Mobile</td>
            <td>010-1234-5678</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>인천광역시 미추홀구 인하로 100</td>
          </tr>
          <tr>
            <td>병역사항</td>
            <td>만기전역</td>
          </tr>
        </table>
        <div class="block" style="margin-top: 10px">
          <span style="font-size: 20px;">박태정</span><br>
          <span>Backend Developer</span>
        </div>
        <div class="block">
          <table class="default-table" style="width: 100%">
            <tr>
              <td class="title-small">나의 한 줄 소개</td>
            </tr>
            <tr>
              <td>이곳은 사용자의 한 줄 소개를 입력하는 공간입니다.</td>
            </tr>
          </table>
        </div>
        <div class="block">
          <table class="default-table" style="width: 100%">
            <tr>
              <td class="title-small" colspan="10">학력</td>
            </tr>
            <tr>
              <td style="width: 2%; text-align: left;">-</td>
              <td style="width: 10%; text-align: right;">2018.03</td>
              <td style="width: 2%; text-align: center;">~</td>
              <td style="width: 10%; text-align: left;">2024.02</td>
              <td style="width: 28%; text-align: left;">인하공업전문대학</td>
              <td style="width: 28%; text-align: left;">컴퓨터시스템과</td>
              <td style="width: 12%; text-align: center;">졸업예정</td>
              <td style="width: 3%; text-align: right;">4.33</td>
              <td style="width: 2%; text-align: center;">/</td>
              <td style="width: 3%; text-align: left;">4.5</td>
            </tr>
          </table>
        </div>
        <div class="block">
          <table class="default-table" style="width: 100%">
            <tr>
              <td class="title-small" colspan="3">자격증</td>
            </tr>
            <tr>
              <td style="width: 2%; text-align: left;">-</td>
              <td style="width: 10%; text-align: right;">2018.03</td>
              <td style="width: 88%; text-align: left; padding-left: 20px">ISTQB</td>
            </tr>
          </table>
        </div>
        <div class="block">
          <table class="default-table" style="width: 100%">
            <tr>
              <td class="title-small" colspan="10">교육</td>
            </tr>
            <tr>
              <td style="width: 2%; text-align: left;">-</td>
              <td style="width: 10%; text-align: right;">2018.03</td>
              <td style="width: 2%; text-align: center;">~</td>
              <td style="width: 10%; text-align: left;">2024.02</td>
              <td style="width: 28%; text-align: left;">3-In 인증</td>
              <td style="width: 48%; text-align: left;">인하공업전문대학</td>
            </tr>
          </table>
        </div>
        <div class="block">
          <table class="default-table" style="width: 100%">
            <tr>
              <td class="title-small" colspan="10">수상</td>
            </tr>
            <tr>
              <td style="width: 2%; text-align: left;">-</td>
              <td style="width: 10%; text-align: right;">2018.03</td>
              <td style="width: 28%; text-align: left; padding-left: 20px">글짓기 세무서장상</td>
              <td style="width: 60%; text-align: left;">중부세무서장상</td>
            </tr>
          </table>
        </div>
        <div class="block">
          <table class="default-table" style="width: 100%">
            <tr>
              <td class="title-small" colspan="10">경력</td>
            </tr>
            <tr>
              <td style="width: 2%; text-align: left;">-</td>
              <td style="width: 10%; text-align: right;">2018.03</td>
              <td style="width: 2%; text-align: center;">~</td>
              <td style="width: 10%; text-align: left;">2024.02</td>
              <td style="width: 28%; text-align: left;">Backend Developer</td>
              <td style="width: 48%; text-align: left;">(주)토스</td>
            </tr>
          </table>
        </div>
        <div class="block">
          <table class="default-table" style="width: 100%">
            <tr>
              <td class="title-small" colspan="10">활동경험</td>
            </tr>
            <tr>
              <td style="width: 2%; text-align: left;">-</td>
              <td style="width: 10%; text-align: right;">2018.03</td>
              <td style="width: 2%; text-align: center;">~</td>
              <td style="width: 10%; text-align: left;">2024.02</td>
              <td style="width: 76%; text-align: left;">인하공업전문대학 창업동아리(PIP)</td>
            </tr>
          </table>
        </div>
        <div class="block" id="page2el">
          <table class="default-table" style="width: 100%">
            <tr>
              <td class="title-small" colspan="10">기술스택</td>
            </tr>
            <tr>
              <td style="width: 30%; text-align: left;">Programin Languages</td>
              <td style="width: 70%; text-align: right;"><input class="input-box" style="width: 100%" type="text" value="Java, Python, SQL, Dart, C, C++" readonly></td>
            </tr>
            <tr>
              <td style="width: 30%; text-align: left;">Framework / Library</td>
              <td style="width: 70%; text-align: right;"><input class="input-box" style="width: 100%" type="text" value="Spring, Spring Boot, .NET, jQuery, Node.js, Flutter" readonly></td>
            </tr>
            <tr>
              <td style="width: 30%; text-align: left;">Server</td>
              <td style="width: 70%; text-align: right;"><input class="input-box" style="width: 100%" type="text" value="MySQL, Oracle, MariaDB" readonly></td>
            </tr>
            <tr>
              <td style="width: 30%; text-align: left;">Environment</td>
              <td style="width: 70%; text-align: right;"><textarea class="input-box" type="text" style="width: 100%; height: 90px; padding: 10px; text-align: start;" readonly>Eclipse, Intellij, Spring Tool Suite, Android Studio, Visual Studio, Visual Studio Code, Sublime Text, Notepad++, Postman</textarea></td>
            </tr>
            <tr>
              <td style="width: 30%; text-align: left;">Environment</td>
              <td style="width: 70%; text-align: right;"><input class="input-box" style="width: 100%" type="text" value="Windows, Linux" readonly></td>
            </tr>
            <tr>
              <td style="width: 30%; text-align: left;">ETC</td>
              <td style="width: 70%; text-align: right;"><input class="input-box" style="width: 100%" type="text" value="Notion, Figma, Photoshop, Illustrator" readonly></td>
            </tr>
          </table>
        </div>
        <div class="block">
          <div class="title-small">성장과정</div>
          <div>
            <textarea class="input-box" style="margin-top: 5px; width: 100%; height: 500px" type="text" readonly></textarea>
          </div>
        </div>
        <div class="block">
          <div class="title-small">지원동기</div>
          <div>
            <textarea class="input-box" style="margin-top: 5px; width: 100%; height: 500px" type="text" readonly></textarea>
          </div>
        </div>
        <div class="block">
          <div class="title-small">성격의 장단점</div>
          <div>
            <textarea class="input-box" style="margin-top: 5px; width: 100%; height: 500px" type="text" readonly></textarea>
          </div>
        </div>
        <div class="block">
          <div class="title-small">입사 후 포부</div>
          <div>
            <textarea class="input-box" style="margin-top: 5px; margin-bottom: 50px; width: 100%; height: 500px" type="text" readonly></textarea>
          </div>
        </div>
        <div>
          <button class="btn-long" type="button" style="margin-top: 5px; margin-bottom: 50px; float: right;" @click="makePDF" id="btn-save">저장</button>
        </div>
      </div>
    </div>
  </body>
</template>

<style scoped>
  div {
    break-before: page;
  }
  * {
    font-family: Pretendard;
    background-color: white;
  }

  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
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

  .title-small {
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 10px;
  }

  .default-info-table {
    width: 400px;
    display: inline-block;
    float: right;
  }

  default-table {
    width: 100%;
    display: inline-block;
  }

  .default-info-table td, .default-table tr:first-child td {
    border-bottom: 1px solid #000;
  }

  .default-info-table tr:last-child td {
    border-bottom: none;
  }

  .block {
    margin-bottom: 50px;
  }

  span {
    color: #000;
    text-align: center;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 5px;
  }

  .input-box {
    width: 319px;
    height: 45px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #fff;
    text-align: left;
    border: 1px solid #000;
    margin-left: 5px;
  }
</style>