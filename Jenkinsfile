pipeline {
    agent any
    stages{
        stage('Checkout') {
            checkout scm
        }

        stage('Test') {
            steps {
                echo "We have begun testing"

                env.NODE_ENC = "test"

                sh 'node -v'
                sh 'npm install'
                sh 'npm test'

                echo "Testing is over"
            }
        }
    }
}
