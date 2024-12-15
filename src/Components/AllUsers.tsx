import React, { Fragment, memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllUsersInterface } from './ReduxStore/Slices/getAllUsers';
import UsersBoxHeadComponent from './UsersBoxHeadComponent';
import NewChatWithUserTemplate from './NewChatWithUserTemplate';
import arrayShuffle from 'array-shuffle';
import { FriendsToShowSkeleton } from './FriendsToShow';


const AllUsers = () => {
  const [allUsers, setAllUsers] = useState<[getAllUsersInterface] | []>([]);
  const [searchedUsers, setSearchedUsers] = useState<[getAllUsersInterface] | null>(null);
  const getAllUsers = useSelector((state: any) => state.getAllUsers);
  const userKeFriends = useSelector((state: any) => state.userKeFriends);
  const blockedUsers = useSelector((state: any) => state.blockedUsers);
  const userData = useSelector((state: any) => state.userData);
  let token = localStorage.getItem('token');

  useEffect(() => {
    if (getAllUsers && getAllUsers?.length > 0 && userKeFriends?.length > 0) {
      const newArray = getAllUsers?.filter((user: getAllUsersInterface) => 
        !userKeFriends.some((friend: getAllUsersInterface) => {
          return friend?._id === user?._id
        })
      );

      let blockedFilteredArray = newArray.filter(user => {
        return !blockedUsers?.some(block => block?._id === user?._id);
      })
      let shuffledArray: any = arrayShuffle(blockedFilteredArray);
      setAllUsers(shuffledArray);
    } else {
      if(getAllUsers){
        let blockedFilteredArray = getAllUsers.filter(user => {
          return !blockedUsers?.some(block => block?._id === user?._id);
        })
        let shuffledArray: any = arrayShuffle(blockedFilteredArray);
        setAllUsers(shuffledArray);
      }
    }
  }, [getAllUsers, userKeFriends, blockedUsers]);

  return (
    <div className='h-screen micro:pb-20 mobile:pb-20'>
      <div className='w-full h-24 mt-5'>
        <UsersBoxHeadComponent headName="Find Users" searchUsers={getAllUsers} setSearchedUsers={setSearchedUsers} filterFriends={true} onlyFriends={false} />
      </div>
      {(getAllUsers && userData && token)?
        <div className='allUser listFriends w-full h-[calc(100%-125px)] overflow-x-hidden overflow-y-auto mt-2 pb-2'>
          {(getAllUsers && !searchedUsers) && allUsers?.map((i: getAllUsersInterface, idx: number) => (
            <Fragment  key={`${i}, ${idx}`}>
              {(i?._id != userData?._id) &&
                <NewChatWithUserTemplate _id={i?._id} username={i.username} email={i.email} dp={i.dp} add={true} />
              }
            </Fragment>
          ))}
          {(getAllUsers && searchedUsers) && searchedUsers?.map((i: getAllUsersInterface, idx: number) => (
            <Fragment  key={`${i}, ${idx}`}>
              {(i?._id != userData?._id) &&
                <NewChatWithUserTemplate _id={i?._id} username={i.username} email={i.email} dp={i.dp} add={true} />
              }
            </Fragment>
          ))}
          {allUsers && allUsers?.length == 0 &&
            <div className='text-[15px] text-center px-5 opacity-60'>There are no users to show you.</div>
          }
          {(searchedUsers && (searchedUsers?.length == 0)) &&
            <div className='text-[15px] text-center px-5 opacity-60'>No related search</div>
          }
        </div>
      :
        <div className='allUser listFriends w-full h-[calc(100%-125px)] overflow-hidden pb-5 mt-2'>
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((o: number, odx: number) => (
            <FriendsToShowSkeleton key={`${o}, ${odx}`} />
          ))}
        </div>
      }
    </div>
  )
}

export default memo(AllUsers)