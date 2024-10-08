'use strict';

/**
 * myuser service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::myuser.myuser');
