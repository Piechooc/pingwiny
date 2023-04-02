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

  const handleButtonClick = async () => {
    console.log("Start talking")
    try {
      const response = await fetch('http://penguins-agh-rest.azurewebsites.net/chatusers/' + selectedPenguin?.id, {
        method: 'GET'
      })

      if (response.ok) {
        let chatId = await response.json().then(data=> data["chat_id"]);
        console.log(chatId)
        try {
          const response = await fetch('http://penguins-agh-rest.azurewebsites.net/joinchat/', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              user_id: user.id,
              chat_id: chatId
            })
          })

          if (response.ok) {
            console.log(response);
          }
        } catch (error) {
          console.error(error);
          alert('Error: ' + error)
        }
      } else {
        try {
          const response = await fetch('http://penguins-agh-rest.azurewebsites.net/createchat/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              user_id1: selectedPenguin?.id,
              user_id2: user.id,
              is_private: false
            })
          })

          if (response.ok) {
            console.log(response);
          }
        } catch (error) {
          console.error(error);
          alert('Error: ' + error)
        }
      }
    } catch (error) {
      console.error(error);
      alert('Error: ' + error)
    }
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
