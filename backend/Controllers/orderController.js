const Order = require('../Models/OrderModel')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = 'whsec_c8566be1ec6805b9ecae869a4a429e359488d80b544b2477a19483db9e126c9e'; 
let items;
let userEmail;

const checkoutSession = async (req, res) => {  
    items = req.body.items;  
    userEmail = req.body.userEmail
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body.items.map(item => ({
          price_data: {
            currency: 'eur',
            product_data: {
              name: item.name
            },
            unit_amount: item.price * 100
          },
          quantity: item.quantity
        })),
        mode: 'payment',
        client_reference_id: req.body.userId,
        shipping_address_collection: {
          allowed_countries: ['HR']
        },
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel'
      });
      res.json({ url: session.url });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const stripeWebhook = (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.log('Webhook signature verification failed.', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        handleCheckoutSessionCompleted(session);
        break;
      default:
        console.log(event.type);
    }
    res.json({ received: true });
};
  
const handleCheckoutSessionCompleted = async (session) => {
  const userId = session.client_reference_id;
  const lineItems = items.map(item => ({
    productId: item.id,
    quantity: item.quantity,
    size: item.size,
    type: item.type,
  }));

  const order = new Order({
    customerId: userId,
    customerEmail: userEmail,
    products: lineItems,
    price: session.amount_total / 100, // Convert from cents to dollars
  });

  try {
    await order.save();
  } catch (error) {
    console.error('Error saving order:', error.message);
  }
};

const getAllOrders = async (req, res) => {
  let orders = await Order.find({});
  res.send(orders);
} 

const getOrdersByUser = async (req, res) => {
  let orders = await Order.find({customerId: req.params.id});
  res.send(orders);
}

const getOrderCount = async (req, res) => {
  const count = await Order.countDocuments();
  res.json({ count });
};

const getCustomerCount = async (req, res) => {
    const distinctCustomers = await Order.distinct('customerId');
    const count = distinctCustomers.length;
    res.json({ count });
};


const getTotalEarnings = async (req, res) => {
  const totalEarnings = await Order.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: '$price' }
      }
    }
  ]);

  const total = totalEarnings.length > 0 ? totalEarnings[0].total : 0;

  res.json({ total });
};

const getEarningsByMonth = async (req, res) => {
    const earningsByMonth = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$date' } },
          total: { $sum: '$price' }
        }
      },
      {$sort: { _id: 1 }} // Sort by month in ascending order
    ]);

    res.json({ earningsByMonth });
};

const getTshirtCount = async (req, res) => {
  const soldTshirtCount = await Order.aggregate([
    {
      $match: {
        products: {$elemMatch: { type: 't-shirt' }}
      }
    },
    {$unwind: '$products'},
    {$match: {'products.type': 't-shirt'}},
    {
      $group: {
        _id: null,
        totalSold: { $sum: '$products.quantity' }
      }
    }
  ]);
  res.json({ soldCount: soldTshirtCount.length > 0 ? soldTshirtCount[0].totalSold : 0 });
};

const getHoodieCount = async (req, res) => {
  const soldHoodieCount = await Order.aggregate([
    {
      $match: {
        products: {$elemMatch: { type: 'hoodie' }}
      }
    },
    {$unwind: '$products'},
    {$match: {'products.type': 'hoodie'}},
    {
      $group: {
        _id: null,
        totalSold: { $sum: '$products.quantity' }
      }
    }
  ]);
  res.json({ soldCount: soldHoodieCount.length > 0 ? soldHoodieCount[0].totalSold : 0 });
};

const getPantsCount = async (req, res) => {
  const soldPantsCount = await Order.aggregate([
    {
      $match: {
        products: {$elemMatch: { type: 'pants' }}
      }
    },
    {$unwind: '$products'},
    {$match: {'products.type': 'pants'}},
    {
      $group: {
        _id: null,
        totalSold: { $sum: '$products.quantity' }
      }
    }
  ]);
  res.json({ soldCount: soldPantsCount.length > 0 ? soldPantsCount[0].totalSold : 0 });
};

const getJacketCount = async (req, res) => {
  const soldJacketcount = await Order.aggregate([
    {
      $match: {
        products: {$elemMatch: { type: 'jacket' }}
      }
    },
    {$unwind: '$products'},
    {$match: {'products.type': 'jacket'}},
    {
      $group: {
        _id: null,
        totalSold: { $sum: '$products.quantity' }
      }
    }
  ]);
  res.json({ soldCount: soldJacketcount.length > 0 ? soldJacketcount[0].totalSold : 0 });
};

const getTotalSoldClothes = async (req, res) => {
  const totalSoldClothes = await Order.aggregate([
      { $unwind: '$products' },
      { $group: { _id: null, totalSold: { $sum: '$products.quantity' } } }
  ]);
  res.json({ totalSold: totalSoldClothes.length > 0 ? totalSoldClothes[0].totalSold : 0 });
};

module.exports = {
    checkoutSession,
    stripeWebhook,
    getAllOrders,
    getOrdersByUser,
    getOrderCount,
    getCustomerCount, 
    getTotalEarnings,
    getEarningsByMonth,
    getTshirtCount,
    getHoodieCount,
    getPantsCount,
    getJacketCount, 
    getTotalSoldClothes
};