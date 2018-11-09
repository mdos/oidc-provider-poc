# iCIMS OIDC Provider PoC

## Overview

The business development team has decided that the IdP market is ripe for disruption! Our task is to deliver an OpenID Connect Provider PoC that the dev and itops teams can run with and evolve.

## Methodology

A desirable architecture allows for guided evolution over multiple dimensions (application scalability, organizational scalability, agility, business domain alignment, etc.).

Further, a good architecture allows for:

* Abstraction of technology details
* Extension of the information gathering timeline for concrete technology decisions
* Minimization of tech debt and guesswork
* Conway alignment

Numerous case studies support the strategy of initially deploying a simpler, less-distributed system, followed by judicious inclusion of more complexity and distribution of services based on a demonstrated need.

Observability is a key enabler to allow metrics to drive the evolution of the design.


## Influencing Factors

* Compliance : SOC2 / HIPAA / GDPR - audit, security, privacy, right to erasure, etc. It is assumed that the business would want to partake in verticals requiring compliance
* Team Assumptions: 
  - ITOPS : proficient deploying and administering cloud services (WAF, ALB, ...), docker, k8s, service mesh, CI/CD, DB management, Elastic Stack, Kafka
  - DEV : The only assumption to grok the reference implementation is proficiency with Node.js 8.x. Java/Python/Go teams are free to implement backend microservices in their language of choice.

## The Domain

Please see [domain.md](./docs/domain.md) for information on the OAuth2/OIDC flows, and data models

## PoC Design

Please see [design.md](./docs/design.md) for the system and container level designs, and the proposed scope of the PoC design and reference implementations.

## Dev Env Setup

Please see [dev.md](./docs/dev.md) for development environment setup.

## References

* https://tools.ietf.org/html/rfc6749
* https://openid.net/developers/specs/
* https://oidcdebugger.com/
* https://oauthdebugger.com/
* https://jwt.io
* https://openid.net/certification/testing/
* https://medium.com/@darutk/diagrams-of-all-the-openid-connect-flows-6968e3990660
* https://github.com/panva/node-oidc-provider
* https://gdpr-info.eu
* https://aws.amazon.com/compliance/hipaa-compliance/
* Martin Fowler - https://martinfowler.com/
* Chris Richardson - https://microservices.io/
* http://blog.christianposta.com/
* Bob Martin 
* Matt Stine - http://www.mattstine.com/
* Tim Berglund - http://timberglund.com/
* Simon Brown - http://www.codingthearchitecture.com/
* Sam Newman - https://samnewman.io/
