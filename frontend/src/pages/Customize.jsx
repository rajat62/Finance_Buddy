import React, { useState } from 'react'
import { addCategory } from '../redux/slices/category';
import { useDispatch, useSelector } from 'react-redux';

const Customize = () => {

      const dispatch = useDispatch();

      const {username} = useSelector(state=> state.auth)
      const [formData, setFormData] = useState({
            name: "",
            username: username ,
          });
        
          const handleChange = (event) => {
            const { name, value } = event.target;
            setFormData({ ...formData, [name]: value });
          };
        
          const handleSubmit = (event) => {
            event.preventDefault();
            dispatch(addCategory(formData));
          };

  return (
    <div>
      <div>
            <h4 className='pb-2'>Add Category</h4>
            <form onSubmit={handleSubmit}> 
                  <input name="name" placeholder='category name' onChange={handleChange} className='w-25 form-control'/>
                  <input type='submit' className='w-25 mt-2 form-control'/>
            </form>
      </div>
    </div>
  )
}

export default Customize