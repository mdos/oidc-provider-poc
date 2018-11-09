# OpenID Connect Domain Model

## Overview


## Flows

### Authorization Code (response_type="code *" , grant_type=authorization_code)

The canonical authorization flow, uses both front channel and back channel.

![oauth_code_grant image](../images/oauth_code_grant.png)

### Implicit (response_type="token *" , no grant_type - /token unused)

Front channel (/authorize) only, no refresh_tokens

### Password (grant_type=password)

Generally back channel (/token) only, can be used with highly trusted 1st party clients. Optional refresh_token

### Client Credentials (grant_type=client_credentials)

Back channel (/token) only

### Refresh (grant_type=refresh_token)

Back channel (/token) only

## response_type / grant_type table

|  response_type        |  scope | /authorize returns         | grant_type         | /token  returns                     |
| ----------------------|--------|----------------------------|--------------------|-------------------------------------|
| "code"                |        | code                       | authorization_code | access_token refresh_token          |
| "code"                | openid | code                       | authorization_code | access_token refresh_token id_token |
| "code token"          |        | code access_token          | authorization_code | access_token                        |
| "code token"          | openid | code access_token          | authorization_code | access_token id_token               |
| "code id_token"       |        | code                       | authorization_code | access_token refresh_token          |
| "code id_token"       | openid | code id_token              | authorization_code | access_token refresh_token id_token |
| "code token id_token" |        | code access_token          | authorization_code | access_token                        |
| "code token id_token" | openid | code access_token id_token | authorization_code | access_token id_token               |
| "token"               |        | access_token               |                    |                                     |
| "id_token"            | openid | id_token                   |                    |                                     |
| "id_token token"      | openid | id_token access_token      |                    |                                     |
| "none"                | openid |                            |                    |                                     |
|                       |        |                            | password           | access_token [refresh_token]        |
|                       |        |                            | client_credentials | access_token                        |
|                       |        |                            | refresh_token      | access_token refresh_token          |

## Data Model

The data model below represents 

<TBD INSERT>
