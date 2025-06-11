<h1 align="center"> hexagonal-lambda </h1>
Hexagonal architecture archetype for use in lambdas

## Table of Contents
- [Domain](#Domain)
    - [Models](#Models)
    - [Value Objects](#value-objects)
    - [Domain Errors](#domain-errors)
    - [Repository](#domain-repository)
- [Application](#Application)
    - [Ports](#Ports)
        - [Primary Ports](#primary-ports)
        - [Secondary Ports](#secondary-ports)
    - [Use Cases](#UseCases)
- [Infrastructure](#Infrastructure)
    - [Driven](#Driven)
        - [Driven Adapters](#driven-adapters)
        - [Repositories](#Repositories)
    - [Driving](#Driving)
        - [Driving Adapters](#driving-adapters)
        - [DTO](#DTO)

# Domain
The Domain is the core of the service. It contains the business logic and should not change unless the business requirements change.

# Models
Models are interfaces that represent the business objects with which our core works.

https://github.com/AramisMario/hexagonal-for-lambda/blob/7805d97ba11a10716e78d0eafdef1e632d506d08/src/domain/models/account.ts#L1-L16

# Value Objects
Value Objects are classes used to represent data in a more complex way than a primitive value. For example, an address could be stored as a string, but if we want to attach validation logic and work with the individual parts of the address, we need something more than a string and use a class to represent the address.

https://github.com/AramisMario/hexagonal-for-lambda/blob/bfc34c0cb2f8581eb252caad63f97c7b02fa687c/src/domain/valueObjects/address.ts#L16-L40

# Domain Errors
Domain Errors are classes responsible for mapping the errors that could occur in the domain. These errors are not exceptions but business logic-related errors.

https://github.com/AramisMario/hexagonal-for-lambda/blob/bfc34c0cb2f8581eb252caad63f97c7b02fa687c/src/domain/domainErrors/entityErrors/entityNotFound.ts#L1-L10

# Repository
Domain Repository are the interfaces that we use to model the acces to the data from our domain.

https://github.com/AramisMario/hexagonal-for-lambda/blob/7805d97ba11a10716e78d0eafdef1e632d506d08/src/domain/repository/accountRepository.ts#L1-L9

# Application
The Application is the layer where we define our ports and use cases.

# Ports
A port is an interface that every adapter wanting to connect to it must implement.

# Primary Ports
Primary ports are used to connect with the driving adapters (input adapters) in the infrastructure layer.

https://github.com/AramisMario/hexagonal-for-lambda/blob/bfc34c0cb2f8581eb252caad63f97c7b02fa687c/src/application/ports/primaryPorts/useCases/useCasePort.ts#L4-L6

# Secondary Ports
Secondary ports are used to connect with the driven adapters in the infrastructure layer, commonly used to call external services like third-party APIs, message queues and more.

https://github.com/AramisMario/hexagonal-for-lambda/blob/ce6ecaad14dd7caf05f9ac0797ef43e05d652bf2/src/application/ports/secondaryPorts/thirdPartyApi/thirdPartyApiPort.ts#L1-L9

# Use Cases
Use cases execute the logic of our application by calling entity methods, external services, and performing their own logic and validations.

https://github.com/AramisMario/hexagonal-for-lambda/blob/5cf2119034c7152617de905c0852321a6a00b51b/src/application/useCases/accountDebitCase.ts#L21-L74

# Infrastructure
The Infrastructure layer is used to communicate the core with "the external world." Here, we implement the ports, known as Adapters.

# Driven
The Driven folder contains everything in the infrastructure layer related to other services our software needs. Here you'll find the secondary adapters, repositories, and mappers to transform data from entities to plain objects and vice versa.

# Driven Adapters
Driven Adapters are implementations of the application's secondary ports. We use these implementations to communicate with external resources while keeping the core of our service completely independent of any particular external service.

https://github.com/AramisMario/hexagonal-for-lambda/blob/bfc34c0cb2f8581eb252caad63f97c7b02fa687c/src/infrastructure/driven/adapters/thirdPartyApi/thirdPartyApi.ts#L1-L24

# Repositories
A repository is a class responsible for communication with the database. Here we perform our queries!

# Driving
The Driving folder contains everything related to the consumption of our service. Here, we handle the data sent to us, the origin of the request, and the appropriate response.

# Driving Adapters
The driving adapter is a function responsible for connecting the core to a particular entry point and performing the necessary validations and transformations on the data. For example, we could have an adapter for HTTP requests used to call our core and another adapter for requests coming from an SQS message or an EventBridge event. It is important to maintain low coupling, so it is necessary to use interfaces between the adapter and use case. These interfaces are the primary adapters defined in the application layer.

https://github.com/AramisMario/hexagonal-for-lambda/blob/7805d97ba11a10716e78d0eafdef1e632d506d08/src/infrastructure/driving/adapters/apigateway/apiGatewayAdapter.ts#L13-L70

# DTO
A DTO (Data Transfer Object) is like a contract that specifies the properties a request object must have to be valid for our service. Moreover, it defines the object the client can expect as a response.

https://github.com/AramisMario/hexagonal-for-lambda/blob/06987a6df5d56235afeb24b20bddf42e3009ae88/src/infrastructure/driving/DTOs/DebitResponseDTO.ts#L1-L6
