'use strict';

const tools = require('tools');
const userModel = require('server/models').sequelize.models.account;

module.exports = (router) => {
  router.post('/login', async (ctx, next) => {
    const {captcha, password, username} = ctx.request.body;
    if (!captcha || !ctx.session.admin_captcha
      || captcha.toLowerCase() !== ctx.session.admin_captcha.toLowerCase()) {
      ctx.status = 400;
      ctx.body = {statusCode: 400, errors: [{message: '验证码错误', location: 'captcha'}]};
      return;
    }
    delete ctx.session.admin_captcha;

    let where = {};
    if (tools.RegExp.EMAIL.test(username)) {
      where.email = username;
    } else {
      where.username = username;
    }
    const user = await userModel.findOne({
      where,
      attributes: {exclude: ['createdAt', 'updatedAt']},
      raw: true
    });
    const errors = [];
    if (!user) {
      errors.push({message: '账户不存在'});
    } else if (!user.enable) {
      errors.push({message: '账户未启用'});
    } else if (!await tools.password.compare(password, user.password)) {
      errors.push({message: '账户名或密码错误'});
    }
    if (errors.length) {
      ctx.status = 400;
      ctx.body = {statusCode: 400, errors};
    } else {
      ctx.session.admin_user = Object.assign({token: tools.uuid.v4()}, user);
      ctx.body = 'SUCCESS';
    }
  });

  router.all('/logout', (ctx, next) => {
    delete ctx.session.admin_user;
    ctx.redirect('/admin/login');
  });
};
