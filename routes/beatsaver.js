var express = require('express');
var router = express.Router();
const axios = require('axios');
const { GetAllPlaylists } = require('../controllers/beatsaver')

router.get('/playlist/:id', async (req, res, next) => {
    var response = await GetAllPlaylists(req.params.id)
    res.send(response);

    // var url = "https://api.beatsaver.com/maps/uploader/" + req.params.id + '/0';
    // var playlistInfo = await axios.get(url);
    // const getLists = (pageNumber) => new Promise((resolve) => {
    //     var pageNumber = 0
    //     var playlists = [];
    //     const run = async (pageNumber) => {
    //         var url = "https://api.beatsaver.com/maps/uploader/" + req.params.id + "/" + pageNumber;
    //         var list = await axios.get(url);
    //         list.data.docs.forEach(x => {
    //             playlists.push(x)
    //         });
    //         if (list.data.docs.length > 0) {
    //             pageNumber = pageNumber + 1;
    //             run(pageNumber)
    //         } else {
    //             resolve(playlists)
    //         }
    //     }
    // })
    // var data = await getLists(req.params.id);
    // res.send(data)


});
router.get('/:id', async (req, res, next) => {
    var url = 'https://api.beatsaver.com/users/id/' + req.params.id;
    var userInfo = await axios.get(url)
    res.send(userInfo.data)
});

module.exports = router;