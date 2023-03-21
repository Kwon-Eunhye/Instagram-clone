import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from "./AuthContext";
import { signIn } from '../utils/requests';

export default function Login() {

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError ] = useState(null);  // 로그인 에러
  const [email, setEmail ] = useState(localStorage.getItem('email') || ''); // 로그인을 한번 성공하면 다음 로그인 시 이미 입력되게 함
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);   // 비밀번호 토글버튼으로 비밀번호 보기

  // 로그인 처리 함수
  async function handleSubmit(e) {
    try{

      e.preventDefault();

      setError(null);

      const { user } = await signIn(email, password);

      console.log(user);

      // user state를 업데이트한다
      setUser(user); 

      // 로그인에 성공한 이메일을 localStorage에 저장
      localStorage.setItem('email', email);

      // Feed 페이지로 이동
      setTimeout(() => {
        navigate('/')
      }, 1000)  //localStorage에 user를 저장한 후에 실행되도록 시간 텀을 줌

    } catch(error) {
      setError(error)
    }
  }

  // 타이틀 업데이트
  useEffect(() => {
    document.title = 'Login - Instagram';
  },[])

  return (
    <form onSubmit={handleSubmit} className="max-w-xs p-4 mt-16 mx-auto">
      <div className='mt-4 mb-4 flex justify-center'>
        <img src='/images/logo.png' className='w-36' />
      </div>

      <div className='mb-2'>
        <label className='block'>
          <input 
          type='text' 
          className='border px-2 py-1 w-full rounded' 
          value={email} 
          placeholder='E-mail' 
          onChange={({ target }) => setEmail(target.value)} />
         </label>
      </div>

      <div className='mb-2'>
        <label className='block relative'>
          <input
            type={showPassword ? "text" : "password"}
            className="border px-2 py-1 w-full rounded"
            value={password}
            placeholder="password"
            onChange={({ target }) => setPassword(target.value)} 
          />
          {password.trim().length > 0 && (
            <button 
              type='button' // input안에 button의 타입의 기본값이 submit이기 때문에 button 타입 명시 필요
              className='absolute right-0 h-full px-4 py-2 text-sm font-semibold'
              onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
          )}
        </label>
      </div>

      <button
        type='submit'
        className='bg-blue-500 text-sm text-white font-semibold rounded-lg px-4 py-2 w-full disabled:opacity-[0.5]' // disabled button의 기본 속성
        disabled={!email.trim() || password.trim().length < 3 } // 이메일이 없거나 비밀번호가 3자리 이하 일때 disble 상태
      >
        Login
      </button>

      {/* 에러 메세지 */}
      {error && <p className='my-4 text-center text-red-500'>{error.message}</p>}

      <p className='text-center my-4'>
        Don't have an account ? {' '}
        <Link to="/accounts/signup" className='text-blue-500 font-semibold'>Sign Up</Link>
      </p>
    </form>
  )
}

