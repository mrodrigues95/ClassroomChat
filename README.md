# A communications platform created for teachers and students
<div align="center">Built with React, TypeScript and .NET</div>

## What is this?
Classroom.Chat allows for direct communication between students and teachers so that they can easily ask questions, participate in after hours classroom discussions and stay updated on the latest news.

## Features
- Create classrooms and discussions related to what ever the student/teacher wants
- Central hub for classroom participants to discuss and ask questions outside class hours
- Encourages peer-to-peer discussion
- Track classroom deadlines
- Allows for students to get the answers they need on the fly
- Reduces time spent by the teacher answering repetitive emails
- Private messaging

## Getting Started
Make sure you have [installed](https://docs.docker.com/desktop/) and [configured](#configuring-docker) docker in your local environment. After that, you will be able to run the commands below in the root directory of this repo.

```sh
git clone https://github.com/mrodrigues95/ClassroomChat.git
```
```sh
docker-compose build
```
```sh
docker-compose up
```
Application URLs can be accessed as shown below:
```sh
api: http://localhost:8080
web: http://localhost:3000
```

<a id="configuring-docker"></a>
## Configuring Docker and .NET Environment Variables
First, ensure you have the [.NET 5.0 SDK](https://dotnet.microsoft.com/download/dotnet/5.0) installed.

### .NET User Secrets
Open up a terminal and run the following commands:
```sh
cd api/classroom-messenger-api
dotnet user-secrets init
dotnet user-secrets set "TokenKey" "<enter_random_secret_here>"
dotnet user-secrets set "Kestrel:Certificates:Development:Password" "<enter_random_secret_here>"
```
It doesn't matter what you enter as the secret, just as long as you set them in your environment as shown above.
> **IMPORTANT:** Take note of the secret you entered for Kestrel:Certificates:Development:Password, as you will need it when we set the dev certificates.

### .NET HTTPS Dev Certificates
```sh
dotnet dev-certs https -ep $env:USERPROFILE\.aspnet\https\API.pfx -p <enter_secret_used_from_above>
dotnet dev-certs https --trust
```
As mentioned earlier, enter the secret you used when setting the kestrel env variables for the dev certificate.
Once the certs have been set up, your local environment will be ready to go.

## Author: Marcus Rodrigues
- Website: https://mrodrigues.me/

## License
[MIT](https://opensource.org/licenses/MIT)
