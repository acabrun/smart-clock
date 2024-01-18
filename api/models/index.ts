import sqlite3 from "sqlite3";
import { Alarm } from "../types/Alarm";

const db = new sqlite3.Database(
  "./db/db.sqlite",
  sqlite3.OPEN_READWRITE,
  (err: any) => {
    if (err && err.code == "SQLITE_CANTOPEN") {
      return createDatabase();
    } else if (err) {
      console.log("Getting error " + err);
    }
    return db;
  }
);

const createDatabase = () => {
  var newdb = new sqlite3.Database("./db/db.sqlite", (err) => {
    if (err) {
      console.log("Getting error " + err);
    }
    return createTables(newdb);
  });
};

const createTables = (newdb) => {
  return newdb.run(
    "CREATE TABLE IF NOT EXISTS alarms (id INTEGER PRIMARY KEY AUTOINCREMENT, ring_at INTEGER, name TEXT)"
  );
};

const createAlarm = (time: number, name: string): Promise<Alarm | {}> => {
  const result = new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO alarms (ring_at, name) VALUES (?,?)",
      [time, name],
      function (err) {
        if (err) {
          reject(err);
        }
        resolve({ id: this.lastID, ring_at: time, name });
      }
    );
  });
  return result;
};

const getAlarms = (): Promise<Alarm[] | {}> => {
  const result = new Promise((resolve, reject) => {
    db.all("SELECT * FROM alarms", [], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
  return result;
};

const updateAlarm = (id: number, time: number): Promise<any> => {
  const result = new Promise((resolve, reject) => {
    db.run(
      "UPDATE alarms SET ring_at = ? WHERE id = ?",
      [time, id],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
  return result;
};

const deleteAlarm = (id: number): Promise<any> => {
  const result = new Promise((resolve, reject) => {
    db.run("DELETE FROM alarms WHERE id = ?", [id], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve({ id });
    });
  });
  return result;
};

export default {
  createAlarm,
  getAlarms,
  updateAlarm,
  deleteAlarm,
};
