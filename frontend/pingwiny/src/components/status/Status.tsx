import React, { useState, Component } from "react";
import {Stage} from "@pixi/react";
import {Graphics} from "@inlet/react-pixi";
import Penguin from "../penguins/Penguin";
import MyPenguin from "../penguins/MyPenguin";
import Desk from "../../types/Desk";
import User from "../../types/User";
import {Button} from "@mui/material";
import './style.css'




interface Props{
    status: string,
    user: User
  }

const StatusButton = ({status, user}: Props) => {
  const onClick=() => {
    user.status = status;
    fetch('http://penguins-agh-rest.azurewebsites.net/updatestatus/', {
            method: 'PUT',
            headers: {
                  'Content-Type': 'application/json'
                },
            body: JSON.stringify( {
                user_id: user.id,
                status: status,
            })
        })
        .catch(error => {
            console.error(error);
        });
  }

  return (
      status == "Available" ?
      <button className="availablebutton" onClick={onClick}>
        {status}
      </button> :
      status == "Help" ?
      <button className="helpbutton" onClick={onClick}>
        {status}
      </button> :
          <button className="dontdisturbbutton" onClick={onClick}>
        {status}
      </button>

    );
};


export default StatusButton;