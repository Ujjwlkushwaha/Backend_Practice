# Database denormalization rules of thumb [link](https://www.mongodb.com/developer/products/mongodb/mongodb-schema-design-best-practices/)

## Here are some “rules of thumb” to guide you through these innumerable (but not infinite) choices:

### Embed When You Can
* Keep related data in the same document for simplicity and speed.
* Example: Store a user's address inside the user profile if it's always needed together.

### Separate When Independent Access is Needed
* If you often need one part of the data on its own, keep it separate.
* Example: Don’t embed all orders inside a customer document if orders need to be accessed without the customer.

### Avoid Uncontrolled Growth in Arrays
* Large arrays can become unmanageable and hurt performance.
Guideline:
* Less than a couple of hundred items? Embed.
* More than a few thousand items? Use references instead.

### Don’t Fear Application-Level Joins
* You can handle joins in your app efficiently with proper indexing.
* Example: Use separate collections for authors and books, then join them in your app when needed.

### Match Read-to-Write Needs
* Frequently read but rarely updated fields are great for denormalization (e.g., copying data for quick reads).
* Avoid duplicating data that’s updated often, as maintaining consistency can be costly.

### Prioritize Your App’s Query Patterns
* Design your data model to match how your app will query and update data.
* Example: If most queries need user data along with their recent activities, embed those activities in the user document.
