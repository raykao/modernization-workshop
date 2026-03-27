# DevDay Workshop: Modernize Legacy Java Applications with GitHub Copilot for Modernization

This hands-on workshop is designed to introduce EDU audiences to a practical, AI-assisted approach for modernizing a Java 8 application. Using the **Asset Manager** sample app and [GitHub Copilot for modernization](https://marketplace.visualstudio.com/items?itemName=vscjava.migrate-java-to-azure), attendees will explore how state-of-the-art developer tools can further accelerate common modernization tasks without requiring deep prior experience in cloud migration and modernization.


## Objectives
By the end of this workshop, attendees will be able to:

- Run an AI-assisted assessment on a legacy Java application
- Identify modernization issues and recommended next steps
- Generate containerization artifacts for an existing monolithic application
- Use AI to help create infrastructure specs to prepare for deployment to cloud
- Use GitHub Copilot for debugging and understand how AI can reduce the barrier to entry for modernization


## Prerequisites
- [Java JDK](https://learn.microsoft.com/en-us/java/openjdk/download) for source and target JDK versions, i.e. [JDK 8](https://learn.microsoft.com/en-us/java/openjdk/download#openjdk-8) and [JDK 21](https://learn.microsoft.com/en-us/java/openjdk/older-releases#openjdk-21).
- [Maven 3.6.0+](https://maven.apache.org/install.html) or [Gradle](https://gradle.org/install/) to build Java projects.
- [Docker Desktop](https://docs.docker.com/desktop/) (for PostgreSQL and RabbitMQ containers)
- [Git](https://git-scm.com/install/)

Optional:
- [Node.js 18+](https://nodejs.org/) and npm
- [Angular CLI](https://angular.dev/tools/cli): `npm install -g @angular/cli`


## Getting started

- Clone or fork this repository or click on `Fork` to fork this repo from GitHub.

```text
git clone https://github.com/cindyw4/modernization-workshop.git
```


- Start your IDE and navigate to the project folder to access source code.


- Navigate to the `workshop` folder in the [main](https://github.com/cindyw4/modernization-workshop/tree/main/workshop) branch



- Run the sample `asset-manager` application locally:

Windows:
```
scripts\startapp.cmd
```

Linux/Unix:
```
scripts/startapp.sh
```


This will launch PostgreSQL and RabbitMQ via Docker and starts both the web and worker modules with the `dev` profile (local file storage instead of S3). Open http://localhost:8080 to verify the Thymeleaf UI loads.


![Current UI](img/thymeleaf-ui.png)



## Sample application
The [Asset Manager](https://github.com/Azure-Samples/java-migration-copilot-samples/tree/main/asset-manager) app is consisted of 2 modules, `Web` and `Worker` with functions for the following components:
* PostgreSQL database for metadata storage, using password-based authentication
* RabbitMQ for queuing messages, using password-based authentication
* AWS S3 for image storage, using password-based authentication (access key/secret key)



Current architecture:

```mermaid
flowchart TD

  %% Applications
    WebApp[Web Application<br/>Spring Boot MVC + Thymeleaf]
    Worker[Worker Service]

  %% Storage Components
    S3[(AWS S3)]
    LocalFS[("Local File System<br/>dev only")]

  %% Message Broker
    RabbitMQ(RabbitMQ)

  %% Database
    PostgreSQL[(PostgreSQL)]

  %% Queues
    Queue[image-processing queue]
    RetryQueue[image-processing.retry queue]

  %% User
    User([User Browser])

  %% User Flow
    User -->|"HTML Pages<br/>(server-rendered)"| WebApp

  %% Web App Flows
    WebApp -->|Store Original Image| S3
    WebApp -->|Store Original Image| LocalFS
    WebApp -->|Send Processing Message| RabbitMQ
    WebApp -->|Store Metadata| PostgreSQL
    WebApp -->|Retrieve Images| S3
    WebApp -->|Retrieve Images| LocalFS
    WebApp -->|Retrieve Metadata| PostgreSQL

  %% RabbitMQ Flow
    RabbitMQ -->|Push Message| Queue
    Queue -->|Processing Failed| RetryQueue
    RetryQueue -->|After 1 min delay| Queue
    Queue -->|Consume Message| Worker

  %% Worker Flow
    Worker -->|Download Original| S3
    Worker -->|Download Original| LocalFS
    Worker -->|Upload Thumbnail| S3
    Worker -->|Upload Thumbnail| LocalFS
    Worker -->|Store Metadata| PostgreSQL
    Worker -->|Retrieve Metadata| PostgreSQL

  %% Styling
    classDef app fill:#90caf9,stroke:#0d47a1,color:#0d47a1
    classDef storage fill:#a5d6a7,stroke:#1b5e20,color:#1b5e20
    classDef broker fill:#ffcc80,stroke:#e65100,color:#e65100
    classDef db fill:#ce93d8,stroke:#4a148c,color:#4a148c
    classDef queue fill:#fff59d,stroke:#f57f17,color:#f57f17
    classDef user fill:#ef9a9a,stroke:#b71c1c,color:#b71c1c

    class WebApp,Worker app
    class S3,LocalFS storage
    class RabbitMQ broker
    class PostgreSQL db
    class Queue,RetryQueue queue
    class User user
```

Target state:

```mermaid
flowchart TD

%% Frontend
AngularSPA[Angular SPA<br/>localhost:4200]

%% Applications
RestAPI[REST API<br/>Spring Boot<br/>localhost:8080]
Worker[Worker Service]

%% Storage Components
S3[(AWS S3)]
LocalFS[("Local File System<br/>dev only")]

%% Message Broker
RabbitMQ(RabbitMQ)

%% Database
PostgreSQL[(PostgreSQL)]

%% Queues
Queue[image-processing queue]

%% User
User([User Browser])

%% User Flow
User -->|"Single Page App"| AngularSPA
AngularSPA -->|"JSON REST API<br/>/api/images"| RestAPI

%% REST API Flows
RestAPI -->|Store Original Image| S3
RestAPI -->|Store Original Image| LocalFS
RestAPI -->|Send Processing Message| RabbitMQ
RestAPI -->|Store/Retrieve Metadata| PostgreSQL
RestAPI -->|Retrieve Images| S3
RestAPI -->|Retrieve Images| LocalFS

%% RabbitMQ Flow
RabbitMQ -->|Push Message| Queue
Queue -->|Consume Message| Worker

%% Worker Flow (unchanged)
Worker -->|Download Original| S3
Worker -->|Download Original| LocalFS
Worker -->|Upload Thumbnail| S3
Worker -->|Upload Thumbnail| LocalFS
Worker -->|Store/Retrieve Metadata| PostgreSQL

%% Styling
classDef frontend fill:#e1f5fe,stroke:#0277bd,color:#0277bd
classDef app fill:#90caf9,stroke:#0d47a1,color:#0d47a1
classDef storage fill:#a5d6a7,stroke:#1b5e20,color:#1b5e20
classDef broker fill:#ffcc80,stroke:#e65100,color:#e65100
classDef db fill:#ce93d8,stroke:#4a148c,color:#4a148c
classDef queue fill:#fff59d,stroke:#f57f17,color:#f57f17
classDef user fill:#ef9a9a,stroke:#b71c1c,color:#b71c1c

class AngularSPA frontend
class RestAPI,Worker app
class S3,LocalFS storage
class RabbitMQ broker
class PostgreSQL db
class Queue queue
class User user
```
