import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios'

//action
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

//action creators
// const setLogin = createAction(LOGIN,(Login) => ({Login}));
// const setLogout = createAction(LOGOUT,(Login) => ({Login}));

//initialState
const initialState = {
    user : {
        id : '',
        passward : ''
    }
}

//로그인 요청 
const postLogin = (Login_info) => {
    return function (dispatch, getState,{history}){
        console.log('로그인 시작')
        console.log(Login_info)

        axios.post('http://52.79.228.83:8080/user/login',
        Login_info
        ).then(function (response){
            console.log('로그인 성공!')
            console.log(response)
            console.log(response.headers.authorization)
            // 테스트 완료 후 진행.
            sessionStorage.setItem('user',response.headers.authorization);
            // history.push('/post');
        }).catch(function (error){
            console.log('로그인 실패!')
        })
    }
}

//회원가입 요청 
const postSignup = (Signup_info) => {
    return function (dispatch, getState, {history}){
        console.log(Signup_info)
        axios.post('http://52.79.228.83:8080/user/signup',
        Signup_info
        ).then(function (response){
            console.log(response)
        }).catch(function (error){

        })
    }
}

// reducer
export default handleActions(
    {
      [LOGIN]: (state, action) =>
        produce(state, (draft) => {
          draft.user = action.payload.user;
        }),
      [LOGOUT]: (state, action) =>
        produce(state, (draft) => {
            sessionStorage.clear();
        }),
    },
    initialState
  );


//action creator export
const actionCreators = {
    postLogin,
    postSignup,
  };
  
export { actionCreators };