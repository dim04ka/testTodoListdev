import React from 'react';
import {ButtonToolbar} from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import './App.css';

class App extends React.Component{

  constructor(props){
    super(props);
    
    this.state = {
      edit: false,
      counter: 10,
      title: '',
      disc: '',
      level: '',
      id: '',
      todos: [
        { 
          title: "Заголовок задания 1",
          level: "High",
          date: "11:00 01.01.2010",
          disc: "Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.",
          status: false,
          id: 1
        },
        { 
          title: "Заголовок задания 2",
          level: "Light",
          date: "11:00 01.01.2020",
          disc: "Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.",
          status: true,
          id: 2
        },
        { 
          title: "Заголовок задания 3",
          level: "High",
          date: "11:00 01.01.2030",
          disc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid eaque eligendi error eveniet nostrum nulla pariatur repudiandae, veniam. Provident.",
          status: false,
          id: 3
        }
      ]
    } 
  }


    addTask = (e) => {
      let {title,disc,date,level,status,todos,id,edit,counter} = this.state;

      if (edit) {

        let newTodos = todos;
        newTodos = newTodos.map((el,inx) => {
           if (el.id === this.state.id) {
            
            newTodos[inx] = {
              title,
              level,
              date,
              disc,
              status,
              id,
              date
            }
             return newTodos[inx];
           } else {
             return el
           }
        })
      } else {
   
        let newTodos = todos;
        let obj = {
          title,
          level,
          date: new Date().toLocaleString(),
          disc,
          status,
          id: counter + 1
        }
        
      newTodos.push(obj)

      this.setState({
        todos: newTodos,
        counter: counter + 1,
        title: '',
        disc: '',
        level: '',
      })
    }

    localStorage.setItem('todo', JSON.stringify(todos));
 
      let modalka = this.refs.modalka;
      modalka.style.display = 'none';
      e.preventDefault();
      let $mod = document.querySelector('.modal-backdrop');
      $mod.classList.remove('show');
      $mod.style.cssText = "display: none";

      let $btn = this.refs.openAddTaskModal;
      $btn.click(); 
  }

    openCard = () => {

      this.setState({
        title: '',
        disc: '',
        level: '',
        edit: false
      })
 
    }

    componentDidMount = () => {
      if (localStorage.getItem('todo') !== undefined && localStorage.getItem('todo') !== null) {
        let list = JSON.parse(localStorage.getItem('todo'))
        this.setState({
          todos: list
        })
      }
    }

    checkCompleted = (id) => {
      let {todos} = this.state;
      let todo = todos.filter(el => el.id === id)
      let newArr = todos.filter(el => el.id !== id)
      todo[0].status = true;
      newArr.push(todo[0]);

      this.setState({
        todos: newArr
      })
      localStorage.setItem('todo', JSON.stringify(todos));
    }

    deteleTask = (id) => {
      let {todos} = this.state;
      let newArr = todos.filter(el => el.id !== id)
      this.setState({
        todos: newArr
      })
      localStorage.setItem('todo', JSON.stringify(todos));
    }


