import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//action
const ADD_MESSAGE = 'ADD_MESSAGE';

//action creators
const addMessage = createAction(ADD_MESSAGE,(message) => ({message}));

//initialState
const initialState = {
    Message : [],
}

// reducer
export default handleActions(
    {
      [ADD_MESSAGE]: (state, action) =>
        produce(state, (draft) => {
            console.log(state.Message);
            console.log(action.payload.message);
            const arrays = [...state.Message] //state를 배열로 복사 
            arrays.push(action.payload.message); //복사한 배열에 첫번쨰 요소에 신규 comment 추가 
            draft.Message = arrays 
        }),
    },
    initialState
  );


//action creator export
const actionCreators = {
    addMessage,
  };
  
export { actionCreators };
