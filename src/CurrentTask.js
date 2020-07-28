import React from 'react'

class CurrentTask extends React.Component{

    constructor(props) {
        super(props)
        this.state = { 
            hours: Math.floor(props.timeLeft / 60), 
            minutes: props.timeLeft % 60, 
            seconds: 0, 
            task: props.task
        }
    }

    componentDidMount() {
        this.state.alerted = false;
        this.myInterval = setInterval(() => {
            const { seconds, minutes, hours} = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    if (hours === 0) {
                        clearInterval(this.myInterval)
                    } else {
                        this.setState(({ hours }) => ({
                            hours: hours - 1,
                            minutes: 60,
                            seconds: 0
                        }))
                    }
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render () {
        const { hours, minutes, seconds, task } = this.state

        let currentTask = (hours, minutes, seconds, task) => {

            if (minutes === 0 && seconds === 0 && hours === 0 ) {
                return (
                    <div className="timeDisplay">00:00{alert("Time's Up for the following task: " + task)}</div>
                )
            } else {
                if (hours !== 0) {
                    return (
                        <div className="timeDisplay">{hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
                    )
                } else {
                    return (
                        <div className="timeDisplay">{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
                    )
                }
            }
        }

        return (
           <div className="CurrentTask">
                <div className="closeBtn" onClick={this.props.handleSubmit}>&#10006;</div>                
                <div>{currentTask(hours, minutes, seconds, task)}</div>
                <h3 className="taskDisplay">{task}</h3>
            <p className="blurb">Let's focus on this task</p>
                <button onClick={this.props.addToCompleted}>Mark as Complete</button>
            </div> 
        )
    }
}

export default CurrentTask