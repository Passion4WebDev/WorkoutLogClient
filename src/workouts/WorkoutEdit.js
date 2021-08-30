import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from "reactstrap";


    const WorkoutEdit = (props) => {
    const [editDesc, setEditDesc] = useState(props.workoutToUpdate.description);
    const [editDef, setEditDef] = useState(props.workoutToUpdate.definition);
    const [editRes, setEditRes] = useState(props.workoutToUpdate.results);
    const workoutUpdate = (event, workout) => {
    event.preventDefault();
    fetch(`http://localhost:3000/log/${props.workoutToUpdate.id}`, {
    method: 'PUT',
    body: JSON.stringify({log: {description: editDesc, definition: editDef, results: editRes}}),
    headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`
    })
    }).then((res) => {
        props.fetchWorkouts();
        props.updateOff();
    })
    }
    
        return(
            <Modal isOpen={true}>
             <modalHeader>Log a Workout</modalHeader>   
             <ModalBody>
                 <Form onSubmit={workoutUpdate}></Form>
                <FormGroup>
                    <Label htmlFor="results">Edit Results:</Label>
                    <Input name="results" value={editRes} onChange={(e) => setEditRes(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor="description">Edit Description:</Label>
                    <Input name="description" value={editDesc} onChange={(e) => setEditDesc(e.target.value)}/>    
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor="definition">Edit Definition:</Label>
                    <Input type="select" name="definition" value={editDef} onChange={(e) => setEditDef(e.target.value)}>
                    <option>
                    <option value="Time">Time</option>
                    <option value="Weight">Weight</option>
                    <option value="Distance">Distance</option>
                    </option>
                    </Input>                    
                </FormGroup>
                <Button type="submit">Update the Workout!</Button>
                </ModalBody>
                 </Modal>              
              )
        }  
            export default WorkoutEdit;


       
 