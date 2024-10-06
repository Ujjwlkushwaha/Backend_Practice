// const url = require('url');

let new_url = new URL('https://www.facebook.com/default.html?year=2017&month=february');

// printing url.............
console.log(new_url.href);
console.log(new_url.toString());

// host ka naam
console.log(new_url.host);
console.log(new_url.hostname); // www.facebook.com

// port number
console.log(new_url.port);

// file path => jo file open hogi
console.log(new_url.pathname);// /default.html

// your query -> string
console.log(new_url.search); //?year=2017&month=february

// your query -> json
console.log(new_url.searchParams); //{ 'year' => '2017', 'month' => 'february' }

// add new query.......................
new_url.searchParams.append('status' , 'live');
console.log(new_url.searchParams); // { 'year' => '2017', 'month' => 'february', 'status' => 'live' }



