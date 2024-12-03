# Database relationship 
* How the data, collections, and model connect to each other

### In relational database 
* the relations are maintained by Foreign key and primary key.
* In relational database, this thind to do is very simple.

### Type of relationship

* One to One relationship => a document is connected to another individual document
* One to Many relationship  => a documents is connected to multiple documents ✅ 
* Many to Many relationship => Many documents are connected to another multiple documents

### Focus on One to many relationship 
* In mongoDB, one to many relationships me many ( mean bahot saare documents ) but kitne 
    * On the basis of many => there are     three cases 

        * ( some documents less than 500 )
        * ( more document like 10^3 )
        * ( many documents in millions)

* So, Pahle hm chote ko manage karna seekhege and then complex ki taraf jayge

## less than hundreds [ Store child model inside parent model]

* Lets take an example iss chiz ko samjhne ke liye ( Swiggy or Olla, Uber )
    * In case of Swiggy , there is an user and user can order products from different address that is not fixed

    * And hme address to store krna hi hai and kisi perticuler ke address kitne hi honge 
    * To hm ak approach follow krte hai ki address ka model user schema  ke andar hi create krege

            {
                username : "Mike tison ",

                <!-- like this -> we can store address in form of array of object -->
                address : [
                    {
                        location : 'Rampur',
                        city : 'kanpur',
                        pinCode: 435345
                    },
                    {
                        location : 'Mandhna',
                        city : 'kanpur',
                        pinCode: 209217
                    },
                ],
            }
    * isme Hm hm poora poora object hi store kra dete hai database me

## more than thousands 

* lets take an example of shopping 
    * A user can buy lots of products 
    * ✅ So we need to create individual models of products and users 

    * ✅ yuki agar hm thousands users ke schema ke andar ke andar uske thousands of products ka data store krege to ye bahot inefficient approach hogi and database par load jyada ayega 

    *✅  Jab hme kisi ak document ke liye thausands of documents ko store krna hota hai to 
    
    *✅  Un Thousands of document ko kahi alg collection me store krayge and unki id Parent collection me store kra denge


    * Create Order collection 

        {
            product_name : String,
            price : Number
        }

        mongoose.model('Order', orderSchema);

    * Create Customer collections

            {
                name : String,
                orders : [
                    {
                        <!-- this is the way of seting type = id -->
                        type : Schema.Type.ObjectId,

                        <!--  ref hme batayga ki id kaha se ayegi -->
                        ref: "Order"
                    }
                ]
            }

    * In this schema data store in db like this =>
            
            {
                _id: ObjectId('673c0b385a9bafd166c867c6'),
                name: 'John Doe',
                orders: [
                    ObjectId('673b018aa1466c551e024c81'), 
                    ObjectId('673b018aa1466c551e024c82')  
                ],
                __v: 0
            }

    ### Pupulation in Mongoose
    * we know that One to many relationships me parent collections me child collections ki reference _id store hoti hai
    * But agar hme vo document ka data bhi chahiye jiski id store hai to hm uske liye Populate method ka use krege

    * Mongoose me Populate method => Object id ko real document se replace kr deta hai jisse jab hm parent collection ko read krte hai 
    to hme vaha id ki jagah poora documet dikhega

    * When you print the parent document or read the document
            
            
            async function () =>{
                let data = await Customer.find().populate("orders");
                console.log(data)
                console.log(data[0]);
            }
            

            <!--✅  Print like this -->
            {
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
                _id: new ObjectId('673c0b385a9bafd166c867c6'),
                __v: 0
            }
        