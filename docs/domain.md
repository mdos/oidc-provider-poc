# OpenID Connect Domain Model

* [Overview](#Overview)
* [Flows](#Flows)
  - [Authorization Code](#Authorization-Code)
  - [Implicit](#Implicit)
  - [Password](#Password)
  - [Client Credentials](#Client-Credentials)
  - [Hybrid](#Hybrid)

## Overview

This document details the overall OIDC domain, including
* OAuth2 and OIDC protocol flows. 
* Classic Relational (ERD) and NoSQL Data models 

For system design information, please see (./design.md).

## Flows

The diagrams below eludicate the OAuth2 and OpenID Connect protocol details.

**Front Channel** : Denotes communication between the end-user's User-Agent and the 
Authorization Server. The User-Agent is typically a *public* (non-confidential)
entitiy like a web browser.
**Back Channel** : Denotes communication between a *confidential* client and 
the Authorization Server. Back channel communication 

### Authorization Code 

The canonical OAuth2 authorization flow, uses both front channel and back channel. 
The initial request at the AS to the /authorization endpoint sets the 
`response_type="code"`, the ensuing request for a token at the token endpoint 
set `grant_type=authorization_code`). 

![oauth_code_grant image](../images/oauth_code_grant.png)

**Figure**: Code Flow

See [Flow Type Table](#Flow-Type-Table) below for specific reponse_type / grant_type 
combinations and codes/tokens delivered for each.

### Implicit 

A front-channel only OAuth2/OIDC authorization flow (/token endpoint is unused), used by public (non-confidential) 
clients such as user-agent resident Javascript applications (eg. React/Angular).
The initial request at the AS to the /authorization endpoint sets the 
`response_type="token"|"id_token"|"token id_token"`. The AS does not produce refresh_tokens. 

![oauth_implicit_flow image](../images/oauth_implicit_flow.png)

**Figure**: Implicit Flow

See [Flow Type Table](#Flow-Type-Table) below for specific reponse_types 
and tokens delivered for each.

### Password

Also known as *Resource Owner Password Grant*, generally back channel
with a confidential client, but can be used front channel with highly trusted 1st party clients.
The initial request at the AS to the /token endpoint sets the 
`grant_type="password"`. The AS may produce an optional refresh_token. 

This grant type should never be used with a 3rd party application, as the
authorization code grant was designed exactly for that use case. This flow
is an improvement over direct client access to resource owner login credentials.
If the client type is confidential, it must authenticate with the AS.

![oauth_password_flow image](../images/oauth_password_flow.png)

**Figure**: Implicit Flow


### Client Credentials 

Back channel (/token) only (grant_type=client_credentials, /authorize unused)



### Refresh (grant_type=refresh_token, /authorize unused)

Back channel (/token) only flow used to obtain a new `access_token`/`refresh_token`
pair by exchanging a previously obtained `refresh_token`.

### Hybrid (grant_type="code id_token", "code token", "code id_token token")

The Hybrid Flow hits both the `/authorize` and `/token` endpoints, and is a modification
of the [Authorization Code Flow](#Authorization-Code) above. 
See [Flow Type Table](#Flow-Type-Table) below for specific reponse_type / grant_type 
combinations and codes/tokens delivered for each.


## Flow Type Table

Implicit Flows - Return an `access_token` or `id_token` in the authentication reponse URL hash fragment, do not hit `/token` endpoint
Hybrid Flows - Return an `access_token` or `id_token` in the authentication reponse URL hash fragment, additionally hit `/token` endpoint

|  response_type        |  scope | /authorize returns         | grant_type                  | /token  returns                     |
| ----------------------|--------|----------------------------|-----------------------------|-------------------------------------|
| "code"                |        | code                       | authorization_code          | access_token refresh_token          |
| "code"                | openid | code                       | authorization_code          | access_token refresh_token id_token |
| "code token"          |        | code access_token          | (Hybrid) authorization_code | access_token                        |
| "code token"          | openid | code access_token          | (Hybrid) authorization_code | access_token id_token               |
| "code id_token"       |        | code                       | (Hybrid) authorization_code | access_token refresh_token          |
| "code id_token"       | openid | code id_token              | (Hybrid) authorization_code | access_token refresh_token id_token |
| "code token id_token" |        | code access_token          | (Hybrid) authorization_code | access_token                        |
| "code token id_token" | openid | code access_token id_token | (Hybrid) authorization_code | access_token id_token               |
| "token"               |        | access_token               | (Implicit)                  |                                     |
| "id_token"            | openid | id_token                   | (Implicit)                  |                                     |
| "id_token token"      | openid | id_token access_token      | (Implicit)                  |                                     |
| "none"                | openid |                            |                             |                                     |
|                       |        |                            | password                    | access_token [refresh_token]        |
|                       |        |                            | client_credentials          | access_token                        |
|                       |        |                            | refresh_token               | access_token refresh_token          |

## Data Model

The models below represent a classic ERD model and NoSQL document model of static configuration data and runtime data in the system.

### Configuration Data ERD

### Configuration Data NoSQL Document Model

### Runtime Request Data ERD

### Runtime Request Data NoSQL Document Model
