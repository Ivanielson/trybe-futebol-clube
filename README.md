# Boas vindas ao repositório do TFC - Trybe Futebol Clube! ⚽️

O app Trybe futebol clube, é uma aplicação que simula a classificação de times em um campeonato de acordo com o resultado das partidas. O desenvolvimento do projeto foi iniciado com o frontend já pronto, no frontend foi configurado apenas o dockerfile para que fosse possível dockerizar a aplicação. Ao iniciar o desenvolvimento, também tive que fazer alguns ajustes no arquivo docker-compose para que fosse possível a comunicação entre os containers do frontend, backend e database(Mysql). O intuito do projeto, era desenvolver uma API para prover(servir) o frontend da aplicação, de dados relacionado aos clubes, partidas e classificação dos clubes.

## Tecnologias e conceitos utilizados:

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)

* Express
* Typescript
* Sequelize - MySql
* Nodejs
* Docker
* Conceitos de POO
* Testes de integração com:
  - mocha
  - chai
  - sinon
 
 
 
**Segue amostra da tela de classificação da aplicação:**

![Exibe tela de classificação dos clubes](front-example.png)

---

## Como executar a aplicação localmente (na sua máquina) ?

> Para executar a aplicação localmente, é necessario ter um **ambiente node** configurado na sua máquina, além do `docker` e `docker-compose` instalados.

---

## Caso não tenha o docker e docker-compose instalados e deseje fazer a instalação, siga os passos abaixo:

### Instalação do docker(via repositórios) e docker-compose no Ubuntu.

> O tutorial de instalação foi criado executando os comandos na seguinte versão do Ubuntu:

| Distributor ID | Description        | Release | Codename |
| -------------- | ------------------ | ------- | -------- |
| Ubuntu         | Ubuntu 20.04.3 LTS | 20.04   | focal    |


  ### Desinstalando versões anteriores.
  
  1 - Versões mais antigas do Docker eram chamadas de `docker`, `docker.io`, ou `docker-engine`. Se estes estiverem instalados, desinstale-os:
  
  ```
  sudo apt-get remove docker docker-engine docker.io containerd runc
  ```

  > Tudo bem se o **apt-get** relatar que nenhum desses pacotes está instalado.


