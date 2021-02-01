import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);

        // THIS IS THE ONLY TIME we do direct assignment to this.state
        this.state = { lat: null, errorMessage: '' };

        window.navigator.geolocation.getCurrentPosition(
            position => {
                // we called setState!
this.setState({lat:position.coords.latitude});

// WE DID NOT DO this.state.lat=position.coords.latitude
            },
            err => {
                this.setState({errorMessage: err.message});
            }
        );
    }

// For the purposes of understanding Lifecycle Methods we are adding ComponentDidMount and ComponentDidUpdate methods
// that will be automatically called at some point in time

//Right above the Render method I'll define:

componentDidMount () {
console.log('My component was rendered to the screen!');
}

// Now I'll define a second Lifecycle method:
componentDidUpdate () {
console.log('My component was just updated - It rerendered!');
}


    render() {
        //CASE 1 - NO LAT, DO HAVE ERROR MESSAGE 
     if (this.state.errorMessage && !this.state.lat) {
         return <div> Error: {this.state.errorMessage}</div>
     }
     // CASE 2 - NO ERROR MESSAGE, DO HAVE LAT
     if (!this.state.errorMessage && this.state.lat) {
         return <div>Latitude: {this.state.lat} </div>
     }
     // CASE 3 - NO LAT, NO ERROR MESSAGE, show loading
     
     return <div>Loading!!!</div>
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')

)