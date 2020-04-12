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
                    steps { sh 'docker tag mailer-frontend hub.webux.lab/mailer-frontend:latest; docker push hub.webux.lab/mailer-frontend:latest' }
                }

                stage('Push Backend') {
                    steps { sh 'docker tag mailer-backend hub.webux.lab/mailer-backend:latest; docker push hub.webux.lab/mailer-backend:latest' }
                }
            }
        }
    }
}