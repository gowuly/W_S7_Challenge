import React, { useEffect, useState } from 'react'
import *as Yup from 'yup'

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, validationErrors.fullNameTooShort)
    .max(20, validationErrors.fullNameTooLong)
    .required('Full name is required'),
  size: Yup.string()
    .oneOf(['S', 'M', 'L'], validationErrors.sizeIncorrect)
    .required('Size is required'),
});

// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers'},
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]



export default function Form() {

  const [fullName, setFullName] = useState('');
  const [size, setSize] = useState('');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
    if (success) {
      setErrors({});
      }
     }, [success]);

    const handleToppingChange = (topping) => {
     setSelectedToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((t) => t !== topping)
        : [...prev, topping]
       );
      };

    

    const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { fullName, size, selectedToppings };
    

    try {
        await validationSchema.validate(data, { abortEarly: false });
        // If validation passes, you can make your API call here
        console.log('Order submitted:', data);
        setSuccess(true);
        setFailure(false);
        setErrors({});
         
        
        const sizeMapping = {
          S: 'small',
          M: 'medium',
          L: 'large'
        };

        // Construct the success message
        setSuccessMessage(`Thank you for your order, ${fullName}! Your ${sizeMapping[size]} pizza with ${selectedToppings.length} topping${selectedToppings.length !== 1 ? 's' : ''} is on the way.`);
        // Reset form fields
        setFullName(''); // Resetting full name
        setSize(''); // Resetting size
        setSelectedToppings([]); // Resetting selected toppings

       } catch (err) {
        const validationErrors = {};
        err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
        setSuccess(false);
        setFailure(true);
        }
      };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Order Your Pizza</h2>
      {successMessage && <div className='success'>{successMessage}</div>}
      {failure && <div className='failure'>Something went wrong</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input 
           placeholder="Type full name"
           id="fullName" 
           type="text"
           value={fullName}
           onChange={(e) => setFullName(e.target.value)}
            />
           
        </div>
        {errors.fullName && <div className='error'>Bad value</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select 
            id="size" 
            value={size}
          onChange={(e) => setSize(e.target.value)} >
          <option value="">----Choose Size----</option>
           <option value="S">Small</option>
           <option value="M">Medium</option>
           <option value="L">Large</option>
            {/* Fill out the missing options */}
          </select>
        </div>
        {errors.size && <div className='error'>Bad value</div>}
      </div>

      <div className="input-group">
        {/* 👇 Maybe you could generate the checkboxes dynamically */}
     <fieldset>
      <legend>Toppings:</legend>
        {toppings.map((topping) => (
        <label key={topping.topping_id}>
        <input
        type="checkbox"
        name={topping.text}
        checked={selectedToppings.includes(topping.text)} 
        onChange={() => handleToppingChange(topping.text)} 
        
      />
      {topping.text}
      <br/>
    </label>
    
  ))}
</fieldset>
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input type="submit" disabled={!fullName || !size || Object.keys(errors).length > 0} />
    </form>
  )
}
