import storage from 'good-storage';

export default opt => {

    for(let item in opt) {

        storage.set(item, opt[item]);
    }
}