let userData = []
const contentFrom = document.querySelector('.content-form')
const userForm = document.querySelector('#userForm')
const users = document.querySelector('#users')
const btnNew = document.querySelector('#btnNew')
const btnClose =document.querySelector('#btnClose')

//actions buttons
btnNew.onclick = ()=>{
  contentFrom.classList.remove('hide')
  userForm.reset()
  userForm.btn.innerHTML= 'Crear usuario'
  userForm.onsubmit = create
}

btnClose.onclick = (event)=>{
  event.preventDefault()
  contentFrom.classList.add('hide')
}

function edit(id){
  const user = userData.find((user)=> user.id === id)
  userForm.name.value = user.username
  userForm.email.value = user.email
  userForm.photo.value = user.profile_Picture
  userForm.age.value = new Date(user.age).toISOString().slice(0, 10)
  userForm.address.value = user.address
  userForm.job.value = user.job
  userForm.salary.value = user.salary
  userForm.btn.innerHTML= 'Editar usuario'
  userForm.onsubmit= (event)=> update(event,id)
  contentFrom.classList.remove('hide')
}


//render
function renderUsers (){
  if(userData.length===0){
    return users.innerHTML ='<p>No hay usuarios registrados</p>'
  }
  users.innerHTML= `      
  <tr>
    <th>Foto de perfil</th>
    <th>Nombre</th>
    <th>Edad</th>
    <th>Email</th>
    <th>Dirección</th>
    <th>Profesion</th>
    <th>Salario</th>
    <th></th>
    <th></th>
  </tr>`
  for (const user of userData) {
    const age = calculateAge(user.age)
    users.innerHTML += `
      <tr>
        <td><img class="profile" src="${user.profile_Picture?user.profile_Picture:'/image/defaultProfile.png'}" alt="photo"></td>
        <td>${user.username}</td>
        <td>${age}</td>
        <td>${user.email}</td>
        <td>${user.address?user.address:"---"}</td>
        <td>${user.job?user.job:"---"}</td>
        <td>${user.salary?user.salary:"---"}</td>
        <td><button class="btn--edit" onClick="edit(${user.id})">edit</button></td>
        <td><button class="btn--danger" onClick="del(${user.id})">delete</button></td>
      </tr>
    `
  }
}
const calculateAge = (age)=>{
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  const currentDay = new Date().getDate()
  const month = new Date(age).getMonth()
  const day = new Date(age).getDate()

  if(currentMonth>=month && currentDay>=day){
    return currentYear - new Date(age).getFullYear() +1
  }
  return currentYear - new Date(age).getFullYear()
}

//get
function getUser(){
  fetch("/api/users")
  .then(res=>{
    return res.json()
  })
  .then(data=>{
    userData= data
    renderUsers()
  })
}

///create
function create(event){
  event.preventDefault()
  fetch('/api/users',{
    method: "POST",
      headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
      username: event.target.name.value,
      age: event.target.age.value,
      email: event.target.email.value,
      address: event.target.address.value,
      job: event.target.job.value,
      salary: event.target.salary.value || null,
      profile_Picture: event.target.photo.value,
    })
  })
  .then(res=>{
    return res.json()
  })
  .then((data)=>{
    if(data.error){
      return alert(data.error);
    }
    userForm.reset()
    contentFrom.classList.add('hide')
    getUser()
  })
}

//update
function update(event,id){
  event.preventDefault()
  fetch(`/api/users/${id}`,{
    method: "PUT",
      headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
      username: event.target.name.value,
      age: event.target.age.value,
      email: event.target.email.value,
      address: event.target.address.value,
      job: event.target.job.value,
      salary: event.target.salary.value || null,
      profile_Picture: event.target.photo.value,
    })
  })
  .then(res=>{
    return res.json()
  })
  .then((data)=>{
    if(data.error){
      return alert(data.error)
    }
    userForm.reset()
    contentFrom.classList.add('hide')
    getUser()
  })
}

//delete
function del(id){
  fetch(`/api/users/${id}`,{
    method:"DELETE"
})
.then((res)=>{
    return res.json()
})
.then((data)=>{ 
    getUser()
    return data
})
}

getUser()