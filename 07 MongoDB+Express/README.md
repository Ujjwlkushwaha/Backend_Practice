# Express + mongoDB ( Learn with makink Chat functionality )

* We will learn and practice mongoDB with express creating a simple chat functionality
* For this time, I am focusing on impelement CRUD functionality and as we learn ferther then I will implement more features like error handling authentication etc.

## Chat functionality 

### Phase 1 : 
* We set basic server and connect to DB 
* Create basic CRUD functionality 

RestFul-API
    * Read chats ( get route => /chats)
        * Read all chats
    * Create new chat ( post route => /chats )
    * Edit chats  ( Pathc route => /chats/:id )
    * Delete chat ( Delete route => /chats/:id )

### Phase 2 : 
* Add Some error Handling stuff and middlewares for may authenticate users