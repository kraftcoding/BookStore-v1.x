FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy csproj from current dir (Dockerfile context = ASP.NET-9-Web-API-for-MongoDB/)

COPY ["ASP.NET-9-Web-API-for-MongoDB.csproj", "."]
RUN dotnet restore "ASP.NET-9-Web-API-for-MongoDB.csproj"

# Copy source code and build

COPY . .
RUN dotnet build "ASP.NET-9-Web-API-for-MongoDB.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish stage

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "ASP.NET-9-Web-API-for-MongoDB.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Runtime stage

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

# Install curl

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Final stage

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ASP.NET-9-Web-API-for-MongoDB.dll"]