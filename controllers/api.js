const APIError = require('../middleware/rest').APIError;
const Inbound_note = require('../modules/inbound_notes');
const Inbound_item = require('../modules/inbound_items');
const Delivery_note = require('../modules/delivery_notes');
const Delivery_item = require('../modules/delivery_items');

module.exports = {
    //获取入库单列表
    'GET /api/Inbound_notes': async (ctx, next) => {
        var data = await Inbound_note.findAll();
        if(data != null){
            ctx.rest(data);
        }else{
            throw new APIError('database:data not found', 'data not found');
        }
        await next();
    },
    //获取特定ID的入库单
    'GET /api/Inbound_notes/inid=:inid':async (ctx, next) => {
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
    //新建一个入库单
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
    //修改更新一个入库单
    'PATCH /api/Inbound_notes/':async (ctx, next) => {
        var data = ctx.request.body;
        if(await Inbound_note.findById(data.ID_time)){
            var return_Data = await Inbound_note.update(data,{where:{
                    ID_time: data.ID_time
                }
            });
            ctx.rest(return_Data);
        }else{
            throw new APIError('database:data not found', 'data not found');
        }
        await next();
    },
    //删除一个入库单
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
        await next();
    },
    //根据日期返回相关的几个入库单(搁置)
    //增加一个入库单item
    'POST /api/Inbound_items':async (ctx,next) => {
        var data = ctx.request.body;
        if(data != null){
            var mdate = new Date();
            data.ID = Date.now();
            data.createAt = mdate.toLocaleString();
            //console.log(data);
            var return_data = await Inbound_item.create(data);
            ctx.rest(return_data);
            console.log('Inbound_item created');
        }else{
            throw new APIError('database:data is emputy', 'input invalid');
        }
        await next();
    },
    //获取一个item
    'GET /api/Inbound_items/id=:id':async (ctx, next) => {
        var id = ctx.params.id;
        var data = await Inbound_item.findById(id);
        if(data != null){
            ctx.rest(data);
        }else{
            throw new APIError('database:data not found', 'data not found');
        }
        await next();
    },
    //获取对应ID的入库单上的所有子项
    'GET /api/Inbound_items/inid=:inid':async (ctx, next) => {
        var inid = ctx.params.inid;
        var data = await Inbound_item.findAll({
            where:{
                ID_time:inid
            }
        });
        if(data != null){
            ctx.rest(data);
        }else{
            throw new APIError('database:data not found', 'data not found');
        }
        await next();
    },
    //删除对应ID的items
    'DELETE /api/Inbound_items/id=:id':async (ctx, next) => {
        var id = ctx.params.id;
        if(await Inbound_item.findById(id)){
            var return_Data = await Inbound_item.destroy({
                where:{
                    ID:id
                }
            })
            ctx.rest(return_Data);
            console.log('Inbound_item deleted');
        }else{
            throw new APIError('database:data not found', 'data not found');
        }
        await next();
    },
    //删除入库单上所有的items
    'DELETE /api/Inbound_items/inid=:inid':async (ctx, next) => {
        var inid = ctx.params.inid;
        if(await Inbound_note.findById(inid)){
            var return_Data = await Inbound_item.destroy({
                where:{
                    ID_time:inid
                }
            })
            ctx.rest(return_Data);
            console.log('Inbound_item all deleted');
        }else{
            throw new APIError('database:data not found', 'data not found');
        }
        await next();
    },
    //更新对应ID的item
    'PATCH /api/Inbound_items':async (ctx, next) => {
        var data = ctx.request.body;
        if(await Inbound_item.findById(data.ID)){
            var return_Data = await Inbound_item.update(data,{where:{
                    ID:data.ID
                }
            });
            ctx.rest(return_Data);
        }else{
            throw new APIError('database:data not found', 'data not found');
        }
        await next();
    },
    //增加新的送货单
    'POST /api/Delivery_notes':async (ctx, next) => {
        var data = ctx.request.body;
        if(data != null){
            var mdate = new Date();
            data.id_delivery = Date.now();
            data.createAt = mdate.toLocaleString();
            //console.log(data);
            var return_data = await Delivery_note.create(data);
            ctx.rest(return_data);
            console.log('Delivery_notes created');
        }else{
            throw new APIError('database:data is emputy', 'input invalid');
        }
        await next();
    },
    //根据ID查找送货单
    'GET /api/Delivery_notes/deid=:deid':async (ctx, next) => {
        var id = ctx.params.deid;
        //console.log('id=' + id);
        var data = await Delivery_note.findById(id);
        if(data != null){
            ctx.rest(data);
        }else{
            throw new APIError('database:data not found', 'data not found');
        }
        await next();
    },
    //查询送货单列表
    'GET /api/Delivery_notes':async (ctx, next) => {
        var data = await Delivery_note.findAll();
        if(data != null){
            ctx.rest(data);
        }else{
            throw new APIError('database:data not found', 'data not found');
        }
        await next();
    },
    'DELETE /api/Delivery_notes/deid=:deid':async (ctx, next) => {
        var id = ctx.params.deid;
        if(await Delivery_note.findById(id)){
            var return_Data = await Delivery_note.destroy({
                where:{
                    id_delivery:id
                }
            })
            //此处需要添加删除子项的操作
            ctx.rest(return_Data);
            console.log('Delivery_note deleted');
        }else{
            throw new APIError('database:data not found', 'data not found');
        }
        await next();
    },
    'PATCH /api/Delivery_notes/deid=:deid':async (ctx, next) => {
        var deid = ctx.params.deid;
        var data = ctx.request.body;
        if(await Delivery_note.findById(deid)){
            var return_Data = await Delivery_note.update(data,{where:{
                    id_delivery:deid
                }
            });
            ctx.rest(return_Data);
        }else{
            throw new APIError('database:data not found', 'data not found');
        }
        await next();
    },
    'POST /api/Delivery_items':async (ctx,next) => {
        var data = ctx.request.body;
        if(data != null){
            var mdate = new Date();
            data.ID = Date.now();
            data.createAt = mdate.toLocaleString();
            //console.log(data);
            var return_data = await Delivery_item.create(data);
            ctx.rest(return_data);
            console.log('Delivery_item created');
        }else{
            throw new APIError('database:data is emputy', 'input invalid');
        }
        await next();
    },
    //
    'GET /api/Delivery_items/id=:id':async (ctx, next) => {
        var id = ctx.params.id;
        var data = await Delivery_item.findById(id);
        if(data != null){
            ctx.rest(data);
        }else{
            throw new APIError('database:data not found', 'data not found');
        }
        await next();
    },
    //返回对应ID送货单上的所有子项
    'GET /api/Delivery_items/deid=:deid':async (ctx, next) => {
        var deid = ctx.params.deid;
        var data = await Delivery_item.findAll({
            where:{
                id_delivery:deid
            }
        });
        if(data != null){
            ctx.rest(data);
        }else{
            throw new APIError('database:data not found', 'data not found');
        }
        await next();
    },
    //根据ID删除送货单items
    'DELETE /api/Delivery_items/id=:id':async (ctx, next) => {
        var id = ctx.params.id;
        if(await Delivery_item.findById(id)){
            var return_Data = await Delivery_item.destroy({
                where:{
                    ID:id
                }
            })
            ctx.rest(return_Data);
            console.log('Inbound_item deleted');
        }else{
            throw new APIError('database:data not found', 'data not found');
        }
        await next();
    },
    //更新对应ID的item
    'PATCH /api/Delivery_items':async (ctx, next) => {
        var data = ctx.request.body;
        if(await Delivery_item.findById(data.ID)){
            var return_Data = await Delivery_item.update(data,{where:{
                    ID:data.ID
                }
            });
            ctx.rest(return_Data);
        }else{
            throw new APIError('database:data not found', 'data not found');
        }
        await next();
    },
    // 根据货号（goods_mark）获取对应的入库单信息
    'GET /api/Inbound_notes/goods_mark=:goods_mark':async (ctx, next) => {
        var goods_mark = ctx.params.goods_mark;
        var items_inbound_id_list = await Inbound_note.findAll({
            where: { goods_mark: goods_mark }
        });
        ctx.rest(items_inbound_id_list);
        await next();
    }
}