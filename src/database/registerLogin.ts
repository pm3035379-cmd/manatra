import * as Sqlite from 'expo-sqlite';

const db=Sqlite.openDatabaseSync("loginregister.db");

export type Reg={
    id:number,
    name:string;
    password:string;
    question:string;
    answer:string
}

const initialize =async()=>{
   await db.runAsync("CREATE TABLE IF NOT EXISTS register(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, password TEXT NOT NULL,question TEXT NOT NULL,answer TEXT NOT NULL )");
   
}
const ids=async()=>{
    return new Date().toISOString();
}
export const InsertRegister=async({name,password,question,answer}:{name:string,password:string,question:string,answer:string}):Promise<void>=>{
    await initialize();
 await db.runAsync(`INSERT INTO register (id,name,password,question,answer) VALUES(?,?,?,?)`,[await ids(),name,password,question,answer]);
};

export const DisplayRegister=async():Promise<Reg[]>=>{
    await initialize();
 return await db.getAllAsync<Reg>(`SELECT * FROM register`)
 
};

export  const DeleteRegister=async({id}:{id:number})=>{
    await initialize();
    await db.runAsync(`DELETE FROM register WHERE id=?`,[id])
};

export const update=async({id,name,password,question,answer}:{id:number,name:string,password:string,question:string,answer:string}):Promise<void>=>{
    await initialize();
await db.runAsync(`UPDATE register SET name=?,password=?,question=?,answer=? WHERE id=?`,[name,password,question,answer,id])
}

