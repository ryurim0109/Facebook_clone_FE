import React, { useEffect } from 'react';
import Header from '../components/Header';
import { MainGrid } from '../elements/index';
import PostWrite from '../components/PostWrite';
import PostList from '../components/PostList';
import CommentWrite from '../components/CommentWrite';
import { useSelector,useDispatch } from 'react-redux';
import {postCreators as postActions} from '../redux/modules/post'


const Main =()=>{

  const dispatch =useDispatch()

  const post_list =useSelector((state)=>state.post.post_list);
  //console.log(post_list)
  const [pageno,setPageno] = React.useState(2);


  React.useEffect(()=>{
    if(post_list.length< 8){
      dispatch(postActions.getPostDB(pageno,sessionStorage.getItem('user')));
    }
    
  },[])

    return (
        <>
          <MainGrid bg="#F2F3F5">
            <Header />
           <MainGrid position="relative" top="56px" bg="#f2f3f5">
              <PostWrite/>
              {post_list && post_list?.map((c,idx)=>{
                return <PostList key={idx} {...c} />
              })}
              
            </MainGrid>
          </MainGrid>
        </>
      );
};




export default Main;