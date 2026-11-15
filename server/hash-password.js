
import bcrypt from 'bcryptjs'
import readline from 'node:readline/promises'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const password = await rl.question('Enter your admin password: ')
rl.close()

if (password.length < 8) {
  console.log('Password must be at least 8 characters.')
  process.exit(1)
}

const hash = await bcrypt.hash(password, 12)
console.log('\nYour password hash:\n')
console.log(hash)
