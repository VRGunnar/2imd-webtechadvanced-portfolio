class App {
    constructor() {
        this.getLocation();
        this.latitude;
        this.longitude;
        this.loadDataFromStorage();
        this.showAd();
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
        if(this.temperature == null) {
            fetch(url).then(response => {
                console.log("data from api");
                console.log(response);
                return response.json();
            }).then(data => {
                console.log(data);
                let temperature = data.main.temp;
                let weather = data.weather[0].main;
                localStorage.setItem("temperature", JSON.stringify(temperature));
                localStorage.setItem("weather", JSON.stringify(weather));
            }).catch(error => {
                console.log(error);
            });
        }
        else {
            console.log("data from localstorage");
        }
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
            do {
                random = Math.floor(Math.random() * length);
            } while (data[random].live_embed_url == null)
            document.querySelector("#csgoTeam").innerHTML = data[random].name;
            document.querySelector("#csgoTime").innerHTML = data[random].begin_at;
            document.querySelector("#csgoStream").setAttribute('src', data[random].live_embed_url + "&parent=localhost");
        }).catch(error => {
            console.log(error);
        });
    }

    loadDataFromStorage() {
        let lastclear = localStorage.getItem("lastclear"),
            timeNow = (new Date().getTime());
        if((timeNow - lastclear) > 1000 * 60 * 60){
            localStorage.clear();
            localStorage.setItem("lastclear", timeNow);
        }
        this.temperature = localStorage.getItem("temperature");
        this.temperature = JSON.parse(this.temperature);
        this.weather = localStorage.getItem("weather");
        this.weather = JSON.parse(this.weather);
    }

    showAd() {
        let temperature = localStorage.getItem("temperature");
        temperature = JSON.parse(temperature);
        let weather = localStorage.getItem("weather");
        weather = JSON.parse(weather);
        this.getCSGO();
        if(temperature > 18 && weather == "Clear") {
            console.log("outside weather");
            document.querySelector('#temperature').innerHTML = "It's " + this.temperature + "°C and the sky is " + this.weather + " so get outside and watch the stream!";
        }
        else {
            console.log("inside weather");
            document.querySelector('#temperature').innerHTML = "It's " + this.temperature + "°C and the sky contains " + this.weather + " so stay inside and watch the stream!";
        }
    }
}

let app = new App();