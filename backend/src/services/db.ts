import sqlite3 from "sqlite3";

const DATABASE_FILE = process.env.DATABASE_FILE;
if (!DATABASE_FILE)
  throw new Error('DATABASE_FILE not informed');

export const openConnection = () => {
  let db = new sqlite3.Database(DATABASE_FILE);
  return db;
}

export const dbQuery = async (query: string, params?: any[]) => {
  let db = openConnection();
  try {
    return await new Promise<any[]>((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err)
          reject(err);

        else
          resolve(rows);
      });
    });
  } finally {
    db.close();
  }
}