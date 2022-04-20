import React ,{useState} from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import defaultUserImage from '../img/기본프로필사진.png';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import SockJS from 'sockjs-client';
import axios from 'axios';
import {Client,Message, Stomp} from '@stomp/stompjs'

const Chatroom = () => {
    const [publisher_name, setPublisher_name] =  useState('테스트8');
    const [subscriber_name, setSubscriber_name] = useState('테스트7');
    const [roomid , setroomid] = useState('');
    const Login_userName = '테스트8'

    let sockjs = SockJS("http://52.79.228.83/stomp")
    let stompClient = Stomp.client = Stomp.over(sockjs);

    const [mymessage,setMymessage] = React.useState('');
    const [Chatting, setChatting] = React.useState([]);

    React.useEffect(() => {
      stompClient.connect({}, function (){
        console.log('connect 성공');
        if(publisher_name !== '' && subscriber_name !== '')
          room_create();
      })
      stompClient.debug = (str) => {
        console.log(str)
      }
    },[])

    const room_create = () => {
      const Token = sessionStorage.getItem('user');
      axios.post('http://52.79.228.83:8080/chat/room',{
        "publisher": publisher_name, 
        "subscriber":subscriber_name,
      },{
        headers : {
          Authorization: `${Token}`,
        }
      }).then(function (response){
        console.log(response)
        setroomid(response.data.roomId);
        console.log(roomid)
        const datas = { 
          "type": "ENTER",
          "roomId": response.data.roomId,
          "sender":publisher_name, 
          "message":"test"
        }
        console.log(datas)
        stompClient.subscribe(`/sub/chat/room/${response.data.roomId}`, (message) => {
          console.log(message)
          const return_data = JSON.parse(message.body)
          console.log(return_data);
          const arrays = [...Chatting];
          arrays.push({
            userName : return_data.sender,
            content : return_data.message,
          })
          setroomid(return_data.roomId);
          console.log(arrays)
          setChatting(arrays);
        });
        stompClient.send('/pub/chat/message',{},JSON.stringify(datas))
        
      }).catch(function (error){
        console.log(error)
      })
    }

    const key_event = (event) => {
      if(event.key === 'Enter')
      {
        console.log(mymessage)
        console.log(roomid)
        // const array = Chatting;
        // array.push({
        //   userName : Login_userName,
        //   content : mymessage,
        // })
        // setChatting(array)
        const sendData = { 
          "type": "TALK",
          "roomId": roomid,
          "sender":publisher_name, 
          "message":mymessage
        }  

        console.log(sendData);
        const paths = `/pub/chat/message/${roomid}`
        console.log(paths)
        stompClient.send(paths,{},JSON.stringify(sendData))
      }
    }

    React.useEffect(() => {

    },[Chatting])

    return (
      <Contaniers>
           <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 1,
                    width: 300,
                    height: 400,
                    },
                }}
                >
                <Paper elevation={3} > 
                  <Bar>
                    <Paper elevation={2}  sx={{height:'inherit'}}>
                      <Stack direction="row" spacing={1} alignItems = "center" justifyContent="space-between" >
                        <Stack direction="row" spacing={1} sx={{marginLeft:0.5}}>
                          <Avatar sx={{ width: 32, height: 32 }} src={defaultUserImage}/>
                          <Chat_title>{subscriber_name}</Chat_title>
                        </Stack>
                          <IconButton aria-label="Close">
                              <CloseIcon />
                          </IconButton>
                      </Stack>
                    </Paper>
                  </Bar>
                  <ChatView>
                    {Chatting.map((el,idx) => {
                      return(
                        <>
                        {el.userName === Login_userName ?
                          <ChatLDetail key={idx}>
                          <Message_Lview key={idx}>{el.content}</Message_Lview>
                          </ChatLDetail> 
                          :
                          <ChatRDetail key={idx}>
                          <Message_Rview key={idx}>{el.content}</Message_Rview>
                          </ChatRDetail>
                        }
                        </>
                      );
                    })
                    }
                  </ChatView>  
                  <Bar>
                    <Paper elevation={2}  sx={{height:'inherit'}}>
                      <ChatInput onChange={(e) => {setMymessage(e.target.value)}} onKeyUp={key_event}/>
                    </Paper>
                  </Bar>
                </Paper>
            </Box>
      </Contaniers>
    );
}

const Contaniers = styled.div`
  position: fixed;
  right: 5%;
  bottom : 3%
`

const Bar = styled.div`
  width: 300px;
  height: 40px;
`
const Chat_title=styled.p`
  font-weight: bolder;
  color: black;
  font-size: 16px;
  margin-top: 11px;
  padding-top: 4px;
`;

const ChatInput = styled.input`
  background-color: #EEE;
  border:none;
  width: 90%;
  height: 30px;
  border-radius: 30px;
  margin: 4px 0px 0px 5px;
  padding-left: 15px;
`
const ChatView = styled.div`
  margin: 5px 0px;
  width: 100%;
  height: 310px;
  overflow-y: scroll;
`

const ChatLDetail = styled.div`
  display:flex;
  justify-content: flex-start;
`
const ChatRDetail = styled.div`
  width: 100%;
  display:flex;
  justify-content: flex-end;
`

const Message_Lview = styled.div`
  background-color: #EEE;
  border-radius: 20px;
  max-width: 230px;
  margin: 10px 10px;
  padding: 10px 10px;
  display: flex;
  align-items: "center";
  height: 10%;
`

const Message_Rview = styled.div`
  background-color: #0082FF;
  border-radius: 20px;
  max-width: 150px;
  margin: 10px 10px;
  padding: 10px 10px;
  display: flex;
  color: white;
  align-items: "center";
  height: 10%;
`

export default Chatroom