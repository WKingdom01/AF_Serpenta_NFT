import discordAllUsers from '../../public/static/discord-user-roles.json'
const getDiscordRole = (name) => {
    let rolesArray = [];
    discordAllUsers.map((user)=>{
        if(user.discord_username==name){
            user.roles.map((role)=>{
                rolesArray.push(role);
            })
        }
    });
    return rolesArray;
    
  };
export default getDiscordRole;
  