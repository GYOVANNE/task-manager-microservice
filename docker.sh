#!/bin/bash

NETWORK_NAME="task_manager_net"
API_GATEWAY_CONTAINER="api-gateway-task-manager-app"
AUTH_SERVICE_NGINX_CONTAINER="auth-service-task-manager-app-nginx"

services=(
#   "auth-service-task-manager-app"
#   "task-service-task-manager-app"
)

if [ "$1" == "up" ]; then

	if [ ! "$(docker network ls -q -f name=${NETWORK_NAME})" ]; then
		docker network create ${NETWORK_NAME}
		echo -e "\nRede ${NETWORK_NAME} criada\n"
	else
		echo -e "\nA rede ${NETWORK_NAME} Já existe\n"
	fi

	if [ "$(docker ps -aq -f name=${API_GATEWAY_CONTAINER})" ]; then
		echo -e "\n*** O contêiner ${API_GATEWAY_CONTAINER} está ativo ***\n"
	else
		echo -e "\n*** O contêiner ${API_GATEWAY_CONTAINER} não existe. Criando ***\n"
		cd ${API_GATEWAY_CONTAINER}
		docker-compose up -d --build
		echo -e "\n*** Serviço ${API_GATEWAY_CONTAINER} em execução ***\n"
		cd ..
	fi

	if [ "$(docker ps -aq -f name=${API_GATEWAY_CONTAINER})" ]; then
		if [ "$(docker inspect -f '{{.State.Running}}' ${API_GATEWAY_CONTAINER})" == "true" ]; then
			if [ ! "$(docker network inspect ${NETWORK_NAME} | grep ${API_GATEWAY_CONTAINER})" ]; then
				docker network connect ${NETWORK_NAME} ${API_GATEWAY_CONTAINER}
			fi
		fi
	fi

	for service in "${services[@]}"
	do
		if [ "$(docker ps -aq -f name=${service})" ]; then
			echo -e "\n*** O contêiner ${service} está ativo ***\n"
		else
			echo -e "\n*** O contêiner ${service} não existe ***\n"
			cd ${service}
			docker-compose up -d --build
			echo -e "\n*** Serviço ${service} em execução ***\n"
			cd ..
		fi

		if [ "$(docker ps -aq -f name=${service})" ]; then
			if [ "$(docker inspect -f '{{.State.Running}}' ${service})" == "true" ]; then
				if [ ! "$(docker network inspect ${NETWORK_NAME} | grep ${service})" ]; then
					docker network connect ${NETWORK_NAME} ${service}
				fi
			fi
		fi
	done

	if [ "$(docker ps -aq -f name=${AUTH_SERVICE_NGINX_CONTAINER})" ]; then
		if [ "$(docker inspect -f '{{.State.Running}}' ${AUTH_SERVICE_NGINX_CONTAINER})" == "true" ]; then
			if [ ! "$(docker network inspect ${NETWORK_NAME} | grep ${AUTH_SERVICE_NGINX_CONTAINER})" ]; then
				docker network connect ${NETWORK_NAME} ${AUTH_SERVICE_NGINX_CONTAINER}
			fi
		fi
	fi

elif [ "$1" == "down" ]; then

	cd ${API_GATEWAY_CONTAINER}
	docker-compose down
	echo -e "\n*** Serviço ${API_GATEWAY_CONTAINER} parado ***\n"

	cd ..

	for service in "${services[@]}"
	do
		cd ${service}
		docker-compose down
		echo -e "\n*** Serviço ${service} parado ***\n"

		cd ..
	done

	echo -e "\n*** Serviços desligados ***\n"

elif [ "$1" == "network" ]; then
	if [ ! "$(docker network ls -q -f name=${NETWORK_NAME})" ]; then
		docker network create ${NETWORK_NAME}
		echo -e "\nRede ${NETWORK_NAME} criada\n"
	else
		echo -e "\nA rede ${NETWORK_NAME} Já existe\n"
	fi

	if [ "$(docker ps -aq -f name=${API_GATEWAY_CONTAINER})" ]; then
		if [ "$(docker inspect -f '{{.State.Running}}' ${API_GATEWAY_CONTAINER})" == "true" ]; then
			if [ ! "$(docker network inspect ${NETWORK_NAME} | grep ${API_GATEWAY_CONTAINER})" ]; then
				docker network connect ${NETWORK_NAME} ${API_GATEWAY_CONTAINER}
			fi
		fi
	fi

	for service in "${services[@]}"
	do
		if [ "$(docker ps -aq -f name=${service})" ]; then
			if [ "$(docker inspect -f '{{.State.Running}}' ${service})" == "true" ]; then
				if [ ! "$(docker network inspect ${NETWORK_NAME} | grep ${service})" ]; then
					docker network connect ${NETWORK_NAME} ${service}
				fi
			fi
		fi
	done
	
	if [ "$(docker ps -aq -f name=${AUTH_SERVICE_NGINX_CONTAINER})" ]; then
		if [ "$(docker inspect -f '{{.State.Running}}' ${AUTH_SERVICE_NGINX_CONTAINER})" == "true" ]; then
			if [ ! "$(docker network inspect ${NETWORK_NAME} | grep ${AUTH_SERVICE_NGINX_CONTAINER})" ]; then
				docker network connect ${NETWORK_NAME} ${AUTH_SERVICE_NGINX_CONTAINER}
			fi
		fi
	fi

else
    echo -e "\nComando inválido. Utilize './docker.sh up' para iniciar os serviços ou './docker.sh down' para desligar os serviços.\n"
fi
