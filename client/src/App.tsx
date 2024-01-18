import "./App.css";
import Api from "./api";
import { useEffect, useState } from "react";
import { CountDown } from "./components/CountDown";
import { Alarm } from "./types/Alarm";
import { calculateTimeLeft } from "./utils/time";

type AlarmState = {
  time: number;
  name: string;
};
const initSentence = "What time would you like to set your alarm ?";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarm, setAlarm] = useState<AlarmState>({
    time: null,
    name: null,
  });
  const [displayModal, setDisplayModal] = useState(false);
  const [whatTimeText, setWhatTimeText] = useState(initSentence);
  const [alarmList, setAlarmList] = useState<Alarm[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    getAlarms();
  }, []);

  const saveAlarm = () => {
    try {
      Api.fetchPost("/alarms", {
        ring_at: alarm.time,
        name: alarm.name ? alarm.name : "Alarm",
      }).then(() => {
        setAlarm({ time: null, name: null });
        getAlarms();
      });
    } catch (error) {
      console.error("App.js::saveAlarm(): ", error);
    }
  };

  const getAlarms = () => {
    try {
      Api.fetchGet("/alarms").then((res) => {
        setAlarmList(res.data);
      });
    } catch (error) {
      console.error("App.js::getAlarms(): ", error);
    }
  };

  const deleteAlarm = (id: number) => {
    try {
      Api.fetchDelete(`/alarms/${id}`).then(() => {
        getAlarms();
      });
    } catch (error) {
      console.error("App.js::deleteAlarm(): ", error);
    }
  };

  const handleAlarm = () => {
    if (alarm.time) {
      const alm = new Date(alarm.time);
      const alarmTime = alm.getTime();
      const currentTime = new Date().getTime();
      const timeLeft = alarmTime - currentTime;
      if (timeLeft < 0) {
        setWhatTimeText("Please choose a time in the future");
        return;
      }
      saveAlarm();
      handleCloseModal();
    } else {
      setWhatTimeText("Please choose a time");
    }
  };

  const handleCloseModal = () => {
    setWhatTimeText(initSentence);
    setDisplayModal(false);
  };

  return (
    <div className="App">
      <div className="clockContainer">
        <div
          style={{
            color: "white",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            padding: 10,
            backgroundColor: "black",
          }}
        >
          {!!alarmList.length &&
            alarmList.map((alarm: Alarm, index: number) => {
              return (
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    marginBottom: index === alarmList.length - 1 ? 0 : 10,
                    justifyContent: "space-between",
                  }}
                  key={alarm.id}
                  className="alarmContainer"
                >
                  <CountDown
                    name={alarm.name}
                    timeLeft={calculateTimeLeft(alarm.ring_at)}
                  />
                  <button onClick={() => deleteAlarm(alarm.id)}>Delete</button>
                </div>
              );
            })}
        </div>
        <h1 style={{ color: "white" }}>{currentTime.toLocaleTimeString()}</h1>
        <button onClick={() => setDisplayModal(true)}>Set Alarm</button>
        {displayModal && (
          <div className="modal">
            <div className="modalContent">
              <p
                style={{
                  textAlign: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                Alarm
              </p>
              <p style={{ textAlign: "center" }}>{whatTimeText}</p>
              <br />
              <label htmlFor="name">Name</label>
              <input
                className="name"
                type="text"
                onChange={(e) => setAlarm({ ...alarm, name: e.target.value })}
              />
              <br />
              <label htmlFor="time">Time</label>
              <input
                className="time"
                type="datetime-local"
                onChange={(e) =>
                  setAlarm({ ...alarm, time: e.target.valueAsNumber })
                }
              />
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <button className="button" onClick={handleCloseModal}>
                  Close
                </button>
                <button className="button" onClick={handleAlarm}>
                  Set
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
