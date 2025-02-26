import express from "express"
import mongoose from "mongoose"
import Employee from "./models/Employee.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.status(200).send("<h1>Welcome to express.js</h1>")
})


app.get("/employee/:name", async (req, res) => {

    try {
        const name = req.params.name

        const employees = await Employee.find({
            name : {$regex : name, $options: "i"}
        })
        if (!employees.length) {
            return res.status(404).json({ message: `No employees found with the name ${name}` });
        }

        res.status(200).json(employees);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get("/employee", async (req, res) => {

    try {
        const employees = await Employee.find()
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get("/employee/:id", async (req, res) => {

    try {
        const employee = await Employee.findById(req.params.id)

        if(!employee) {
            return res.status(404).send({"message" : `Employee dont exist for the id ${req.params.id}`})
         }

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).send(error.message)
    }
})


app.post("/employee", async (req, res) => {

    console.log(req.body)
    try {
        console.log("commig to post method of employee")
        const employee = await Employee.create(req.body)
        res.status(200).send({"employee" : employee, "message" : "Employee created successfully"});
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.put("/employee/:id", async (req, res) => {

    try {
        
        const empId = req.params.id
        const employee = await Employee.findByIdAndUpdate(empId, req.body)

        if(!employee) {
           return res.status(404).send({"message" : `Employee dont exist for the id ${empId}`})
        }
         
        const updatedEmployee = await Employee.findById(empId)
        res.status(200).send({"employee" : updatedEmployee, "message" : "Employee updated successfully"})
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.delete("/employee/:id", async (req, res) => {

    try {
        
        const empId = req.params.id
        const employee = await Employee.findByIdAndDelete(empId)

        if(!employee) {
           return res.status(404).send({"message" : `Employee dont exist for the id ${empId}`})
        }
         
        
        res.status(200).send({"message" : "Employee deleted successfully"})
    } catch (error) {
        res.status(500).send(error.message)
    }
})


mongoose
.connect("mongodb+srv://root:root@employeedb.it7t4.mongodb.net/?retryWrites=true&w=majority&appName=EmployeeDB")
.then(() => {

    console.log("Connected to database")

    app.listen(5000, () => {
        console.log("Server started at port 5000")
    })
    
})
.catch((error) => {
    console.log(`Error connecting database ${error}`)
})