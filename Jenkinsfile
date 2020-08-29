pipeline {
    stages {
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