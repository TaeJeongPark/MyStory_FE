<script>
  import $ from 'jquery';
  import HeaderComponent from '@/components/NaviBarComponent.vue';
  import store from "@/vuex/store";

  export default {
    name: 'StoryComponent',
    data : function(){
      return {
        storyData: [],
        imgUrl: null,
        imgBlob: null,
        schools: [{startMonth: '', endMonth: '', schoolName: '', departmentName: '', graduateStatus: '졸업예정', gpa: '', gpaMax: '',}],
        certificates: [{month: '', name: ''}],
        educations: [{startMonth: '', endMonth: '', name: '', supervisionName: ''}],
        awards: [{month: '', name: '', supervisionName: ''}],
        careers: [{startMonth: '', endMonth: '', duty: '', companyName: ''}],
        activities: [{startMonth: '', endMonth: '', content: ''}],
        emailSelect: 'gmail.com',
      };
    },
    components: {
      HeaderComponent
    },
    methods: {
      emailSelectChange() {
        this.emailSelect = $('#emailSelect').val();
      },
      handleFileUpload(event) {
        const file = event.target.files[0];

        if (file) {
          // 파일을 읽기 위한 FileReader 객체 생성
          const reader = new FileReader();

          // 파일 읽기가 완료되면 호출되는 콜백 함수
          reader.onload = () => {
            // 읽어온 이미지 데이터를 imageUrl에 할당하여 이미지 표시
            this.imgUrl = reader.result;

            // 이미지를 Blob으로 변환
            const imgBlob = new Blob([file], {type: file.type});
            this.imgBlob = imgBlob;

            // 이미지의 바이트 데이터 가져오기
            const arrayBuffer = reader.result.split(',')[1]; // base64 부분 추출
            const bytes = atob(arrayBuffer);
            const byteNumbers = new Array(bytes.length);
            for (let i = 0; i < bytes.length; i++) {
              byteNumbers[i] = bytes.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            store.commit('setImgByte', byteArray);
            store.commit('setImgType', file.type);
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
        if (this.educations[this.educations.length - 1].name === '') {
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
        console.log(store.getters.getUserId);

        // 이메일 직접 입력 여부 판별
        let email = '';
        if($('#email').val().length >= 1) {
          if($('#emailSelect').val() === 'direct') {
            email = $('#email').val() + '@' + $('#emailSelectDirect').val();
          } else {
            email = $('#email').val() + '@' + $('#emailSelect').val();
          }
        }

        // 전화번호 입력 여부 판별
        let phone = '';
        if($('#phone1').val().length === 3) {
          phone = $('#phone1').val() + '-' + $('#phone2').val() + '-' + $('#phone3').val();
        }

        // 데이터 저장
        this.storyData.push(
            {
              imgUrl : this.imgUrl,
              imgBlob : this.imgBlob,
              desireJob : $('#desireJob').val(),
              name : $('#name').val(),
              birthday : $('#birthday').val(),
              email : email,
              phone : phone,
              address : $('#address').val(),
              militaryService : $('#military').val(),
              introduction : $('#introduction').val(),
              school : this.schools,
              certificate : this.certificates,
              education : this.educations,
              award : this.awards,
              career : this.careers,
              activity : this.activities,
              languages : $('#languages').val(),
              frameworkLibrary : $('#frameworkLibrary').val(),
              server : $('#server').val(),
              toolDevops : $('#toolDevops').val(),
              environment : $('#environment').val(),
              etc : $('#etc').val(),
            }
        );

        // store에 저장
        store.commit('setImgUrl', this.imgUrl);
        store.commit('setImgBlob', this.imgBlob);
        store.commit('setDesireJob', $('#desireJob').val());
        store.commit('setName', $('#name').val());
        store.commit('setBirthday', $('#birthday').val());
        store.commit('setEmail', email);
        store.commit('setPhone', phone);
        store.commit('setAddress', $('#address').val());
        store.commit('setMilitary', $('#military').val());
        store.commit('setIntroduction', $('#introduction').val());
        store.commit('setSchool', this.schools);
        store.commit('setCertificate', this.certificates);
        store.commit('setEducation', this.educations);
        store.commit('setAward', this.awards);
        store.commit('setCareer', this.careers);
        store.commit('setActivity', this.activities);
        store.commit('setLanguages', $('#languages').val());
        store.commit('setFrameworkLibrary', $('#frameworkLibrary').val());
        store.commit('setServer', $('#server').val());
        store.commit('setToolDevops', $('#toolDevops').val());
        store.commit('setEnvironment', $('#environment').val());
        store.commit('setEtc', $('#etc').val());

        // 성장 과정 페이지로 이동
        this.$router.push('/introduction');
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
        <img class="img" v-if="imgUrl" :src="imgUrl" alt="사진" id="img">
        <img v-else src="../../public/story/img_image.svg" alt="사진" id="default-img">
        <label for="file">
          <div class="btn-small" style="margin-left: 30px; cursor: pointer; display: flex; align-items: center; justify-content: center;">업로드</div>
        </label>
        <input type="file" name="file" id="file" accept=".png, .jpg, .jpeg, .gif" style="margin-left: 30px; display: none" ref="fileInput" @change="handleFileUpload">
      </div>
      <div class="block">
        <div class="title-small">희망직무</div>
        <input class="input-box" type="text" style="width: 300px; text-align: center;" placeholder="희망직무" id="desireJob">
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
        <select class="input-box" style="width: 157px;" @change="emailSelectChange" id="emailSelect">
          <option value="gmail.com">gmail.com</option>
          <option value="naver.com">naver.com</option>
          <option value="daum.net">daum.net</option>
          <option value="hanmail.com">hanmail.com</option>
          <option value="nate.com">nate.com</option>
          <option value="kakao.com">kakao.com</option>
          <option value="msn.com">msn.com</option>
          <option value="direct">직접입력</option>
        </select>
        <input v-if="this.emailSelect === 'direct'" class="input-box" type="text" style="width: 130px; margin-left: 10px; text-align: center;" placeholder="직접입력" id="emailSelectDirect">
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
        <select class="input-box" style="width: 157px;" id="military">
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
            <input class="input-box" type="month" style="width: 126px; margin-top: 5px" v-model="certificate.month">
            <input class="input-box" type="text" style="width: 180px;" placeholder="자격증명을 입력해 주세요" v-model="certificate.name">
          </tr>
        </table>
        <button class="btn-small center" type="button" style="margin-top: 10px" @click="addCertificateRow()">추가</button>
      </div>
      <div class="block">
        <div class="title-small">교육</div>
        <table id="educationTable">
          <tr v-for="(education, index) in educations" :key="index">
            <input class="input-box" type="month" style="width: 126px; margin-top: 5px" v-model="education.startMonth">
            <span>~</span>
            <input class="input-box" type="month" style="width: 126px;" v-model="education.endMonth">
            <input class="input-box" type="text" style="width: 180px;" placeholder="교육명을 입력해 주세요" v-model="education.name">
            <input class="input-box" type="text" style="width: 180px;" placeholder="기관명을 입력해 주세요" v-model="education.supervisionName">
          </tr>
        </table>
        <button class="btn-small center" type="button" style="margin-top: 10px" @click="addEducationRow()">추가</button>
      </div>
      <div class="block">
        <div class="title-small">수상</div>
        <table id="awardTable">
          <tr v-for="(award, index) in awards" :key="index">
            <input class="input-box" type="month" style="width: 126px; margin-top: 5px" v-model="award.month">
            <input class="input-box" type="text" style="width: 180px;" placeholder="수상명을 입력해 주세요" v-model="award.name">
            <input class="input-box" type="text" style="width: 180px;" placeholder="기관명을 입력해 주세요" v-model="award.supervisionName">
          </tr>
        </table>
        <button class="btn-small center" type="button" style="margin-top: 10px; margin-top: 5px" @click="addAwardsRow()">추가</button>
      </div>
      <div class="block">
        <div class="title-small">경력</div>
        <table id="careerTable">
          <tr v-for="(career, index) in careers" :key="index">
            <input class="input-box" type="month" style="width: 126px; margin-top: 5px" v-model="career.startMonth">
            <span>~</span>
            <input class="input-box" type="month" style="width: 126px;" v-model="career.endMonth">
            <input class="input-box" type="text" style="width: 180px;" placeholder="직무를 입력해 주세요" v-model="career.duty">
            <input class="input-box" type="text" style="width: 180px;" placeholder="회사명을 입력해 주세요" v-model="career.companyName">
          </tr>
        </table>
        <button class="btn-small center" type="button" style="margin-top: 10px" @click="addCareerRow()">추가</button>
      </div>
      <div class="block">
        <div class="title-small">활동경험</div>
        <table id="activityTable">
          <tr v-for="(activity, index) in activities" :key="index">
            <input class="input-box" type="month" style="width: 126px; margin-top: 5px" v-model="activity.startMonth">
            <span>~</span>
            <input class="input-box" type="month" style="width: 126px;" v-model="activity.endMonth">
            <input class="input-box" type="text" style="width: 400px;" placeholder="활동 내용을 입력해 주세요" v-model="activity.content">
          </tr>
        </table>
        <button class="btn-small center" type="button" style="margin-top: 10px" @click="addActivityRow()">추가</button>
      </div>
      <div class="block">
        <div class="title-small">기술스택</div>
        <table style="width: 100%">
          <tr>
            <td style="width: 200px"><span>Programin Languages</span></td>
            <td><input class="input-box" type="text" style="width: 100%; margin-bottom: 5px;" placeholder="사용 경험이 있는 프로그래밍 언어를 입력해 주세요" id="languages"></td>
          </tr>
          <tr>
            <td style="width: 200px"><span>Framework / Library</span></td>
            <td><input class="input-box" type="text" style="width: 100%; margin-bottom: 5px;" placeholder="사용 경험이 있는 프레임워크와 라이브러리를 입력해 주세요" id="frameworkLibrary"></td>
          </tr>
          <tr>
            <td style="width: 200px"><span>Server</span></td>
            <td><input class="input-box" type="text" style="width: 100%; margin-bottom: 5px;" placeholder="사용 경험이 있는 서버를 입력해 주세요" id="server"></td>
          </tr>
          <tr>
            <td style="width: 200px"><span>Tooling / DevOps</span></td>
            <td><textarea class="input-box" type="text" style="width: 100%; height: 90px; padding: 10px; text-align: start; margin-bottom: 5px;" placeholder="사용 경험이 있는 툴과 데브옵스를 입력해 주세요" id="toolDevops"></textarea></td>
          </tr>
          <tr>
            <td style="width: 200px"><span>Environment</span></td>
            <td><input class="input-box" type="text" style="width: 100%; margin-bottom: 5px;" placeholder="개발시 사용해본 운영체제를 입력해 주세요" id="environment"></td>
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