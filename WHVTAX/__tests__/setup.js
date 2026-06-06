// Set required env vars for all tests
process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = 'test-secret-for-jest-at-least-32-chars-long'
process.env.PASSWORD_SALT = 'test-salt-32-chars-padded-for-test'
process.env.CRM_PASSWORD = 'TestPassword123!@#'
process.env.REDIS_URL = 'redis://localhost:6379' // set so rate-limit mock is exercised in tests
