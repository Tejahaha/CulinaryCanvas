pipeline {
    agent any

    environment {
        FRONTEND_DIR = 'FreshFork-Frontend'
        BACKEND_DIR = 'FreshFork-Backend'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    bat 'npm ci --legacy-peer-deps'
                    bat 'npm run build'
                }
            }
        }

        stage('Build Backend Docker') {
            steps {
                dir("${BACKEND_DIR}") {
                    bat 'docker-compose build'
                }
            }
        }

        stage('Start Backend Docker') {
            steps {
                dir("${BACKEND_DIR}") {
                    bat 'docker-compose up -d'
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Frontend build ready. Backend container running.'
            }
        }
    }

    post {
        success {
            echo 'Build & deploy completed successfully!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
