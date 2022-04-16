import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

//action
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

//action creators
 const setLogin = createAction(LOGIN,(Login) => ({Login}));

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
            alert('로그인 성공')
            console.log(response)
            console.log(response.headers.authorization)
            sessionStorage.setItem('user',response.headers.authorization);
            dispatch(setLogin(Login_info))
            history.push('/main');
        }).catch(function (error){
            alert('로그인이 실패했어요')
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
            alert(response.data)
            window.location.reload();
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