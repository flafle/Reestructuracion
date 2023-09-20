

document.getElementById('registerForm').addEventListener("submit", async(e)=>{
  e.preventDefault();
  console.log(e.target.children.password.value);
})
// const res = await fetch("http://localhost:8080/api/sessions", {
//   method: "POST",
//   headers:{
//     "Content-Type" : "application/json"
//   },
//   body: JSON.stringify({
//   })
  
//   });
 

// });



