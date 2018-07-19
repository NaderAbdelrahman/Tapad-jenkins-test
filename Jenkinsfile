pipeline {
    agent any
    stages{
        stage('Branch Ver Num') {
            steps {
                git_V_Num = sh (
                    script: 'git describe --tags'
                )
                echo git_V_Num
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
