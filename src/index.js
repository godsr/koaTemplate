require('dotenv').config(); // .env에서 환경변수 불러오기
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors');

const app = new Koa();
const router = new Router();
const api = require('./api');

const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');

mongoose.Promise = global.Promise; // Node 의 네이티브 Promise 사용
// mongodb 연결
console.log("log:",process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI).then(
    (response) => {
        console.log('Successfully connected to mongodb');
    }
).catch(e => {
    console.error(e);
});

const port = process.env.PORT || 3000; // PORT 값이 설정되어있지 않다면 4000 을 사용합니다.

router.use('/api', api.routes()); // api 라우트를 /api 경로 하위 라우트로 설정

// app.use(async ctx => {
//     // 아무것도 없으면 {} 가 반환됩니다.
//     ctx.body = ctx.request.body;
// });

app.use(cors()); 
app.use(bodyParser()); // 바디파서 적용, 라우터 적용코드보다 상단에 있어야합니다.
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
    console.log('heurm server is listening to port ' + port);
});