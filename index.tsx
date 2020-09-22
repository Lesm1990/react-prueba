import React, { Component } from "react";
import { render } from "react-dom";
import { ButtonCounter } from "./ButtonCounter";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import "./style.css";

interface Row {
  check: boolean, name: string, status: boolean, label: string
}

interface AppState {
  data: Row[];
}

class App extends Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { check: true, name: 'Lorena Salas', status: true, label: 'Label'},
        { check: false, name: 'Emily Yanez', status: false, label: 'Label'},
      ],
    };

    this.onChange = this.onChange.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  onChange(event){
    const {target: {name, value, type, checked}} = event;
    let { data } = this.state;
    const _value = type === 'checkbox' ? checked : value;
    data[value][name] = _value;
    this.setState({data});
  };

  onClickDelete(event){
    
  };

  CheckColumn(params){
    const {check, onChange, value} = params;
    return (<input type="checkbox" name="check" defaultChecked={check} onChange={(event) => {onChange(event)}} value={value} />);
  };

  render() {
    const {state, CheckColumn, onChange} = this;
    const {data} = state;
    
    return (
      <div className="container mt-3">
        <h1 className="text-center">React Test</h1>
        <Table striped hover>
          <thead>
            <tr>
              <th scope="col"><input type="checkbox" name="select" disabled/></th>
              <th scope="col">Column #1</th>
              <th scope="col">Column #2</th>
              <th scope="col">Column #3</th>
              <th scope="col">Column #4</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map(function(element, index){
                const {check, name, status, label} = element;
                return (<tr key={index}>
                          <th scope="row">
                            <CheckColumn 
                              key={index} 
                              cheack={check} 
                              onChange={(event) => { 
                                  onChange(event)
                                }} 
                              value={index}
                            />
                          </th>
                          <td>{name}</td>
                          <td>{status ? 'Active' : 'Inactive' }</td>
                          <td><Badge variant="secondary p-2">{label}</Badge></td>
                          <td><Button variant="outline-danger">Edit</Button></td>
                        </tr>)
              })
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}>
                <Button variant="outline-danger">Delete</Button>
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
