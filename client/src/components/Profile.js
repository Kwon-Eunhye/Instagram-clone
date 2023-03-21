import { useEffect, useState, useContext, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import ArticleCreate from "./ArticleCreate";
import Timeline from "./Timeline";
import { getProfile, getTimeline, follow, unfollow } from "../utils/requests";


export default function Profile() {

  const { username } = useParams(); // 파라미터로 유저네임을 가져옴
  const { user, setUser } = useContext(AuthContext);
  const isMaster = user.username === username;  // 프로필 유저와 로그인 유저의 일치 여부
  const [profile, setProfile] = useState(null);
  const [articles, setArticles] = useState(null);
  const [articleCount, setArticleCount] = useState(0);
  const [actvie, setActive] = useState(false);  // 모달 활성화
  const navigate = useNavigate();

  console.log(username);
  useEffect(() => {
    setProfile(null);

    Promise.all([ // 모든 항목이 다 성공했을때 동작
      getProfile(username), 
      getTimeline(username)
    ])
      .then(([profileDate, timelineData]) => {
        setProfile(profileDate.profile);
        setArticles(timelineData.articles);
        setArticleCount(timelineData.articleCount);
      })  
      .catch(error => { // 한개라도 실패했을 경우 not found 페이지로 이동
        navigate('/notfound', { replace: true })
      })

  }, [username])

  console.log(profile)
  console.log(articles)
}
