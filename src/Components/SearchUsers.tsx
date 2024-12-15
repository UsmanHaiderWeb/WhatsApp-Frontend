import { SearchSlash } from 'lucide-react'
import React, { memo } from 'react'
import { getAllUsersInterface } from './ReduxStore/Slices/getAllUsers'
import { useSelector } from 'react-redux';
import arrayShuffle from 'array-shuffle';

const SearchUsers = ({searchUsers, setSearchedUsers, filterFriends, onlyFriends}: {searchUsers?: any, setSearchedUsers?: any, filterFriends?: boolean, onlyFriends: boolean}) => {
  const blockedUsers = useSelector((state: any) => state.blockedUsers);
  const userKeFriends = useSelector((state: any) => state.userKeFriends);
  const userData = useSelector((state: any) => state.userData);

  const searchKroUsers = (e: any) => {
    let newArray = searchUsers.filter((user: getAllUsersInterface | any, udx: number) => {
      if (onlyFriends && userData) {
        if (user.isGroupChat) {
          return user?.chatName.toLowerCase().includes(e.target.value);
        }
        if (user?.admin.length > 1) {
          let otherUser = user?.admin.filter((adminUserData: getAllUsersInterface) => {
            return adminUserData._id != userData?._id
          })
          return otherUser[0]?.username.toLowerCase().includes(e.target.value);
        } else return user?.admin[0]?.username.toLowerCase().includes(e.target.value);
      } else {
        return user?.username.toLowerCase().includes(e.target.value);
      }
    })
    
    let friendFilteredArray = newArray.filter((user: getAllUsersInterface) => {
      return !userKeFriends.some(friend => friend._id === user._id)
    })

    if(filterFriends){
      let filteredFromBlockedUser = friendFilteredArray.filter((user: getAllUsersInterface) => {
        return !blockedUsers?.some(friend => friend._id === user._id)
      })
      let shuffledArray = arrayShuffle(filteredFromBlockedUser);
      setSearchedUsers(shuffledArray);
    } else {
      if (onlyFriends) {
        setSearchedUsers(newArray);
      } else {
        let filteredFromBlockedUser = newArray.filter((user: getAllUsersInterface) => {
          return !blockedUsers?.some(friend => friend._id === user._id)
        })
        
        let shuffledArray = arrayShuffle(filteredFromBlockedUser);
        setSearchedUsers(shuffledArray);
      }
    }
  }

  return (
    <label htmlFor='search' className='flex justify-start items-center bg-[#202C33] py-2 rounded-xl gap-x-5 px-3 mt-1'>
        <SearchSlash size={19} className='opacity-60' />
        <input type="text" name='search' id='search' placeholder='Search' className='w-full border-none outline-none bg-transparent text-[14px]' onChange={(e: any) => searchKroUsers(e)} />
    </label>
  )
}

export default memo(SearchUsers)