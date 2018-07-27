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
        await next();
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
        await next();
    },
    //新建一个送货单
    'POST /api/Inbound_notes':async (ctx, next) => {
        var data = ctx.request.body;
        if(data != null){
            var mdate = new Date();
            data.ID_time = Date.now();
            data.createAt = mdate.toLocaleString();
            //console.log(data);
            var return_data = await Inbound_note.create(data);
            ctx.rest(return_data);
            console.log('Inbound_notes created');
        }else{
            throw new APIError('database:data is emputy', 'input invalid');
        }
        await next();
    },
    //删除一个送货单
    'DELETE /api/Inbound_notes/:inid':async (ctx, next) => {
        var id = ctx.params.inid;
        if(await Inbound_note.findById(id)){
            var return_Data = await Inbound_note.destroy({
                where:{
                    ID_time:id
                }
            })
            ctx.rest(return_Data);
            console.log('Inbound_notes deleted');
        }else{
            throw new APIError('database:data not found', 'data not found');
        }
        
    }
    //根据日期返回相关的几个入库单
}