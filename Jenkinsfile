pipeline {
    agent any
    stages{
        stage('Convert md to html') {
            steps {

                echo "We have begun testing"
                sh 'node -v'
                sh 'ls'
                nodejs(nodeJSInstallationName: 'Node 10') {
                    sh 'npm i --verbose markdown-it'
                    sh 'npm i --verbose fs'
                    sh 'node main.js'
                }
                archiveArtifacts artifacts: '*.html'
                echo "the outputed html file is in the artifacts tab for your viewing pleasure"
                echo "Testing is over"
            }
        }
    }
}
