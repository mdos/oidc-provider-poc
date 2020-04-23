#!/bin/bash

URL='https://localhost:3000'
STATE=LyrZEk46u5DaLrUh
NONCE=cvRoAzhl8gxdTe9K
SCOPE='openid'
REDIRECT_URI='https%3A%2F%2Fop.certification.openid.net%3A61293%2Fauthz_cb'
CLIENT_ID=openid-cert-id

curl -X GET ${URL}/authorize?state=${STATE}&nonce=${NONCE}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}