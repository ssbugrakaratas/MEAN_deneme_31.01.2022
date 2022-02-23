const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CrudDB', (err) => {
    if (!err)
        console.log('MongoDB başarıyla bağlandı.');
    else
        console.log('DB bağlantı hatası: ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;