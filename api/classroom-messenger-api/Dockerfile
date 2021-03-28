FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src

COPY ["api/classroom-messenger-api/API.csproj", "api/classroom-messenger-api/"]
COPY ["api/Application/Application.csproj", "api/Application/"]
COPY ["api/Domain/Domain.csproj", "api/Domain/"]
COPY ["api/Persistence/Persistence.csproj", "api/Persistence/"]
COPY ["api/Infrastructure/Infrastructure.csproj", "api/Infrastructure/"]

RUN dotnet restore "api/classroom-messenger-api/API.csproj"

COPY . .
WORKDIR "/src/api/classroom-messenger-api"
RUN dotnet build "API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "API.dll"]