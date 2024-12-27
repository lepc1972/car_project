pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Ensure the name matches the NodeJS installation configured in Jenkins
    }

    environment {
        FRONTEND_REPO = 'https://github.com/lepc1972/car_project.git'
        FRONTEND_BRANCH = 'main'
        SONAR_URL = 'http://172.233.178.221:9000' // Replace this URL with your SonarQube server URL
        REGISTRY_CREDENTIALS = credentials('docker-cred')
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: "${env.FRONTEND_REPO}", branch: "${env.FRONTEND_BRANCH}"
            }
        }

        stage('Install Dependencies') {
            steps {
                withEnv(['CI=false']) { // Ensure CI is false to bypass ESLint warnings
                    sh 'npm install'
                    sh 'npm install @babel/plugin-proposal-private-property-in-object --save-dev'
                }
            }
        }

        stage('Build Application') {
            steps {
                withEnv(['CI=false']) { // Ensure CI is false to bypass ESLint warnings
                    sh 'npm run build'
                }
            }
        }

        stage('Build and Push Docker Image') {
            environment {
                DOCKER_IMAGE = "lepc72/car_project:${env.BUILD_NUMBER}"
            }
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE} .'
                    def dockerImage = docker.image("${DOCKER_IMAGE}")
                    docker.withRegistry('https://index.docker.io/v1/', "docker-cred") {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Update Deployment File') {
            environment {
                GIT_REPO_NAME = "car_project"
                GIT_USER_NAME = "lepc1972"
            }
            steps {
                withCredentials([string(credentialsId: 'github', variable: 'GITHUB_TOKEN')]) {
                    sh '''
                    # Configurar los datos de Git
                    git config user.email "githublepc@gmail.com"
                    git config user.name "${GIT_USER_NAME}"

                    # Reemplazar el placeholder con el número de build en el archivo de despliegue
                    sed -i "s|replaceImageTag|${BUILD_NUMBER}|g" manifests/deployment.yml

                    # Verificar si hubo cambios en el archivo de despliegue
                    git diff --exit-code manifests/deployment.yml
                    if [ $? -eq 0 ]; then
                        echo "No changes to commit."
                    else
                        # Restablecer cambios no deseados (si quieres ignorar cambios en package.json y package-lock.json)
                        git restore package.json package-lock.json

                        # Agregar el archivo modificado deployment.yml
                        git add manifests/deployment.yml

                        # Hacer el commit
                        git commit -m "Update deployment image to version ${BUILD_NUMBER}"

                        # Hacer push al repositorio
                        git push https://${GIT_USER_NAME}:${GITHUB_TOKEN}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME}.git HEAD:main
                    fi
                    '''
                }
            }
        }

    }

    post {
        always {
            // Clean up any workspace or resources
            cleanWs()
        }
    }
}
