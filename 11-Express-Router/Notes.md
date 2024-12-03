# Express Router 
* router object is an instance of middleware and routes. 

* You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.

* You can add middleware and HTTP method routes (such as get, put, post, and so on) to it just like an application.

        const router = express.Router();

### Use of router object

* By using express.Router(), you can organize your Express app’s routing logic.

* Allowing you to define specific routes and middleware for different parts of your application, such as users, products, or orders, in a more maintainable way.
