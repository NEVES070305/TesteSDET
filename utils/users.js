const users = [
  {
    username: 'usuario1',
    password: 'senha1',
    valid: false
  },
  {
    username: 'usuario2',
    password: 'senha2',
    valid: false
  }
];

const validUsernames = [
  'standard_user',
  'locked_out_user',
  'problem_user',
  'performance_glitch_user',
  'error_user',
  'visual_user'
];

for (const name of validUsernames) {
  users.push({
    username: name,
    password: 'secret_sauce',
    valid: true
  });
}

module.exports = users;