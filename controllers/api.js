const APIError = require('../middleware/rest');
const Inbound_note = require('../modules/inbound_notes');

module.exports = {
    'GET /api/Inbound_notes': async (ctx, next) => {
        ctx.rest(await Inbound_note.findAll())
    }
}