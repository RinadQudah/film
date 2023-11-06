import React, { useState } from 'react'

function Header({ onSearch }) {
  const [query, setQuery] = useState('');
  
    const handleSearch = () => {
      onSearch(query);
    };
  return (
    <div  className='d-flex justify-content-between p-1 bg-black'id='d1'>

      <div>
        <a href="#" style={{"color":"white","textDecoration":"none"}}>MovieDb App</a>
        <a href="#" style={{"marginLeft":"20px" ,"color":"white","textDecoration":"none"}}>Trinding</a>
      </div>
      <div>
      <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}style={{"marginLeft":"5px","backgroundColor":"Gray","color":"white","borderRadius":"5px"}}>Search</button>
      </div>
      
     </div>
  )
}

export default Header