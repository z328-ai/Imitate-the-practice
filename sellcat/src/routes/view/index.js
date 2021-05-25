const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

function getLoginInfo(ctx) {
    let data = {
        isLogin: false // 默认未登录
    }

    const userInfo = ctx.session.userInfo
    if (userInfo) {
        data = {
            isLogin: true,
            userName: userInfo.userName
        }
    }

    return data
}

router.get('/', async(ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
})

router.get('/login', async(ctx, next) => {
    await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async(ctx, next) => {
    await ctx.render('register', getLoginInfo(ctx))
})

module.exports = router