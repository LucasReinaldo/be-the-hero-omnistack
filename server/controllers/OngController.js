const connection = require('../database/connection');

const genUniqueId = require('../utils/genUniqueId');

module.exports = {

    async index(req, res) {
        const ongs = await connection('ongs').select('*');
    
        return res.json(ongs);
    },

    async indexById(req, res) {
        const ongs = await connection('ongs').select('*');
    
        return res.json(ongs);
    },

    async store(req, res) {
        const id = genUniqueId();
        const { name, email, whatsapp, city, uf } = req.body;

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
        return res.json({'id': id});
    },

    async update(req, res) {
        return;
    },

    async delete(req, res) {
        return;
    }

}