#!/bin/bash

docker run --rm -it --net=host landoop/fast-data-dev bash

# hop into the cluster, cheat sheet for topics:
#
# #Creates the topic if it's not already in existence. 1st message may see a
# # Leader not available error, since the topic isn't yet created. But
# # subsequent messages should be fine.
# kafka-console-producer --broker-list 127.0.0.1:9092 --topic my_topic
#
