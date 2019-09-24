/** Email confirmation message */
const moment = require('moment');

module.exports = (
  order,
  address,
  city,
  state,
  country,
) => order.map(product =>(
  `Thank you for placing an order with Turing T-shirt Shop.
  Your reference number is <b>${product.reference}</b>.<br/> 
  <p/>
  <b>Order details:</b> <br/>
  <p/>
  Order date: ${moment(new Date()).format('MMMM DD, YYYY ')}<br/>
  Name of item: ${product.name}<br/>
  Item Quantity: ${product.quantity} <br/>
  Shipping date: ${moment(new Date()).add(3, 'days').format('MMMM DD, YYYY ')}<br/>
  <p/>
  <b>Destination:</b></br> 
  <p/>
        ${address}<br/>
        ${city}, ${state}, ${country}<br/>
  <p/>    
  <b>Estimated Date of Arrival: </b></br>
  ${moment(new Date()).add(7, 'days').format('DD')} - 
  ${moment(new Date()).add(10, 'days').format('DD')} ${moment(new Date()).add(10, 'days').format('MMMM, YYYY')}<br/>
  <p/>
  Questions about your order? Contact the Turing helpdesk at +234 80 655 73860 or <b>clementudensi@gmail.com</b>. <br/><p/>`
)).reduce((accumulator, currentValue) => accumulator + currentValue);
