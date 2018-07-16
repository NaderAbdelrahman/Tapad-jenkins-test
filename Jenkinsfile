pipeline {
    agent any
    stages{
        stage('Test') {
            steps {
                echo "We have begun testing"
                sh 'node -v'
                sh 'ls'
                nodejs(nodeJSInstallationName: 'Node 10') {
                    sh 'npm i --verbose markdown-it'
                    sh 'npm i --verbose fs'
                    sh 'node main.js'
                }
                git credentialsId: 'b65a2f8f-0e83-44c9-9510-8183f4197b72', url: 'https://github.com/NaderAbdelrahman/jenkins-test.git'
                sh 'git status'
                sh 'ls'
                echo "Testing is over"
            }
        }
    }
}
