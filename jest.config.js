module.exports = {
    testEnvironment: 'node',
    reporters: [
      "default",
      [ "jest-html-reporter", {
          pageTitle: "Relatório de Testes",
          outputPath: "./relatorios/test-report.html",
          includeFailureMsg: true,
          includeConsoleLog: true
        }
      ]
    ]
  };