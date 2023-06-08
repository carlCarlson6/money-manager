FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["MoneyManager.API/MoneyManager.API.csproj", "MoneyManager.API/"]
RUN dotnet restore "MoneyManager.API/MoneyManager.API.csproj"
COPY . .
WORKDIR "/src/MoneyManager.API"
RUN dotnet build "MoneyManager.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MoneyManager.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MoneyManager.API.dll"]
