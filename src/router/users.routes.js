const {Router} = require('express')
const path = require("path")
const Users = require('../controllers/users.controllers')

const views =(document)=>{
  return path.join(__dirname,"../","views",document)
}

const users = ()=>{
  //router de la vista
  const routerView = Router()
  //router general
  const router = Router()
  const usersController = new Users()

  routerView.get('/', (req,res)=>{
    return res.sendFile(views('users.html'))
  })

  router.get('/', async (req,res)=>{
    const result = await usersController.getAll();
    return res.status(200).json(result)
  })

  router.post('/', async(req,res)=>{
    const data = req.body;
    const result = await usersController.create(data);
    return res.status(result.success?201:400).json(result);
  })

  router.put('/:id', async(req,res)=>{
    const data = req.body;
    const {id} = req.params
    const result = await usersController.update(data,id)
    return res.status(result.success?200:400).json(result)
  })

  router.delete('/:id', async(req,res)=>{
    const {id} = req.params
    const result = await usersController.delete(id)
    return res.status(result.success?200:400).json(result)
  })

  return {router, routerView}
}

module.exports = users