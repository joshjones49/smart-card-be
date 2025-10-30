DROP TABLE IF EXISTS cards;

CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    question VARCHAR(1000) NOT NULL,
    answer VARCHAR(1000) NOT NULL,
    category VARCHAR(255) NOT NULL
);

INSERT INTO cards (question, answer, category) VALUES
 ('What is a Closure in JavaScript?', 'A closure in JavaScript is a function that remembers the environment in which it was created. This means it can access variables from its outer lexical scope even after the outer function has returned. ', 'javascript
'),

 ('What is a Promise in JavaScript?', 'A promise is an object that may produce a single value some time in the future: either a resolved value, or a reason that it’s not resolved (e.g., a network error occurred).', 'javascript
'),

 ('What is a Callback in JavaScript?', 'A callback function is a function that is passed as an argument to another function, to be “called back” at a later time.', 'javascript
'),

 ('What is a Higher Order Function in JavaScript?', 'A higher-order function is a function that takes a function as an argument, or returns a function.', 'javascript
'),

 ('What is Event Bubbling in JavaScript?', 'Event bubbling is a type of event propagation where the event first triggers on the innermost target element, and then successively triggers on the ancestors (parents) of the target element in the same nesting hierarchy.', 'javascript
'),

 ('What is Event Delegation in JavaScript?',' Event delegation is a technique where instead of adding an event listener to each individual element, you add a single event listener to a parent element. This listener analyzes bubbled events to find a match on child elements.','javascript
'),

('What is the DOM in JavaScript?', 'The Document Object Model (DOM) is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content.', 'javascript'),

('What is the BOM in JavaScript?', 'The Browser Object Model (BOM) is a browser-specific convention referring to all the objects exposed by the web browser. The BOM is not standardized, and its properties and methods differ from one browser to another.', 'javascript'),

('What is the Prototype in JavaScript?', 'The prototype is an object that is associated with every function and object by default in JavaScript, where function’s prototype property is accessible and modifiable and object’s prototype property is not directly accessible.', 'javascript'),

('What is the Prototype Chain in JavaScript?', 'The prototype chain is a series of objects connected by the prototype property. It is used to implement inheritance and shared properties.', 'javascript'),

('What is the Event Loop in JavaScript?', 'The event loop is the secret behind JavaScript’s asynchronous programming. It is a message queue, that sends a message to the call stack once the stack is empty.', 'javascript'),

('What is the Call Stack in JavaScript?', 'The call stack is a mechanism for an interpreter (like the JavaScript interpreter in a web browser) to keep track of its place in a script that calls multiple functions.', 'javascript'),

('What is the Memory Heap in JavaScript?', 'The memory heap is the place where the memory allocation happens. This is where we store variables and allocate memory.', 'javascript'),

('What is the SetTimeout function in JavaScript?', 'The setTimeout() method calls a function or evaluates an expression after a specified number of milliseconds.', 'javascript'),

('What is the SetInterval function in JavaScript?', 'The setInterval() method calls a function or evaluates an expression at specified intervals (in milliseconds).', 'javascript'),

('What is the Fetch API in JavaScript?', 'The Fetch API provides an interface for fetching resources (including across the network). It will seem familiar to anyone who has used XMLHttpRequest, but the new API provides a more powerful and flexible feature set.', 'javascript'),

('What is the Local Storage in JavaScript?', 'The localStorage and sessionStorage properties allow to save key/value pairs in a web browser.', 'javascript'),

 ('What is the Virtual DOM in React?', 'The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM by a library such as ReactDOM. This process is called reconciliation.', 'react'),

 ('What is JSX in React?', 'JSX is a syntax extension for JavaScript. It was written to be used with React. JSX code looks a lot like HTML.', 'react'),

 ('What is a Component in React?', 'A component is a modular, reusable piece of code that is responsible for rendering a part of the UI. It is typically written as a JavaScript class or function.', 'react'),

 ('What is a Prop in React?', 'Props are inputs to a React component. They are data passed down from a parent component to a child component.', 'react'),

 ('What is a State in React?', 'The state is a data structure that starts with a default value when a Component mounts. It may be mutated across time, mostly as a result of user events.', 'react'),

 ('What is a Hook in React?', 'Hooks are functions that let you “hook into” React state and lifecycle features from function components. They do not work inside classes.', 'react'),

 ('What is a Context in React?', 'Context provides a way to pass data through the component tree without having to pass props down manually at every level.', 'react'),

 ('What is a Ref in React?', 'Refs provide a way to access DOM nodes or React elements created in the render method.', 'react'),

 ('What is a Lifecycle Method in React?', 'Lifecycle methods are special methods that get called at specific points in a component’s life cycle.', 'react'),

 ('What is a Higher Order Component in React?', 'A higher-order component (HOC) is an advanced technique in React for reusing component logic.', 'react'),

 ('What is a Controlled Component in React?', 'A controlled component is a component that renders form elements and controls them by keeping the form data in the component’s state.', 'react'),

 ('What is a Uncontrolled Component in React?', 'An uncontrolled component is a component that renders form elements and controls them by using the DOM API.', 'react'),

 ('What is a Pure Component in React?', 'A pure component is a component that does not re-render when the value of the state and props are the same as the previous state and props.', 'react'),

('What is Express','
Express.js, often simply called Express, is a lightweight and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications.','express'),

('What is Middleware in Express?', '
Middleware in Express.js is a function that has access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. These functions can execute any code, make changes to the request and response objects, end the request-response cycle, and call the next middleware function in the stack.', 'express'),
    
( 'How do you manage sessions in Express?', ' Sessions in Express can be managed using middleware like express-session, which stores session data on the server and associates it with a unique ID stored in a cookie on the client side.', 'express'),

('How do you install Express.js in a Node.js project?', 'You can install Express.js using npm (Node Package Manager) by running npm install express in your project directory.', 'express'),

('How do you handle routing in Express.js?', 'Routing in Express.js is handled using the app.get(), app.post(), app.put(), app.delete(), etc., methods, which correspond to HTTP GET, POST, PUT, DELETE requests respectively.', 'express'),

('What is the purpose of the app.use() method in Express.js?', 'The app.use() method in Express.js is used to mount middleware functions at a specified path. It is commonly used for setting up middleware that applies to all routes.', 'express'),

('How do you serve static files in Express.js?', ' You can use the express.static() middleware function to serve static files such as images, CSS, and JavaScript files. You need to specify the directory containing the static files.', 'express'),

('What is the difference between app.get() and app.use() in Express.js?', 'app.get() is used for handling HTTP GET requests for a specific route, while app.use() is used for mounting middleware at a specified path, which applies to all routes.', 'express'),

(' What is the purpose of req and res objects in Express.js?', ' The req object represents the HTTP request and contains properties for request details, while the res object represents the HTTP response and contains methods for sending the response.', 'express'),

('How do you set up a basic Express.js server?', 'To set up a basic Express.js server, you need to require the Express module, create an instance of the Express application, define routes, and start the server by listening on a specified port.', 'express'),

(' What are route parameters in Express.js?', 'Route parameters in Express.js are placeholders in the route path that capture values specified in the URL. They are defined by placing a colon (:) followed by the parameter name in the route path.', 'express'),

('How do you access route parameters in Express.js?', 'Route parameters are accessible in Express.js through the req.params object. Each parameter is stored as a key-value pair, where the key is the parameter name defined in the route path.', 'express'),

('What is Express Router and how is it used?', 'Express Router is a middleware that allows you to create modular, mountable route handlers. It helps in organizing routes into separate files or modules for better code structure.', 'express'),

('What is the purpose of the next() function in Express.js middleware?', 'The next() function is used to pass control to the next middleware function in the stack. It is typically called within middleware to delegate to the next middleware in the chain.', 'express'),

('How do you handle errors in an Express app?', ' In Express, errors are handled using middleware functions that have four arguments instead of three: (err, req, res, next). The err parameter represents the error object. This type of middleware should be defined last, after other app.use() and route calls. When an error is passed to the next() function, Express will skip any remaining non-error middleware and go directly to error-handling middleware. You can create multiple error-handling middlewares for different types of errors or logging strategies.', 'express');
