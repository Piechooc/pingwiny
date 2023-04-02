import React, { Dispatch, useEffect, useState } from "react";
import MyPenguin from "./MyPenguin";
import Penguin from "./Penguin";
import User from "../../types/User";
import { Button } from "@mui/material";
import { Text } from "@pixi/react";

interface Props {
    penguins: User[],
    user: User,
    setUser: Dispatch<User>
}

const PenguinsContainer = ({ penguins, user, setUser }: Props) => {
  const [showButton, setShowButton] = useState(false);
  const [selectedPenguin, setSelectedPenguin] = useState<User>();

  const handleMyPenguinMove = (x: number, y: number) => {
    // update position of my penguin on the server
    fetch('http://penguins-agh-rest.azurewebsites.net/move', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: user.id,
        x: x,
        y: y
      })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
        alert('Error: ' + error)
    });

    // find the distance between myPenguin and other penguins
    const distances = penguins.map((penguin) => {
      const dx = penguin.x - x;
      const dy = penguin.y - y;
      return Math.sqrt(dx * dx + dy * dy);
    });

    // find the closest penguin
    console.log(distances)
    const minDistance = Math.min(...distances);
    const closestPenguin = penguins[distances.indexOf(minDistance)];

    // show button if closest penguin is within a certain distance
    setShowButton(minDistance < 100);

    // store the selected penguin data
    minDistance < 100 ? setSelectedPenguin(closestPenguin) : setSelectedPenguin(undefined);
  };

  useEffect(() => {
    handleMyPenguinMove(user.x, user.y);
  }, [user]);

  const handleButtonClick = () => {
    console.log("Start talking")
  };

  return (
    <>
    {penguins.map((penguinUser, index)=>
        <Penguin
        key={index}
        user={penguinUser}
        />
    )}
    <MyPenguin user={user} setUser={setUser} otherPenguins={penguins} handleButtonClick={handleButtonClick} showButton={showButton}/>

  </>)
};

export default PenguinsContainer;
