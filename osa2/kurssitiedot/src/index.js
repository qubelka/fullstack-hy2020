import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) =>
    <h1>{course.name}</h1>


const Part = ({part}) =>
    <p>
        {part.name} {part.exercises}
    </p>


const Content = ({course}) => {
    return (
        <div>
            {course.parts.map(part => <Part key={part.id} part={part}/>)}
        </div>
    )
}

const Total = ({course}) => {
    const initialValue = 0
    const sum = course.parts.reduce((p1, p2) => {
        return p1 + p2.exercises
    }, initialValue)

    return (
        <p>Number of exercises {sum}</p>
    )
}

const Course = ({course}) => {
    return (
        <>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        id: 1,
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))