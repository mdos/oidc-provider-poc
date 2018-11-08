# iCIMS OIDC Provider PoC

## Overview

The business development team has decided that the IdP market is ripe for disruption! Our task is to deliver a PoC that the dev and itops teams can run with and evolve.

## Methodology

The desired architecture allows for guided evolution over multiple dimensions (application scalability, organizational scalability, etc. ). A good architecture allows for delayed decision making, extends the information gathering timeline,and minimizes tech debt and guesswork. Observability is a key enabler to allow metrics to drive the evolution of the design.

Numerous case studies support the strategy of initially deploying a simpler, less-distributed system, followed by judicious inclusion of more complexity and distribution of services based on a demonstrated need.

*Single Responsibility Principle* - Allows for easily deploying functionality as it's own service when metrics dictate the necessity to do so

*Externalized Configuration* - Allows for easy 

## Influencing Factors

* Compliance : SOC2 / HIPAA / GDPR - audit, security, privacy, right to erasure, etc. It is assumed that the system would want to partake in verticals requiring compliance
* Team Assumptions: 
  - ITOPS : proficient deploying and administering AWS services (WAF, ALB, ...), docker, k8s, service mesh, CI/CD, DB management, Elastic Stack, Kafka
  - DEV : Only assumption to grok the reference implementation is familiarity with Node.js 8.x. Java/Python/Go teams are free to implement backend microservices in their language of choice.

## The Domain

Please see [domain.md](./docs/domain.md).

## PoC Scope

This section details the scope of work to be done on the architectural design and the reference implementation.

### Scope of Evolutionary Design



### Scope of Reference Impementation

Though APM metrics will likely warrant separate services for the main `/authorize` and `/token` endpoints to allow their scale-out, they will initially be implemented in the API gateway code as separate express routes until concrete evidence supports their evolution.

No email (SES)

## 


## Dev Env Setup

```
# ELK + APM 
git clone https://github.com/deviantony/docker-elk.git; cd docker-elk
docker-compose -f docker-compose.yml -f extensions/apm-server/apm-server-compose.yml up
```

## Future Directions

* Feature Flag support
* CI/CD
* Distributed logging (Jaegar/OpenTracing)
* Test automation
* Anomaly Detection, account blocking
* API GW rate limiting
* CRM/ticketing system
* Authorization pipeline customization (Node.js)
* connections to SAML IdPs
* AWS Lambda / Google Cloud Functions / Azure Functions - (JS only ubiquitously supported language)

## References

https://tools.ietf.org/html/rfc6749
https://openid.net/developers/specs/
https://oidcdebugger.com/
https://oauthdebugger.com/
https://jwt.io
https://openid.net/certification/testing/
https://github.com/panva/node-oidc-provider
https://gdpr-info.eu
https://aws.amazon.com/compliance/hipaa-compliance/

Martin Fowler
Chris Richardson
Matt Stine
Bob Martin
Tim Berglund
Simon Brown
