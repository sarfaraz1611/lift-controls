import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [obj, setobj] = useState({
    lift1: {
      direction: null,
      currentPosition: 5,
      buffer: [],
    },
    lift2: {
      direction: null,
      currentPosition: 1,
      buffer: [],
    },
  });

  const [upReq, setUpReq] = useState([]);
  const [downReq, setDownReq] = useState([]);
  // console.log("====================================");
  // console.log("upreq" + upReq + " downreq" + downReq);
  console.log(obj);
  // console.log("====================================");
  const flobj = [
    {
      floor: 5,
      // upbtn: false,
      // downbtn: false,
      setUpReq: setUpReq,
      setDownReq: setDownReq,
    },
    {
      floor: 4,
      // upbtn: false,
      // downbtn: false,
      setUpReq: setUpReq,
      setDownReq: setDownReq,
    },
    {
      floor: 3,
      // upbtn: false,
      // downbtn: false,
      setUpReq: setUpReq,
      setDownReq: setDownReq,
    },
    {
      floor: 2,
      // upbtn: false,
      // downbtn: false,
      setUpReq: setUpReq,
      setDownReq: setDownReq,
    },
    {
      floor: 1,
      // upbtn: false,
      // downbtn: false,
      setUpReq: setUpReq,
      setDownReq: setDownReq,
    },
  ];

  const floorl1 = obj.lift1.currentPosition;
  const elevStylesl1 = {
    bottom: `${floorl1 * 20 - 20}vh`,
  };
  const floorl2 = obj.lift2.currentPosition;
  const elevStylesl2 = {
    bottom: `${floorl2 * 20 - 20}vh`,
  };
  setTimeout(() => {
    console.log(obj, "main obj");

    // uncheck the button on based on direction of lift
    // cahnged positio
    // handle movement of the lift based on its buffer
    // if (obj.lift1.buffer.length !== 0) {
    //   if (upReq[0] != motion.lift1.currentPosition) {
    //     motion.lift1.currentPosition -= 1;
    //   }
    // } else if (obj.lift2.buffer.length !== 0) {
    //   if (upReq[0] != motion.lift2.currentPosition) {
    //     motion.lift1.currentPosition -= 1;
    //   }
    // }
    console.log(upReq);
    console.log(downReq, "downreq");

    if (obj.lift1.direction === null && obj.lift2.direction === null) {
      if (upReq.length != 0) {
        const lift1diff = obj.lift1.currentPosition - upReq[0];
        const lift2diff = obj.lift2.currentPosition - upReq[0];

        if (Math.abs(lift1diff) <= Math.abs(lift2diff)) {
          //  append lift one  buffer with current request
          //setting motion of lift one
          const motion = { ...obj };
          motion.lift1.buffer.push(upReq[0]);

          //remove from main array upreq
          setUpReq(upReq.filter((ids) => ids != upReq[0]));

          if (obj.lift1.currentPosition > upReq[0]) {
            motion.lift1.direction = "down";

            // if (upReq[0] != motion.lift1.currentPosition) {
            //   motion.lift1.currentPosition -= 1;
            // }
          } else if (obj.lift1.currentPosition < upReq[0]) {
            motion.lift1.direction = "up";

            // if (upReq[0] != motion.lift1.currentPosition) {
            //   motion.lift1.currentPosition += 1;
            // }
          }
          setobj(motion);
        } else if (Math.abs(lift1diff) >= Math.abs(lift2diff)) {
          //setting motion of lift2
          const motion = { ...obj };
          if (motion.lift2.buffer.includes(upReq[0])) {
            motion.lift2.buffer.push(upReq[0]);
          }
          setUpReq(upReq.filter((ids) => ids != upReq[0]));

          if (obj.lift2.currentPosition > upReq[0]) {
            motion.lift2.direction = "down";

            // if (upReq[0] != motion.lift2.currentPosition) {
            //   motion.lift2.currentPosition -= 1;

            //   motion.lift2.buffer = motion.lift2.buffer.filter((ids) => {
            //     return ids != upReq[0];
            //   });
            // }
          } else if (obj.lift2.currentPosition < upReq[0]) {
            motion.lift2.direction = "up";
            // if (upReq[0] != motion.lift2.currentPosition) {
            //   motion.lift2.currentPosition += 1;
            //   motion.lift2.buffer = motion.lift2.buffer.filter((ids) => {
            //     return ids != upReq[0];
            //   });
            // }
          }
          setobj(motion);
        }
      }

      if (downReq.length != 0) {
        const lift1diff = obj.lift1.currentPosition - downReq[0];
        const lift2diff = obj.lift2.currentPosition - downReq[0];

        if (Math.abs(lift1diff) <= Math.abs(lift2diff)) {
          const motion = { ...obj };

          motion.lift1.buffer.push(downReq[0]);
          setDownReq(downReq.filter((ids) => ids != downReq[0]));

          if (obj.lift1.currentPosition > downReq[0]) {
            motion.lift1.direction = "down";
            // if (upReq[0] != motion.lift1.currentPosition) {
            //   motion.lift1.currentPosition -= 1;
            // }
          } else if (obj.lift1.currentPosition < downReq[0]) {
            motion.lift1.direction = "up";
            // if (upReq[0] != motion.lift1.currentPosition) {
            //   motion.lift1.currentPosition += 1;
            // }
            // setobj(motion);
          }
          setobj(motion);

          //assign lifts based nearest position
          //both are at same floor send lift1
        } else {
          const motion = { ...obj };
          motion.lift2.buffer.push(downReq[0]);
          setDownReq(downReq.filter((ids) => ids != downReq[0]));

          if (obj.lift2.currentPosition > downReq[0]) {
            motion.lift2.direction = "down";
            // if (upReq[0] != motion.lift2.currentPosition) {
            //   motion.lift2.currentPosition -= 1;
            // }
            setobj(motion);
          } else if (obj.lift2.currentPosition < downReq[0]) {
            motion.lift2.direction = "up";
            // if (upReq[0] != motion.lift2.currentPosition) {
            //   motion.lift2.currentPosition += 1;
            // }
            setobj(motion);
          }
        }
      }
    }
    if (obj.lift1.direction === null && obj.lift2.direction !== null) {
      //ditect directionof lift 2
      const curDir = obj.lift2.direction;
      // console.log(upReq);
      if (curDir === "up") {
        const myUpReq = upReq.filter((ids) => ids >= obj.lift2.currentPosition);
        console.log(upReq, "upreq");
        // const myDownReq = downReq.filter(
        //   (ids) => ids >= obj.lift2.currentPosition
        // );
        // const temp = [...myDownReq, ...myUpReq];

        //appen the accepted clients  to buffer and pop it from

        console.log("upreq", upReq, " down2req", downReq);
        const clone = { ...obj };
        clone.lift2.buffer.push(...myUpReq);
        setUpReq(
          upReq.filter(
            (ids) => !myUpReq.includes(ids) && !clone.lift2.buffer.includes(ids)
          )
        );
        if (downReq.length != 0) {
          clone.lift1.direction = "down";
          const myDownReq = downReq.filter(
            (ids) => ids <= obj.lift1.currentPosition
          );
          clone.lift1.buffer.push(...myDownReq);
          setDownReq(downReq.filter((ids) => !myDownReq.includes(ids)));
        }
        setobj(clone);
      } else if (curDir === "down") {
        // const myUpReq = upReq.filter((ids) => ids >= obj.lift2.currentPosition);
        const myDownReq = downReq.filter(
          (ids) => ids >= obj.lift2.currentPosition
        );
        // const temp = [...myDownReq, ...myUpReq];
        //appen the accepted clients  to buffer and pop it from
        // pop it from global up req arra
        //change the lift position
        // uncheck the button on based on direction of lift
        console.log("upreq", upReq, " down2req", downReq);
        const clone = { ...obj };
        clone.lift2.buffer.push(...myDownReq);
        setDownReq(
          downReq.filter(
            (ids) =>
              !myDownReq.includes(ids) && !clone.lift2.buffer.includes(ids)
          )
        );

        setobj(clone);
        // const clone2 = [...downReq];
        // clone2.filter((ids) => !myDownReq.includes(ids));
        // setDownReq(clone2);
      }
    } else if (obj.lift2.direction === null && obj.lift1.direction !== null) {
      const curDir = obj.lift1.direction;
      // console.log(upReq);
      if (curDir === "up") {
        const myUpReq = upReq.filter((ids) => ids >= obj.lift1.currentPosition);
        console.log(upReq, "upreq");
        // const myDownReq = downReq.filter(
        //   (ids) => ids >= obj.lift1.currentPosition
        // );
        // const temp = [...myDownReq, ...myUpReq];
        //appen the accepted clients  to buffer and pop it from
        // pop it from global up req arra
        //change the lift position
        // uncheck the button on based on direction of lift
        console.log("upreq", upReq, " down2req", downReq);
        const clone = { ...obj };
        clone.lift1.buffer.push(...myUpReq);
        setUpReq(
          upReq.filter(
            (ids) => !myUpReq.includes(ids) && !clone.lift1.buffer.includes(ids)
          )
        );
        setobj(clone);
      } else if (curDir === "down") {
        // const myUpReq = upReq.filter((ids) => ids >= obj.lift1.currentPosition);
        const myDownReq = downReq.filter(
          (ids) => ids >= obj.lift1.currentPosition
        );
        // const temp = [...myDownReq, ...myUpReq];
        //appen the accepted clients  to buffer and pop it from
        // pop it from global up req arra
        //change the lift position
        // uncheck the button on based on direction of lift
        console.log("upreq", upReq, " down2req", downReq);
        const clone = { ...obj };
        clone.lift1.buffer.push(...myDownReq);
        setDownReq(
          downReq.filter(
            (ids) =>
              !myDownReq.includes(ids) && !clone.lift1.buffer.includes(ids)
          )
        );

        setobj(clone);
        // const clone2 = [...downReq];
        // clone2.filter((ids) => !myDownReq.includes(ids));
        // setDownReq(clone2);
      }
    } else {
    }
  }, 1000);

  // useEffect(() => {
  //   if (obj.lift1.direction === null && obj.lift2.direction === null) {
  //     if (upReq.length != 0) {
  //       const lift1diff = obj.lift1.currentPosition - upReq[0];
  //       const lift2diff = obj.lift2.currentPosition - upReq[0];

  //       if (Math.abs(lift1diff) <= Math.abs(lift2diff)) {
  //         if (obj.lift1.currentPosition > upReq[0]) {
  //           const motion = { ...obj };
  //           motion.lift1.direction = "down";
  //           setobj(motion);
  //         } else if (obj.lift1.currentPosition < upReq[0]) {
  //           const motion = { ...obj };
  //           motion.lift1.direction = "up";
  //           setobj(motion);
  //         }
  //       } else {
  //         if (obj.lift2.currentPosition > upReq[0]) {
  //           const motion = { ...obj };
  //           motion.lift2.direction = "down";
  //           setobj(motion);
  //         } else if (obj.lift2.currentPosition < upReq[0]) {
  //           const motion = { ...obj };
  //           motion.lift2.direction = "up";
  //           setobj(motion);
  //         }
  //       }
  //     }

  //     if (downReq.length != 0) {
  //       const lift1diff = obj.lift1.currentPosition - downReq[0];
  //       const lift2diff = obj.lift2.currentPosition - downReq[0];

  //       if (Math.abs(lift1diff) <= Math.abs(lift2diff)) {
  //         if (obj.lift1.currentPosition > downReq[0]) {
  //           const motion = { ...obj };
  //           motion.lift1.direction = "down";
  //           setobj(motion);
  //         } else if (obj.lift1.currentPosition < downReq[0]) {
  //           const motion = { ...obj };
  //           motion.lift1.direction = "up";
  //           setobj(motion);
  //         }
  //         //assign lifts based nearest position
  //         //both are at same floor send lift1
  //       } else {
  //         if (obj.lift2.currentPosition > downReq[0]) {
  //           const motion = { ...obj };
  //           motion.lift2.direction = "down";
  //           setobj(motion);
  //         } else if (obj.lift2.currentPosition < downReq[0]) {
  //           const motion = { ...obj };
  //           motion.lift2.direction = "up";
  //           setobj(motion);
  //         }
  //       }
  //     }
  //   }
  // }, [upReq, downReq]);

  // const setNewDownReq = (value) => {
  //   setDownReq(value);
  // };
  // const setNewUpReq = (value) => {
  //   setUpReq(value);
  // };

  // useEffect(() => {
  //   // second in motion;
  //   //while in upward motion follow reqPosition >= curPosition will be chosen

  //   //while in down motion follow reqPosition <= curPosition will be chosen
  //   if (obj.lift1.direction === null && obj.lift2.direction !== null) {
  //     //ditect directionof lift 2
  //     const curDir = obj.lift2.direction;
  //     console.log(upReq);
  //     if (curDir === "up") {
  //       const myUpReq = upReq.filter((ids) => ids >= obj.lift2.currentPosition);
  //       console.log(upReq, "upreq");
  //       const myDownReq = downReq.filter(
  //         (ids) => ids >= obj.lift2.currentPosition
  //       );
  //       const temp = [...myDownReq, ...myUpReq];

  //       //appen the accepted clients  to buffer and pop it from
  //       // pop it from global up req arra
  //       //change the lift position
  //       // uncheck the button on based on direction of lift
  //       console.log("upreq", upReq, " down2req", downReq, "my temp", temp);

  //       const clone = { ...obj };
  //       clone.lift2.buffer.push(...myUpReq);
  //       setobj(clone);
  //       const clone2 = [...upReq];
  //       clone2.filter((ids) => !myUpReq.includes(ids));
  //       setNewUpReq(clone2);
  //     } else if (curDir === "down") {
  //       const myUpReq = upReq.filter((ids) => ids >= obj.lift2.currentPosition);
  //       const myDownReq = downReq.filter(
  //         (ids) => ids >= obj.lift2.currentPosition
  //       );
  //       const temp = [...myDownReq, ...myUpReq];
  //       //appen the accepted clients  to buffer and pop it from
  //       // pop it from global up req arra
  //       //change the lift position
  //       // uncheck the button on based on direction of lift
  //       console.log("upreq", upReq, " down2req", downReq, "my temp", temp);

  //       const clone = { ...obj };
  //       clone.lift2.buffer.push(...myDownReq);
  //       setobj(clone);
  //       const clone2 = [...downReq];
  //       clone2.filter((ids) => !myDownReq.includes(ids));
  //       setNewDownReq(clone2);
  //     }
  //   } else if (obj.lift2.direction === null && obj.lift1.direction !== null) {
  //   } else {
  //   }
  // }, [upReq, downReq]);

  return (
    <div className="App">
      <div className="lift1" style={elevStylesl1}>
        lift1
      </div>
      <div className="navigation">
        {flobj.map((obj) => {
          return <Floor {...obj} key={obj.floor} />;
        })}
      </div>
      <div className="lift2" style={elevStylesl2}>
        lift2
      </div>
    </div>
  );
}

export default App;

function Floor(props) {
  const [up, setup] = useState(false);
  const [down, setdown] = useState(false);
  const setUpReq = props.setUpReq;
  const setDownReq = props.setDownReq;
  useEffect(() => {
    if (up == true)
      setUpReq((curr) => {
        return [...curr, props.floor];
      });
  }, [up]);
  useEffect(() => {
    if (down == true)
      setDownReq((curr) => {
        return [...curr, props.floor];
      });
  }, [down]);
  return (
    <div className="floor">
      <h1> {props.floor}floor</h1>
      {props.floor !== 5 && (
        <label>
          <input type="checkbox" checked={up} onChange={() => setup(true)} />
          up
        </label>
      )}
      {props.floor !== 1 && (
        <label>
          <input
            type="checkbox"
            checked={down}
            onChange={() => setdown(true)}
          />
          down
        </label>
      )}
    </div>
  );
}
