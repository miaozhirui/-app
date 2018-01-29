
import storage from 'good-storage';

export default class Location {

    init() {

        navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
    }

    onSuccess(position){

        storage.set('gpsInfo', JSON.stringify({

            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }))

    }
    
    onError(error){

        console.log(error);
    }
}

