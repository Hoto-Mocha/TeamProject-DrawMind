import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://172.30.124.185:8080',
    timeout: 10, // 0.01초
});

export default {
    test() { // 테스트
        return instance.get('/api/test');
    },
    login(id, pw) { //로그인
        return instance.post('/api/member/login', {memberId: id, password: pw});
    },
    join(id, pw) { //회원가입
        return instance.post('/api/member/join', {memberId: id, password: pw});
    },
    update(memberSeq, pw) { //회원정보수정
        return instance.post('/api/member/update', {memberSeq: memberSeq, password: pw});
    },
    quit(memberSeq) { //회원탈퇴
        return instance.post('/api/member/quit', {memberSeq: memberSeq});
    },
    list(currentPage) { //게시글 리스트
        return instance.post('/api/post/list', {currentPage: currentPage});
    },
    detail(postSeq) { //게시글 상세
        return instance.post('/api/post/detail', {postSeq: postSeq});
    },
    write(memberSeq, title, content, imageURL) { //게시글 작성
        return instance.post('/api/post/write', {memberSeq: memberSeq, title: title, content: content, imageURL: imageURL});
    },
    update(postSeq, title, content) { //게시글 수정
        return instance.post('/api/post/update', {postSeq: postSeq, title: title, content: content});
    },
    delete(postSeq) { //게시글 삭제
        return instance.post('/api/post/delete', {postSeq: postSeq});
    }
}