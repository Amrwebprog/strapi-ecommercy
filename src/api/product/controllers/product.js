'use strict';

/**
 * product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product', ({ strapi }) => ({
  // Override the default findOne method
  async findOne(ctx) {
    const { id } = ctx.params;

    // البحث باستخدام حقل id كرقم (Number)
    const entity = await strapi.db.query('api::product.product').findOne({
      where: { id: Number(id) }, // استخدام id بدلاً من documentId
      populate: true, // يقوم بملء البيانات المرتبطة (مثل الفئات أو العلامات التجارية)
    });

    // إذا لم يتم العثور على المنتج، أرجع رسالة خطأ
    if (!entity) {
      return ctx.notFound('Product not found');
    }

    // إرجاع الكيان (Entity) بعد التعقيم
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  }
}));
