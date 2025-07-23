const router = require('express').Router();
const _servers_ = './servers/';
const serverHandlers = {
    uqload: require(`${_servers_}uqload`)
};

router.post('/', (req, res) => {

    const serr = req.body.source || req.query.source; // Par défaut uqload

    res.json({status1: 'ok', url: rerr});    

    const { server } = req.body; // ou req.query.server si tu envoies par URL

    if (!server || !serverHandlers[server]) {
        return res.status(400).json({
            status: 'error',
            message: 'Serveur invalide ou non fourni. Ex: serva, servb, servc, servd'
        });
    }

    // Appelle dynamiquement le bon contrôleur
    try {
        return serverHandlers[server].index(req, res);
    } catch (err) {
        console.error(`Erreur serveur ${server}`, err);
        return res.status(500).json({
            status: 'error',
            message: `Erreur interne lors de l’appel du serveur ${server}`
        });
    }
});

// Pour test rapide de l'API
router.get('/', (req, res) => {
    res.json({ status: 'online', message: 'API OK via /v1' });
});

module.exports = router;
