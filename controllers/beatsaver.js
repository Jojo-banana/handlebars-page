const axios = require("axios")
module.exports.GetAllPlaylists = (id) => new Promise(async (resolve) => {
    var collection = [];
    var page = 0;
    const ApiCall = async (id, page) => {
        var url = "https://api.beatsaver.com/maps/uploader/" + id + "/" + page
        const response = await axios.get(url);
        if (response && response.data && response.data.docs.length > 0) {
            response.data.docs.forEach(document => {
                collection.push(document);
            });
            page = page + 1
            ApiCall(id, page);
        } else {
            resolve(collection);
        }
    };
    ApiCall(id, page);
})