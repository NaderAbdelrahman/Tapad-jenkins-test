pipeline {
    agent any
    stages{
        stage('Checkout') {
            steps{
                checkout scm
            }
        }

        stage('Test') {
            steps {
                echo "We have begun testing"
                sh 'node -v'
                sh 'npm install'
                sh 'npm test'
                echo "Testing is over"
            }
        }
    }
}
