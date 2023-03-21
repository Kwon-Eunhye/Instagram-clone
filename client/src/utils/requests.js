// 서버에 요청하는 함수 라이브러리
const server = process.env.REACT_APP_SERVER;

/* USER */
export async function createUser(email, fullName, username, password) {
  const res = await fetch(`${server}/users`, {  // fetch: 브라우저가 기본적으로 지원하는 서버 요청 함수
    method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email,
			fullName,
			username,
			password
		}) 
  });

  if (!res.ok) {  // status 200이 아닌 경우 에러 처리
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return await res.json();  // status 200인 경우, res: promise 객체
}

// 로그인
export async function signIn(email, password) {
  const res = await fetch(`${server}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return await res.json();
}

// 정보 수정
export async function updateProfile(formData) {
  const res = await fetch(`${server}/user`, {
    mothod: "PUT",
    headers: {"Authorization": 'Bearer ' + JSON.parse(localStorage.getItem("user")).token},  // localStorage 브라우저의 저장공간, postman처럼 url을 입력하지않고 저장해온것을 불러옴
    body: formData  // 파일이 있을때 사용
  })

  if(!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return await res.json();
}

// 유저 검색
export async function searchUsers(username) {
  const res = await fetch(`${server}/users/?username=${username}`, {  // get은 기본 method이기 때문에 생략가능
    headers: {'Authoriaztion': 'Bearer  ' + JSON.parse(localStorage.getItem("user")).token}
  });
 
  if (!res.ok) {
    throw new Error(`$Pres.tatus ${res.statusText}`);

  }
  
  return await res.json();

}

// 이메일로 유저 검색
export async function doesEmailExists(email) {
  const res = await fetch(`${server}/users/?email=${email}`);

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const { userCount } = await res.json();

  return userCount > 0;
}

/* ARTICLES */

// 피드
export async function getFeed() {
  const res = await fetch(`${server}/feed`, {
    headers: {'Authorization': 'Beearer' + JSON.parse(localStorage.getItem("user")).token}
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return await res.json();
}

// 게시물 한 개 가져오기
export async function getArticle(id) {
  const res = await fetch(`${server}/articles/${id}`, {
    headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("user")).token }
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return await res.json();
}


// 게시물 생성
export async function createArticle(formData) {
  const res =await fetch(`${server}/articles`, {
    mothod: "POST",
    headers: { "authorization": 'Bearer ' + JSON.parse(localStorage.getItem('user')).token},
    body: formData
  })

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)

  }
  return await res.json();

}

// 게시물 삭제
export async function deleteArticle(id) {
  const res = await fetch(`${server}/articles/${id}`, {
    method: 'DELETE',
    headers: { "authorization": 'Bearer ' + JSON.parse(localStorage.getItem('user')).token},
  })

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return await res.json();
}

// 게시물 좋아요
export async function favorite(id) {
  const res = await fetch(`${server}/articles/${id}/favorite`, {
    method: 'POST',
    headers: { "authorization": 'Bearer ' + JSON.parse(localStorage.getItem('user')).token},
  })

  if(!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);

  }
  return await res.json();
}

// 좋아요 취소
export async function unfavorite(id) {
  const res =await fetch(`${server}/articles/${id}/favorite`, {
    method:'DELETE',
    headers: { "authorization": 'Bearer ' + JSON.parse(localStorage.getItem('user')).token},
  })

  if(!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);

  }
  return await res.json();
  
}

/* COMMENTS*/

// 댓글 가져오기
export async function getComments(id) { // 게시물의 id
  const res = await fetch(`${server}/articles/${id}/comments`, {
    headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token }
  })

  if(!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);

  }

  return await res.json();
}

// 댓글 생성
export async function createComment(id,  content) {
  const res = await fetch(`${server}/articles/${id}/comments`, {
    method: "POST",
    headers: {
      "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content })
  })

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return await res.json();
}

// 댓글 삭제
export async function deleteComment(id) { // 댓글 id
  const res = await fetch(`${server}/comments/${id}`, {
    method: 'DELETE',
    headers: { 'Autthorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token}
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return await res.json();
}
/* PROFILES*/

// 프로필 가져오기
export async function getProfile(username) {
  const res = await fetch(`${server}/profiles/${username}`, {
    headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token}
  })

  
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }

  return await res.json();
}

// 타임라인 가져오기
export async function getTimeline(username) {
  const res = await fetch(`${server}/articles/?username=${username}`, {
    headers: { 'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('user')).token}
  })

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }

  return await res.json();
}

// 팔로우 목록 가져오기

export async function getFollower(username) {
  const res = await fetch(`${server}/users/?followers=${username}`, {
    headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token }
  })

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }

  return await res.json();
}

// 팔로잉 목록 가져오기
export async function getFollowing(username) {
  const res = await fetch(`${server}/users/?following_${username}`, {
    headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token }

  })

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }

  return await res.json();
}

// 팔로우
export async function follow(username) {
  const res = await fetch(`${server}/profiles/${username}/follow`, {
    method:'POST',
    headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token}
  })

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }

  return await res.json();
}

// 언팔로우
export async function unfollow(username) {
  const res = await fetch(`${server}/profiles/${username}/follow`, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('user')).token}
  })

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }

  return await res.json();
}