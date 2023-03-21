import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
	// locatStorage에서 user를 불러온다
	// 새로고침 했을때 인증된 상태를 유지
	const initialUser = JSON.parse(localStorage.getItem("user"));
	const [user, setUser] = useState(initialUser);

	// user state listener  // 유저 스테이트를 감시 및 유지
	useEffect(() => {
		if (user) {
			// localStorage에 user를 저장
			// 로그인 후 실행
			localStorage.setItem("user", JSON.stringify(user));
		} else {
			// localStorage에 useer를 삭제
			// 로그아웃 후에 실행
			localStorage.removeItem("user");
		}
	}, [user]);

	const value = { user, setUser }

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}
