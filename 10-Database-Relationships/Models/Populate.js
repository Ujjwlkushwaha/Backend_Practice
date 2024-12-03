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

let getCostomerData = async()=>{

    let customersData = await Customer.find();
    console.log(customersData);


    // output
    /*
        [
            {
            _id: new ObjectId('673c19cb27db2efdeee27453'),
            name: 'John Doe',
            orders: [
                new ObjectId('673b018aa1466c551e024c81'),
                new ObjectId('673b018aa1466c551e024c82')
            ],
            __v: 0
            }
        ]
    */
}
getCostomerData();



// ✅ Print data of customrs using population

let populateCustomerData = async()=>{
    let customersData = await Customer.find().populate('orders');
    console.log(customersData);
    // output
    /*
        [
            {
                _id: new ObjectId('673c19cb27db2efdeee27453'),
                name: 'John Doe',
                orders: [ [Object], [Object] ],
                __v: 0
            }
        ]
    
    */
    console.log(customersData[0])

    /*
        {
            _id: new ObjectId('673c19cb27db2efdeee27453'),
            name: 'John Doe',
            orders: [
                {
                    _id: new ObjectId('673b018aa1466c551e024c81'),
                    product_name: 'Laptop',
                    price: 10000,
                    quantity: 2,
                    __v: 0
                },
                {
                    _id: new ObjectId('673b018aa1466c551e024c82'),
                    product_name: 'Mobile',
                    price: 5000,
                    quantity: 3,
                    __v: 0
                }
            ],
            __v: 0
        }
    */
}
populateCustomerData();