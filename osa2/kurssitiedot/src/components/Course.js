import React from "react";

const Header = ({course}) =>
    <h2>{course.name}</h2>

const Part = ({part}) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({course}) =>
    <div>
        {course.parts.map(part => <Part key={part.id} part={part}/>)}
    </div>

const Total = ({course}) => {
    const initialValue = 0
    const sum = course.parts.reduce((p1, p2) => {
        return p1 + p2.exercises
    }, initialValue)

    return (
        <p style={{fontWeight:"bold"}}>total of {sum} exercises</p>
    )
}

const Course = ({course}) =>
    <>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
    </>

export default Course