pipeline {
    agent any
    environment {
        GITBRANCHVER = sh 'git describe --tags'
    }
    stages{
        stage('Branch Ver Num') {
            steps {
            echo GITBRANCHVER
            }
        }
        stage('Run JS') {
            steps {
                nodejs(nodeJSInstallationName: 'Node 10') {
                    sh 'npm install'
                    sh 'node main.js'
                }
            }
        }
        stage('Keep .html Artifacts'){
            steps {
                dir('GCS/articles') {
                    archiveArtifacts artifacts: '**/*.html'
                }
            }
        }
    }
}
