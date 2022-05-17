import React from 'react'
import './App.css'
import CurrentTask from './CurrentTask'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { task: "", timeLeft: 0, submitted: false, completed: [], currentlyWorkingOn: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.addToCompleted = this.addToCompleted.bind(this);
  }

  addToCompleted(e) {
    const completedTask = {
      text: this.state.currentlyWorkingOn,
      key: Date.now()
    }
    this.state.completed = this.state.completed.concat(completedTask);
    console.log(this.state.completed)

    this.handleSubmit(e);
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.task == "") {
      alert("Please enter a title for this task")
      return
    }

    if (this.state.timeLeft == "") {
      alert("Please enter a time for this task")
      return
    }
    
    this.setState({
      [e.target.name]: e.target.value,
      key: Date.now()
    });

    // Clear inputs
    this.state.currentlyWorkingOn = this.state.task;
    let form = document.getElementById('mainForm');
    form.reset();

    this.state.submitted = !this.state.submitted;
    //console.log(this.state);
  }

  handleTaskChange(e) {
    this.state.task = e.target.value;
  }

  handleTimeChange(e) {
    if (e.target.value < 0) {
      alert("Please enter a valid time in minutes (Any number higher than 0)")
    } else {
      this.state.timeLeft = e.target.value;
    }
  }

  render() {
    return (
      <div className="App">
        <div className="sidebar">
          {this.state.completed.map( (task) => {
            return (
              <div title={task.text} className="completionIcon">&#10004;</div>
            )
          })}
        </div>
        <header style = {{ display: this.state.submitted ? "none" : "block"}}>
          <h2>Task Timer</h2>
          <form id="mainForm">
              <input 
                className="text"
                type="text" 
                name="task" 
                placeholder="Task description"
                onChange={this.handleTaskChange}>
              </input>
              <input 
                className="num"
                type="number" 
                name="timeLeft" 
                min="1" 
                placeholder="mins?"
                onChange={this.handleTimeChange}>
              </input>
            <button type="submit" onClick={this.handleSubmit}>Start Task</button>
          </form> 
        </header>
        {this.state.submitted ?
          <CurrentTask 
            task={this.state.task} 
            timeLeft={this.state.timeLeft}
            key={this.state.key}
            handleSubmit={this.handleSubmit}
            addToCompleted={this.addToCompleted}/>
        :
          <h4>Let's get some work done</h4> 
        }
      </div>
    )
  } 
  
}

export default App;
