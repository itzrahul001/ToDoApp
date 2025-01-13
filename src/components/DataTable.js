import React, { useEffect, useState } from 'react';
import './DataTable.css';

const DataTable = () => {
    const [nameOfTask, setNameOfTask] = useState("");
    const [descOfTask, setDescOfTask] = useState("");
    const [time, setTime] = useState("");
    const [bioData, setBioData] = useState([]);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (savedTasks) {
            setBioData(savedTasks);
        }
    }, []);

    useEffect(() => {
        if (bioData.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(bioData));
        }
    }, [bioData]);

    const Onclear = () => {
        setNameOfTask("");
        setDescOfTask("");
        setTime("");
    };

    const onDelete = (id) => {
        const dt = bioData.filter((val) => id !== val.id);
        setBioData(dt);
    };

    function generateUniqueId() {
        return 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    const handleSave = (e) => {
        let error = "";
        if (nameOfTask === "") error += "Task name is required, ";
        if (descOfTask === "") error += "Task description is required, ";
        if (time <= 0) error += "Enter valid time, ";

        if (error === '') {
            e.preventDefault();
            const newObject = {
                id: generateUniqueId(),
                nameOfTask,
                descOfTask,
                time,
                completed: false,
            };
            setBioData([...bioData, newObject]);
            Onclear();
        } else {
            alert(error);
        }
    };

    const toggleCompletion = (id) => {
        const updatedData = bioData.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setBioData(updatedData);
    };

    const pendingCount = bioData.filter((task) => !task.completed).length;
    const completedCount = bioData.filter((task) => task.completed).length;

    return (
        <div className="main-container">
            <div className="editBox">
                <h1>Add Task</h1>
                <label htmlFor="nameOfTask">Task Name:</label>
                <input className="custom-input" type="text" id="nameOfTask" onChange={(e) => setNameOfTask(e.target.value)} value={nameOfTask} />
                <label htmlFor="descOfTask">Task Description:</label>
                <input className="custom-input" type="text" id="descOfTask" onChange={(e) => setDescOfTask(e.target.value)} value={descOfTask} />
                <label htmlFor="time">Time:</label>
                <input className="custom-input" type="time" id="time" onChange={(e) => setTime(e.target.value)} value={time} />
                <div className="btnClass">
                    <button onClick={(e) => handleSave(e)} style={{ background: '#5ee35e' }}>ADD</button>
                    <button onClick={Onclear} style={{ background: '#6969e6' }}>Cancel</button>
                </div>
            </div>
            <div className="data-table">
                <h2>Pending Tasks: {pendingCount} | Completed Tasks: {completedCount}</h2>
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Id</th>
                                <th>Task Name</th>
                                <th>Task Description</th>
                                <th>Time</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bioData.map((val) => (
                                <tr key={val.id}>
                                    <td>
                                        <input type="checkbox" checked={val.completed} onChange={() => toggleCompletion(val.id)} />
                                    </td>
                                    <td style={{ textDecoration: val.completed ? "line-through" : "none" }}>{val.id}</td>
                                    <td style={{ textDecoration: val.completed ? "line-through" : "none" }}>{val.nameOfTask}</td>
                                    <td style={{ textDecoration: val.completed ? "line-through" : "none" }}>{val.descOfTask}</td>
                                    <td style={{ textDecoration: val.completed ? "line-through" : "none" }}>{val.time}</td>
                                    <td>
                                        <button style={{ background: 'red' }} onClick={() => onDelete(val.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
