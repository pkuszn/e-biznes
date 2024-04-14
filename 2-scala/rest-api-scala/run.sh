#!/bin/bash

docker run -d -p 9000:9000 rest-api-scala

./ngrok http 9000