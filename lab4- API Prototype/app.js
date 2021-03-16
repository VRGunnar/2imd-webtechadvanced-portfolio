class App {
    constructor() {
        this.getLocation();
        this.latitude;
        this.longitude;
    }

    getLocation(){
        navigator.geolocation.getCurrentPosition(this.gotLocation.bind(this), this.errorLocation.bind(this));
    }

    gotLocation(result){
        this.latitude = result.coords.latitude;
        this.longitude = result.coords.longitude;
        this.getWeather();
    }

    getWeather() {
        //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
        const apiKey = "333d9555968f7bddd1b2e207ac0da7d1";
        let url =`https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${apiKey}&units=metric`;
        fetch(url).then(response => {
            console.log(response);
            return response.json();
        }).then(data => {
            console.log(data);
            document.querySelector("#weather").innerHTML = data.main.temp;

        }).catch(error => {
            console.log(error);
        });
    }

    errorLocation(error) {
        console.log(error);
    }
}

let app = new App();