import AlarmModel from "../models";

const getAlarms = (_, res) => {
  AlarmModel.getAlarms()
    .then((alarms) => {
      if (!alarms) {
        return res.status(500).json({ code: 500, error: "No alarms found" });
      } else {
        return res.status(200).json({ code: 200, data: alarms });
      }
    })
    .catch((err) => {
      return res.status(500).json({ code: 500, error: err });
    });
};

const createAlarm = (req, res) => {
  const { ring_at, name } = req.body;
  AlarmModel.createAlarm(ring_at, name)
    .then((alarm) => {
      if (!alarm) {
        return res.status(500).json({ code: 500, error: "Alarm not created" });
      } else {
        return res.status(201).json({ code: 201, data: alarm });
      }
    })
    .catch((err) => {
      return res.status(500).json({ code: 500, error: err });
    });
};

const updateAlarm = (req, res) => {
  const { id } = req.params;
  const { ring_at } = req.body;
  AlarmModel.updateAlarm(id, ring_at)
    .then((alarm) => {
      if (!alarm) {
        return res.status(500).json({ code: 500, error: "Alarm not updated" });
      } else {
        return res.status(200).json({ code: 200, data: alarm });
      }
    })
    .catch((err) => {
      return res.status(500).json({ code: 500, error: err });
    });
};

const deleteAlarm = (req, res) => {
  const { id } = req.params;
  AlarmModel.deleteAlarm(id)
    .then((alarm) => {
      if (!alarm) {
        return res.status(500).json({ code: 500, error: "Alarm not deleted" });
      } else {
        return res.status(200).json({ code: 200, data: alarm });
      }
    })
    .catch((err) => {
      return res.status(500).json({ code: 500, error: err });
    });
};

export default { getAlarms, createAlarm, updateAlarm, deleteAlarm };
