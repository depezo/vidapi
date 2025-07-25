/* uqload resolver
 * @lscofield
 * GNU
 */

const cheerio = require('cheerio');
const skkchecker = require('../lib/skkchecker');

exports.index = function (req, res) {
    //Optional check, only if you need to restrict access
    // to unautorized apps, skk is signature and auth is 
    // unautorized signal
    // see the config file to more info
    const auth = 'auth' in req.body ? req.body.auth : req.query.auth;
    const authJSON = Buffer.from(auth, 'base64').toString('utf8');
    const granted = skkchecker.check(auth);
    if (granted !== null) {
        // no autorized app block
        // return a random troll video
        // if the app is unautorized
        res.json({ status1: 'ok', url: granted });
    } else {
        // autorized app block
        const source = 'source' in req.body ? req.body.source : req.query.source;
        const html = Buffer.from(source, 'base64').toString('utf8');
        var mp4 = null;

        const $ = cheerio.load(html);

        try {
            for (var i = 0; i < $('script[type="text/javascript"]').get().length; i++) {
                const text = $('script[type="text/javascript"]').get(i);
                try {
                    const s = text.children[0].data;
                    if (s.includes("sources:")) {
                        var json = s.split("[")[1].split("]")[0];
                        json = JSON.parse("[" + json + "]");
                        mp4 = json[0];
                        break;
                    }
                } catch (rt) { }
            }

            if (mp4 == null || mp4 == '') {
                mp4 = null;
            }
        } catch (e) {
            mp4 = mp4 == null ? '' : mp4;
        }

        mp4 = mp4 == null ? '' : mp4;

        res.json({ status2: mp4 == '' ? 'error' : 'ok', url: mp4 });
    }
};