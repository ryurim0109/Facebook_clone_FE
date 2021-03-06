import React from "react";
import styled from "styled-components";
import { BsSearch,BsFillTrashFill,BsPencilSquare,BsImages,BsXLg } from "react-icons/bs";
import { MdPhotoLibrary } from 'react-icons/md';



const MainBtn =(props) =>{
    const {color,
        is_close,
        _onClick,
        children,
        margin,
        width,
        padding,
        backgroundColor,
        height,
        fontSize,
        borderRadius,
        top,
        bottom,
        left,
        right,
        hover,
        display,
        is_S,
        is_del,
        is_edit,
        is_up,
        _disabled} =props;
        

    const styles={
        margin,
        width,
        padding,
        backgroundColor,
        color,
        height,
        fontSize,
        borderRadius,
        top,
        bottom,
        left,
        right,
        hover,
        display,

    }
    if(is_S){
        return (
            <React.Fragment>
                <EditBox onClick={_onClick}>
                    <Se />
                </ EditBox>
            </React.Fragment>
        )
    }
    if(is_up){
        return (
            <React.Fragment>
                <UpBox onClick={_onClick}>
                    <Library />
                </ UpBox>
            </React.Fragment>
        )
    }
    if(is_del){
        return (
            <React.Fragment>
                <EditBox onClick={_onClick}>
                    <Tr />
                </ EditBox>
            </React.Fragment>
        )
    }  
    if(is_edit){
        return (
            <React.Fragment>
                <EditBox onClick={_onClick}>
                    <Ed/>
                </ EditBox>
            </React.Fragment>
        )
    }
    if(is_close){
        return (
            <React.Fragment>
                <EditBox onClick={_onClick}>
                    <X/>
                </ EditBox>
            </React.Fragment>
        )
    }
    

   
    return(
        <React.Fragment>
            <ButtonBox {...styles} onClick={_onClick} disabled={_disabled}>
                {children}
            </ButtonBox>
        </React.Fragment>
    );
};

MainBtn.defaultProps ={
  position: false,
  children: null,
  _onClick: () => {},
  isFloat: false,
  margin: 'auto',
  width: '100%',
  padding: '12px 0px',
  color: 'white',
  height: '50px',
  top: null,
  bottom: null,
  left: null,
  right: null,
  hover: null,
  display: null,  
};

const ButtonBox = styled.button`
  width: ${(props) => props.width};
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  margin: ${(props) => props.margin};
  ${(props) =>
    props.backgroundColor
      ? `background-color:${props.backgroundColor}`
      : 'background-color: #1b74e4'};
  box-sizing: border-box;
  font-weight: bold;
  border: none;
  ${(props) =>
    props.borderRadius
      ? `border-radius:${props.borderRadius}`
      : 'border-radius: 0px'};
  cursor: pointer;
  flex-shrink: 0;
  &:hover {
    background-color: ${(props) => props.hover};
  }
  vertical-align: middle;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  position: ${(props) => props.position};
  flex-shrink: 0;
  display: ${props => props.display};
`;
const EditBox=styled.button`
    width:41px;
    height:41px;
    background:#F5F6F7;
    border-radius:25px;
    border:none;
    cursor:pointer;
    display:flex;
    align-items:center;
    justify-content:center;

    &:hover{
        background:#e0e0e0;
    }
`;
const Se=styled(BsSearch)`

transform:scale(1.1,1.1);
color:#606770;

`
const Tr=styled(BsFillTrashFill)`

transform:scale(1.1,1.1);
color:#606770;

`;
const Ed=styled(BsPencilSquare)`

transform:scale(1.1,1.1);
color:#606770;

`;
const X=styled(BsXLg)`
    font-size:14px;
    color:#050505;

`;
const UpBox=styled.button`
    width:41px;
    height:41px;
    background:#fff;
    border-radius:25px;
    border:none;
    cursor:pointer;
    display:flex;
    align-items:center;
    justify-content:center;
    

    &:hover{
        background:#e0e0e0;
    }
`;
const Library=styled(MdPhotoLibrary)`
 font-size:24px;
 color:#45bd62;
 &:hover{
        background:#e0e0e0;
    }

`




export default MainBtn;