const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ✅ Db connection

mongoose.connect('mongodb://127.0.0.1:27017/Relationship')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));
 
//✅ Create Order schema
const ordersSchema = new Schema({
    product_name : String,
    price : Number,
    quantity : Number
});

//✅  Create customer schema
const customerSchema = new Schema({
    name : String,
    // this is the way we can refernce to other schema 
    orders : [{
        // yaha hm bta rhe type kisi doosre schema ki id hai
        type : Schema.Types.ObjectId,
        ref : "Order"
    },]
});


//✅ Create Order model
const Order = mongoose.model('Order',ordersSchema);

//✅  Create Customer model
const Customer = mongoose.model('Customer',customerSchema);

let createOrders = async()=>{

    let products = [
        { 
            product_name : 'Laptop',
            price : 10000,
            quantity : 2
        },
        { 
            product_name : 'Mobile',
            price : 5000,
            quantity : 3
        },
        { 
            product_name : 'Tablet',
            price : 4000,
            quantity : 1
        },
        { 
            product_name : 'Headphones',
            price : 1500,
            quantity : 4
        }
    ];

    await Order.insertMany(products);
}

let createCostomer = async()=>{


    // ✅ Customer creating some orders 
    await createOrders();

    let customer = new Customer({
        name : "John Doe",

        //✅  we are referencing the order schema here
        orders : [
            await Order.findOne({product_name: 'Laptop'}),
            await Order.findOne({product_name: 'Mobile'})
        ]
    });
    // jab bhi hm iss tarah se data save krate hai to db me hmesa Object ki id store hogi jabki hm poora object hi search krke bhej rhee
    
    let result = await customer.save();
    console.log(result);
}

createCostomer();