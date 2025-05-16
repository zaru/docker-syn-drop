#!/bin/bash

REPEAT=10000
for i in $(seq 1 $REPEAT); do
  echo -n "[$i] "
  RESPONSE_TIME=$(curl -H "Connection: close" -s -o /dev/null -w '%{time_total}' http://host.docker.internal:3000/)
  echo "Response time: ${RESPONSE_TIME}s"
done
