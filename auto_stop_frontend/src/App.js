import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
  state = {
    make: '',
    type: '',
    model: '',
    manufacturer_id: '',
    cars: [],
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios.post('/car', this.state).then((response) => {
      this.getCars()
    })
  }

  deleteCar = (event) => {
    axios.delete('/car/' + event.target.value).then((response) => {
      this.getCars()
    })
  }

  updateCar = (event) => {
    event.preventDefault()
    const id = event.target.id
    axios.put('/car/' + id, this.state).then((response) => {
      this.getCars()
    })
  }

  getCars = () => {
    axios
      .get('/car')
      .then(
      (response) => this.setState({ cars: response.data, make: '', type: '', model: '' , manufacturer_id: '' }),
      err => console.log(err)
    )
    .catch((error) => console.error(error))
  }

  componentDidMount = () => {
    this.getCars()
  }

  render = () => {
    return (
      <div>
        <h2>Add new Car</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="make">Make</label>
            <input
                type="text"
                id="make"
                onChange={this.handleChange}
                value={this.state.make}
            />
            <br />
            <label htmlFor="type">Type</label>
            <input
                type="text"
                id="type"
                onChange={this.handleChange}
                value={this.state.type}
            />
            <br />
            <label htmlFor="model">Model</label>
            <input
                type="text"
                id="model"
                onChange={this.handleChange}
                value={this.state.model}
            />
            <br />
            <label htmlFor="manufacturer_id">Manufacturer</label>
            <input
                type="text"
                id="manufacturer_id"
                onChange={this.handleChange}
                value={this.state.manufacturer_id}
            />
            <br />
            <input type="submit" value="ADD"/>
          </form>
        {this.state.cars.map((car) => {
          return (
            <div>
              <h4>Make: {car.make}</h4>
              <h5>Type: {car.type}</h5>
              <h5>Model: {car.model}</h5>
                <details>
                  <summary>Edit</summary>
                  <form id={car.id} onSubmit={this.updateCar}>
                    <label htmlFor="make">Make</label>
                    <input
                        type="text"
                        id="make"
                        onChange={this.handleChange}
                    />
                    <br />
                    <label htmlFor="type">Type</label>
                    <input
                        type="text"
                        id="type"
                        onChange={this.handleChange}
                    />
                    <br />
                    <label htmlFor="model">Model</label>
                    <input
                        type="text"
                        id="model"
                        onChange={this.handleChange}
                    />
                    <br />
                    <input type="submit" value="UPDATE"/>
                  </form>
                </details>
              <button value={car.id} onClick={this.deleteCar}>
                  X
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}

export default App
