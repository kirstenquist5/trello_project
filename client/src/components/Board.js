import React from 'react'
import axios from 'axios'
import Form from './Form';
import List from './List'

class Board extends React.Component {
  state = { board: {}, list: {}, edit: false }

  componentDidMount() {
    axios.get(`/api/boards/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ board: res.data })
      })
  }

  toggleEdit = () => {
    this.setState(state => {
      return { edit: !this.state.edit }
    })
  }

  showboard = () => {
    const { board: { name } } = this.state
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }

  edit = () => {
    return <Form {...this.state.board} submit={this.submit} />
  }

  // DELETE????

  submit = (board) => {
    axios.put(`/api/boards/${this.props.match.params.id}`, { board })
    .then(res => {
      this.setState({ board: res.data, edit: false })
    })
  }

  render() {
    const { edit } = this.state
    return (
      <div>
        {edit ? this.edit() : this.showboard()}
        <button onClick={this.toggleEdit}>{ edit ? 'Cancel' : 'Edit' }</button>
      </div>
    )
  }

}

export default Board