import React, { useState, useEffect } from 'react';
import styled, { StyleSheetConsumer } from 'styled-components';
import axios from 'axios';


// Main container with flex layout
const Container = styled.div`
    display: flex;
    width: 100%;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
`;

// Form section (left side - 60%)
const FormSection = styled.div`
    width: 60%;
    padding: 30px;
    background-color: #f4f4f4;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Form element styling
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Input styling
const Input = styled.input`
    padding: 10px 15px;
    font-size: 16px;
    border: 2px solid #007BFF;
    border-radius: 8px;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
        border-color: #0056b3;
        box-shadow: 0 0 8px rgba(0, 91, 187, 0.5);
    }

    &::placeholder {
        color: #007BFF;
    }
`;

// Submit button styling
const Button = styled.button`
    grid-column: span 2;
    padding: 12px 20px;
    border: 2px solid #007BFF;
    border-radius: 8px;
    background-color: #007BFF;
    color: white;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-right: 10px;

    &:hover {
        background-color: #0056b3;
    }

    &:active {
        background-color: #004085;
    }
`;

// Right section (employee list - 40%)
const EmployeeListSection = styled.div`
    width: 40%;
    padding: 30px;
    background-color: #e9f2ff;
    border-radius: 10px;
    margin-left: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    max-height: 90vh;
`;

// Heading styling
const Heading = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color: #007BFF;
    margin-bottom: 20px;
`;

// Employee card
const EmployeeCard = styled.div`
    border: 2px solid #007BFF;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 15px;
    background-color: white;
    transition: all 0.3s ease;

    &:hover {
        background-color: #e1ecf7;
        transform: scale(1.03);
    }
`;

// Employee name
const EmployeeName = styled.h3`
    font-size: 20px;
    font-weight: bold;
    color: #0056b3;
    margin: 0;
`;

// Employee details
const EmployeeDetails = styled.p`
    font-size: 16px;
    color: #333;
    margin: 5px 0;
`;
const EditDeleteButton = styled.button`
  padding: 8px 16px;
  color: white;
  background: linear-gradient(135deg, #007BFF, #0056b3);
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 20px;

  &:hover {
    background: linear-gradient(135deg, #0056b3, #004085);
    transform: translateY(-2px);
  }

  &:active {
    background: linear-gradient(135deg, #004085, #002752);
    transform: translateY(0);
  }
`;


const Body = () => {
    const [employees, setEmployees] = useState([])
    const [editId, setEditId] = useState(null)

  

    const [employeeData, setEmployeeData] = useState({
        employeeId : '',
        name : '',
        age: 0,
        gender: '',
        email: '',
        phoneNumber: '',
        position: '',
        department: '',
        salary: 0,
    
    })

    const inputChange = (e) => {
        const {name, value } = e.target;
        setEmployeeData({...employeeData, [name] : value})
    }

    const fetchEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:5000/employee")
            setEmployees(response.data)
        } catch (error) {
            console.error(error.message)
        }
    }


    const handleEdit = async (employee) => {
     setEmployeeData(employee)
     setEditId(employee._id)
    }


    const save = async (e) => {
        e.preventDefault(); // Prevents default form submission
    
        try {

               
            if(!editId) {
                const response = await axios.post("http://localhost:5000/employee", employeeData);
            
                if (response.status === 200) {
                    alert("Employee created successfully");
                    setEmployeeData({
                        employeeId: '',
                        name: '',
                        age: 0,
                        gender: '',
                        email: '',
                        phoneNumber: '',
                        position: '',
                        department: '',
                        salary: 0,
                    });
                }
            } else {

                const response = await axios.put(`http://localhost:5000/employee/${editId}`, employeeData);

                if (response.status === 200) {
                    alert("Employee updated successfully");
                    setEditId(null)
                    setEmployeeData({
                        employeeId: '',
                        name: '',
                        age: 0,
                        gender: '',
                        email: '',
                        phoneNumber: '',
                        position: '',
                        department: '',
                        salary: 0,
                    });
                }

            }
                
            
        
            fetchEmployees();
           
        } catch (error) {
            console.error("Error creating employee:", error.message);
        }
    };
    
    useEffect(() => {
        fetchEmployees()
    }, [])

    return (
        <Container>
            <FormSection>
                <Heading>Create New Employee</Heading>
                <Form>
                    <Input type="text" name="employeeId" 
                    placeholder="Enter employee ID" 
                    onChange={inputChange}
                    value={employeeData.employeeId}
                    />
                    <Input type="text"
                    value={employeeData.name}
                     name="name" 
                     placeholder="Enter employee name" 
                     onChange={inputChange}
                     />
                    <Input type="number" 
                    value={employeeData.age}
                    name="age" 
                    placeholder="Enter employee age" 
                    onChange={inputChange}
                    />
                    <Input type="text" 
                      value={employeeData.gender}
                    name="gender" placeholder="Enter employee gender" 
                    onChange={inputChange}
                    />
                    <Input type="number" 
                      value={employeeData.phoneNumber}
                    name="phoneNumber"
                     placeholder="Enter employee number" 
                     onChange={inputChange}
                     />

<Input type="email" 
                      value={employeeData.email}
                    name="email"
                     placeholder="Enter employee email" 
                     onChange={inputChange}
                     required
                     />

                    <Input 
                      value={employeeData.position}
                    type="text" 
                    name="position" 
                    placeholder="Enter employee position" 
                    onChange={inputChange}
                    />
                    <Input type="text" 
                      value={employeeData.department}
                    name="department" 
                    placeholder="Enter employee department" 
                    onChange={inputChange}
                    />
                    <Input type="number" name="salary"
                      value={employeeData.salary}
                     placeholder="Enter employee salary" 
                     onChange={inputChange}
                     />
               
                    <Button onClick={(e) => {save(e)}}>{editId ? "Update" : "Save" }</Button>
                </Form>
            </FormSection>

            <EmployeeListSection>
                <Heading>Registered Employees</Heading>
                {employees.length > 0 ? (
                    employees.map((employee) => (
                        <EmployeeCard key={employee.employeeId}>
                            <EmployeeName>{employee.name}</EmployeeName>
                            <EmployeeDetails>ID: {employee.employeeId}</EmployeeDetails>
                            <EmployeeDetails>Age: {employee.age}</EmployeeDetails>
                            <EmployeeDetails>Gender: {employee.gender}</EmployeeDetails>
                            <EmployeeDetails>Email: {employee.email}</EmployeeDetails>
                            <EmployeeDetails>Phone: {employee.phoneNumber}</EmployeeDetails>
                            <EmployeeDetails>Position: {employee.position}</EmployeeDetails>
                            <EmployeeDetails>Department: {employee.department}</EmployeeDetails>
                            <EmployeeDetails>Salary: ${employee.salary}</EmployeeDetails>
                            <EditDeleteButton onClick={() => { handleEdit(employee) }}> Edit</EditDeleteButton>
                            <EditDeleteButton onClick={async () => {
                                 await axios.delete(`http://localhost:5000/employee/${employee._id}`)
                                 fetchEmployees()
                            }}> delete</EditDeleteButton>
                        </EmployeeCard>
                    ))
                ) : (
                    <p>No employees found</p>
                )}
            </EmployeeListSection>
        </Container>
    );
};

export default Body;
