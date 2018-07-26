const APIError = require('../middleware/rest').APIError;
const Inbound_note = require('../modules/inbound_notes');

module.exports = {
    //获取送货单列表
    'GET /api/Inbound_notes': async (ctx, next) => {
        var data = await Inbound_note.findAll();
        if(data != null){
            ctx.rest(data);
        }else{
            throw new APIError('database:data not found', 'data not found');
        }
    },
    //获取特定ID的送货单
    'GET /api/Inbound_notes/:inid':async (ctx, next) => {
        var id = ctx.params.inid;
        //console.log('id=' + id);
        var data = await Inbound_note.findById(id);
        if(data != null){
            ctx.rest(data);
        }else{
            throw new APIError('database:data not found', 'data not found');
        }
    },
    //新建一个送货单
    'PUT /api/Inbound_notes':async (ctx, next) => {
        var data = ctx.request.body;
        if(data != null){
            var return_data = await Inbound_note.create(data);
            ctx.rest(return_data);
            console.log('created:' + JSON.stringify())
        }else{
            throw new APIError('database:data is emputy', 'input invalid');
        }
    }
}