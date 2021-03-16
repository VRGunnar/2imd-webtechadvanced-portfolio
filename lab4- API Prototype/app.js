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
        this.getCSGO();
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
            document.querySelector("#weather").innerHTML = "The weather right now: " + data.weather[0].description + ".";
        }).catch(error => {
            console.log(error);
        });
    }

    errorLocation(error) {
        console.log(error);
    }

    getCSGO() {
        const apiKey = "awOAbdzU5zJjQ6tIAL2sFWVPVdmK-aJUbLiXK_dS1M2lPzgJ06E";

        let url = `https://cors-anywhere.herokuapp.com/https://api.pandascore.co/csgo/matches?token=${apiKey}`;
        fetch(url).then(response => {
            console.log(response);
            return response.json();
        }).then (data => {
            console.log(data);
            let length = data.length;
            let random = Math.floor(Math.random() * length);
            if (data[random].live_embed_url == null) {
                random = Math.floor(Math.random() * length);
            }
            document.querySelector("#csgoTeam").innerHTML = data[random].name;
            document.querySelector("#csgoStream").setAttribute('src', data[random].live_embed_url + "&parent=www.example.com");
        }).catch(error => {
            console.log(error);
        });
    }

}

let app = new App();