    editTask = (id) => {
      let {todos} = this.state;
      let $btn = this.refs.openAddTaskModal;
      $btn.click();
      let newArr = todos.filter(el => el.id === id)
      
      this.setState({
        title: newArr[0].title,
        disc: newArr[0].disc,
        level: newArr[0].level,
        edit: true,
        id: newArr[0].id,
        date: newArr[0].date
      })

    }

  
  render(){
    let {todos} = this.state;
    let filterTodo = todos.filter(el => {
      if (el.status !== true) {
        return el;
      } 
    })

    let filterCompleted = todos.filter(el => {
      if (el.status === true) {
        return el;
      }
    })

  return (
    <div className="App">
      <main>
        <div className="container-fluid">
          <div className="row alert alert-secondary">
            <div className="col"><h1>Todo</h1></div>
            <div className="col"><button 
             onClick={this.openCard}
             type="button" className="btn btn-primary modalTask" ref="openAddTaskModal" data-toggle="modal" data-target="#exampleModal"><i className="fa fa-plus" aria-hidden="true"></i> Add task</button></div>
          </div> 
          <div className="row justify-content-center">
            <div className="col-10">
              <h1>ToDo({filterTodo.length})</h1>
                <ul className="ulTodo">

                  {
                      filterTodo.map(el => {
                        return(
                          <li className="d-flex list-group-item" key={el.id}>
                          <div className="task-content w-100 mr-2">
                            <div className="d-flex w-100 justify-content-between">
                              <h5>{el.title}</h5>
                              <div>
                                <small>{el.level} priority&#160;</small>
                                <small>{el.date}</small>
                              </div>
                            </div>
                          <div>{ el.disc}</div>
                          </div>
                          <div className="task-btn">
                            <div className="dropdown">
                              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                              </button>
                              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" data-id={el.id}>
                                <button 
                                onClick={() => this.checkCompleted(el.id)}
                                type="button"  className="btn btn-success w-100">Complete</button>
                                <button 
                                onClick={() => this.editTask(el.id)}
                                type="button" className="btn btn-info w-100">Edit</button>
                                <button 
                                onClick={() => this.deteleTask(el.id)}
                                type="button" className="btn btn-danger w-100">Delete</button>
                              </div>
                            </div>
                          </div>
                        </li>
                        )
                        
                      })
                  }

            
                </ul>
              </div>
            </div>
            <hr />
            <div className="row justify-content-center">
              <div className="col-10">
                <h1>Completed({filterCompleted.length})</h1>
                  <ul>
                  {
                      filterCompleted.map(el => {
                        return(
                          <li className="d-flex list-group-item" key={el.id}>
                          <div className="task-content w-100 mr-2">
                            <div className="d-flex w-100 justify-content-between">
                              <h5>{el.title}</h5>
                              <div>
                                <small>{el.level} priority&#160;</small>
                                <small>{el.date}</small>
                              </div>
                            </div>
                          <div>{ el.disc}</div>
                          </div>
                          <div className="task-btn">
                            <div className="dropdown">
                              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                              </button>
                              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button 
                                onClick={() => this.deteleTask(el.id)}
                                type="button" className="btn btn-danger w-100">Delete</button>
                              </div>
                            </div>
                          </div>
                        </li>
                        )
                        
                      })
                  }
                  </ul>
              </div>
            </div>
        </div>
      </main>
      <div className="modal fade" id="exampleModal" ref="modalka" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Add task</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form className="form" onSubmit={this.addTask}>
            <div className="form-group row">
              <label  className="col-sm-2 col-form-label">Title:</label>
              <div className="col-sm-10">
                <input 
                onChange={(event) => this.setState({title: event.target.value})}
                value={this.state.title}
                type="text" className="form-control title" id="recipient-name1" required />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Text:</label>
              <div className="col-sm-10">
                <input 
                onChange={(event) => this.setState({disc: event.target.value})}
                value={this.state.disc}
                type="text" className="form-control text" id="recipient-name2" required />
              </div>
            </div>
            <fieldset className="form-group">
              <div className="row">
                  <legend className="col-form-label col-sm-2 pt-0">Priority</legend>
                  <div className="col-sm-10">
                      <div className="form-check">
                      <label className="form-check-label">
                          Low
                          <input 
                          checked={this.state.level === 'Low'} onChange={(e) => this.setState({ level: e.target.value })}
                          className="form-check-input level" type="radio" name="gridRadios" id="Low" value="Low" required />
                          </label>
                      </div>
                      <div className="form-check">
                      <label className="form-check-label">
                          Medium
                          <input 
                          checked={this.state.level === 'Medium'} onChange={(e) => this.setState({ level: e.target.value })}
                          className="form-check-input level" type="radio" name="gridRadios" id="Medium" value="Medium" />
                          </label>
                      </div>
                      <div className="form-check disabled">
                      <label className="form-check-label">
                          High
                          <input 
                          checked={this.state.level === 'High'} onChange={(e) => this.setState({ level: e.target.value })}
                          className="form-check-input level" type="radio" name="gridRadios" id="High" value="High" />
                          </label>
                      </div>
                  </div>
              </div>
          </fieldset>
            <div className="modal-footer">
              <div className="col-sm-12 text-center">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  { this.state.edit ? <ButtonToolbar><Button variant="success" type="submit">Success</Button></ButtonToolbar> : <button type="submit" className="btn btn-primary btn-addTask">Send message</button>}
            </div>
          </div>
          </form>
        </div>

      </div>
    </div>
  </div>
    </div>
  );

  }
}

export default App;
