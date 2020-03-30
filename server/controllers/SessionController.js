const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const { id } = req.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first(); // return only one result, because is unique ID.

        if (!ong) {
            return res.status(400).json({ err: 'No ONG found with this ID' });
        };

        return res.json(ong);
    }
}