// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import AuthContext from "./AuthContext";


// export default function AuthRequired({ children }) {  // AuthRequired의 children : Layout

//   const { user } = useContext(AuthContext);

//   if(!user) {
//     return <Navigate to='/accounts/login' replace={true} /> // Navigate hook : 이동 / replace : 뒤로가기버튼을 눌러도 현재 페이지로 이동

//   }

//   // 인증에 성공할 경우 Layout으로 이동
//   return children;

// }


import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

export default function AuthRequired({ children }) {

    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/accounts/login" replace={true} />
    }

    // 인증에 성공할 경우 Layout으로 이동한다
    return children;
}