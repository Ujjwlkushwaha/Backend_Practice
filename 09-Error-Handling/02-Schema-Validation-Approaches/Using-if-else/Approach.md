# Schema validation manually using if statements


### AsyncWrapper [ wrap async callbacks for preventing db errors]
    function asyncWrapper(fn) 
    {
        return function (req, res, next) 
        {
            fn(req, res, next).catch((err) => next(err));
        };
    }

### Post Api [ validate form data ]
    app.post(
    "/register",

    asyncWrapper(async (req, res, next) => {

        let { name, email, password } = req.body;

    <!-- 📌 validate schema -->

        if (!name || name.length < 3)
        {
           throw new CustomError(400 ,"Name should be at least 3 characters long");
        }
        <!-- validate password -->
        if (!password || password.length < 8) {
        throw new CustomError(400 , "Name should be at least 3 characters long");
        }

        <!-- define structure for email  -->
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        <!-- check email -->
        if (!email) {
            throw new CustomError(400, "Email Required");
        }
         else if (!emailRegex.test(email) || email.length < 5) 
         {
            throw new CustomError(400, "Invalid Email");
        }

        //.........................................................

        <!-- After validation Create a new user -->
        let user = new User({ name, email, password });
        await user.save();

        <!-- if Db generate any error that handled by wraper function -->

        res.status(200).render('Success',{name: name, email: email});
    })
    );

### Problem 
* Code gets complication if any schema increase the validation fields 
* Little bit hard to encounter every schema error 
* In large code base we have lots of models and schemas and this method of validation is not simple to recognize and understand 

### In simple terms 
* Is tarike se hmara simple sa dikhne wala route or complex ho jayga 
* And In large schema and database me bahot saare validations and database relations hote hai jinko hme manage krna hota hai 
* to iss tarah se schema ko validate krna is not a good practice

### Solution
* use any schema validation package like 'JOI'
* It is the schema validation tool that provide lots of functionality to validate schema in few lin
