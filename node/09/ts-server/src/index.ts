import * as Koa from 'koa'
import * as bodify from 'koa-body';
import * as serve from 'koa-static';
import * as timing from 'koa-xtime';

const app = new Koa()
app.use(
    bodify({
        multipart:true,
        strict:false
    })
)
// app.use((ctx: Koa.Context) => {
//     ctx.body = 'hello'
// })

import { load } from './utils/decors';
import {resolve} from 'path'

import { Sequelize } from 'sequelize-typescript';

const database = new Sequelize({
    port:3306,
    database:'kaikeba',
    username:'root',
    password:'example',
    dialect:'mysql',
    modelPaths: [`${__dirname}/model`],    
});

const router = load(resolve(__dirname, './routes'));
app.use(router.routes())

app.listen(3000 ,() => {
    console.log('服务器启动成功。。')
})

