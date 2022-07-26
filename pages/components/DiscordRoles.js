import { roles } from '../../utils/helpers/roles-color-map';

const DiscordRole = ({ role }) => {
  if (!role) return;
  return (
    <span className={`discord-role discord-role--${roles[role]}`}>{role}</span>
  );
};

const DiscordRoles = ({ roles }) => {
  if (!roles) return;
  return (
    <div className="discord-roles">
      {roles.map((role, index) => {
        return <DiscordRole key={index} role={role} />;
      })}
    </div>
  );
};

export default DiscordRoles;
