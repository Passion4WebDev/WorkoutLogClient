import React, { useState, useEffect } from "react";
import { Container, Row, Col, FormGroup, Label,Form, Input, Button } from "reactstrap";

const WorkoutCreate = (props) => {
    const [description, setDescription] = useState('');
    const [definition, setDefinition] = useState('');
    const [results, setResults] = useState('');

        const handleSubmit =(e) => {
        e.preventDefault();
        fetch('http://localhost:3000/log/create', {
            method: 'POST',
            body: JSON.stringify({log: {description: description, definition: definition, results: results}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        }).then((res) => res.json())
          .then((logData) => {
          console.log(logData);
          setDescription('');
          setDefinition('');
          props.fetchWorkouts();
        })
    }
    useEffect(() => {
        props.fetchWorkouts();
    }, [])


    return (
        <>   
         <Form onSubmit={handleSubmit}>

                <h3>Log a Workout</h3>
                  <FormGroup>
                     <Label htmlFor="description" />
                         <Input name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                     </FormGroup>
                    <FormGroup>
                        <Label htmlFor="definition" />
                        <Input type="select" name="definition" value={definition} onChange={(e) => setDefinition(e.target.value)}>
                            <option value="Time"> Time</option>
                            <option value="Weight"> Weight</option>
                            <option value="Distance"> Distance</option>
                            </Input>
                         </FormGroup>
                        <Label htmlFor="results" />
                      <Input name="results" value={results} onChange={(e) => setResults(e.target.value)} />
                       <FormGroup> 
                <Button type="submit">Click to Submit</Button>
                </FormGroup>  
                </Form>
                </>
    )};

export default WorkoutCreate;