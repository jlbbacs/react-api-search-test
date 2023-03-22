import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Datatable from 'react-data-table-component'
import './App.css'

function App() {
  const column = [
    {name:'id',selector : row => row.id ,sortable: true},
    {name:'title',selector : row => row.title, sortable: true},
    {name:'price',selector: row => row.price},
    {name:'image',selector: row =><img src = {row.image}/> }
    
  ]
  useEffect(()=> {
      const fetchData = async () => {
       axios.get('https://fakestoreapi.com/products')
        .then(res => {
          setRecord(res.data)
          setfilterRecord(res.data)
        })
        .catch(err => console.log(err))
      
      }
      fetchData();
  },[])
  const [record,setRecord] = useState([])
  const [filterRecord,setfilterRecord] = useState([])
  const handleFilter = (event) => {
    const newData = filterRecord.filter(row => row.title.toLowerCase().includes(event.target.value.toLowerCase()))
    setRecord(newData);
  }
  return (
    <div style={{padding: '50px 10%', backgroundColor: 'white'}}>
        <div className=" text-box" style= {{display:'flex' ,justifyContent:'right'}}>
        <input type = 'text' placeholder='...search' onChange = {handleFilter}/>
        </div>
      <Datatable columns={column}
      data={record}>
      
      </Datatable>
      
      
    </div>
  )
}

export default App
