import React, { useContext,useEffect,useState } from 'react'
import AuthContext from '../context/AuthContext'
import axios from 'axios';

function Home() {

  const [contacts, setContacts] = useState([]);
  const[loading,setLoading] = useState(false);
    const {user} = useContext(AuthContext);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  
    const fetchPosts = async()=>{
      try{
    const res = await axios.get("http://localhost:8800/api/contacts/mycontacts", {
      headers : headers,
    })
    

    setContacts(res.data);
   
    // // console.log(contacts[0].name)
    // res.data.map((s)=>{
    //   console.log(s.name);
    // })
    
  }
  catch(err){
    console.log(err);
  }
}


  useEffect(()=>{
    // localStorage.clear();
    fetchPosts();
  },[])

// useEffect( () => {

//   async function getContact(){
//   setLoading(true);
//   try {
//     const res = await fetch(`http://localhost:8800/api/contacts/mycontacts`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     const result = await res.json();
//     if (!result.error) {
//       setContacts(result);
//       setLoading(false);
//     } else {
//       console.log(result);
//       setLoading(false);
//     }
//   } catch (err) {
//     console.log(err);
//   }}

//   getContact();
// }, []);

  return (

    <div>
        {user? (
        <>
        <p>logout</p>
        </>
        ) : (
          <>
          login
          </>
        )
        }


<div>
  <h1>Your Contacts</h1>
</div>
    {
      contacts.map((contact) =>{
        <div key={contact._id}>
          {contact.name};
          l
          </div>
      })
    }
    {/* {contacts[0]} */}
    </div>
  )
}

export default Home