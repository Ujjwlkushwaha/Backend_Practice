# Cookies 🥠🍪

* A cookie is a small text file that is saved on the user’s computer. 
* Cookies are client-side files on a local computer that hold user information.

* The maximum file size for a cookie is 4KB.

*  It is also known as an HTTP cookie, a web cookie, or an internet cookie.

* This helps us to keep track of the user’s actions.

* ✅ Iska use kewal user ka ya req se related koi bhi data store krne ke liye kiya jata hai 

### Cookie-parser Middleware

* Parse cookies attached to the client request object.
* When we use cookie-parser middleware then this property is an object that contains cookies sent by the request
* If request contains no cookies then by default returns empty object.

### Type of req.cookies 

* ### Normal cookie : 
    
            const cookieParser = require('cookie-parser');  
            const express = require('express');  
            const app = express();  
            const PORT = 3000;  
            
            <!-- middleware -->
            app.use(cookieParser());  
            

            app.get('/user', function (req, res)
            {
                  <!--this data store as a cookie in client  -->
                req.cookies.name='Gourav';  
                req.cookies.age=12;  
            
                console.log(req.cookies);  
                res.send();  
            });  
            
            app.listen(PORT, function(err){  
                if (err) console.log(err);  
                console.log("Server listening on PORT", PORT);  
            });
    
    * This cookie store in clients browser.
    * 📌 The server cannot detect if the cookies are changed by the client.

* ### Signed cookies
    
    *  We use a signed cookie if we want assurance that the data being returned to the cookie has not been modified by the client.

    * The req.signedCookies property contains signed cookies sent by the request;

    *  Signing a cookie does not make it hidden or encrypted but simply prevents tampering with the cookie. 

            
            const cookieParser = require('cookie-parser');  
            const express = require('express');  
            const app = express();  
            const PORT = 3000;  
            
            app.use(cookieParser("secureKey"));  
            
            app.get('/user', function (req, res) {  

                <!-- if we send cookie -->
                req.cookie('Name' , 'Ujjwal ',{signed: true});
            
                // Setting multiple cookies  
                req.signedCookies.title='Gourav';  
                req.signedCookies.age=12;  

                console.log(req.signedCookies);  
                res.send();  
            });  
            
            app.listen(PORT, function(err){  
                if (err) console.log(err);  
                console.log("Server listening on PORT", PORT);  
            });
    
    *  When the cookie gets read, it recalculates the signature and makes sure that it matches the signature attached to it.If it does not match, then it gives an error. If no signed cookies are sent then the property defaults to { }.

### Disadvantage of HTTP-cookies
* The information stored in cookies is not safe since it is kept on the client side in a text format that anybody can see.
* We can activate or disable cookies based on our needs.
* It will automatically delete the data at that specific time. 