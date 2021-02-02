import React, { Component } from 'react';
import axios from 'axios'
import '../src/css/main.css'

class App extends Component {
  state = {
    make: '',
    type: '',
    model: '',
    manufacturer_id: '',
    price: '',
    image: '',
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
      <div id="add">
        <h2 id="vehicleinfo">Vehicle Information</h2>
          <form id="info" onSubmit={this.handleSubmit}>
            <label htmlFor="make">Make</label>
            <input
                type="text"
                id="make"
                onChange={this.handleChange}
                value={this.state.make}
            />

            <label htmlFor="type">Type</label>
            <input
                type="text"
                id="type"
                onChange={this.handleChange}
                value={this.state.type}
            />

            <label htmlFor="model">Model</label>
            <input
                type="text"
                id="model"
                onChange={this.handleChange}
                value={this.state.model}
            />

            <label htmlFor="price">Price</label>
            <input
                type="text"
                id="price"
                onChange={this.handleChange}
                value={this.state.price}
            />

            <label htmlFor="image">Image</label>
            <input
                type="text"
                id="image"
                onChange={this.handleChange}
                value={this.state.image}
            />

            <label htmlFor="manufacturer_id">Manufacturer ID</label>
            <input
                type="text"
                id="manufacturer_id"
                onChange={this.handleChange}
                value={this.state.manufacturer_id}
            />

            <input type="submit" value="ADD"/>
          </form>
        {this.state.cars.map((car) => {
          return (
            <div id="display">
              <h4>{car.make}</h4>
              <h5>{car.model}</h5>
              <img id="carimg" src={car.image} alt="car" />
              <h5>{car.price}</h5>
              <h5>{car.type}</h5>
                <details>
                  <summary>Edit</summary>
                  <form class="edit" id={car.id} onSubmit={this.updateCar}>

                    <label htmlFor="make">Make</label>
                    <input
                        type="text"
                        id="make"
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
                    <label htmlFor="type">Type</label>
                    <input
                        type="text"
                        id="type"
                        onChange={this.handleChange}
                    />

                    <br />
                    <label htmlFor="price">Price</label>
                    <input
                        type="text"
                        id="price"
                        onChange={this.handleChange}
                    />

                    <br />
                    <label htmlFor="image">Image</label>
                    <input
                        type="text"
                        id="image"
                        onChange={this.handleChange}
                    />

                    <br />
                    <label htmlFor="manufacturer_id">Manufacturer ID</label>
                    <input
                        type="text"
                        id="manufacturer_id"
                        onChange={this.handleChange}
                    />

                    <br />
                    <label htmlFor="manufacturer_id">Manufacturer</label>
                    <input
                        type="text"
                        id="manufacturer_id"
                        onChange={this.handleChange}
                    />
                    <input type="submit" value="UPDATE"/>
                  </form>
                </details>
              <button id="delete" value={car.id} onClick={this.deleteCar}>
                X
              </button>
              <hr />
            </div>
          )
        })}
      </div>
    )
  }
}

export default App
