pipeline {
    agent any
    stages{
        stage('Convert md to html') {
            steps {
                nodejs(nodeJSInstallationName: 'Node 10') {
                    sh 'npm install'
                    sh 'node main.js'
                }
                archiveArtifacts artifacts: '*.html'
                echo "the outputed html file is in the artifacts tab for your viewing pleasure"
            }
        }
    }
}
