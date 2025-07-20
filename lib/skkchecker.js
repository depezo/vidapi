/* check if origin app is autorized
 * it is an optional feature
 * @depezo
 * GNU
 */
exports.check = function (authJSON) {
    // authJSON = JSON.parse(authJSON);
    if (authJSON != 'app_unauthorized')
        return '';
    else {
        // return a random troll video
        // if the app is unautorized
        const videos = global.config.trolls;
        var ranMP4 = videos[Math.floor(Math.random() * videos.length)];
        return ranMP4;
    }
};