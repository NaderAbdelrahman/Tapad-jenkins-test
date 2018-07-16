pipeline {
    agent any
    stages{
        stage('Test') {
            steps {
                echo "We have begun testing"
                sh 'node -v'
                sh 'npm test'
                echo "Testing is over"
            }
        }
    }
}
