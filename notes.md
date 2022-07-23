use validation pkg provided by npm for schema validations.
better folder structure accessibility.

code refactoring
proper error msgs
handling edge cases in authentication.

cookie options yet to be handled ({ domain, path, httpOnly })

*password* mongoose shcema works at time of storing the data, while joi works before continuing with the request by validating the payload.

route for fetching user recipes

notify user for like of recipe

use graphql for fastening the api request process.

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

