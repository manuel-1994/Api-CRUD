const mysql = require('mysql2/promise')

const connection = async ()=>{
  return await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'manuel',
    password: 'e1250401',
    database: 'ProyectoCRUD',
  }).catch(error => error)
}
 const conn = connection()
  
const query = async(sql,data)=>{
    return (await conn).query(sql,data)
} 

const insert = async(tableName, data) =>{
  try {
    await query(`INSERT INTO ${tableName}(??) VALUES(?)`,[Object.keys(data), Object.values(data)])
    return {data,success:true}
  } catch (error) {
    return {error:error.sqlMessage, success:false}
  }
}

const update = async(tableName, data, id) =>{
  try {
    await query(`UPDATE ${tableName} SET??=? WHERE id=? `,[Object.keys(data), Object.values(data), id])
    return {data,success:true}
  } catch (error) {
    return {error:error.sqlMessage, success:false}
  }
}

const del = async(tableName, data) =>{
  try {
    await query(`DELETE FROM ${tableName} WHERE id=?`,[data])
    return {data,success:true}
  } catch (error) {
    return {error:error.sqlMessage, success:false}
  }
}

module.exports ={
  query,
  insert,
  update,
  del
}