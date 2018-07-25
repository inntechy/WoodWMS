//给context绑定一个rest功能，这样就可以比较方便地调用rest方法来返回API了
module.exports = {
    restify: (pathPrefix) => {
        //REST API前缀 默认为/api/
        pathPrefix = pathPrefix || '/api';
        return async (ctx, next) => {
            //判断是否api前缀
            if(ctx.request.path.startsWith(pathPrefix)) {
                //绑定rest()方法
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                }
                await next();
            }
            else {
                await next();
            }
        }
    }
}