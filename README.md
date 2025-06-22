# DrawMind Project
## 프로젝트 주제
본 프로젝트는 기존 게시판 기능에 더불어 글 위에 그림을 작성하고 편집하여 다른 사람과 공유할 수 있는 새로운 개념의 게시판 기능이 탑재된 하이브리드 웹 애플리케이션입니다.

### 무엇을 구현했나요?
드로우마인드 프로젝트에서는 팀원 간의 협의를 통해 API와 화면을 설계하고, 요구사항을 정리한 뒤 문서로 만들어 그것을 기반으로 각자 서버와 클라이언트를 개발했습니다.

- [CKEditor 5](https://ckeditor.com/)를 활용한 [HTML 텍스트 에디터 화면](https://github.com/Hoto-Mocha/TeamProject-DrawMind/blob/main/drawmind-client/src/pages/write/Write.jsx)
- HTML 텍스트 에디터에서 작성한 글을 미리보기하고 그 위에서 바로 그림 작업이 가능한 [그림 에디터 화면](https://github.com/Hoto-Mocha/TeamProject-DrawMind/tree/main/drawmind-client/src/pages/draw)
- 그림 에디터에서 본 그대로 출력되는 게시글 화면
- 텍스트와 그림 모두 수정 가능한 게시글 수정 화면
- 그 외 회원 가입 화면, 로그인 화면, 게시글 목록 조회 화면 등
- 클라이언트와 서버 간 통신을 가능하게 하는 axios 기반의 [API](https://github.com/Hoto-Mocha/TeamProject-DrawMind/blob/main/drawmind-client/src/API.jsx)
- 게시글 내용과 회원 정보를 담는 관계형 데이터베이스

### [시연 사진 및 영상](https://github.com/Hoto-Mocha/TeamProject-DrawMind/wiki/%EC%8B%9C%EC%97%B0-%EC%82%AC%EC%A7%84-%EB%B0%8F-%EC%98%81%EC%83%81)

### 무엇을 배웠나요?
- 문태민

    > 먼저 웹 개발 팀 프로젝트가 진행되는 방식에 대해서 직접 경험하며 배울 수 있었습니다.
    > 
    > 팀원과 필요한 기능에 대해 이야기하고, 그 기능을 구현하기 위한 API를 설계하며, 그 과정에서 API에 어떤 데이터가 들어가야 하는지, API 주소는 어떻게 설정할 것인지 의논했습니다.
    > 
    > 화면을 구현하면서 React와 VS Code를 다루는 스킬이 늘었으며, 기능의 역할에 맞는 UI를 제작하고 보기 좋게 수정하면서 코딩하는 기술이 늘었습니다.
    >
    > ChatGPT에게 질문할 때에도 단순히 어떠한 기능을 하는 코드를 만들어 달라고 요청하는 것이 아니라, 기능을 만들면서 내가 막힌 부분을 ChatGPT에게 설명하고 그 부분에 대한 해답을 얻으면서 제가 사용하는 코드에 대해 이해하려 노력했고, 그 과정에서 자바스크립트(리액트)와 CSS 개발에 대한 많은 것을 배웠습니다.


- 이은총
    > 팀원간의 의견 차이가 발생하였을때, 대처 능력을 키울 수 있어서 좋았습니다. 
    > 
    > Backend 구현을 할 때 유지보수가 좋고, 효과적인 코드 관리를 위한 디자인 패턴을 배울 수 있었습니다. Model, Controller, Domain, Exception관리, Service관리를 위해 필요한 Spring Boot의 문법과 lombok의 기술 등을 알 수 있었습니다. 
    > 
    > chatGPT를 활용하더라도, 자신이 프롬프트에 따라 코드를 짤 수 있는 수준이어야 chatGPT에게 효과적인 코드 작업을 도움받을 수 있다는 점을 배울 수 있었습니다.

- 김동윤
    > 유라클 회사의 모피어스(Morpheus) 솔루션을 직접 사용해볼 수 있는 소중한 기회였습니다.
    >
    > 실제 현업에서 사용하고 있는 솔루션을 직접 체험해봄으로써 React Native나 Flutter로 개발하지 않고 모피어스를 얹은채로 개발하면 모바일뿐만 아니라 웹에서도 작동하는 하이브리드 앱을 만들 수 있다는 사실에 놀랐습니다.
    >
    > 그리고 기존에 웹 프론트엔드 개발을 할 때처럼 그대로 React 언어만으로도 화면을 구현해, 앱에서 볼 수 있다는 사실도 신기했습니다.
    >
    > Axios를 통한 API 연동을 원활하게 하고 간단하게 localStorage를 통해 로그인 상태를 체크하였습니다.
    > 
    > 팀원들이 단순히 화면에 이미지가 띄워지지 않아 고민하던 중, 제가 알고있던 이미지 경로 문제를 지적해 해결함으로써 작게나마 팀원들에게 기여했다는 생각에 뿌듯했습니다.
    >
    > 앞으로 팀 프로젝트를 진행하면서 내가 알고 있던 지식과 팀원들이 알고 있는 지식을 적극적으로 공유해 함께 성장해나가고 싶습니다.

## 참여자
- 문태민
- 이은총
- 김동윤
- 최준혁

## 담당
### 프론트엔드
- 문태민
- 김동윤
- 최준혁

### 백엔드
- 이은총

## 프로젝트 개발 환경
### 프론트엔드
화면 기능 및 UI 구현: 리액트

[![react](https://private-user-images.githubusercontent.com/76470428/396802020-75348d8f-b5a9-4157-af43-5d0e265747ad.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzQ1MDY5OTgsIm5iZiI6MTczNDUwNjY5OCwicGF0aCI6Ii83NjQ3MDQyOC8zOTY4MDIwMjAtNzUzNDhkOGYtYjVhOS00MTU3LWFmNDMtNWQwZTI2NTc0N2FkLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMTglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjE4VDA3MjQ1OFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTZhZGYxY2VkMTU4MjQxMTkwMDg0ZjY0Y2Q2OWM2ZmVhZDBiOTIyMmRmYzQxOWE4M2JhNGIyODg5NWI4MWU1OWMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.TETrkHp41QmKNHjfOiu41SJufVb8XRcIULhoHyP6hjw)](https://react.dev/)

빌드 도구: 비트

[![vite](https://private-user-images.githubusercontent.com/76470428/396802049-9c2360e0-487a-4e38-a3fa-99212d0889c8.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzQ1MDY5OTgsIm5iZiI6MTczNDUwNjY5OCwicGF0aCI6Ii83NjQ3MDQyOC8zOTY4MDIwNDktOWMyMzYwZTAtNDg3YS00ZTM4LWEzZmEtOTkyMTJkMDg4OWM4LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMTglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjE4VDA3MjQ1OFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTNhZjZlOWU5OGZiODBlZjAzMjg1NzBhYzZlODJmY2E1MGFmMjNjZDEyYjY1YjE2NzZjOWE3Zjk5OTE3NjhiODYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.77P5wYbVg4l6aU_taSHjL7nkF9A93S9lXduM4BlNCQM)](https://ko.vitejs.dev/)

---
### 백엔드
서버 구축: 스프링 부트

[![spring_boot](https://private-user-images.githubusercontent.com/76470428/396802085-6ec4798d-803f-471c-904c-2734428df8e9.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzQ1MDY5OTgsIm5iZiI6MTczNDUwNjY5OCwicGF0aCI6Ii83NjQ3MDQyOC8zOTY4MDIwODUtNmVjNDc5OGQtODAzZi00NzFjLTkwNGMtMjczNDQyOGRmOGU5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMTglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjE4VDA3MjQ1OFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTA0YzlkYTQ3MDg4MGI1YmQwMDUzNzM2ZjdjNTQ2MWJjNDk2ZDcyNGE2MmVmMTNhODY3ZDU5ODcyZDM5Nzg4NzQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.oM0L9SqSu8Z9fZwA3LIhlQnxAZXqrSbJaO1x_9d6Bdo)](https://spring.io/projects/spring-boot)

데이터베이스: 포스트그리 SQL

[![postgre_sql](https://private-user-images.githubusercontent.com/76470428/396802113-e5099a00-504f-4b29-a91d-758a72643c4c.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzQ1MDc0MjEsIm5iZiI6MTczNDUwNzEyMSwicGF0aCI6Ii83NjQ3MDQyOC8zOTY4MDIxMTMtZTUwOTlhMDAtNTA0Zi00YjI5LWE5MWQtNzU4YTcyNjQzYzRjLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMTglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjE4VDA3MzIwMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTg4MmI3ZDVjMjg2MjM4NjMzZjkyY2EyN2ZlOTFiNWQyZjM5YzE3NTM0OTk0NDYwZWVlMzY3MGFlNGVkMTIwMzcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.lzI1Q9eTWEylStYJ5LALv-bzIaUK-vluXiPnW7fGuj8)](https://www.postgresql.org/)

---
### 개발 환경 및 툴
운영 체제: 윈도우 11

[![windows_11](https://private-user-images.githubusercontent.com/76470428/396805207-6129b855-b844-4e86-b47f-f3fea947e43e.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzQ1MDc2NDMsIm5iZiI6MTczNDUwNzM0MywicGF0aCI6Ii83NjQ3MDQyOC8zOTY4MDUyMDctNjEyOWI4NTUtYjg0NC00ZTg2LWI0N2YtZjNmZWE5NDdlNDNlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMTglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjE4VDA3MzU0M1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTc3YjM5MzgwNmQ4ZjdhMzc5ODMwYTdlZjQxMTk5NjMzZTQ5ZDc5MWEzYWMxYjEzZTczZWY5YjgxNTE0Njc1MmYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.ZQWV1y7kf9R4G00iTl5znPnnAJAbucFz8fFo5EJqBFw)](https://www.microsoft.com/ko-kr/windows/?r=1)

IDE: Visual Studio Code, Webstorm, InteliJ IDEA

[![vs_code](https://private-user-images.githubusercontent.com/76470428/396802029-bef194a4-67a3-4c20-bf9c-f81e6daa89e9.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzQ1MDc2NDMsIm5iZiI6MTczNDUwNzM0MywicGF0aCI6Ii83NjQ3MDQyOC8zOTY4MDIwMjktYmVmMTk0YTQtNjdhMy00YzIwLWJmOWMtZjgxZTZkYWE4OWU5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMTglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjE4VDA3MzU0M1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWYzNmE0YjQyY2QyOGM5NDRkYTMxMzQzYzZkMmUxMWEyMTM2ODEyYTBhOWZhMjAxNjc3N2FhNTY1ZjA0Yjk4YzYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.j73vjP0e6SQJ4XVUEk9x_OmvhhxHSUroySZpNi0IkBU)](https://code.visualstudio.com/)

[![webstorm](https://private-user-images.githubusercontent.com/76470428/396802127-b321037b-80e6-4bde-a7a5-7ec83ae11188.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzQ1MDc2NDMsIm5iZiI6MTczNDUwNzM0MywicGF0aCI6Ii83NjQ3MDQyOC8zOTY4MDIxMjctYjMyMTAzN2ItODBlNi00YmRlLWE3YTUtN2VjODNhZTExMTg4LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMTglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjE4VDA3MzU0M1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTMxMTQ4NTE0YWFhZGRlZWEzZGUxNTFiMmY2NjZmMzdlMWRkNWVlZjdkOWQxMGQxNTg5N2E3Nzc5ZWJlNzBjNjgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.NppumxJtG64vzNTChA0pxVnWy-ynQPtfLBcDzfMvyJ4)](https://www.jetbrains.com/ko-kr/webstorm/)

[![intelij](https://private-user-images.githubusercontent.com/76470428/396802036-c6048fef-d243-4ae3-be8f-21a99a6239cb.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzQ1MDc2NDMsIm5iZiI6MTczNDUwNzM0MywicGF0aCI6Ii83NjQ3MDQyOC8zOTY4MDIwMzYtYzYwNDhmZWYtZDI0My00YWUzLWJlOGYtMjFhOTlhNjIzOWNiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMTglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjE4VDA3MzU0M1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWZlNTFjYWJkNjlmMWM1OThjYTljMjk2ODRiNDA2YmZhY2VhOTBiZjQ4MTY2OGM0NDIwNTA1MWI0MGFjZmVjNTkmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.12M5wHRsp67L-y3STZBkoRGoUI4DltJq-SCWRePWwZk)](https://www.jetbrains.com/idea/)

실행 환경: Morpheus

[![morpheus](https://private-user-images.githubusercontent.com/76470428/396802062-71d5c466-70c7-43d9-9f0d-89112ef2b85a.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzQ1MDc5NzQsIm5iZiI6MTczNDUwNzY3NCwicGF0aCI6Ii83NjQ3MDQyOC8zOTY4MDIwNjItNzFkNWM0NjYtNzBjNy00M2Q5LTlmMGQtODkxMTJlZjJiODVhLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMTglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjE4VDA3NDExNFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTkwOGE1ZDAzZDJkNGQwM2FlZjMyZmMxMzA2ZjdhMDFkZDg1YTA5ZGQxZjA0OWVkODkzMzAwOGY1MjgwZjNmNTcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.y81KVx8MpFtRaIrq2AEQZMJb15R73TtPVonZNvwsOqU)](https://uracle.co.kr/morpheus-suite/hybridapp/)
