import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser, doesEmailExists } from '../utils/requests';

export default function Signup() {

  const navigate = useNavigate();
  const [error, setError] = useState(null);   // 회원가입 시 발생하는 에러처리
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 회원가입 폼 제출 처리
  async function handleSubmit(e) {
    try {

      e.preventDefault();

      const _error = {};

      // 이메일 유효성 검사
      if (!email.includes('@') || email.trim().length < 5 ) { // 라이브러리 또는 정규식으로 조건 활용 가능
        _error.email = 'E-mail in not valid'
      }

      if (await doesEmailExists(email)) {
        _error.email = 'E-mail is already in use';
      }

      // 유저네임 유효성 검사
      if (username.trim().length < 5) {
        _error.username = 'Username is too short';
      }

      // 비밀번호 유효성 검사
      if (password.trim().length < 5) {
        _error.password = 'Password is too short';
      }

      const isError = Object.keys(_error).length > 0; //  object.keys: 문자열 array로 반환

      if (isError) {
        throw _error;
      }

      console.log(_error)

      // 회원가입 성공
      
      await createUser(email, fullName, username, password);
      console.log(email)
      alert(`Welcome, ${username}`);

      navigate('/');

    } catch(error) {
      setError(error)
    }
  }

  useEffect(() => {
    document.title = 'Sign Up - Instagram'
  }, [])

  return (
    <form onSubmit={handleSubmit} className='max-w-xs mx-auto p-4 mt-16'>
      <div className='mt-4 mb-4 flex justify-center'>
        <img src='/images/logo.png' className='w-36' />
      </div>
      <div className='mb-2'>
        <label className='block'>
          <input
            type="text"
            name="email"
            className='border px-2 py-1 rounded w-full'
            onChange={({ target }) => setEmail(target.value)}
            placeholder="Email address"></input>
        </label>
        {error && <p className='text-red-500'>{error.email}</p>}
      </div>

      <div className='mb-2'>
        <label className='block'>
          <input 
            type='text'
            name='fullName'
            className='border rounded px-2 py-1 w-full'
            onChange={({ target }) => setFullName(target.value)}
            placeholder="Full Name"
            />
        </label>
        {/* fullname 입력은 선택사항이기 때문에 에러 내용이 없음 */}
      </div>

      <div className='mb-2'>
        <label className='block'>
          <input 
            type='text'
            name="username"
            className='border px-2 py-1 rounded w-full'
            onChange={({ target }) => setUsername(target.value)}
            placeholder="Username"
          />
        </label>
        {error && <p className='text-red-5j00'>{error.username}</p>}
      </div>

      <div className='mb-2'>
        <label className='block'>
          <input
            type='password'
            name='password'
            className='border rountded px-2 py-1 w-full'
            onChange={({ target }) => setPassword(target.value)}
            placeholder='Password'
          />
        </label>
        {error && <p className='text-red-500'>{error.password}</p>}
      </div>
      
      <div className='mb-2'>
        <button
        type='submit'
        className='bg-blue-500 rounded-lg text-sm font-semibold px-4 py-2 text-white w-full disabled:opacity-50'
        disabled={!email.trim() || !username.trim() || !password.trim()}
        >
          Sign Up
        </button>
        {error && <p className='text-red-500 text-center my-4'>{error.message}</p>}
      </div>

      <p className='text-center mt-4'>
        Do you have an account ? {" "}
        <Link to='/accounts/login' className='text-blue-500 font-semibold'>
          Login
        </Link>
      </p>
    </form>
  )
}
