FROM microsoft/aspnetcore:2.0 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:2.0 AS build
WORKDIR /src
COPY ["reactApp.csproj", ""]
RUN dotnet restore "/reactApp.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "reactApp.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "reactApp.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "reactApp.dll"]