import fse from 'fs-extra';
import snapshot from '../data/snapshot.json' assert { type: 'json' };

let allNewUsers = [];

const snapshotArray = Object.keys(snapshot).map((key) => snapshot[key]);

const { users: everyoneUsers } = snapshotArray.reduce((acc, curr) => {
  if (curr.name === '@everyone') {
    return acc.concat(curr.users);
  }
  return acc;
});

everyoneUsers.forEach((everyoneUser) => {
  let newUser = {
    discord_id: everyoneUser.id,
    discord_username: everyoneUser.tag,
    roles: [],
  };

  snapshotArray.forEach((snapshotTemp) => {
    snapshotTemp.users.forEach((user) => {
      if (user.id === everyoneUser.id) {
        newUser.roles.push(snapshotTemp.name);
      }
    });
  });

  allNewUsers.push(newUser);
});

if (allNewUsers) {
  const jsonUsers = JSON.stringify(allNewUsers);

  fse.outputFile('./public/static/discord-user-roles.json', jsonUsers, (e) => {
    if (e) {
      return console.log(e);
    }

    console.log(
      'discord-user-roles.json was saved in ./public/static/discord-user-roles.json',
    );
  });
}
