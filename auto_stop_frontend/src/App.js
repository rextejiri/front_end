import React, { Component } from 'react';
import axios from 'axios'
import '../src/css/main.css'
import logo from './autostop.png'

class App extends Component {
  state = {
    make: '',
    type: '',
    model: '',
    manufacturer_id: '',
    price: '',
    image: '',
    mileage: '',
    about: '',
    cars: [],
  }

  openModal = () => {
    document.getElementById('modal').style.display = 'inline'
  }

  closeModal = () => {
    document.getElementById('modal').style.display = "none"
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
    event.target.reset()
    const id = event.target.id
    axios.put('/car/' + id, this.state).then((response) => {
      this.getCars()
    })
  }

  getCars = () => {
    axios
      .get('/car')
      .then(
      (response) => this.setState({ cars: response.data, make: '', type: '', model: '', manufacturer_id: '', image: '', price: '', mileage: '', about: '' }),
      (err) => console.log(err)
    )
    .catch((error) => console.error(error))
  }

  componentDidMount = () => {
    this.getCars()
  }

  render = () => {
    return (
      <div id="container">
        <div id="head">
          <img src={logo} id="logo" alt="logo" />
        </div>
        <button id="openmodal" onClick={this.openModal}>
        Post your vehicle
        </button>
          <div id="modal">
            <div id="addcarmodal">
            <h2 id="vehicleinfo">Vehicle Information</h2>
              <form id="info" onSubmit={this.handleSubmit}>
                <label htmlFor="make">Make</label>
                <input
                    type="text"
                    id="make"
                    onChange={this.handleChange}
                    value={this.state.make}
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
                <label htmlFor="price">Price</label>
                <input
                    type="text"
                    id="price"
                    onChange={this.handleChange}
                    value={this.state.price}
                />
                <br />
                <label htmlFor="image">Image</label>
                <input
                    type="text"
                    id="image"
                    onChange={this.handleChange}
                    value={this.state.image}
                />
                <br />
                <label htmlFor="mileage">Mileage</label>
                <input
                    type="text"
                    id="mileage"
                    onChange={this.handleChange}
                    value={this.state.mileage}
                />
                <br />
                <label htmlFor="about">About</label>
                <input
                    type="text"
                    id="about"
                    onChange={this.handleChange}
                    value={this.state.about}
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
                <label htmlFor="manufacturer_id">Manufacturer ID</label>
                <input
                    type="text"
                    id="manufacturer_id"
                    onChange={this.handleChange}
                    value={this.state.manufacturer_id}
                />
                <br />
                <input type="submit" id="addcar" value="Add"/>
                <br />
                <button id="closemodal" onClick={this.closeModal}>
                Close
                </button>
              </form>
              </div>
              </div>
            {this.state.cars.map((car) => {
              return (
                <div id="display">
                  <h4>{car.make}</h4>
                  <h5>{car.model}</h5>
                  <img id="carimg" src={car.image} alt="car" />
                  <h5>{car.mileage} miles</h5>
                  <p>{car.about}</p>
                  <h5>${car.price}</h5>
                  <h5>{car.type}</h5>
                    <details>
                      <summary>Edit Vehicle</summary>
                      <form id={car.id} onSubmit={this.updateCar}>

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
                        <label htmlFor="type">Type</label>
                        <input
                            type="text"
                            id="type"
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
                        <label htmlFor="mileage">Mileage</label>
                        <input
                            type="text"
                            id="mileage"
                            onChange={this.handleChange}
                        />

                        <br />
                        <label htmlFor="about">about</label>
                        <input
                            type="text"
                            id="about"
                            onChange={this.handleChange}
                        />

                        <br />
                        <input type="submit" value="UPDATE" />
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
