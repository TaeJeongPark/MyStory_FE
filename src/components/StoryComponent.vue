<script>
import $ from 'jquery';
import HeaderComponent from '@/components/NaviBarComponent.vue';
import store from "@/vuex/store";

export default {
  name: 'StoryComponent',
  data : function(){
    return {
      storyData: [],
      imageUrl: null,
      schools: [{startMonth: '', endMonth: '', schoolName: '', departmentName: '', graduateStatus: '졸업예정', gpa: '', gpaMax: '',}],
      certificates: [{month: '', name: ''}],
      educations: [{startMonth: '', endMonth: '', educationName: '', supervisionName: ''}],
      awards: [{month: '', name: '', supervisionName: ''}],
      careers: [{startMonth: '', endMonth: '', duty: '', companyName: ''}],
      activities: [{startMonth: '', endMonth: '', content: ''}],
    };
  },
  components: {
    HeaderComponent
  },
  methods: {
    emailDirectSelect() {
      $('#emailSelect').change(function () {
        if ($(this).val() === 'direct') {
          $('#selectDirect').css('display', 'inline-block');
        } else {
          $('#selectDirect').css('display', 'none');
        }
      });
    },
    handleFileUpload(event) {
      const file = event.target.files[0];

      if (file) {
        // 파일을 읽기 위한 FileReader 객체 생성
        const reader = new FileReader();

        // 파일 읽기가 완료되면 호출되는 콜백 함수
        reader.onload = () => {
          // 읽어온 이미지 데이터를 imageUrl에 할당하여 이미지 표시
          this.imageUrl = reader.result;
        };

        // 파일을 읽어오기
        reader.readAsDataURL(file);
      }
    },
    addSchoolRow() {
      // 이전 항목이 입력 되지 않은 경우 경고창 출력
      if (this.schools[this.schools.length - 1].schoolName === '') {
        alert('이전 학력을 입력한 후 추가를 눌러 주세요');
        return;
      }

      // 학력 추가
      this.schools.push({
        startMonth: '',
        endMonth: '',
        schoolName: '',
        departmentName: '',
        graduateStatus: '졸업예정',
        gpa: '',
        gpaMax: '',
      });

      console.log(this.schools);
    },
    addCertificateRow() {
      // 이전 자격증이 입력 되지 않은 경우 경고창 출력
      if (this.certificates[this.certificates.length - 1].name === '') {
        alert('이전 자격증을 입력한 후 추가를 눌러 주세요');
        return;
      }

      // 자격증 추가
      this.certificates.push({
        month: '',
        name: '',
      });

      console.log(this.certificates);
    },
    addEducationRow() {
      // 이전 교육이 입력 되지 않은 경우 경고창 출력
      if (this.educations[this.educations.length - 1].educationName === '') {
        alert('이전 교육을 입력한 후 추가를 눌러 주세요');
        return;
      }

      // 교육 추가
      this.educations.push({
        startMonth: '',
        endMonth: '',
        educationName: '',
        supervisionName: '',
      });

      console.log(this.educations);
    },
    addAwardsRow() {
      // 이전 수상이 입력 되지 않은 경우 경고창 출력
      if (this.awards[this.awards.length - 1].name === '') {
        alert('이전 수상을 입력한 후 추가를 눌러 주세요');
        return;
      }

      // 수상 추가
      this.awards.push({
        month: '',
        name: '',
        supervisionName: '',
      });

      console.log(this.awards);
    },
    addCareerRow() {
      // 이전 경력이 입력 되지 않은 경우 경고창 출력
      if (this.careers[this.careers.length - 1].companyName === '') {
        alert('이전 경력을 입력한 후 추가를 눌러 주세요');
        return;
      }

      // 경력 추가
      this.careers.push({
        startMonth: '',
        endMonth: '',
        duty: '',
        companyName: '',
      });

      console.log(this.careers);
    },
    addActivityRow() {
      // 이전 활동이 입력 되지 않은 경우 경고창 출력
      if (this.activities[this.activities.length - 1].content === '') {
        alert('이전 활동을 입력한 후 추가를 눌러 주세요');
        return;
      }

      // 활동 추가
      this.activities.push({
        startMonth: '',
        endMonth: '',
        content: '',
      });

      console.log(this.activities);
    },
    next() {

      // 이메일 직접 입력 여부 판별
      let email = '';
      if ($('#emailSelect').val() == 'direct') {
        email = $('#email').val() + '@' + $('#emailSelectDirect').val();
      } else {
        email = $('#email').val() + '@' + $('#emailSelect').val();
      }
      
      // 학교 배열 유효 데이터 가공
      for (let i = 0; i < this.schools.length; i++) {
        if (this.schools[i].schoolName === '') {
          this.schools[i].splice(i, 1);
        }
      }

      // 자격증 배열 유효 데이터 가공
      for (let i = 0; i < this.certificates.length; i++) {
        if (this.certificates[i].name === '') {
          this.certificates[i].splice(i, 1);
        }
      }

      // 교육 배열 유효 데이터 가공
      for (let i = 0; i < this.educations.length; i++) {
        if (this.educations[i].educationName === '') {
          this.educations[i].splice(i, 1);
        }
      }

      // 수상 배열 유효 데이터 가공
      for (let i = 0; i < this.awards.length; i++) {
        if (this.awards[i].name === '') {
          this.awards[i].splice(i, 1);
        }
      }

      // 경력 배열 유효 데이터 가공
      for (let i = 0; i < this.careers.length; i++) {
        if (this.careers[i].companyName === '') {
          this.careers[i].splice(i, 1);
        }
      }

      // 활동 배열 유효 데이터 가공
      for (let i = 0; i < this.activities.length; i++) {
        if (this.activities[i].content === '') {
          this.activities[i].splice(i, 1);
        }
      }

      // 데이터 저장
      this.storyData.push(
          {
            imageUrl : this.imageUrl,
            desireJob : $('#desire-job').val(),
            name : $('#name').val(),
            birthday : $('#birthday').val(),
            email : email,
            phone : $('#phone1').val() + '-' + $('#phone2').val() + '-' + $('#phone3').val(),
            address : $('#address').val(),
            militaryService : $('#military-service').val(),
            introduction : $('#introduction').val(),
            school : this.schools,
            certificate : this.certificates,
            education : this.educations,
            awarded : this.awards,
            career : this.careers,
            activity : this.activities,
            languages : $('#languages').val(),
            frameworkLibrary : $('#framework-library').val(),
            server : $('#server').val(),
            toolDevops : $('#tool-devops').val(),
            environment : $('#environment').val(),
            etc : $('#etc').val(),
          }
      );
      store.commit('setStoryPageData', this.storyData); // 데이터 저장
      this.$router.push('/growth'); // 성장 과정 페이지로 이동
    }
  }
}
</script>

