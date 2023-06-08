import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [obj, setobj] = useState({
    lift1: {
      direction: null,
      currentPosition: 1,
      buffer: [],
    },
    lift2: {
      direction: null,
      currentPosition: 2,
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

  useEffect(() => {
    if (obj.lift1.direction === null && obj.lift2.direction === null) {
      if (upReq.length != 0) {
        const lift1diff = obj.lift1.currentPosition - upReq[0];
        const lift2diff = obj.lift2.currentPosition - upReq[0];

        if (Math.abs(lift1diff) <= Math.abs(lift2diff)) {
          if (obj.lift1.currentPosition > upReq[0]) {
            const motion = { ...obj };
            motion.lift1.direction = "down";
            setobj(motion);
          } else if (obj.lift1.currentPosition < upReq[0]) {
            const motion = { ...obj };
            motion.lift1.direction = "up";
            setobj(motion);
          }
        } else {
          if (obj.lift2.currentPosition > upReq[0]) {
            const motion = { ...obj };
            motion.lift2.direction = "down";
            setobj(motion);
          } else if (obj.lift2.currentPosition < upReq[0]) {
            const motion = { ...obj };
            motion.lift2.direction = "up";
            setobj(motion);
          }
        }
      }

      if (downReq.length != 0) {
        const lift1diff = obj.lift1.currentPosition - downReq[0];
        const lift2diff = obj.lift2.currentPosition - downReq[0];

        if (Math.abs(lift1diff) <= Math.abs(lift2diff)) {
          if (obj.lift1.currentPosition > downReq[0]) {
            const motion = { ...obj };
            motion.lift1.direction = "down";
            setobj(motion);
          } else if (obj.lift1.currentPosition < downReq[0]) {
            const motion = { ...obj };
            motion.lift1.direction = "up";
            setobj(motion);
          }
          //assign lifts based nearest position
          //both are at same floor send lift1
        } else {
          if (obj.lift2.currentPosition > downReq[0]) {
            const motion = { ...obj };
            motion.lift2.direction = "down";
            setobj(motion);
          } else if (obj.lift2.currentPosition < downReq[0]) {
            const motion = { ...obj };
            motion.lift2.direction = "up";
            setobj(motion);
          }
        }
      }
    }
  }, [upReq, downReq]);

  const setNewDownReq = (value) => {
    const downReq = setDownReq(value);
  };

  useEffect(() => {
    // second in motion;
    //while in upward motion follow reqPosition >= curPosition will be chosen

    //while in down motion follow reqPosition <= curPosition will be chosen
    if (obj.lift1.direction === null && obj.lift2.direction !== null) {
      //ditect directionof lift 2
      const curDir = obj.lift2.direction;
      console.log(upReq);
      if (curDir === "up") {
        const myUpReq = upReq.filter((ids) => ids >= obj.lift2.currentPosition);
        console.log(upReq, "upreq");
        const myDownReq = downReq.filter(
          (ids) => ids >= obj.lift2.currentPosition
        );
        const temp = [...myDownReq, ...myUpReq];

        //appen the accepted clients  to buffer and pop it from
        // pop it from global up req arra
        //change the lift position
        // uncheck the button on based on direction of lift
        console.log("upreq", upReq, " down2req", downReq, "my temp", temp);

        const clone = { ...obj };
        clone.lift2.buffer.push(...myUpReq);
        setobj(clone);
        const clone2 = [...upReq];
        clone2.filter((ids) => !myUpReq.includes(ids));
        setUpReq(clone2);
      } else if (curDir === "down") {
        const myUpReq = upReq.filter((ids) => ids >= obj.lift2.currentPosition);
        const myDownReq = downReq.filter(
          (ids) => ids >= obj.lift2.currentPosition
        );
        const temp = [...myDownReq, ...myUpReq];
        //appen the accepted clients  to buffer and pop it from
        // pop it from global up req arra
        //change the lift position
        // uncheck the button on based on direction of lift
        console.log("upreq", upReq, " down2req", downReq, "my temp", temp);

        const clone = { ...obj };
        clone.lift2.buffer.push(...myDownReq);
        setobj(clone);
        const clone2 = [...downReq];
        clone2.filter((ids) => !myDownReq.includes(ids));
        setNewDownReq(clone2);
      }
    } else if (obj.lift2.direction === null && obj.lift1.direction !== null) {
    } else {
    }
  }, [upReq, downReq]);

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
