import * as SQLite from 'expo-sqlite';

const database= SQLite.openDatabaseSync("theme.db");

type T={
    id:number,
    text:string
}

const initialize=async()=>{
   
    database.execAsync("CREATE TABLE IF NOT EXISTS selectTheme (id NUMBER PRIMARY KEY AUTOINCREMENT,text TEXT NOT NULL)");

}

const id=()=>{
    return new Date().toISOString();
}

export const insertTheme=async({text}:{text:string})=>{
  await initialize();
  database.runAsync(`INSERT INTO selectTheme (text) VALUES(?)`,[id(), text] );
};

export const DisplayTheme = async()=>{
    await initialize();
    database.getAllAsync(`SELECT * FROM selectTheme`);
};

export const updateTheme=async({id,text}:{
    id:number,
    text:string
})=>{
    await initialize();
    database.runAsync(`UPDATE selectTheme SET text=? where id=?`,[id,text])
};

export const deleteTheme=async({id}:{id:number})=>{
    database.runAsync(`DELETE selectTheme WHERE ID=?`,[id])
};