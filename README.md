
# Disease prediction based on symptoms.

## Team members : 
- Karthikeya 	S20200010090
- Basava Chari Boppudi S20200010043

## Project Details :

- Collected the data set from **drugs.com** website.
- Used **elastic search** for indexing and searching.
- Took the feedback from user either disease is relavent or not.
- Calculated the metrics like precision, Recall and 11 point precision.

## Setting up:

### To run the code you need node.js (Javascript runtime), Elasticsearch and npm (node package manager - mostly it will be installed while installing node.js)

- In order to run the code elastic search is essential.
- If not exists then install it on system or take the docker image "elastic search".
- Run the container in port 9200.

### Installing Elasticsearch using Docker

- If Docker is already installed on the system then create a service.yml file with the below code.

```
version: '3.8'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.4.0
    container_name: elasticksearch
    restart: always
    environment:
      - xpack.security.enabled=false
      - discovery.type=single-node
    ulimits:
      memlock:
        soft: -1
        hard: -1
      nofile:
        soft: 65536
        hard: 65536
    cap_add:
      - IPC_LOCK
    volumes:
      - elasticsearch-data-volume:/usr/share/elasticsearch/data
    ports:
      - 9200:9200
  kibana:
    container_name: kibana
    image: docker.elastic.co/kibana/kibana:7.4.0
    restart: always
    environment:
      - ELASTICSEARCH_HOST=http://elasticsearch:9200
    ports:
      - 5601:5601
    depends_on:
      - elasticsearch
volumes:
  elasticsearch-data-volume:
    driver: local

```

- Then run the below command to pull and run elasicsearch and kibana (elastiseach visualization tool) (optional) images and run on their respective ports 9200 and 5601.

```
docker-compose service.yml
```

## To run Backend and Frontend

Run the following commands on both frontend and backend directory
```
npm install
npm start
```

- Then the frontend will open in "http://localhost:3000", it shows the search inteface.
- After giving the query it display's the top 10 results that matches.
- It will shows the metrices after giving the feedback that the document is relavent or not.

For Your Information - By default frontend runs on port 3000 and backend runs on port 4000.
