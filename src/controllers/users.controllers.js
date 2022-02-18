const database = require("../database");

class Users{
  async getAll(){
    const result = await database.query("SELECT * FROM users")
    return result[0]
  }
  async create(data){
    const result = await database.insert('users', data)
    return result;
  }
  async update(data,id){
    const result = await database.update('users',data,id)
    return result;
  }
  async delete(id){
    const result = await database.del('users', id)
    return result
  }
}

module.exports = Users