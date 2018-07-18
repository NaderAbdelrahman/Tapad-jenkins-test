pipeline {
    agent any
    stages{
        stage('Convert md to html') {
            steps {
                sh 'ls'
                nodejs(nodeJSInstallationName: 'Node 10') {
                    sh 'npm install'
                    sh 'node main.js'
                }
                sh 'ls'
                sh 'pwd'
                sh 'dir GCS'
                sh 'pwd'
                sh 'ls'
                // archiveArtifacts artifacts: 'GCS/articles/*.html?
                echo "the outputed html file is in the artifacts tab for your viewing pleasure"
            }
        }
    }
}
