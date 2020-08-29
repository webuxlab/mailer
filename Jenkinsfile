pipeline {
    agent {
        node {
            label 'docker'
        }
    }

    stages {
        stage('Backend Dependencies') {
            steps {
                sh 'cd backend/ && npm install'
            }
        }

        stage('Frontend Dependencies') {
            steps {
                sh 'cd frontend/app/ && npm install'
            }
        }

        stage('Lint Backend') {
            steps {
                sh 'cd backend/ && npm run-script lint'
            }
        }

        stage('Lint Frontend') {
            steps {
                sh 'cd frontend/app/ && npm run-script lint'
            }
        }

        stage('Backend Code Analysis') {
            steps {
                script {
                def scannerHome = tool 'sonarqube';
                    withSonarQubeEnv("sonarqube") {
                    sh "cd backend/ && ${tool("sonarqube")}/bin/sonar-scanner"            
                    }
                }
            }
        }

        stage('Frontend Code Analysis') {
            steps {
                script {
                def scannerHome = tool 'sonarqube';
                    withSonarQubeEnv("sonarqube") {
                    sh "cd frontend/app/ && ${tool("sonarqube")}/bin/sonar-scanner"            
                    }
                }
            }
        }

        stage('Build image') {
            parallel {
                stage('Build Frontend') {
                    steps { sh 'docker build --no-cache -f ./frontend/Dockerfile -t mailer-frontend ./frontend' }
                }

                stage('Build Backend') {
                    steps { sh 'docker build --no-cache -f ./backend/Dockerfile -t mailer-backend ./backend' }
                }
            }
        }

        stage('Push Image') {
            parallel {
                stage('Push Frontend') {
                    steps { sh 'docker tag mailer-frontend registry.webux.lab/mailer-frontend:latest; docker push registry.webux.lab/mailer-frontend:latest' }
                }

                stage('Push Backend') {
                    steps { sh 'docker tag mailer-backend registry.webux.lab/mailer-backend:latest; docker push registry.webux.lab/mailer-backend:latest' }
                }
            }
        }
    }
}