import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import WorkoutCreate from './WorkoutCreate';
import WorkoutTable from "./workoutTable";
import WorkoutEdit from "./WorkoutEdit"

const WorkoutIndex = (props) => {
    const [workouts, setWorkouts] = useState([]);
    const [UpdateActive, setUpdateActive] = useState(false);
    const [workoutToUpdate, setWorkoutToUpdate] = useState([]);
    const fetchWorkouts = () => {
        fetch('http://localhost:3000/log/mine', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        }).then((res) => res.json())
            .then((logData) => {
                setWorkouts(logData)
                console.log(workouts)
                console.log(logData);
            })
    };

    useEffect(() => {
        fetchWorkouts();
    }, [])
    const editUpdateWorkout = (workout) => {
        setWorkoutToUpdate(workout);
        console.log(workout);
    }
    const updateOn = () => {
        setUpdateActive(true);
    }
    const updateOff = () => {
        setUpdateActive(false);
    }
    return (
    
            <Row>                
            <Container>
           
                <Col md="3">
                    <WorkoutCreate fetchWorkouts={fetchWorkouts} token={props.token}/>
                </Col>
                <Col md="9">
                <WorkoutTable workouts={workouts} editUpdateWorkout={editUpdateWorkout}
                updateOn={updateOn} fetchWorkouts={fetchWorkouts} token={props.token}/>
                </Col>
                {UpdateActive ? <WorkoutEdit workoutToUpdate={workoutToUpdate} 
                updateOff={updateOff} token={props.token} fetchWorkouts={fetchWorkouts}/> : <></>}
                </Container>
               </Row>
    )
    }
export default WorkoutIndex;