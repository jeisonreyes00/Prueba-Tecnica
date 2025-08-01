module.exports = {
  testEnvironment: 'jsdom', 

  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'], 

  moduleNameMapper: {
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@context/(.*)$": "<rootDir>/src/context/$1",
    "^@types/(.*)$": "<rootDir>/src/types/$1", // Si importas desde @types/
  },

  // Directorios donde Jest debe buscar módulos
  moduleDirectories: ['node_modules', '<rootDir>/src'], 

  // Patrones para encontrar archivos de test
  testMatch: [
    '<rootDir>/**/*.test.ts', 
    '<rootDir>/**/*.test.tsx'
  ],

  // Configuración explícita del transformador para TypeScript/JSX en un entorno ESM
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest', // Usar ts-jest
      {
        // Especificar explícitamente el archivo tsconfig a usar para la compilación de tests
        tsconfig: '<rootDir>/tsconfig.app.json',
        // Opciones para asegurar que ts-jest maneje el JSX correctamente y compile a ESM
        // 'module' se configura para la salida de los módulos de prueba
        // 'isolatedModules' es útil con 'verbatimModuleSyntax'
        isolatedModules: true,
        module: 'ESNext', // O 'NodeNext' si 'ESNext' da problemas
        jsx: 'react-jsx', // Repetir explícitamente el tipo de JSX para el transformador
      },
    ],
  },

  // Extensiones de archivo que Jest debe procesar
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Configuración del resolver para módulos ES en Jest (requiere 'ts-jest-resolver')
  resolver: 'ts-jest-resolver', 

  // Configuración de cobertura de código (opcional)
  collectCoverage: false, 
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/*.test.{ts,tsx}',
    '!<rootDir>/src/main.tsx',
  ],
};