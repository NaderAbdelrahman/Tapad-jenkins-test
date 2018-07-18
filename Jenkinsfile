pipeline {
    agent any
    stages{
        stage('Convert md to html') {
            steps {
                nodejs(nodeJSInstallationName: 'Node 10') {
                    sh 'npm install'
                    sh 'node main.js'
                }
                dir('GCS/articles') {
                    archiveArtifacts artifacts: '**/*.html'
                }
            }
        }
    }
}
