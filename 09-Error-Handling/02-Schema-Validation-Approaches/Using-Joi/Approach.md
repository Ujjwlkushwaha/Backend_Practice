### Joi Error

    {
    value: {
        name: 'krishna',
        email: 'krishana@gmail.com',
        password: '1234567888',
        confirmPassword: '1234567888'
    },
    error: [Error [ValidationError]: "confirmPassword" is not allowed] {
        _original: {
        name: 'krishna',
        email: 'krishana@gmail.com',
        password: '1234567888',
        confirmPassword: '1234567888'
        },
        details: [ [Object] ]
    }
    }

### after joining the whole err msg

    {
    "errorResponse": {
        "index": 0,
        "code": 11000,
        "errmsg": "E11000 duplicate key error collection: test.users index: email_1 dup key: { email: \"Kavita@gmail.com\" }",
        "keyPattern": {
        "email": 1
        },
        "keyValue": {
        "email": "Kavita@gmail.com"
        }
    },
    "index": 0,
    "code": 11000,
    "keyPattern": {
        "email": 1
    },
    "keyValue": {
        "email": "Kavita@gmail.com"
    }
    }