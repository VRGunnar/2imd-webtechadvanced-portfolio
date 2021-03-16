class App {
    constructor() {
        this.getLocation();
    }

    getLocation(){
        navigator.geolocation.getCurrentPosition(this.gotLocation, this.errorLocation);
    }

    gotLocation(result){
        console.log(result);
    }

    errorLocation(error) {
        console.log(error);
    }
}

let app = new App();