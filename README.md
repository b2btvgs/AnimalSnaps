
To run the tests:

### `npm test`

This is a tiny repo just demonstrating a basic node.js class (AnimalApiGroup) with a single 'handler' function (handler) that does the following:
    1. call one public api (animals domain) and return its result before calling others.
    2. call two other public api's in parallel and wait for both of those responses
    3. push these three api results (urls) into an array and return that array

This type of function could be turned into a GCP or AWS cloud function (aka lambda function) and then use the API Gateway as its initiation event. In a more robust version of this function, the two parallel api's would have to be better handled given that they each resolve to two different json properties ('.url' for one and '.link' for the other). In this demo this is simply done by resolving in order of each url within the containing array.

Also, the above is purely showing a basic backend function (AnimalApiGroup.handler) so I stopped short of setting up an express router etc. through which to call it. Instead, there's a helper function (simpleCaller.js) that will use the three public api's as input and invoke the AnimalApiGroup.handler() and return the fetched results.

There is some very basic start-level Jest unit testing set up with very simple mocking at the surface level. To go further, an actual professional application would (in my opinion) use something a bit more robust that the new 'fetch-mock' package and instead use either Sinon or Nock.js to mock the 'new AnimalApiGroup().handler()' results. This can be done using the nock recorder (nock.recorder.rec()). This takes a bit of initial setup work but does a great job of showing actual (ie, real) external calls where one can capture that (using the node repl to invoke the recorder) and use for mocking scopes.
