/** Shopping cart procedures */
const {
  customer_add_procedure,
  customer_get_procedure,
  customer_get_list_procedure,
  customer_get_shipping_regions_procedure,
  customer_update_account_procedure,
  customer_update_address_procedure,
  customer_update_credit_card_procedure
} = require('../stored_procedures');

module.exports.addCustomer = (sequelize, inName, inEmail, inPassword) => (
  sequelize.query(customer_add_procedure,
    {
      replacements: {
        inName,
        inEmail,
        inPassword
      }
    }
  )
);

module.exports.getCustomer = (sequelize, inCustomerId) => (
  sequelize.query(customer_get_procedure,
    {
      replacements: {
        inCustomerId
      }
    }
  )
);

module.exports.getCustomerList = (sequelize) => (
  sequelize.query(customer_get_list_procedure)
);

module.exports.getShippingRegion = (sequelize) => (
  sequelize.query(customer_get_shipping_regions_procedure)
);

module.exports.updateAccount = (sequelize,
                                inCustomerId,
                                inName,
                                inEmail,
                                inPassword,
                                inDayPhone,
                                inEvePhone,
                                inMobPhone
                                ) => (
  sequelize.query(customer_update_account_procedure,
    {
      replacements: {
        inCustomerId,
        inName,
        inEmail,
        inPassword,
        inDayPhone,
        inEvePhone,
        inMobPhone
      }
    }
  )
);

module.exports.updateAddress = (sequelize,
                                inCustomerId,
                                inAddress1,
                                inAddress2,
                                inCity,
                                inRegion,
                                inPostalCode,
                                inCountry,
                                inShippingRegionId
                                ) => (
  sequelize.query(customer_update_address_procedure,
    {
      replacements: {
        inCustomerId,
        inAddress2,
        inCity,
        inRegion,
        inPostalCode,
        inCountry,
        inShippingRegionId
      }
    }
  )
);

module.exports.updateCreditCard = (sequelize, inCustomerId, inCreditCard) => (
  sequelize.query(customer_update_credit_card_procedure,
    {
      replacements: {
        inCustomerId,
        inCreditCard
      }
    }
  )
);
