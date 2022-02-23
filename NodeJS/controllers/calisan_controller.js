const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const { Calisan } = require('../models/calisan');

//localhost:3000/calisanlar/listele
router.get('/listele', (req, res) => {
    Calisan.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Calisan Kaydını getirken hata oluştu :' + JSON.stringify(err, undefined, 2));
        }
    });
});

//localhost:3000/calisanlar/:id
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`Bu id geçersizdir : ${req.params.id}`);
    }
    Calisan.findById(req.params.id, (err, doc) => {
        if (!err) {
            if (!doc) {
                res.status(400).send(`Bu id ye sahip kayıt bulunamamıştır : ${req.params.id}`);
                return;
            }
            res.send(doc);
        } else {
            console.log(`${req.params.id} id li kayıt getirlirken bir hata oluştu.!`);
        }
    });
});

//localhost:3000/calisanlar/ekle
router.post('/ekle', (req, res) => {
    const ekle_calisan = new Calisan({
        isim: req.body.isim,
        pozisyon: req.body.pozisyon,
        ofis: req.body.ofis,
        maas: req.body.maas,
    });
    ekle_calisan.save((err, doc) => {
        if (!err) {
            res.send(doc);
            console.log(`Bu Kayıt Eklendi : ${doc}`);
        } else {
            console.log('Calisan Kaydı yapılırken hata oluştu :' + JSON.stringify(err, undefined, 2));
        }
    });
});

//localhost:3000/calisanlar/:id
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`Bu id geçersizdir : ${req.params.id}`);
    }
    const duzeltme_calisan = {
        isim: req.body.isim,
        pozisyon: req.body.pozisyon,
        ofis: req.body.ofis,
        maas: req.body.maas,
    };
    Calisan.findByIdAndUpdate(req.params.id, { $set: duzeltme_calisan }, { new: true }, (err, doc) => {
        if (!err) {
            if (!doc) {
                res.status(400).send(`Bu id ye sahip kayıt bulunamamıştır : ${req.params.id}`);
                return;
            }
            res.send(doc);
            console.log(`Bu Kayıt Güncellendi : ${doc}`);
        } else {
            console.log(`${req.params.id} id li kayıt guncellenirken bir hata oluştu.!`);
        }
    });
});

//localhost:3000/calisanlar/:id
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`Bu id geçersizdir : ${req.params.id}`);
    }
    Calisan.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            if (!doc) {
                res.status(400).send(`Bu id ye sahip kayıt bulunamamıştır : ${req.params.id}`);
                return;
            }
            res.status(200).send();
            console.log(`Bu Kayıt Silindi : ${doc}`);
        } else {
            console.log(`${req.params.id} id li kayıt silinirken bir hata oluştu.!`);
        }
    });
});

module.exports = router;