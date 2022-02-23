const mongoose = require('mongoose');

const Calisan = mongoose.model('Calisan', {
        isim: { type: String },
        pozisyon: { type: String },
        ofis: { type: String },
        maas: { type: Number },
    },
    'calisanlar');


module.exports = { Calisan };