pipeline {
    agent any
    stages{
        stage('Test') {
            steps {
                echo "We have begun testing"
                sh 'node -v'
                withTool('Node 10.6.0'){
                    sh 'npm install'
                }
                sh 'npm test'
                echo "Testing is over"
            }
        }
    }
}
