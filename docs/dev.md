# Development Setup

## Installation

```
# ELK + APM 
git clone https://github.com/deviantony/docker-elk.git; cd docker-elk
docker-compose -f docker-compose.yml -f extensions/apm-server/apm-server-compose.yml up
```

## Launching the System


## Testing Against Compliance Suite

An instance of the test suite runner (which is essentially a configured client application) has been created here:

https://op.certification.openid.net:60337/display#Response

## Load Testing

Please see [README.md](../load_test/README.md) for information on setting up and executing load tests.
