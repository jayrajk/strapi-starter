'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils')

module.exports = {
  async create(ctx) {
    let entity
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.activities.create(data, { files })
    } else {
      entity = await strapi.services.activities.create(ctx.request.body)
    }

    entity = sanitizeEntity(entity, { model: strapi.models.activities })

    if (entity) {
      strapi.services.email.send('testingstrapi@gmail.com', 'info@mallorcard.es', 'New activity is created',
        `The activity #${entity.id} is created take a look into it.

          Activity:
          ${entity.description}`);
    }

    return entity
  },
  activities_price: async ctx => {
    if (ctx.request && ctx.request.body && !ctx.request.body.discount) {
      return ctx.send([])
    }

    const discount = ctx.request.body.discount
    const activities = await strapi.query('Activities').find({})
    for (const activity of activities) {
      let price = activity.price - (activity.price * discount / 100)
      await strapi.query('Activities').update({ id: activity.id }, { price })
    }

    return ctx.send(await strapi.query('Activities').find({}))
  }
};
