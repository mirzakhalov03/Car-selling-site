import React, { useState } from 'react';
import { useGetCarsQuery, useAddCarMutation, useUpdateCarMutation, useDeleteCarMutation } from './api/api';
import './App.css'; 

function App() {
  const { data: cars, error, isLoading } = useGetCarsQuery();
  const [addCar] = useAddCarMutation();
  const [updateCar] = useUpdateCarMutation();
  const [deleteCar] = useDeleteCarMutation();
  
  const [newCar, setNewCar] = useState({ name: '', brand: '' });

  const handleAddCar = async () => {
    await addCar(newCar);
    setNewCar({ name: '', brand: '' });
  };

  const handleUpdateCar = async (id) => {
    await updateCar({ id, name: 'Updated Name' });
  };

  const handleDeleteCar = async (id) => {
    await deleteCar(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div className="container">
      <h1>Cars</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.name}</td>
              <td>{car.brand}</td>
              <td>
                <button onClick={() => handleUpdateCar(car.id)}>Update</button>
                <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="input-container">
        <input
          type="text"
          placeholder="Name"
          value={newCar.name}
          onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Brand"
          value={newCar.brand}
          onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
        />
        <button onClick={handleAddCar}>Add Car</button>
      </div>
    </div>
  );
}

export default App;
