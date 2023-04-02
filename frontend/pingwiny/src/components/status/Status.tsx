import React, { useState, Component } from "react";
import {Stage} from "@pixi/react";
import {Graphics} from "@inlet/react-pixi";
import Penguin from "../penguins/Penguin";
import MyPenguin from "../penguins/MyPenguin";
import Desk from "../../types/Desk";
import User from "../../types/User";
import {Button} from "@mui/material";


interface Props{
    status: string,
    user: User
  }

const StatusButton = ({status, user}: Props) => {
  const onClick=() => {
    user.status = status;
  }

  return (
      <Button onClick={onClick}>
        {status}
      </Button>
    );
};


export default StatusButton;