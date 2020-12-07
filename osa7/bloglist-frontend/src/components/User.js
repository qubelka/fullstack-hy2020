import React from 'react'
import { Table, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const User = ({ match }) => {
  const users = useSelector(store => store.users)
  const id = match.params.id
  const user = users.find(user => user.id === id)

  if (!user) return null

  return (
    <Row style={{ marginTop: 20 }}>
      <Col sm={{ span: 10, offset: 1 }}>
        <h3>{user.name}</h3>
        <h5>Added blogs</h5>
        <Table striped bordered hover variant='dark'>
          <tbody>
            {user.blogs.map(blog => (
              <tr key={blog.title}>
                <td>{blog.title}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  )
}

export default User