### Instalação usando o repositório.
> Antes de instalar o Docker Engine pela primeira vez em uma nova máquina host, você precisa configurar o repositório do Docker. Depois, você pode instalar e atualizar o Docker a partir do repositório.


  ### Configurar o repositório.
  
  1. Atualize o `apt` índice de pacotes executando o seguinte comando no seu terminal :

  ```
  sudo apt-get update
```

  2. Instale pacotes para permitir que o `apt` faça uso do repositório por HTTPS:
  
  ```
  sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
  ```

  3. Adicione a chave GPG oficial do Docker

  ```
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
  ```
  ``
  Obs: Se tudo correr bem, você não deve receber nenhum retorno visual.
  ``

  4. Use o comando a seguir para configurar o repositório **estável**:

  ```
  echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  ```
  
  ### Instalando Docker Engine.
  
  1. Atualize o `apt` índice de pacotes e instale a versão mais recente do Docker Engine e do containerd:

  ```
  sudo apt-get update
  ```
  em seguida:
  
  ```
  sudo apt-get install docker-ce docker-ce-cli containerd.io
  ```
  ---
  
  ### Adicionando um usuário ao grupo de usuários docker (Opcional).
  
  
  :information_source: Caso prefira, não precisa executar essa etapa, na hora de executar os comandos docker, você só precisa executar utilizando ``sudo`` antecedento os comando docker.
  
  
  > :warning: **Atenção** :warning: : Esse procedimento concede privilégios equivalentes ao do usuário root (o superusuário no linux) na execução dos comandos Docker.
  
  1. Para criar o `docker` grupo e adicionar seu usuário:

  ```
  sudo groupadd docker
  ```
  `
  Caso ocorra uma mensagem: groupadd: grupo 'docker' já existe , é só prosseguir.
  `
  
  2. Adicione seu usuário ao `docker` grupo:

  ```
  sudo usermod -aG docker $USER
  ```
  
  3. Saia e faça login novamente para que sua associação ao grupo seja reavaliada ou você também pode executar o seguinte comando para ativar as alterações nos grupos:

  ```
  newgrp docker
  ```

  4. Verifique se você pode executar `docker` comandos sem `sudo`.

  ```
  docker run hello-world
  ```
  
  O terminal deve retornar uma mensagem com dicas, conforme a seguir:
  
  ```
  Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/
  ```
  

  > :information_source:  Mais detalhes a respeito na **[Documentação](https://docs.docker.com/engine/install/linux-postinstall/)**

  ---

### Instalação do docker-compose.

  ##### Instalação.

  1. Execute este comando para baixar a versão estável atual do Docker Compose:

  ```
  sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  ```
  2. Aplique permissões executáveis ao binário:

  ```
  sudo chmod +x /usr/local/bin/docker-compose
  ```
  
  3. E se tudo ocorrer bem, para validar a instalação basta executar o seguinte comando:
  
  ```
  docker-compose --version
  ```
  `Devem ser exibidos os detalhes da versão instalada em seu terminal.`
  
  ---

  ### Desinstalação do docker ou docker-compose.
  
  #### Após executar e testar a aplicação. Caso querira desinstalar o docker-compose.
  
  1. Para desinstalar o Docker Compose execute no seu terminal o seguinte comando:
  
  ``` 
  sudo rm /usr/local/bin/docker-compose
  ```
  
  #### Após executar e testar a aplicação. Caso querira desinstalar o docker.
  
  1. Desinstale os pacotes Docker Engine, CLI e Containerd:

  ```
  sudo apt-get purge docker-ce docker-ce-cli containerd.io
  ```
  
  2. Imagens, contêineres, volumes ou arquivos de configuração personalizados em seu host não são removidos automaticamente. Para excluir todas as imagens, contêineres e volumes execute os comados:

```
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```
 
:information_source: Para mais detalhes sobre instalação e desinstalação do docker, consulte a [documentação](https://docs.docker.com/engine/install/ubuntu/).

---
  
  
  ## Após feita a instalação do Docker e Docker-compose, é hora de clonar a aplicação para sua máquina.
  
  ### clonando o respositório.
  
  **1. Clone o repositória para um diretório em seu computador:**

   - No seu terminal, dentro de um diretório (pasta) de sua escolha, execute o seguinte comando:
  
  ```
  git clone git@github.com:Ivanielson/trybe-futebol-clube.git
  ```
  
  **2. Entre na pasta do repositório que você acabou de clonar:**
  
   - Execute no seu terminal o seguinte comando:
    
  ```
  cd trybe-futebol-clube
  ```
    
   **3. Instale as dependências do projeto:**

   - Execute no seu terminal o seguinte comando:
    
  ```
  npm install
  ```
---

## Repositório clonado. É hora de executar (start) a aplicação.

### Start o app Trybe futebol clube:

**1. Para executar a aplicação:**

* Execute o seguinte comando no terminal e aguarde a execução de todo processo:

```
npm run compose:up 
```
Se tudo der certo, você de receber uma mensagem no final da sua tela semelhante a essa:

    Creating db ... done
    Creating app_backend_1 ... done
    Creating app_frontend_1 ... done

**2. Após a conclução do comando anterior. Acesse a aplicação no seu navegador.**

* Para acessar a aplicação, abra uma aba no seu navegador, cole a url a seguir e tecle em **enter**:

```
http://localhost:3000/leaderboard
```

**Você verá algum parecido com isso:**

![Exibe uma imagem do tipo gif, com um demostração da aplicação rodando](./front-example.gif)

> Para adicionar ou editar partidas é necessário efetuar login na aplicação. Para efetuar o login, você pode usar essas credenciais: `email: admin@admin.com` e `password: secret_admin`.

Agora é só navegar por toda a aplicação.


---

### Como rodar os testes no backend da aplicação.

- A partir da raiz do projeto `trybe-futebol-clube/`, execute o seguinte comando no seu terminal:

```
cd app/backend/
```

dessa forma, você entrará no diretório de backend do projeto, em seguida execute o comando para rodar os testes:

```
npm test
```

---


### Stop o app Trybe futebol clube:

1. Depois de navegar pela aplicação, caso queira parar a execução.

* Execute no seu terminal dentro do diretório (pasta) do projeto o seguinte comando:

```
npm run compose:down
```

Você deve receber uma mensagem no seu terminal semelhante a essa:

    Stopping app_frontend_1 ... done
    Stopping app_backend_1  ... done
    Stopping db             ... done
    Removing app_frontend_1 ... done
    Removing app_backend_1  ... done
    Removing db             ... done
    Removing network app_default    
    

---

## **Versões** utilizado na execução do projeto.

| Nodejs   | Docker   | Docker-compose  | npm    |
| -------- | -------- | --------------- | ------ |
| v14.16.1 | 20.10.12 | 1.29.2          | 7.18.1 |

---

## Referências utilizadas na criação do README.

- #### [Instalação do Docker - Documentação](https://docs.docker.com/engine/install/ubuntu/);

- #### [Instalação do Docker-compose - Documentação](https://docs.docker.com/compose/install/);

- #### [Executar os comando docker sem o uso do **sudo**](https://docs.docker.com/engine/install/linux-postinstall/);

- #### [Dica: Caso queira instalar o node (via nvm) ](https://github.com/nvm-sh/nvm);

- #### [Markdown](https://pt.wikipedia.org/wiki/Markdown);

- #### [Markdown github cheat sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet);

- #### [Emoji cheat sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md);

- #### [Conteúdos da Trybe, referentes a instalação do docker e docker compose](https://www.betrybe.com/);

- #### [Markdown Badge](https://github.com/Ileriayo/markdown-badges#badges);
