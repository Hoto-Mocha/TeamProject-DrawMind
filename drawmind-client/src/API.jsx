import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000, // 10초
});

export default {
    test() { // 테스트
        return instance.get('/api/test');
    },
    memberLogin(id, pw) { //로그인
        return instance.post('/api/member/login', {memberId: id, password: pw});
    },
    memberJoin(id, pw) { //회원가입
        return instance.post('/api/member/join', {memberId: id, password: pw});
    },
    memberUpdate(memberSeq, pw) { //회원정보수정
        return instance.post('/api/member/update', {memberSeq, password: pw});
    },
    memberQuit(memberSeq) { //회원탈퇴
        return instance.post('/api/member/quit', {memberSeq});
    },
    postList(currentPage) { //게시글 리스트
        return instance.post('/api/post/list', {currentPage});
    },
    postDetail(postSeq) { //게시글 상세
        return instance.post('/api/post/detail', {postSeq});
    },
    postWrite(memberSeq, title, content, imageURL, postWidth) { //게시글 작성
        return instance.post('/api/post/write', {memberSeq, title, content, imageURL, postWidth});
    },
    postUpdate(postSeq, title, content) { //게시글 수정
        return instance.post('/api/post/update', {postSeq, title, content});
    },
    postDelete(postSeq) { //게시글 삭제
        return instance.post('/api/post/delete', {postSeq});
    }
}