<template>
  <body>
  <div id="header">
    <HeaderComponent/>
  </div>
  <div>
    <h1 class="center title">당신에 대해서 알려주세요</h1>
  </div>
  <div class="center">
    <form>
      <div class="block">
        <div class="title-small">사진</div>
        <img class="img" v-if="imageUrl" :src="imageUrl" alt="사진" id="img">
        <img v-else src="../../public/story/img_image.svg" alt="사진" id="default-img">
        <label for="file">
          <div class="btn-small" style="margin-left: 30px; cursor: pointer; display: flex; align-items: center; justify-content: center;">업로드</div>
        </label>
        <input type="file" name="file" id="file" accept=".png, .jpg, .jpeg, .gif" style="margin-left: 30px; display: none" ref="fileInput" @change="handleFileUpload">
      </div>
      <div class="block">
        <div class="title-small">희망직무</div>
        <input class="input-box" type="text" style="width: 300px; text-align: center;" placeholder="희망직무" id="desire-job">
      </div>
      <div class="block">
        <div class="title-small">이름</div>
        <input class="input-box" type="text" style="width: 130px; text-align: center;" placeholder="이름" id="name">
      </div>
      <div class="block">
        <div class="title-small">생년월일</div>
        <input class="input-box" type="text" style="width: 130px; text-align: center;" placeholder="생년월일" id="birthday">
      </div>
      <div class="block">
        <div class="title-small">이메일 주소</div>
        <input class="input-box" type="text" style="width: 130px; text-align: center;" placeholder="이메일 주소" id="email">
        <span>@</span>
        <select class="input-box" style="width: 157px;" @change="emailDirectSelect" id="emailSelect">
          <option value="gmail.com">gmail.com</option>
          <option value="naver.com">naver.com</option>
          <option value="daum.net">daum.net</option>
          <option value="hanmail.com">hanmail.com</option>
          <option value="nate.com">nate.com</option>
          <option value="kakao.com">kakao.com</option>
          <option value="msn.com">msn.com</option>
          <option value="direct">직접입력</option>
        </select>
        <input class="input-box" type="text" style="width: 130px; margin-left: 10px; display:none; text-align: center;" placeholder="직접입력" id="emailSelectDirect">
      </div>
      <div class="block">
        <div class="title-small">핸드폰 번호</div>
        <input class="input-box" type="text" style="width: 70px; text-align: center;" placeholder="010" maxlength="3" id="phone1">
        <span>-</span>
        <input class="input-box" type="text" style="width: 70px; text-align: center;" placeholder="1234" maxlength="4" id="phone2">
        <span>-</span>
        <input class="input-box" type="text" style="width: 70px; text-align: center;" placeholder="5678" maxlength="4" id="phone3">
      </div>
      <div class="block">
        <div class="title-small">주소</div>
        <input class="input-box" type="text" style="width: 400px;" placeholder="주소" id="address">
      </div>
      <div class="block">
        <div class="title-small">병역</div>
        <select class="input-box" style="width: 157px;" id="military-service">
          <option value="복무예정">복무예정</option>
          <option value="의병전역">의병전역</option>
          <option value="의가사전역">의가사전역</option>
          <option value="만기전역">만기전역</option>
          <option value="미해당">미해당</option>
        </select>
      </div>
      <div class="block">
        <div class="title-small">나의 한 줄 소개</div>
        <textarea class="input-box" type="text" style="width: 100%; height: 90px; padding: 10px; text-align: start;" placeholder="한 줄 소개를 입력해 주세요" id="introduction"></textarea>
      </div>
      <div class="block">
        <div class="title-small">학력</div>
        <table id="schoolTable">
          <tr v-for="(school, index) in schools" :key="index">
            <td>
              <input class="input-box" type="month" style="width: 126px; margin-top: 5px" v-model="school.startMonth">
              <span>~</span>
              <input class="input-box" type="month" style="width: 126px;" v-model="school.endMonth">
              <input class="input-box" type="text" style="width: 180px;" placeholder="학교명을 입력해 주세요" v-model="school.schoolName">
              <input class="input-box" type="text" style="width: 180px;" placeholder="학과명을 입력해 주세요" v-model="school.departmentName">
              <select class="input-box" style="width: 112px;" id="graduateSelect" v-model="school.graduateStatus">
                <option value="졸업예정">졸업예정</option>
                <option value="졸업">졸업</option>
              </select>
              <input class="input-box" type="text" style="width: 74px; text-align: center;" placeholder="0.00" v-model="school.gpa">
              <span>/</span>
              <input class="input-box" type="text" style="width: 74px; text-align: center;" placeholder="0.00" v-model="school.gpaMax">
            </td>
          </tr>
        </table>
        <button class="btn-small center" type="button" style="margin-top: 10px" @click="addSchoolRow">추가</button>
      </div>
      <div class="block">
        <div class="title-small">자격증</div>
        <table id="certificateTable">
          <tr v-for="(certificate, index) in certificates" :key="index">
            <input class="input-box" type="month" style="width: 126px;" v-model="certificate.month">
            <input class="input-box" type="text" style="width: 180px;" placeholder="자격증명을 입력해 주세요" v-model="certificate.name">
          </tr>
        </table>
        <button class="btn-small center" type="button" style="margin-top: 10px" @click="addCertificateRow()">추가</button>
      </div>
      <div class="block">
        <div class="title-small">교육</div>
        <table id="educationTable">
          <tr>
            <input class="input-box" type="month" style="width: 126px;" v-model="education">
            <span>~</span>
            <input class="input-box" type="month" style="width: 126px;">
            <input class="input-box" type="text" style="width: 180px;" placeholder="교육명을 입력해 주세요" id="education-name1">
            <input class="input-box" type="text" style="width: 180px;" placeholder="기관명을 입력해 주세요" id="education-supervision_name1">
          </tr>
        </table>
        <button class="btn-small center" type="button" style="margin-top: 10px" @click="addEducationRow()">추가</button>
      </div>
      <div class="block">
        <div class="title-small">수상</div>
        <table>
          <tbody id="awarded-table">
          <tr>
            <input class="input-box" type="month" style="width: 126px;" id="awarded-month1">
            <input class="input-box" type="text" style="width: 180px;" placeholder="수상명을 입력해 주세요" id="awarded-name1">
            <input class="input-box" type="text" style="width: 180px;" placeholder="기관명을 입력해 주세요" id="awarded-supervision_name1">
          </tr>
          </tbody>
        </table>
        <button class="btn-small center" type="button" style="margin-top: 10px" @click="addAwardsRow()">추가</button>
      </div>
      <div class="block">
        <div class="title-small">경력</div>
        <table>
          <tbody id="career-table">
          <tr>
            <input class="input-box" type="month" style="width: 126px;" id="career-start-month1">
            <span>~</span>
            <input class="input-box" type="month" style="width: 126px;" id="career-end-month1">
            <input class="input-box" type="text" style="width: 180px;" placeholder="직무를 입력해 주세요" id="career-duty1">
            <input class="input-box" type="text" style="width: 180px;" placeholder="회사명을 입력해 주세요" id="career-company-name1">
          </tr>
          </tbody>
        </table>
        <button class="btn-small center" type="button" style="margin-top: 10px" @click="addCareerRow()">추가</button>
      </div>
      <div class="block">
        <div class="title-small">활동경험</div>
        <table>
          <tbody id="activity-table">
          <tr>
            <input class="input-box" type="month" style="width: 126px;" id="activity-start-month1">
            <span>~</span>
            <input class="input-box" type="month" style="width: 126px;" id="activity-end-month1">
            <input class="input-box" type="text" style="width: 400px;" placeholder="활동 내용을 입력해 주세요" id="activity-content">
          </tr>
          </tbody>
        </table>
        <button class="btn-small center" type="button" style="margin-top: 10px" @click="addActivityRow()">추가</button>
      </div>
      <div class="block">
        <div class="title-small">기술스택</div>
        <table style="width: 100%">
          <tr>
            <td style="width: 200px"><span>Programin Languages</span></td>
            <td><input class="input-box" type="text" style="width: 100%; margin-bottom: 5px;" placeholder="사용 경험이 있는 프로그래밍 언어를 입력해 주세요" id="lamguages"></td>
          </tr>
          <tr>
            <td style="width: 200px"><span>Framework / Library</span></td>
            <td><input class="input-box" type="text" style="width: 100%; margin-bottom: 5px;" placeholder="사용 경험이 있는 프레임워크와 라이브러리를 입력해 주세요" id="framework-library"></td>
          </tr>
          <tr>
            <td style="width: 200px"><span>Server</span></td>
            <td><input class="input-box" type="text" style="width: 100%; margin-bottom: 5px;" placeholder="사용 경험이 있는 서버를 입력해 주세요" id="server"></td>
          </tr>
          <tr>
            <td style="width: 200px"><span>Tooling / DevOps</span></td>
            <td><textarea class="input-box" type="text" style="width: 100%; height: 90px; padding: 10px; text-align: start; margin-bottom: 5px;" placeholder="사용 경험이 있는 툴과 데브옵스를 입력해 주세요" id="tool-devops"></textarea></td>
          </tr>
          <tr>
            <td style="width: 200px"><span>Environment</span></td>
            <td><input class="input-box" type="text" style="width: 100%; margin-bottom: 5px;" placeholder="개발시 사용해본 운영체제를 입력해 주세요" id="dnvironment"></td>
          </tr>
          <tr>
            <td style="width: 200px"><span>ETC</span></td>
            <td><input class="input-box" type="text" style="width: 100%;" placeholder="그 외에 어필하고 싶은 내용을 입력해 주세요" id="etc"></td>
          </tr>
        </table>
      </div>
      <div>
        <button class="btn-small right" type="button" style="margin-bottom: 100px" @click="next">다음</button>
      </div>
    </form>
  </div>
  </body>
</template>

<style>
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

.right {
  display: block;
  margin-left: auto;
  margin-right: 0;
  width: 100%;
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

.title-small {
  color: #FFF;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 10px;
}

.input-box {
  width: 319px;
  height: 45px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #FFF;
  text-align: center;
  border: none;
  margin-left: 5px;
}

.input-box[type="text"] {
  text-align: left;
  padding: 0px 10px;
}

.block {
  margin-bottom: 50px;
}

span {
  color: #FFF;
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 5px;
}

.img {
  width: 118px;
  height: 158px;
  border-radius: 10px;
}
</style>