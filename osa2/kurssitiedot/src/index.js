import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) =>
    <h2>{course.name}</h2>


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
        <p style={{fontWeight:"bold"}}>total of {sum} exercises</p>
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
    const title = 'Web development curriculum'
    const courses = [
        {
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
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div>
            <h1>{title}</h1>
            {courses.map(course => <Course key={course.id} course={course} />)}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))