# PoC Design

## System View

## Container View

SOLID design
Bounded contexts

*Single Responsibility Principle* - Allows for easily deploying functionality as it's own service when metrics dictate the necessity to do so


## Scope of Reference Implementation

(INSERT SHADED PIC OF CONTAINER DESIGN)

TODO: Matt Stine
*Externalized Configuration* - Allows for easy 

This section details the scope of work to be done on the architectural design and the reference implementation. The distinction here is that the design will incorporate additional features and deployment elements which are not implemented in the initial reference implementation, but should be completed prior to deployment to an IaaS provider.

Includes Users, time permitting a subset of admin, no CRM. Does not include distributed log for analytics events and asynchronous event sourcing (admin functions).

Though APM metrics may warrant separate services for the main `/authorize` and `/token` endpoints to allow their scale-out, they will initially be implemented in the API gateway code as separate express Router instances until concrete evidence supports their evolution.

No email (SES)

## Future Directions

* Feature Flag support
* CI/CD (CircleCI, Jenkins)
* Distributed logging (Jaegar/OpenTracing)
* Test automation (Chimp)
* Anomaly Detection, account blocking
* API GW rate limiting
* CRM/ticketing system
* Authorization pipeline customization (Node.js)
* connections to SAML IdPs
* AWS Lambda / Google Cloud Functions / Azure Functions - (JS only ubiquitously supported language)
