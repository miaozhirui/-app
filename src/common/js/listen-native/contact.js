
import storage from 'good-storage';

export default {

    init(){

        this.initParams();
    },
    initParams(){

        let options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        options.desiredFields = [navigator.contacts.fieldType.id];
        options.hasPhoneNumber = true;

        let fields = ["displayName", "name","phoneNumbers"];
   
        navigator.contacts.find(fields, this.onSuccess, this.onError);
    },
    onSuccess(data){
        
        data = data.map(item => {

            let temObj = {
                displayName: item.displayName,
                name: item.name,
                phoneNumbers: item.phoneNumbers,
                email: item.email,
                address: item.address
            }

            return temObj;
        })
        
        storage.set('contactsInfo', JSON.stringify(data));
        storage.set('isAgreeContact', true);

    },
    
    onError(error){

        storage.set('isAgreeContact', false);
    }
}