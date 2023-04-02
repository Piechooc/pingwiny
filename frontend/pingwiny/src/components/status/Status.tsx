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
//
// const AvailableStatusButton = {
//   label: "Available",
//   onClick: () => {
//     console.log("Button clicked!");
//   },
//   render: function() {
//     return (
//       <button onClick={this.onClick}>
//         {this.label}
//       </button>
//     );
//   }
// };
//
// const HelpStatusButton = {
//   label: "Help",
//   onClick: () => {
//     console.log("Button clicked!");
//   },
//   render: function() {
//     return (
//       <button onClick={this.onClick}>
//         {this.label}
//       </button>
//     );
//   }
// };



// export default Button;

// const theme = {
//   blue: {
//     default: "#3f51b5",
//     hover: "#283593"
//   },
//   pink: {
//     default: "#e91e63",
//     hover: "#ad1457"
//   }
// };

// const StatusButton = (status) => {
//   this.status = status;
//   const [active, setActive] = useState(types[0]);
//   return (
//     <>
//       <div>
//         {types.map((type) => (
//           <div
//             key={type}
//             active={active === type}
//             onClick={() => setActive(type)}
//           >
//             {type}
//           </div>
//         ))}
//       </div>
//       <p />
//       <p> Your status is {active} </p>
//     </>
//   );
  // return (
  //   <Stage width={1100} height={750} options={{ backgroundColor: "e0ebeb", antialias: true }}>
  //
  //   </Stage>
  //   )
// }

// StatusButton.defaultProps = {
//   theme: "blue"
// };
//
// function clickMe() {
//   alert("You clicked me!");
// }


// function TabGroup() {
//   const [active, setActive] = useState(types[0]);
//   return (
//     <>
//       <div>
//         {types.map((type) => (
//           <Tab
//             key={type}
//             active={active === type}
//             onClick={() => setActive(type)}
//           >
//             {type}
//           </Tab>
//         ))}
//       </div>
//       <p />
//       <p> Your status is {active} </p>
//     </>
//   );
// }

// const types = ["Don't disturb", "Help", "I'm bored"];

// function ToggleGroup() {
//   const [active, setActive] = useState(types[0]);
//   return (
//     <div>
//       {types.map((type) => (
//         <ButtonToggle active={active === type} onClick={() => setActive(type)}>
//           {type}
//         </ButtonToggle>
//       ))}
//     </div>
//   );
// }


export default StatusButton;