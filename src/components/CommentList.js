import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import defaultUserImage from '../img/기본프로필사진.png';
import {actionCreators as CommentAction} from '../redux/modules/Comment_module'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const CommentList = (props) => {
    const comment_list = useSelector((state) => state.Comment.comments);
    const user_info=useSelector((state)=>state.user.user);
    const postIds = props.postId;
    console.log(props.userName)
    const dispatch = useDispatch();
    const [commentid_u,setComment_u] = useState('');
    const [pages,setPage] = useState(1);
    const [updates, setUpdate] = useState(false);
    const [update_comment, setUpdate_comment] = useState('');
    console.log(comment_list)
    console.log(comment_list?.comments)
    const [types, setTypes] = useState(false);
    let newlist = [];
    if(comment_list !== undefined)
    {
      console.log(postIds)
      newlist = comment_list.filter(el => {
        console.log(el)
        return el.postId === postIds
      });
      console.log(newlist)
    }

    const is_me = props.userName === user_info?.userName;
    console.log(props.userName);
    console.log(user_info?.userName);
    console.log(is_me);

    const [loading,setLoding] = useState(false);

    console.log(postIds)

    React.useEffect(() => {
        console.log('기동')
        dispatch(CommentAction.getComment({postId : postIds, page : pages},types));
    },[pages])

    return (
      <div>
        <Box
        sx={{
          width: 425,
          display: 'flex',
          flexDirection : 'column',
          alignItems: 'center',
        }}>
          {comment_list && newlist.map((el,idx) => {
            return (
              <Stack key={idx} direction="row" spacing={2} sx={{margin : '8px 0px 0px 75px' }} >
                <Avatar sx={{ width: 32, height: 32 }} src={defaultUserImage}/>
                  <Comment_p >
                  <Comment_title>{el.userName}</Comment_title>
                    {updates && user_info?.userName === el.userName && el.commentId === commentid_u ?
                    <Input_styles type='text' defalutvalue={el.content} onChange={(e) => {setUpdate_comment(e.target.value)}} />
                    :
                    <Comment_content>{el.content}</Comment_content>
                    }
                  </Comment_p>
                  {user_info?.userName === el.userName && 
                    <Button_styles>
                      {/* <button onClick={() => {
                          setUpdate((prev)=> !prev)
                         if(el.commentId === commentid_u) 
                         {
                            setComment_u('');
                            console.log(update_comment)
                            dispatch(CommentAction.Put_Comment({
                              commentId : el.commentId,
                              postId :el.postId,
                              comment : update_comment,
                            }))
                         }
                         else
                         {
                           console.log((el.commentId))
                           setComment_u(el.commentId)
                         } 
                      }}>수정</button> */}
                      <button onClick={() => {
                        dispatch(CommentAction.DelComment({postId : el.postId, commentid : el.commentId}));
                      }}>삭제</button>
                    </Button_styles>
                  }
              </Stack>
            );  
          })
          }
        </Box>
        <Footer_div>
        <div className='footer_container'>
          <div role="presentation" onClick={()=>{setTypes((prev) => !prev);setPage((prev)=> prev+1)}}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit">
                댓글 더보기
              </Link>
            </Breadcrumbs>
          </div>
          {comment_list?.totalPage &&
          <Typography variant="overline" display="block" gutterBottom>총 {comment_list?.totalPage}페이지 중 {pages}페이지 </Typography> }
        </div>
        </Footer_div>
      </div>
    );
}

const Comment_p=styled.div`
    width:365px;
    height:auto;
    background-color:#eee;
    color:#67696d;
    padding:10px;
    box-sizing:border-box;
    border-radius:25px;
    cursor:pointer;
    text-align:left;
    border:none;
    &:visited{
      background-color:#e0e0e0;
      border:none;
    }
`;

const Comment_title=styled.p`
  font-weight: bolder;
  color: black;
  font-size: 16px;
`;
const Comment_content=styled.p`
  margin-top: 10px;
  font-size: 13px;
  font-weight: lighter;
`;

const Footer_div = styled.div`
  .footer_container{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Input_styles = styled.input`
  border:none;
  border-right:0px; 
  border-top:0px; 
  boder-left:0px; 
  boder-bottom:0px;
  background-color: transparent;
`
const Button_styles = styled.div`
  Button{
    margin: 10px;
  }
`

export default CommentList;
