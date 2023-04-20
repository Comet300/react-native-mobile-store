"use strict";
var ID = function () {
  return Math.random().toString(36).substr(2, 9);
};
//NESIGUR PENTRU PRODUCTIE, SUFICIENT PENTRU TESTARI LOCALE

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      data.unique_id = ID();
    },
  },
};
