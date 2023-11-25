<template>
  <header>
    <nav id="nav2">
      <a href="#">logo</a>
      <ul>
        <li><a href="#">새 스토리 만들기</a></li>
        <li><a href="#">로그아웃</a></li>
        <li><a href="#">회원탈퇴</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'NaviBarComponent'
}
</script>

<style>
  #nav2>a {
    display: block; /* a태그는 글자성격 = inline */
    float: left;
    font-size: 30px;
    font-weight: 900;
    line-height: 80px;
    padding: 0 30px;
  }
  #nav2>ul {
    float: right;
  }
  #nav2>ul li {
    float: left;
    padding: 0 30px;
    line-height: 80px;
  }
</style>