import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Form from './Form'

class Boards extends React.Component {
  state = { boards: [], showForm: false }

  componentDidMount() {
    axios.get('/api/boards')
      .then(res => {
        this.setState({ boards: res.data })
      })
  }

  toggleForm = () => {
    this.setState(state => {
      return { showForm: !state.showForm }
    })
  }

  form = () => {
    return <Form submit={this.submit} />
  }

  submit = (board) => {
    axios.post(`/api/boards`, { board } )
    .then (res => {
      this.setState({ boards: [res.data, ...this.state.boards], showForm: false })
    })
  }

  listboards = () => {
    return this.state.boards.map(b => {
      return (
        <ul key={b.id}>
          <li>
            <Link to={`/boards/${b.id}`}>{b.name}</Link>
          </li>
        </ul>
      )
    })
  }

  render() {
    const { showForm } = this.state
    return (
      <div>
        <h2>Boards</h2>
        <button onClick={this.toggleForm}>{ showForm ? 'Hide' : 'Show'}</button>
        {showForm ? this.form() : this.listboards()}
      </div>
    )
  }

}

export default Boards