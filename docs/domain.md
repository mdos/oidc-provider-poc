# OpenID Connect Domain Model

## Overview


## Flows

### Authorization Code (response_type=code, grant_type=authorization_code)

The canonical authorization flow, uses both front channel and back channel.

![oauth_code_grant image](../images/oauth_code_grant.png)

### Implicit

Front channel only

### Password

Back channel only

### Client Credentials

Back channel only

## response_type table

|  response_type        |  scope | grant_type         | /authorize                 | /token                              |
| ----------------------|--------|--------------------|----------------------------|-------------------------------------|
| "code"                |        | authorization_code | code                       | access_token refresh_token          |
| "code"                | openid | authorization_code | code                       | access_token refresh_token id_token |
| "code token"          |        | authorization_code | code access_token          | access_token refresh_token          |
| "code token"          | openid | authorization_code | code access_token          | access_token refresh_token id_token |
| "code token id_token" |        | authorization_code | code access_token          | access_token refresh_token          |
| "code token id_token" | openid | authorization_code | code access_token id_token | access_token refresh_token id_token |

## Data Model

The data model below represents 

<TBD INSERT>