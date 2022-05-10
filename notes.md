use validation pkg provided by npm for schema validations.
better folder structure accessibility.

code refactoring
proper error msgs
handling edge cases in authentication.

cookie options yet to be handled ({ domain, path, httpOnly })

*password* mongoose shcema works at time of storing the data, while joi works before continuing with the request by validating the payload.