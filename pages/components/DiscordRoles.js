import { roles } from '../../utils/helpers/roles-color-map';

const DiscordRole = ({ role }) => {
  return (
    <span className={`discord-role discord-role--${roles[role]}`}>{role}</span>
  );
};

const DiscordRoles = ({ roles }) => {
  return (
    <div className="discord-roles">
      {roles &&
        roles.map((role, index) => {
          return role === '@everyone' ? null : (
            <DiscordRole key={index} role={role} />
          );
        })}
    </div>
  );
};

export default DiscordRoles;
