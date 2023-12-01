<script>
  import HeaderComponent from '@/components/NaviBarComponent.vue';
  import html2canvas from 'html2canvas';
  import jsPDF from 'jspdf';
  import _ from 'lodash';
  import $ from "jquery";
  import store from "@/vuex/store";

  const getNowDate = () => {
    // 파일 이름 설정 : (default) 현재 시간 기준
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
    computed: {
      store() {
        return store
      }
    },
    data: function () {
      return {
        classList: [],
        tableRows: [], // 테이블의 행을 저장할 배열
        nextId: 1, // 다음 행에 할당될 ID
        propTitle: 'mypdf',
        imgUrl: null,
        desireJob: store.getters.getDesireJob,
        name: store.getters.getName,
        birthday: store.getters.getBirthday,
        email: store.getters.getEmail,
        phone: store.getters.getPhone,
        address: store.getters.getAddress,
        military: store.getters.getMilitary,
        introduce: store.getters.getIntroduction,
        schools: store.getters.getSchool,
        certificates: store.getters.getCertificate,
        educations: store.getters.getEducation,
        awards: store.getters.getAward,
        careers: store.getters.getCareer,
        activities: store.getters.getActivity,
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
    },
    mounted() {
      // 이미지 변환
      if(store.state.imgBlob) {
        this.imgUrl = URL.createObjectURL(store.state.imgBlob);
      }

      // 학력 배열 유효성 검사
      let check = store.getters.getSchool[0].schoolName;
      if(check == null || check == undefined || check == '') {
        store.state.school = false;
      }

      // 자격증 배열 유효성 검사
      check = store.getters.getCertificate[0].name;
      if(check == null || check == undefined || check == '') {
        store.state.certificate = false;
      }

      // 교육 배열 유효성 검사
      check = store.getters.getEducation[0].supervisionName;
      if(check == null || check == undefined || check == '') {
        store.state.education = false;
      }

      // 수상 배열 유효성 검사
      check = store.getters.getAward[0].supervisionName;
      if(check == null || check == undefined || check == '') {
        store.state.award = false;
      }

      // 경력 배열 유효성 검사
      check = store.getters.getCareer[0].companyName;
      if(check == null || check == undefined || check == '') {
        store.state.career = false;
      }

      // 활동 경험 배열 유효성 검사
      check = store.getters.getActivity[0].content;
      if(check == null || check == undefined || check == '') {
        store.state.activity = false;
      }
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
      <img v-if="store.state.imgBlob" class="img" :src="imgUrl" alt="사진" id="img">
      <table class="default-info-table">
        <tr v-if="store.state.birthday">
          <td style="width: 100px">생년월일</td>
          <td style="width: 300px">{{ birthday }}</td>
        </tr>
        <tr v-if="store.state.email">
          <td>Email</td>
          <td>{{ email }}</td>
        </tr>
        <tr v-if="store.state.phone">
          <td>Mobile</td>
          <td>{{ phone }}</td>
        </tr>
        <tr v-if="store.state.address">
          <td>Address</td>
          <td>{{ address }}</td>
        </tr>
        <tr v-if="store.state.military">
          <td>병역사항</td>
          <td>{{ military }}</td>
        </tr>
      </table>
      <div v-if="store.state.name || store.state.desireJob" class="block" style="margin-top: 10px">
        <span style="font-size: 20px;">{{ name }}</span><br>
        <span>{{ desireJob }}</span>
      </div>
      <div v-if="store.state.introduction" class="block">
        <table class="default-table" style="width: 100%">
          <tr>
            <td class="title-small">나의 한 줄 소개</td>
          </tr>
          <tr>
            <td>{{ introduce }}</td>
          </tr>
        </table>
      </div>
      <div v-if="store.state.school" class="block">
        <table class="default-table" style="width: 100%">
          <tr>
            <td class="title-small" colspan="10">학력</td>
          </tr>
          <tr v-for="(school, index) in schools" :key="index">
            <td>
              <span>-</span>
              <input v-if="school.startMonth" class="input-box" type="text" style="width: 126px; margin-top: 5px; text-align: right;" readonly v-model="school.startMonth">
              <span v-if="school.endMonth">~</span>
              <input v-if="school.endMonth" class="input-box" type="text" style="width: 126px; text-align: left;" readonly v-model="school.endMonth">
              <input v-if="school.schoolName" class="input-box" type="text" style="width: 180px;" readonly v-model="school.schoolName">
              <input v-if="school.departmentName" class="input-box" type="text" style="width: 180px;" readonly v-model="school.departmentName">
              <input v-if="school.graduateStatus" class="input-box" style="width: 112px;" id="graduateSelect" readonly v-model="school.graduateStatus">
              <input v-if="school.gpa" class="input-box" type="text" style="width: 74px; text-align: center;" readonly v-model="school.gpa">
              <span v-if="school.gpaMax">/</span>
              <input v-if="school.gpaMax" class="input-box" type="text" style="width: 74px; text-align: center;" readonly v-model="school.gpaMax">
            </td>
          </tr>
        </table>
      </div>
      <div v-if="store.state.certificate" class="block">
        <table class="default-table" style="width: 100%">
          <tr>
            <td class="title-small" colspan="3">자격증</td>
          </tr>
          <tr v-for="(certificate, index) in certificates" :key="index">
            <td>
              <span>-</span>
              <input v-if="certificate.month" class="input-box" type="text" style="width: 126px; margin-top: 5px; text-align: right;" readonly v-model="certificate.month">
              <input v-if="certificate.name" class="input-box" type="text" style="width: 180px;" readonly v-model="certificate.name">
            </td>
          </tr>
        </table>
      </div>
      <div v-if="store.state.education" class="block">
        <table class="default-table" style="width: 100%">
          <tr>
            <td class="title-small" colspan="10">교육</td>
          </tr>
          <tr v-for="(education, index) in educations" :key="index">
            <td>
              <span>-</span>
              <input v-if="education.startMonth" class="input-box" type="text" style="width: 126px; margin-top: 5px; text-align: right;" readonly v-model="education.startMonth">
              <span v-if="education.endMonth">~</span>
              <input v-if="education.endMonth" class="input-box" type="text" style="width: 126px; text-align: left;" readonly v-model="education.endMonth">
              <input v-if="education.name" class="input-box" type="text" style="width: 180px;" readonly v-model="education.name">
              <input v-if="education.supervisionName" class="input-box" type="text" style="width: 180px;" readonly v-model="education.supervisionName">
            </td>
          </tr>
        </table>
      </div>
      <div v-if="store.state.award" class="block">
        <table class="default-table" style="width: 100%">
          <tr>
            <td class="title-small" colspan="10">수상</td>
          </tr>
          <tr v-for="(award, index) in awards" :key="index">
            <td>
              <span>-</span>
              <input v-if="award.month" class="input-box" type="text" style="width: 126px; margin-top: 5px; text-align: right;" readonly v-model="award.month">
              <input v-if="award.name" class="input-box" type="text" style="width: 180px;" readonly v-model="award.name">
              <input v-if="award.supervisionName" class="input-box" type="text" style="width: 180px;" readonly v-model="award.supervisionName">
            </td>
          </tr>
        </table>
      </div>
      <div v-if="store.state.career" class="block">
        <table class="default-table" style="width: 100%">
          <tr>
            <td class="title-small" colspan="10">경력</td>
          </tr>
          <tr v-for="(career, index) in careers" :key="index">
            <td>
              <span>-</span>
              <input v-if="career.startMonth" class="input-box" type="text" style="width: 126px; margin-top: 5px; text-align: right;" readonly v-model="career.startMonth">
              <span v-if="career.endMonth">~</span>
              <input v-if="career.endMonth" class="input-box" type="text" style="width: 126px; text-align: left;" readonly v-model="career.endMonth">
              <input v-if="career.duty" class="input-box" type="text" style="width: 180px;" readonly v-model="career.duty">
              <input v-if="career.companyName" class="input-box" type="text" style="width: 180px;" readonly v-model="career.companyName">
            </td>
          </tr>
        </table>
      </div>
      <div v-if="store.state.activity" class="block">
        <table class="default-table" style="width: 100%">
          <tr>
            <td class="title-small" colspan="10">활동경험</td>
          </tr>
          <tr v-for="(activity, index) in activities" :key="index">
            <td>
              <span>-</span>
              <input v-if="activity.startMonth" class="input-box" type="text" style="width: 126px; margin-top: 5px; text-align: right;" readonly v-model="activity.startMonth">
              <span v-if="activity.endMonth">~</span>
              <input v-if="activity.endMonth" class="input-box" type="text" style="width: 126px; text-align: left;" readonly v-model="activity.endMonth">
              <input v-if="activity.content" class="input-box" type="text" style="width: 180px;" readonly v-model="activity.content">
            </td>
          </tr>
        </table>
      </div>
      <div v-if="store.state.languages || store.state.frameworkLibrary || store.state.server || store.state.toolDevops || store.state.environment || store.state.etc" class="block" id="page2el">
        <table class="default-table" style="width: 100%">
          <tr>
            <td class="title-small" colspan="10">기술스택</td>
          </tr>
          <tr v-if="store.state.languages">
            <td style="width: 30%; text-align: left;">Programin Languages</td>
            <td style="width: 70%; text-align: right;"><input class="input-box" style="width: 100%" type="text" v-model="store.state.languages" readonly></td>
          </tr>
          <tr v-if="store.state.frameworkLibrary">
            <td style="width: 30%; text-align: left;">Framework / Library</td>
            <td style="width: 70%; text-align: right;"><input class="input-box" style="width: 100%" type="text" v-model="store.state.frameworkLibrary" readonly></td>
          </tr>
          <tr v-if="store.state.server">
            <td style="width: 30%; text-align: left;">Server</td>
            <td style="width: 70%; text-align: right;"><input class="input-box" style="width: 100%" type="text" v-model="store.state.server" readonly></td>
          </tr>
          <tr v-if="store.state.toolDevops">
            <td style="width: 30%; text-align: left;">Tool / Devops</td>
            <td style="width: 70%; text-align: right;"><textarea class="input-box" type="text" style="width: 100%; height: auto; padding: 10px; text-align: left;" v-model="store.state.toolDevops" readonly></textarea></td>
          </tr>
          <tr v-if="store.state.environment">
            <td style="width: 30%; text-align: left;">Environment</td>
            <td style="width: 70%; text-align: right;"><input class="input-box" style="width: 100%" type="text" v-model="store.state.environment" readonly></td>
          </tr>
          <tr v-if="store.state.etc">
            <td style="width: 30%; text-align: left;">ETC</td>
            <td style="width: 70%; text-align: right;"><input class="input-box" style="width: 100%" type="text" v-model="store.state.etc" readonly></td>
          </tr>
        </table>
      </div>
      <div v-if="store.state.growthData" class="block">
        <div class="title-small">성장과정</div>
        <div>
          <textarea class="input-box" style="margin-top: 5px; width: 100%; height: 500px" type="text" v-model="store.state.growthData" readonly></textarea>
        </div>
      </div>
      <div v-if="store.state.reasonData" class="block">
        <div class="title-small">지원동기</div>
        <div>
          <textarea class="input-box" style="margin-top: 5px; width: 100%; height: 500px" type="text" v-model="store.state.reasonData" readonly></textarea>
        </div>
      </div>
      <div v-if="store.state.meritFaultData" class="block">
        <div class="title-small">성격의 장단점</div>
        <div>
          <textarea class="input-box" style="margin-top: 5px; width: 100%; height: 500px" type="text" v-model="store.state.meritFaultData" readonly></textarea>
        </div>
      </div>
      <div v-if="store.state.aspirationData" class="block">
        <div class="title-small">입사 후 포부</div>
        <div>
          <textarea class="input-box" style="margin-top: 5px; margin-bottom: 50px; width: 100%; height: 500px" type="text" v-model="store.state.aspirationData" readonly></textarea>
        </div>
      </div>
      <div>
        <button class="btn-long" type="button" style="margin-top: 5px; margin-bottom: 50px; float: right;" @click="makePDF" id="btn-save">저장</button>
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
    text-align: left;
    margin-left: 5px;
    border: none;
    color: black;
  }
</style>