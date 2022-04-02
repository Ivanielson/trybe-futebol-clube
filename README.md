# Boas vindas ao repositório do TFC - Trybe Futebol Clube! ⚽️

O app Trybe futebol clube, é uma aplicação que simula a classificação de times em um campeonato de acordo com o resultado das partidas. O desenvolvimento do projeto foi iniciado com o frontend já pronto, no frontend foi configurado apenas o dockerfile para que fosse possível dockerizar a aplicação. Ao iniciar o desenvolvimento, também tive que fazer alguns ajustes no arquivo docker-compose para que fosse possível a comunicação entre os containers do frontend, backend e database(Mysql). O intuito do projeto, era desenvolver uma API para prover(servir) o frontend da aplicação, de dados relacionado aos clubes, partidas e classificação dos clubes.

## Tecnologias e conceitos utilizados:

* Express
* Typescript
* Sequelize - MySql
* Nodejs
* Docker
* Conceitos de POO
* Conceitos de S.O.L.I.D
* Testes de integração com:
  - mocha
  - chai
  - sinon
 
 
 
**Segue amostra da tela de classificação da aplicação:**

![Exibe tela de classificação dos clubes](front-example.png)

---

## Como executar a aplicação localmente (na sua máquina) ?

> Para executar a aplicação localmente, é necessario ter o `docker` e `docker-compose` instalados na sua máquina.

### Instalação do docker(via repositórios) e docker-compose no Ubuntu.

> O tutorial de instalação foi criado executando os comandos na seguinte versão do Ubuntu:

