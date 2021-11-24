# JAVIC(2021)

<img alt="PyPI - License" src="https://img.shields.io/pypi/l/chatterbot">

[2019-2020에 진행한 산학 협력 캡스톤 디자인 프로젝트](https://github.com/goldmayo/CapstoneProject-JAVIC)에서 Front-end를 React로 Back-end를 리팩토링한 프로젝트입니다.

### 개발 목적

그룹웨어의 사내 문서 작성에 익숙하지 않은 신입 사원은 복잡한 절차와 인터페이스 때문에 휴가신청서와 같이 비교적 간단한 형식에 일부 내용만 변경하는 사내 문서 작성에 불편함을 느꼈습니다.

챗봇의 단순한 인터페이스를 통해 외근 중에 혹은 자택에서도 간단히 사내 문서를 작성하여 신입 사원의 불편을 해소하는 것을 목표로 하였습니다.

---

### Project Architecture

Flux Pattern
// 추가예정

---

### Tech Stack

- Develope environment :
  - OS : Ubuntu18.04
  - Front-end : CRA
  - Back-end : Python3, virtualenv
- Client :
  - Typescript
  - React
  - Context API
  - CSS module
- Chatbot :
  - Chatterbot (Chatbot Engine)
  - KoNLPy
  - Flask

---

### Main Function

// 추가예정

---

### Run Project

Dependency install

```{shell}
cd server
pip3 install -r requirements.txt
```

```{shell}
cd client
npm install
```

JAVIC_2021 디렉토리

```{shell}
./server.sh
./client.sh
// 각각 다른 터미널에서 실행하는 것을 권장합니다.
```

---

### 변경점

- React와 Context API를 사용하여 기존 Jquery로 개발된 Front-end 로직을 component화 하여 재사용 가능한 Flux 아키텍처로 리팩토링하였습니다.
- 다크모드를 추가하였습니다.
- 회사에서 발급된 vpn ID의 기간 만료로 인해 서비스 실행불가
- 메일관련 기능과 그룹웨어 연동 기능은 현재 프로젝트 기능에서 제외하였습니다.
