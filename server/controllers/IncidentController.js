const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query; //look for page in the url

        const [count] = await connection('incidents').count(); //get the total

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //table ongs that ongs.id is the same as inicidents.ong_id
            .limit(5) //5 per page
            .offset((page - 1) * 5) //starting whit page 1, 1-1=0, than bring the first 5, 2-1=5, skip the first 5 and bring more 5.
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);
        
        res.header('X-Total-Count', count['count(*)']); //because it returns ['count(*)':19], frontend now knows the total.
    
        return res.json(incidents);
    },

    async store(req, res) {
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return res.json({ id });
    },

    async update(req, res) {
        return;
    },

    async delete(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        
        if (incident.ong_id !== ong_id) {
            return res.status(401).json({ err: 'Operation not permitted.'})
        };

        await connection('incidents').where('id', id).delete();
                
        return res.status(204).send();
    }


}