import utils from './utils';
import events from './events';
import validate from './validate';
import MegaPixImage from './MegaPixImage';
import relationship from './relationship';
import saveGlobalParams from './saveGlobalParams';

let common = {

    utils,
    events,
    validate,
    MegaPixImage,
    relationship,
    saveGlobalParams
};

if(process.env.NODE_ENV === 'dev'){

    console.log(common);
}

module.exports = common;
