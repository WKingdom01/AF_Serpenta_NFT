import fse from 'fs-extra';
import snapshot from '../data/snapshot.json' assert { type: 'json' };

const { snapshot: snapshotData } = snapshot;

let allNewUsers = [];

const snapshotArray = Object.keys(snapshotData)
  .map((key) => snapshotData[key])
  .filter(Boolean);

const { members: everyoneUsers } = snapshotArray.reduce((acc, curr) => {
  if (curr.name === '@everyone') {
    return acc.concat(curr.members);
  }
  return acc;
});

everyoneUsers.forEach((member) => {
  let newUser = {
    discord_id: member.id,
    discord_username: member.tag,
    roles: [],
  };

  snapshotArray.forEach((snapshotTemp) => {
    snapshotTemp.members.forEach((user) => {
      if (user.id === member.id) {
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