| Distributor ID | Description        | Release | Codename |
| -------------- | ------------------ | ------- | -------- |
| Ubuntu         | Ubuntu 20.04.3 LTS | 20.04   | focal    |


  #### Desinstalando versões anteriores.
  
  1 - Caso você já possua alguma versão instalada na sua máquina e queira refazer o processo de instalação desde o princípio por qualquer motivo, seja     pra atualizar ou para corrigir algum problema, primeiro você deve remover os pacotes da versão que está na sua máquina. Para isso, utilize o seguinte     comando no terminal:
  
  ```
  sudo apt-get remove docker* containerd runc
  ```

  Caso nenhum dos pacotes esteja instalado, esse comando retornará um erro **E: Impossível encontrar o \<nome-do-pacote>** , nesse caso, é só prosseguir   com a instalação.

  #### Atualizando os índices dos pacotes do apt.
  
  * No terminal, utilize o comando **update** para atualizar os índices dos pacotes do **apt** :
  
  ```
  sudo apt-get update
  ```
  * **Opcionalmente** , atualize seus pacotes antes de fazer uma nova instalação:
  
  ```
  sudo apt-get upgrade
  ```
  
  #### Habilitando HTTPS para o apt.
  
  * Instale os seguintes pacotes, eles são recomendados pela documentação oficial para habilitar a utilização dos repositórios via HTTPS pelo apt-get , precisaremos disso para prosseguir a instalação:
  
  ```
  sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
  ```
  
  #### Adicionando uma chave de acesso ao repositório remoto.
  
  * Adicione a chave GPG oficial do Docker

  ```
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
  ```
  ``
  Obs: Se tudo correr bem, você não deve receber nenhum retorno visual.
  ``
  
  #### Adicionando o repositório.
  
  * Use o comando a seguir para configurar o repositório **estável**:

  ```
  echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  ```
  
  #### Instalando Docker Engine.
  
  * Atualize o aptíndice de pacotes e instale a versão mais recente do Docker Engine e do containerd ou vá para a próxima etapa para instalar uma versão específica:

  ```
  apt-get update
  ```
  em seguida:
  
  ```
  apt-get install docker-ce docker-ce-cli containerd.io
  ```
  ---
  
  #### Adicionando um usuário ao grupo de usuários docker (Opcional).
  
  
  :information_source: Caso prefira, não precisa executar essa etapa, na hora de executar os comandos docker, você só precisa executar utilizando ``sudo`` antecedento os comando docker.
  
  
  > :warning: **Atenção** :warning: : Esse procedimento faz com que seu usuário tenha os mesmos privilégios do usuário root (o superusuário no linux) na    execução dos comandos Docker.
  
  * Para evitar o uso de sudo em todos os comandos Docker que formos executar, vamos dar as devidas permissões ao nosso usuário. Primeiro crie um grupo     chamado docker:

  ```
  sudo groupadd docker
  ```
  `
  Caso ocorra uma mensagem: groupadd: grupo 'docker' já existe , é só prosseguir.
  `
  
  * E então, use o comando abaixo para adicionar seu usuário a este novo grupo. obs.: execute o comando exatamente como ele está abaixo:

  ```
  sudo usermod -aG docker $USER
  ```
  
  * Para ativar as alterações realizadas aos grupos, você pode realizar logout e login de sua sessão, ou executar no terminal:

  ```
  newgrp docker
  ```
  ---
  
  #### Iniciando o Daemon do Docker.
  
  * Para consultar o status do daemon do Docker, execute:
  
  ```
  sudo systemctl status docker
  ```
  
  `
  Esse comando deve retornar algo como um pequeno relatório sobre o serviço, onde consta seu status de funcionamento:
  `
  
  ```
  ● docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
     Active: inactive (dead) since Thu 2021-09-23 11:55:11 -03; 2s ago
TriggeredBy: ● docker.socket
       Docs: https://docs.docker.com
    Process: 2034 ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock (code=exited, status=0>
   Main PID: 2034 (code=exited, status=0/SUCCESS
  ```
  
  Caso o parâmetro **Active** esteja como ´stop/waiting´ ou no nosso caso, como inactive , rode o comando start para iniciá-lo:
  
  ```
  sudo systemctl start docker
  ```
  
  Ao consultar o status novamente, o processo deverá estar como `start/ running/ active`.
  
  #### Habilite o daemon do Docker para iniciar junto com a inicialização do sistema:
  
  * Execute o seguinte comando:

  ```
  sudo systemctl enable docker
  ```
  
  #### Validando a instalação.
  
  * Para validar se tudo ocorreu como deveria na instalação, vamos executar um hello world do Docker:

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
  
  ---
  
  ### Após executar e testar a aplicação. Caso querira desinstalar o docker, execute os seguintes comandos:
  
  * Desinstale os pacotes Docker Engine, CLI e Containerd:

  ```
  sudo apt-get purge docker-ce docker-ce-cli containerd.io
  ```
  
  * Imagens, contêineres, volumes ou arquivos de configuração personalizados em seu host não são removidos automaticamente. Para excluir todas as imagens, contêineres e volumes:

```
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```
 
:information_source: Para mais detalhes sobre instalação e desinstalação do docker, consulte a [documentação](https://docs.docker.com/engine/install/ubuntu/).

---

### Instalação do docker-compose.

  ##### Instalação.

  * Execute este comando para baixar a versão estável atual do Docker Compose:

  ```
  sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  ```
  * Aplique permissões executáveis ao binário:

  ```
  sudo chmod +x /usr/local/bin/docker-compose
  ```
  
  *E se tudo ocorrer bem, para validar a instalação basta executar o seguinte comando:
  
  ```
  docker-compose --version
  ```
  `Devem ser exibidos os detalhes da versão instalada em seu terminal.`

  #### Desinstalação do docker-compose.
  
  > Após executar e testar a aplicação. Caso querira desinstalar o docker-compose.
  
  Para desinstalar o Docker Compose execute no seu terminal o seguinte comando:
  
  ``` 
  sudo rm /usr/local/bin/docker-compose
  ```
  
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

> Para adicionar partidas é necessário efetuar login na aplicação. Para efetuar o login, você pode usar essas credenciais: `email: admin@admin.com` e `password: secret_admin`.

Agora é só navegar por toda a aplicação.


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
