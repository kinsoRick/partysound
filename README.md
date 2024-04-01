
# Partysound

VK mini application for finding shared songs between vk users
## Authors

- [@kinsoRick (kmasnaveev@gmail.com)](https://www.github.com/kinsoRick)


## Installation

Install Partysound via docker.

Dependencies: [Docker, docker-compose]

```bash
  git clone https://github.com/kinsoRick/partysound.git \
  cd partysound \
  docker compose -f local.yml build
```
    
## Run Locally

Start the server via docker

```bash
  docker compose -f local.yml up
```


## Features

- Create playlists with shared songs/audios
- List all created playlists
- Send playlists through VK group in Direct messages
- Caching songs before creating a playlist

## Screenshots
![image](https://imgur.com/PJ4yJuE.png)

![image2](https://imgur.com/RPfk82o.png)

![image3](https://imgur.com/BejQIQs.png)