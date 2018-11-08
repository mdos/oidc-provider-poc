# Development Setup

## Core System

```
# ELK + APM 
git clone https://github.com/deviantony/docker-elk.git; cd docker-elk
docker-compose -f docker-compose.yml -f extensions/apm-server/apm-server-compose.yml up
```

## Load Testing

Please see [README.md](../load_test/README.md) for information on setting up and executing load tests.
