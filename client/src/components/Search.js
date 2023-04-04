import { useState, useEffect, useRef } from 'react';
import { searchUsers } from '../utils/requests';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

export default function Search() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [users, setUsers] = useState([]);
  // useRef ; 엘리먼트의 접근 시 사용
  const inputEl = useRef(null); // 임시 값

  function handleChange(e) {  // input의 값이 바뀔때마다 서버에 요청하여 유저 리스트 변경을 위해 handleChange에 작성필요
    const username = e.target.value;

    if(!username) {
      return setUsers([]); // 빈 리스트로 리턴
    }

    setError(null);
    setIsLoaded(false); // 요청 전 false로 업데이트

    // 여기서 요청
    searchUsers(username)
      .then(data => {
        setUsers(data.users);
      })
      .catch(error => {
        setError(error)
      })
      .finally(() => setIsLoaded(true)) // 요청 후 true로 업데이트
  }

  useEffect(() => { // 비동기
    inputEl.current.focus();
  })

  return (
    <div className='px-4'>
      <label className='block mt-8 mb-4'>
        <input
          type="text"
          className='border px-2 py-1 rounded w-full'
          onChange={handleChange}
          placeholder='Search'
          ref={inputEl}
        />
      </label>

      <Result error={error} isLoaded={isLoaded} users={users} />
    </div>
  )
}

function Result({ error, isLoaded, users }) {
  // console.log(users)

  if (error) {
    return <p className='text-red-500'>{error.message}</p>
  }

  if(!isLoaded) {
    return <Spinner />
  }
  
  return users.map(user => (
    <div key={user.username} className='flex items-center my-2'>
      <Link
        to={`/profiles/${user.username}`}
        className='inline-flex itmes-center'
      >
        <img
          src={`${process.env.REACT_APP_SERVER}/files/profiles/${user.image}`}
          className='w-12 h-12 object-cover rounded-full'
        />
        <div className='ml-2'>
          <span className='block font-semibold'>
            {user.username}
          </span>
          <span className='block text-gray-400 text-sm'>
            {user.fullName}
          </span>
        </div>
      </Link>
    </div>
  ))
}
